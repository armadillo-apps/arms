/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("Apartment Assignment Cancellation", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  const apartmentName = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";

  const occupantName = faker.name.firstName();
  const occupantEmployeeID = faker.random.uuid();
  const status = "allocated";
  const gender = "female";
  const checkoutDate = moment(new Date()).add(1, "days");

  const newApartment = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2020-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  before(() => {
    cy.visit(`${BASE_URL}`);
    // Visiting BASE_URL prevents request from being called twice.
    // visit issue https://github.com/cypress-io/cypress/issues/2777 for more information

    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();

    cy.get('a[href="/newApartment"]').click();
    cy.get("h1").contains("Create New Apartment");
    fillOutApartmentForm(newApartment);
    cy.get("input[type=submit]").click();

    cy.get('a[href="/newOccupant"]').click();
    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(occupantName);
    cy.get("input[name=employeeId]").type(occupantEmployeeID);
    cy.get("select[name=gender]").select(gender);
    cy.get("textarea[name=remarks]").type("BAD REMARKS");
    cy.get("select[name=homeOffice]").select("Australia, Melbourne");
    cy.get("select[name=status]").select(status);
    cy.get("input[type=submit]").click();

    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(occupantName);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type("2019-08-01");
    const assignOccupantCheckoutDate = checkoutDate.format("YYYY-MM-DD");
    cy.get("input[id=checkOutDate]").type(assignOccupantCheckoutDate);
    cy.get("input[type=submit]").click();
    cy.get("button.modalCloseButton").click();
  });

  it("should be able to cancel occupant stay deletion", () => {
    cy.get('a[href="/apartments"]').click();
    cy.get("input[type=text]").type(apartmentName);
    cy.contains(apartmentName).click();
    cy.get('button[id="isConfirmationModalOpen"]').click();
    cy.get("button")
      .contains("Cancel")
      .click();
    cy.contains(apartmentName);
  });

  it("should be able to remove an occupant's stay from an apartment", () => {
    cy.visit(`${BASE_URL}`);
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();

    cy.get('a[href="/apartments"]').click();
    cy.get("input[type=text]").type(apartmentName);
    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("X")
      .click();

    cy.get("button")
      .contains("Delete")
      .click();
    cy.contains(occupantName).should("not.exist");
    cy.contains("No occupants yet!");
  });
});
