/* eslint-disable jest/expect-expect */
import faker from "faker";

describe("Occupant", () => {
  const BASE_URL = Cypress.env("BASE_URL");
  const occupantName = faker.name.firstName();
  const occupantEmployeeID = faker.random.uuid();
  const newEmployeeId = faker.random.uuid();
  const newEmployeeName = faker.name.firstName();

  before(() => {
    cy.visit(`${BASE_URL}`);
    // Visiting BASE_URL prevents request from being called twice.
    // visit issue https://github.com/cypress-io/cypress/issues/2777 for more information
  });

  beforeEach(() => {
    cy.visit(`${BASE_URL}`);

    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();
  });

  afterEach(() => {
    cy.get("a")
      .contains("LOGOUT")
      .click();
  });

  it("should create a new occupant and show occupant profile", () => {
    const status = "allocated";
    const gender = "female";

    cy.get('a[href="/newOccupant"]').click();

    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(occupantName);
    cy.get("input[name=employeeId]").type(occupantEmployeeID);
    cy.get("select[name=gender]").select(gender);
    cy.get("textarea[name=remarks]").type("BAD REMARKS");
    cy.get("select[name=homeOffice]").select("Australia, Melbourne");
    cy.get("select[name=status]").select(status);
    cy.get("input[type=submit]").click();
    cy.get("input[type=text]").type(occupantName);
    cy.get("td")
      .contains(occupantEmployeeID)
      .click();
    cy.get("h1").contains(occupantName);
    cy.get("h2").contains(occupantEmployeeID);
    cy.get("h2").contains(gender);
    cy.get("h2").contains(/Home Office: Australia, Melbourne/i);
    cy.get("span").contains(status);
  });

  it("should be able to edit the occupant details", () => {
    cy.get('a[href="/occupants"]').click();

    cy.get("td")
      .contains(occupantEmployeeID)
      .click();
    cy.get("button")
      .contains(/edit/i)
      .click();
    cy.get("input[name=name]")
      .clear()
      .type(newEmployeeName);
    cy.get("input[name=employeeId]")
      .clear()
      .type(newEmployeeId);
    cy.get("select[name=gender]").select("male");
    cy.get("textarea[name=remarks]")
      .clear()
      .type("testing");
    cy.get("select[name=homeOffice]").select("Singapore, Singapore");
    cy.get("select[name=status]").select("Unallocated");
    cy.get("input[type=submit]").click();
    cy.contains(`Successfully updated occupant: ${name}`);
    cy.get("button")
      .contains(/close/i)
      .click();
    cy.get("h1").contains(newEmployeeName);
    cy.get("h2").contains(newEmployeeId);
    cy.get("h2").contains(/Gender: Male/i);
    cy.get("h2").contains(/Home Office: Singapore, Singapore/i);
    cy.get("span").contains(/unallocated/i);

    cy.get('a[href="/occupants"]').click();

    cy.contains(newEmployeeName);
    cy.contains(newEmployeeId);
  });

  it("should be able to filter occupants using searchbar", () => {
    const newOccupantname = faker.name.firstName();

    cy.get('a[href="/newOccupant"]').click();

    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(newOccupantname);
    cy.get("select[name=status]").select("Inactive");
    cy.get("input[type=submit]").click();
    cy.get("a")
      .contains("OCCUPANTS")
      .click();
    cy.get("input")
      .should("have.attr", "placeholder", "Search Occupant")
      .type(newOccupantname);

    cy.contains(newOccupantname);
  });
});
