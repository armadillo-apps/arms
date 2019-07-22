describe("ARMS website Sprint1 tests", () => {
  const baseUrl = Cypress.env("baseUrl");

  it("should be able to see the sidebars correctly", () => {
    cy.visit(`${baseUrl}`);
    cy.contains("APARTMENT");
    cy.contains("OCCUPANTS");
    cy.contains("NEW APARTMENT");
    cy.contains("NEW OCCUPANT");
  });

  it.skip("should be able to visit the occupants page ", () => {
    cy.visit(`${baseUrl}`);
    cy.contains("OCCUPANTS").click();
    cy.url().should("include", "/occupants");
    cy.contains("Name");
    cy.contains("Sir Williamson Von Barkshire");
  });

  it.skip("should be able to visit the apartments page", () => {
    cy.visit(`${baseUrl}`);
    cy.contains("APARTMENT").click();
    cy.contains("Apartment Name");
    cy.contains("Fancy Penthouse");
    cy.contains("Vacancy");
    cy.contains("Lease Start");
    cy.contains("Lease End");
    cy.contains("Apartment Name");
    cy.contains("Rental Per Month");
    cy.contains("Fancy Penthouse");
    cy.contains("5000");
    cy.contains("2011-01-01");
    cy.contains("2012-02-02");
  });

  it("should be able to input Name in the new occupants form", () => {
    cy.visit(`${baseUrl}`);
    cy.contains("NEW OCCUPANT").click();
    cy.url().should("include", "/newOccupant");
    cy.get("input[name=name]")
      .type("George")
      .should("have.value", "George");
  });

  it("should be able to create a new apartment", () => {
    cy.visit(`${baseUrl}/newApartment`);
    cy.contains("Create New Apartment");
    cy.get("input[name=Name]").type("Jon Fire");
    cy.get("input[name=Address]").type("Block 456 Woodlands Drive 22");
    cy.get("input[name=Bedrooms]").type("3");
    cy.get("input[name=Capacity]").type("3");
    cy.get("input[name=Rent]").type("4500");
    cy.get("input[name=LeaseStart]").type("2014-12-22");
    cy.get("input[name=LeaseEnd]").type("2014-12-25");
    cy.get("input[name=LandLordName]").type("Jilly");
    cy.get("input[name=LandLordAccount]").type("456456456");
    cy.get("input[name=LandLordMobile]").type("84848484");
    cy.get("input[name=LandLordEmail]").type("jon@hotmail.com");
    cy.get("button").click();
  });

  it("should be able to see the newly created apartment", async () => {
    await cy.visit(`${baseUrl}`);
    cy.contains("Jon Fire");
    cy.contains("4500");
  });

  it("should be able to create a new occupant", () => {
    cy.visit(`${baseUrl}/newOccupant`);
    cy.contains("Create New Occupant");
    cy.get("input[name=name]").type("Blake Bolt");
    cy.get("input[name=employeeId]").type("g00001g");
    cy.get("input[name=remarks]").type("None");
    cy.get("button").click();
  });

  it("should be able to see the newly created occupant", async () => {
    await cy.visit(`${baseUrl}/occupants`);
    cy.contains("Blake Bolt");
    cy.contains("g00001g");
  });

  it.skip("should be able to open an apartment profile", () => {
    cy.visit(`${baseUrl}`);
    cy.get("table")
      .contains("td", "Fancy Penthouse")
      .then(elem => {
        elem.click();
      });
    cy.url().should("include", "/apartments/5d2eeefe50941f0017c4877a");
    cy.contains("123 Street");
    cy.get(".bedrooms > p").contains("1");
    cy.get(".capacity > p").contains("1");
    cy.get("table").contains("td", "5000");
  });

  it.skip("should be able to open an occupant profile", () => {
    cy.visit(`${baseUrl}/occupants`);
    cy.get("table")
      .contains("td", "Williamson")
      .click();
    cy.url().should("include", "/occupants/a00001a");
    cy.get("p.fields__remarks").contains(
      "He has a cat who likes to scratch the curtains"
    );
  });
});
