/* eslint-disable jest/expect-expect */
describe("USER", () => {
  const BASE_URL = Cypress.env("BASE_URL");

  it("should allow logout for users", () => {
    cy.visit(`${BASE_URL}`);
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();
    cy.get("a")
      .contains("LOGOUT")
      .click();

    cy.get("h2").contains("User Login");
  });
});
