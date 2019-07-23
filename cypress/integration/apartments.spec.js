import faker from "faker";

describe("Apartments", () => {
  const baseUrl = Cypress.env("baseUrl");

  xit("should create a new apartment and show apartment profile", () => {
    const apartmentName = faker.company.companyName();
    const landlordName = faker.name.firstName();
    const address = faker.address.streetAddress();
    const accountNumber = faker.finance.account();
    const email = faker.internet.email();
    const mobile = faker.phone.phoneNumber();
    const monthlyRent = faker.random.number();

    cy.visit(`${baseUrl}/newApartment`);
    cy.get("h1").contains("Create New Apartment");
    cy.get("input[name=Name]").type(apartmentName);
    cy.get("input[name=Address]").type(address);
    cy.get("input[name=LandLordName]").type(landlordName);
    cy.get("input[name=LandLordAccount]").type(accountNumber);
    cy.get("input[name=LandLordEmail]").type(email);
    cy.get("input[name=LandLordMobile]").type(mobile);
    cy.get("input[name=LeaseStart]").type("2019-07-01");
    cy.get("input[name=LeaseEnd]").type("2019-07-10");
    cy.get("input[name=Rent]").type(monthlyRent);
    cy.get("input[name=Capacity]").type(1);
    cy.get("input[name=Bedrooms]").type(1);
    cy.get("button").click();
    cy.get("a")
      .contains("APARTMENTS")
      .click();
    cy.get("td")
      .contains(apartmentName)
      .click();
    cy.get("h1").contains(apartmentName);
    cy.get("h2").contains("Address");
    cy.get("p").contains(address);
  });
});
