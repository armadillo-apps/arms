/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { sgdFormatter } from "../../src/utils/formatMoney";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("Apartment Assignment", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  const apartmentName = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";
  const monthlyRentSgdFormatted = sgdFormatter.format(monthlyRent);

  const occupantName = faker.name.firstName();
  const occupantEmployeeID = faker.random.uuid();
  const status = "allocated";
  const gender = "female";
  const checkoutDate = moment(new Date()).add(1, "days");
  const monthlyRentCheckoutDate = checkoutDate.format("D MMM YY");

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
  });

  it("should be able to assign an occupant to apartment", () => {
    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(occupantName);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type("2018-05-01");
    cy.get("input[id=checkOutDate]").type("2000-10-01");
    cy.get("input[type=submit]").click();
    cy.get("input[id=checkOutDate]").should("have.focus");
    cy.contains(
      `Successfully assigned ${occupantName} to ${apartmentName}`
    ).should("not.exist");

    const assignOccupantCheckoutDate = checkoutDate.format("YYYY-MM-DD");
    cy.get("input[id=checkOutDate]").type(assignOccupantCheckoutDate);
    cy.get("input[type=submit]").click();
    cy.contains(`Successfully assigned ${occupantName} to ${apartmentName}`);
    cy.get("button.modalCloseButton").click();

    cy.get('a[href="/apartments"]').click();

    const vacancy = 0;
    cy.get("tbody tr")
      .contains("tr", apartmentName)
      .contains("td", vacancy)
      .should("have.class", "inverted");

    cy.get('a[href="/occupants"]').click();

    cy.contains(occupantName).click();
    cy.contains(apartmentName);
    cy.contains("1 May 18");
    cy.contains(monthlyRentCheckoutDate);
    cy.contains(monthlyRentSgdFormatted);
    cy.get("tbody tr").should("have.length", 1);
  });

  it("should be able to cancel the assign operation", () => {
    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(occupantName);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type("2016-05-01");
    cy.get("input[id=checkOutDate]").type("2016-10-01");
    cy.get("button")
      .contains("Cancel")
      .click();
    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Search occupants here..."
    );
    cy.get("button[class=modalCloseButton]")
      .contains("X")
      .click();
    cy.contains("Occupant");
  });

  it("should show an error message if status of apartment with an occupant is changed to inactive", () => {
    cy.visit(`${BASE_URL}`);
    // Visiting BASE_URL prevents request from being called twice.
    // visit issue https://github.com/cypress-io/cypress/issues/2777 for more information
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();

    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();

    cy.get("button")
      .contains("Edit")
      .click();

    cy.get("select[id=status]").select("Inactive");
    cy.contains(
      "Unable to change to inactive when there are current or future occupants"
    );

    cy.get("input[class=editApartmentForm__cancelButton]").scrollIntoView();
    cy.get("input[class=editApartmentForm__cancelButton]").click();
  });
});
