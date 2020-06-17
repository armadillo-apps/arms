/* eslint-disable jest/expect-expect */
describe("Login", () => {
  beforeEach(() => {
    cy.server();
    cy.route("/**").as("GetRequest");
    cy.logout();
    cy.visitHome();
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
  });

  it("should login user when correct email and password is entered", () => {
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();
    cy.wait("@GetRequest");

    cy.contains(/logout/i);
  });

  it("should display error message when password is wrong", () => {
    cy.get("input[name=password]").type("WRONG_PASSWORD");
    cy.get("input[type=submit]").click();

    cy.contains("Invalid email or password");
  });
});

describe("Logout", () => {
  it("should log user out and redirect them to login page", () => {
    cy.loginAdmin();
    cy.logout();
    cy.contains("LOGIN");
  });
});