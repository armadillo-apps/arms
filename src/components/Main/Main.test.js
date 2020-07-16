import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Main from "./Main";
import * as UserContext from "../../context/UserContext";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

describe("Main", () => {
  beforeEach(() => {
    const loggedInState = {
      loading: false,
      error: false,
      isAuthenticated: true,
      role: "guest"
    };

    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      state: loggedInState,
      dispatch: jest.fn()
    }));
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/"]}>
          <Main />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show error message when landing on a bad page", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/badRoute"]}>
        <Main />
      </MemoryRouter>
    );

    expect(getByText("Path does not exist!")).toBeInTheDocument();
  });
});
