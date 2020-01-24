/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("removeAssignApartment", () => {
  const occupantName = faker.name.firstName();
  const occupantEmployeeId = faker.random.uuid();
  const occupantStatus = "allocated";
  const occupantGender = "female";
  const apartmentName = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";

  const checkinDate = moment(new Date()).add(1, "days");
  const checkoutDate = moment(new Date()).add(90, "days");

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
    cy.visit(Cypress.env("baseUrl"));
    cy.get("input[name=email]").type(`${Cypress.env("testAdminUser")}`);
    cy.get("input[name=password]").type(`${Cypress.env("testAdminPassword")}`);
    cy.get("input[type=submit]").click();

    cy.get('a[href="/newApartment"]').click();
    cy.get("h1").contains("Create New Apartment");
    fillOutApartmentForm(newApartment);
    cy.get("input[type=submit]").click();

    cy.get('a[href="/newOccupant"]').click();

    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(occupantName);
    cy.get("input[name=employeeId]").type(occupantEmployeeId);
    cy.get("select[name=gender]").select(occupantGender);
    cy.get("select[name=homeOffice]").select("Australia, Melbourne");
    cy.get("select[name=status]").select(occupantStatus);
    cy.get("textarea[name=remarks]").type("BAD REMARKS");
    cy.get("input[type=submit]").click();

    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(occupantName);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type(checkinDate.format("YYYY-MM-DD"));
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
  });

  it("should be able to remove occupant assignment when confirmed", () => {
    cy.get('a[href="/apartments"]').click();

    cy.get("input[type=text]").type(apartmentName);
    cy.contains(apartmentName).click();
    cy.get('button[id="isConfirmationModalOpen"]').click();
    cy.get("button")
      .contains("Cancel")
      .click();
    cy.contains(occupantName);

    cy.get('button[id="isConfirmationModalOpen"]').click();
    cy.get("button")
      .contains("Delete")
      .click();
    cy.contains(occupantName).should("not.exist");
    cy.contains("No occupants yet!");
  });
});
