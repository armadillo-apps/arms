import faker from "faker";

xdescribe("Occupants", () => {
  const baseUrl = Cypress.env("baseUrl");

  //Placeholder for OccupantsAssign.js cypress tests.
  it("should create a new occupant and show occupant profile", () => {
    const name = faker.name.firstName();
    const employeeId = faker.random.uuid();

    cy.visit(`${baseUrl}/newOccupant`);
    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(name);
    cy.get("input[name=employeeId]").type(employeeId);
    cy.get("input[name=remarks]").type("testing");
    cy.get("input[type=submit]").click();
    cy.get("a")
      .contains("OCCUPANTS")
      .click();
    cy.get("td")
      .contains(employeeId)
      .click();
    cy.get("h1").contains(name);
    cy.get("h2").contains("Employee ID");
    cy.get("p").contains(employeeId);
  });
});
