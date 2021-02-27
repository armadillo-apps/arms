// Access token needs to be set manually  as Cypress currently does not provide localstorage persistance
export const login = (email, password) => {
  cy.request("POST", `${Cypress.env("BACKEND_URL")}/users/login`, {
    email,
    password
  })
    .its("body")
    .then(body => {
      window.localStorage.setItem("token", body.accessToken);
    });
};
