/* eslint-disable jest/expect-expect */
describe("Sidebar", () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visitHome();
    cy.server();
    cy.route("/**").as("GetRequest");
  });

  afterEach(() => {
    cy.logout();
  });

  it("should visit apartments page", () => {
    cy.get("[data-testid=sideBar-apartments]").click();
    cy.url().should("include", "/apartments");
    cy.get("h1").contains(/apartments/i);
  });

  it("should visit occupants page", () => {
    cy.get("[data-testid=sideBar-occupants]").click();
    cy.url().should("include", "/occupants");
    cy.get("h1").contains(/occupants/i);
  });

  it("should visit change password page", () => {
    cy.get("[data-testid=sideBar-changepassword]").click();
    cy.url().should("include", "/changePassword");
    cy.get("h1").contains(/change password/i);
  });

  it("should visit user management page", () => {
    cy.get("[data-testid=sideBar-users]").click();
    cy.url().should("include", "/users");
    cy.get("h1").contains(/user management/i);
  });
});
