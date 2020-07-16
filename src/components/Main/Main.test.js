import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { render } from "@testing-library/react";
import Main from "./Main";
import * as UserContext from "../../context/UserContext";
import routes from "../../router/RouterPaths";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useFetch } from "../../hooks/useFetch";

jest.mock("../../hooks/useFetch");
jest.mock("react-toast-notifications", () => ({
  useToasts: () => jest.fn()
}));

function renderMain(user, history) {
  jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
    state: user,
    dispatch: jest.fn()
  }));

  const utils = render(
    <Router history={history}>
      <Main />
    </Router>
  );
  return { ...utils };
}

describe("Main", () => {
  const history = createBrowserHistory();

  const guestUser = {
    isAuthenticated: true,
    role: "guest"
  };

  const managerUser = {
    isAuthenticated: true,
    role: "manager"
  };

  const adminUser = {
    isAuthenticated: true,
    role: "admin"
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useFetch.mockReturnValue({ data: {} });
  });

  it("renders correctly", () => {
    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      state: guestUser,
      dispatch: jest.fn()
    }));

    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/"]}>
          <Main />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Guest User Navigation", () => {
    it("should redirect authenticated user to apartments page", () => {
      const apartmentUrl = routes.APARTMENTS;
      history.push(apartmentUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(apartmentUrl);
      expect(getByText(/apartment name/i)).toBeInTheDocument();
    });

    it("should redirect authenticated user to occupants page", () => {
      const occupantsUrl = routes.OCCUPANTS;
      history.push(occupantsUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(occupantsUrl);
      expect(getByText(/employee id/i)).toBeInTheDocument();
    });

    it("should redirect authenticated user to change password page", () => {
      const changePasswordUrl = routes.CHANGE_PASSWORD;
      history.push(changePasswordUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(changePasswordUrl);
      expect(getByText(/existing password/i)).toBeInTheDocument();
    });

    it("should not redirect guest user to new apartment page", () => {
      const newApartmentUrl = routes.NEW_APARTMENT;
      history.push(newApartmentUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(newApartmentUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });

    it("should not redirect guest user to new occupant page", () => {
      const newOccupantUrl = routes.NEW_OCCUPANT;
      history.push(newOccupantUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(newOccupantUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });

    it("should not redirect guest to new user page", async () => {
      const newUserUrl = routes.NEW_USER;
      history.push(newUserUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(newUserUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });

    it("should not redirect guest to user management page", async () => {
      const userUrl = routes.USERS;
      history.push(userUrl);

      const { getByText } = renderMain(guestUser, history);

      expect(history.location.pathname).toBe(userUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });
  });

  describe("Manager Navigation", () => {
    it("should redirect manager to new apartment page", () => {
      const newApartmentUrl = routes.NEW_APARTMENT;
      history.push(newApartmentUrl);

      const { getByText } = renderMain(managerUser, history);

      expect(history.location.pathname).toBe(newApartmentUrl);
      expect(getByText(/create new apartment/i)).toBeInTheDocument();
    });

    it("should redirect manager to new occupant page", async () => {
      const newOccupantUrl = routes.NEW_OCCUPANT;
      history.push(newOccupantUrl);

      const { getByText } = renderMain(managerUser, history);

      expect(history.location.pathname).toBe(newOccupantUrl);
      expect(getByText(/create new occupant/i)).toBeInTheDocument();
    });

    it("should not redirect manager to new user page", async () => {
      const newUserUrl = routes.NEW_USER;
      history.push(newUserUrl);

      const { getByText } = renderMain(managerUser, history);

      expect(history.location.pathname).toBe(newUserUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });

    it("should not redirect manager to user management page", async () => {
      const userUrl = routes.USERS;
      history.push(userUrl);

      const { getByText } = renderMain(managerUser, history);

      expect(history.location.pathname).toBe(userUrl);
      expect(getByText(/path does not exist!/i)).toBeInTheDocument();
    });
  });

  describe("Admin Navigation", () => {
    it("should redirect admin to new apartment page", () => {
      const newApartmentUrl = routes.NEW_APARTMENT;
      history.push(newApartmentUrl);

      const { getByText } = renderMain(adminUser, history);

      expect(history.location.pathname).toBe(newApartmentUrl);
      expect(getByText(/create new apartment/i)).toBeInTheDocument();
    });

    it("should redirect admin to new occupant page", async () => {
      const newOccupantUrl = routes.NEW_OCCUPANT;
      history.push(newOccupantUrl);

      const { getByText } = renderMain(adminUser, history);

      expect(history.location.pathname).toBe(newOccupantUrl);
      expect(getByText(/create new occupant/i)).toBeInTheDocument();
    });

    it("should redirect admin to new user page", async () => {
      const newUserUrl = routes.NEW_USER;
      history.push(newUserUrl);

      const { getByText } = renderMain(adminUser, history);

      expect(history.location.pathname).toBe(newUserUrl);
      expect(getByText(/create new user/i)).toBeInTheDocument();
    });

    it("should redirect admin to user management page", async () => {
      const userUrl = routes.USERS;
      history.push(userUrl);

      const { getByText } = renderMain(adminUser, history);

      expect(history.location.pathname).toBe(userUrl);
      expect(getByText(/role/i)).toBeInTheDocument();
    });
  });

  it("should show error message when landing on a bad page", () => {
    const history = createBrowserHistory();
    const badRoute = "/badRoute";
    history.push(badRoute);

    const { getByText } = renderMain(guestUser, history);

    expect(history.location.pathname).toBe(badRoute);
    expect(getByText("Path does not exist!")).toBeInTheDocument();
  });
});
