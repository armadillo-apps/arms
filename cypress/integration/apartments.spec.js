/* eslint-disable jest/expect-expect */
import faker from "faker";
import { sgdFormatter, thbFormatter } from "../../src/utils/formatMoney";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("Apartments, Occupant, and ApartmentAssign", () => {
  before(() => {
    cy.visit(`${baseUrl}`);
    // Visiting baseUrl prevents request from being called twice.
    // visit issue https://github.com/cypress-io/cypress/issues/2777 for more information
  });

  beforeEach(() => {
    cy.visit(`${baseUrl}`);
    cy.get("input[name=email]").type(`${Cypress.env("testAdminUser")}`);
    cy.get("input[name=password]").type(`${Cypress.env("testAdminPassword")}`);
    cy.get("input[type=submit]").click();
  });

  const baseUrl = Cypress.env("baseUrl");

  const apartmentName = faker.company.companyName();
  const apartmentName2 = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";
  const monthlyRentSgdFormatted = sgdFormatter.format(monthlyRent);
  const monthlyRentThbFormatted = thbFormatter.format(monthlyRent);

  const invalidNewApartment = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2019-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: -1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  const invalidNewApartment2 = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2019-05-01",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

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

  const newApartment2 = {
    apartmentName: apartmentName2,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2020-07-10",
    monthlyRent,
    currency: "THB",
    capacity: 1,
    bedrooms: 1,
    country: "Thailand",
    status: "Active"
  };

  const newApartmentForSearchbarTest = {
    apartmentName: "Parc Sophia",
    address: "123 Parc Lane",
    landlordName,
    accountNumber,
    leaseStart: "2018-07-01",
    leaseEnd: "2021-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  describe("Create, edit, and view Apartment", () => {
    it("should be unable to create a new apartment with -ve inputs", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment);

      cy.get("input[type=submit]").click();
      cy.get("input[name=Capacity]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it("should be unable to create a new apartment with lease end before lease start date", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment2);

      cy.get("input[type=submit]").click();
      cy.get("input[name=LeaseEnd]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it("should create a new apartment in Singapore and show apartment profile", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment);

      cy.get("input[type=submit]").click();

      cy.get("input[type=text]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName);

      const vacancy = 1;
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", vacancy);

      const status = "Active";
      cy.get("td").contains(status);

      cy.get("td")
        .contains(apartmentName)
        .click();
      cy.get("h1").contains(apartmentName);

      cy.get("div")
        .should("have.class", "address")
        .contains(address);
      cy.get("div")
        .should("have.class", "country")
        .contains("Singapore");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentSgdFormatted);
      cy.get("span").contains(/Active/i);
    });

    it("should create a new apartment in Thailand and show apartment profile", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment2);

      cy.get("input[type=submit]").click();

      cy.get("input[type=text]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName2);

      const vacancy = 1;
      cy.get("tbody tr")
        .contains("tr", apartmentName2)
        .contains("td", vacancy);

      const status = "Active";
      cy.get("td").contains(status);

      cy.get("td")
        .contains(apartmentName2)
        .click();
      cy.get("h1").contains(apartmentName2);

      cy.get("div")
        .should("have.class", "address")
        .contains(address);
      cy.get("div")
        .should("have.class", "country")
        .contains("Thailand");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentThbFormatted);
      cy.get("span").contains(/Active/i);
    });

    it("should be able to filter apartments using searchbar", () => {
      cy.get('a[href="/newApartment"]').click();

      fillOutApartmentForm(newApartmentForSearchbarTest);
      cy.get("input[type=submit]").click();

      cy.get('a[href="/apartments"]').click();

      cy.get("input")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(newApartmentForSearchbarTest.apartmentName);
      cy.contains(apartmentName).should("not.exist");
      cy.contains(newApartmentForSearchbarTest.apartmentName);
    });
  });

  // should this be tested in unit test?
  // describe("Change apartment status", () => {
  //   it("should show an error message if status of apartment with an occupant is changed to inactive", () => {
  //     cy.get('a[href="/apartments"]').click();
  //     cy.get("input[type=text]").type(apartmentName);
  //     cy.contains(apartmentName).click();

  //     cy.get("button")
  //       .contains("Edit")
  //       .click();

  //     cy.get("select[name=status]").select("Inactive");
  //     cy.contains(
  //       "Unable to change to inactive when there are current or future occupants"
  //     );
  //   });
  // });

  describe("Edit apartment details", () => {
    it("should be able to edit apartment status to inactive", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("Edit")
        .click();

      cy.get("select[id=status]").select("Inactive");
      cy.get("input[class=editApartmentForm__updateButton]").click();
      cy.get("button[class=editApartmentForm__closeButton]").click();

      cy.get('a[href="/apartments"]').click();

      const status = "Inactive";
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", status);
    });

    it("should be able to edit apartment details", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("Edit")
        .click();
      cy.get("form[class=editApartmentFormContainer]").should("exist");
      cy.get("input[class=editApartmentForm__cancelButton]").scrollIntoView();
      cy.get("input[class=editApartmentForm__cancelButton]").click();
      cy.get("form[class=editApartmentFormContainer]").should("not.exist");
      cy.get("button")
        .contains("Edit")
        .click();
      cy.get("input[id=name]")
        .clear()
        .type("The Beacon");
      cy.get("input[id=address]")
        .clear()
        .type("Fake street 11");
      cy.get("input[id=bedrooms]")
        .clear()
        .type("10");
      cy.get("input[id=capacity]")
        .clear()
        .type("10");
      cy.get("select[id=country]").select("Thailand");
      cy.get("select[id=status]").select("Inactive");
      cy.get("input[id=leaseStart]")
        .clear()
        .type("2020-11-12");
      cy.get("input[id=leaseEnd]")
        .clear()
        .type("2020-12-12");
      cy.get("input[id=monthlyRent]")
        .clear()
        .type("8000");
      cy.get("select[id=currency]").select("THB");
      cy.get("input[id=landlordName]")
        .clear()
        .type("Tony Stark");
      cy.get("input[id=landlordAccountNumber]")
        .clear()
        .type("12345");
      cy.get("textarea[id=remarks]")
        .clear()
        .type("Awesome");
      cy.get("input[class=editApartmentForm__updateButton]").click();
      cy.contains("Successfully updated apartment: The Beacon");
      cy.get("button[class=editApartmentForm__closeButton]").click();
      cy.get("form[class=editApartmentFormContainer]").should("not.exist");
    });
  });

  describe("Maintain user session after log in", () => {
    it("should remain logged in on the same page after refresh", () => {
      cy.get("h1").contains("Apartments");

      cy.get('a[href="/occupants"]').click();
      cy.reload();
      cy.get("h1").contains("Occupants");

      cy.get('a[href="/newApartment"]').click();
      cy.reload();
      cy.get("h1").contains("Create New Apartment");

      cy.get('a[href="/newOccupant"]').click();
      cy.reload();
      cy.get("h1").contains("Create New Occupant");

      cy.get('a[href="/apartments"]').click();
      cy.reload();
      cy.get("h1").contains("Apartments");
    });
  });

  describe("Successfully logout", () => {
    it("should allow logout for users", () => {
      cy.get('a[href="/"]').click();

      cy.get("h2").contains("User Login");
    });
  });
});
