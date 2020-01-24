/* eslint-disable jest/expect-expect */
import faker from "faker";

describe("Occupants", () => {
  const occupantName = faker.name.firstName();
  const occupantEmployeeId = faker.random.uuid();
  const occupantStatus = "allocated";
  const occupantGender = "female";

  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("input[name=email]").type(`${Cypress.env("testAdminUser")}`);
    cy.get("input[name=password]").type(`${Cypress.env("testAdminPassword")}`);
    cy.get("input[type=submit]").click();
  });

  it("should create a new occupant", () => {
    cy.get('a[href="/newOccupant"]').click();

    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(occupantName);
    cy.get("input[name=employeeId]").type(occupantEmployeeId);
    cy.get("select[name=gender]").select(occupantGender);
    cy.get("select[name=homeOffice]").select("Australia, Melbourne");
    cy.get("select[name=status]").select(occupantStatus);
    cy.get("textarea[name=remarks]").type("BAD REMARKS");
    cy.get("input[type=submit]").click();

    cy.get("input[type=text]").type(occupantName);
    cy.get("td")
      .contains(occupantEmployeeId)
      .click();
    cy.get("h1").contains(occupantName);
    cy.get("h2").contains(occupantEmployeeId);
    cy.get("h2").contains(occupantGender);
    cy.get("h2").contains(/Home Office: Australia, Melbourne/i);
    cy.get("span").contains(occupantStatus);
  });

  it("should be able to edit the occupant details", () => {
    cy.get('a[href="/occupants"]').click();

    cy.get("td")
      .contains(occupantEmployeeId)
      .click();
    cy.get("button")
      .contains(/edit/i)
      .click();
    cy.get("input[name=name]")
      .clear()
      .type(occupantName);
    cy.get("input[name=employeeId]")
      .clear()
      .type(occupantEmployeeId);
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
    cy.get("h1").contains(occupantName);
    cy.get("h2").contains(occupantEmployeeId);
    cy.get("h2").contains(/Gender: Male/i);
    cy.get("h2").contains(/Home Office: Singapore, Singapore/i);
    cy.get("span").contains(/unallocated/i);

    cy.get('a[href="/occupants"]').click();

    cy.contains(occupantName);
    cy.contains(occupantEmployeeId);
  });

  it("should be able to filter occupants by name using searchbar", () => {
    const newOccupantname = "Bob";

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
    cy.contains(occupantName).should("not.exist");
    cy.contains(newOccupantname);
  });
});
