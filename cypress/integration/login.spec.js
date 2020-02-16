/* eslint-disable jest/expect-expect */
describe("Login page", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visitHome();
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
  });

  it("should login user when correct email and password is entered", () => {
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();
    cy.waitForServerRequest();

    cy.getCookie("token").should("exist");
    cy.contains(/logout/i);
  });

  it("should display error message when password is wrong", () => {
    cy.get("input[name=password]").type("WRONG_PASSWORD");
    cy.get("input[type=submit]").click();

    cy.getCookie("token").should("not.exist");
    cy.contains("Invalid email or password");
  });
});
