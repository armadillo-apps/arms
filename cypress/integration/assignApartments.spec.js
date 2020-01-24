/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { sgdFormatter } from "../../src/utils/formatMoney";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("assignApartment", () => {
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
  const monthlyRentSgdFormatted = sgdFormatter.format(monthlyRent);
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
  });

  it("should assign occupant to apartment", () => {
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

    // cy.get('a[href="/apartments"]').click();

    // const vacancy = 0;
    // cy.get("tbody tr")
    //   .contains("tr", apartmentName)
    //   .contains("td", vacancy)
    //   .should("have.class", "inverted");

    cy.get('a[href="/occupants"]').click();

    cy.contains(occupantName).click();
    cy.contains(apartmentName);
    cy.contains(checkinDate.format("D MMM YY"));
    cy.contains(monthlyRentCheckoutDate);
    cy.contains(monthlyRentSgdFormatted);
    cy.get("tbody tr").should("have.length", 1);
  });

  it("should be able to cancel assignment", () => {
    cy.get('a[href="/apartments"]').click();

    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(occupantName);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type(checkinDate.format("YYYY-MM-DD"));
    cy.get("input[id=checkOutDate]").type(checkoutDate.format("YYYY-MM-DD"));
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
    cy.contains("No occupants yet");
  });
});
