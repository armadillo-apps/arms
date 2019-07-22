import faker from "faker";

describe("Occupants", () => {
  const baseUrl = Cypress.env("baseUrl");

  it("should create a new occupant and show occupant profile", () => {
    const name = faker.name.firstName();
    const employeeId = faker.random.uuid();

    cy.visit(`${baseUrl}/newOccupant`);
    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(name);
    cy.get("input[name=employeeId]").type(employeeId);
    cy.get("input[name=remarks]").type("testing");
    cy.get("button").click();
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
