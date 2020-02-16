export const login = (email, password) => {
  cy.request("POST", `${Cypress.env("BACKEND_URL")}/users/login`, {
    email,
    password
  });
};
