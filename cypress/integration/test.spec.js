describe("Arms", function() {
  const baseUrl = Cypress.env("baseUrl");

  it("should be able to create a new apartment", () => {
    cy.visit(`${baseUrl}/newApartment`);
    cy.contains("Create New Apartment");
    cy.get("input[name=Name]").type("Jon Snow");
    cy.get("input[name=Address]").type("Block 123 Woodlands Drive 22");
    cy.get("input[name=Bedrooms]").type("2");
    cy.get("input[name=Capacity]").type("2");
    cy.get("input[name=Rent]").type("5000");
    cy.get("input[name=LeaseStart]").type("2019-12-22");
    cy.get("input[name=LeaseEnd]").type("2019-12-25");
    cy.get("input[name=LandLordName]").type("Billy");
    cy.get("input[name=LandLordAccount]").type("123123213123");
    cy.get("input[name=LandLordMobile]").type("93939393");
    cy.get("input[name=LandLordEmail]").type("jon@gmail.com");
    cy.get("input[type=Submit]").click();
  });
});
