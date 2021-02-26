import React from "react";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { mockUserContext } from "../../../test/utils/mockUserContext";
import { sidebarLinks } from "./constants";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./index";

import * as data from "../../api/api";

const mockLogout = jest.spyOn(data, "logoutUser");

describe("Sidebar", () => {
  describe("Public", () => {
    beforeEach(() => {
      const guestUser = { role: "guest" };
      mockUserContext(guestUser);
    });

    it("should toggle collapse on hover", () => {
      const { queryByText, getByAltText, getByText } = render(
        <Router>
          <Sidebar />
        </Router>
      );

      expect(queryByText(/change password/i)).not.toBeInTheDocument();

      fireEvent.mouseOver(getByAltText(/change password/i));
      fireEvent.mouseEnter(getByAltText(/change password/i));
      expect(getByText(/change password/i)).toBeInTheDocument();

      fireEvent.mouseOver(getByAltText(/change password/i));
      fireEvent.mouseLeave(getByAltText(/change password/i));
      expect(queryByText(/change password/i)).not.toBeInTheDocument();
    });

    it("should render all sidebar links", () => {
      const sidebarLinksAltTexts = sidebarLinks.map(item => item.imgAlt);

      const { getByAltText } = render(
        <Router>
          <Sidebar />
        </Router>
      );

      sidebarLinksAltTexts.forEach(item => {
        expect(getByAltText(item)).toBeInTheDocument();
      });
    });

    it("should render logout link and logout user when clicked", () => {
      Object.defineProperty(window, "localStorage", {
        value: {
          removeItem: jest.fn(() => null)
        },
        writable: true
      });
      mockLogout.mockReturnValue("");

      const { getByAltText } = render(
        <Router>
          <Sidebar />
        </Router>
      );

      const logoutLink = getByAltText(/logout/i);
      expect(logoutLink).toBeInTheDocument();
      fireEvent.click(logoutLink);
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(window.localStorage.removeItem).toBeCalledTimes(1);
      expect(window.localStorage.removeItem).toBeCalledWith("token");
    });
  });

  describe("Admin only", () => {
    it("should render collapsible user management link", () => {
      const adminUser = { role: "admin" };
      mockUserContext(adminUser);
      const { getByAltText, queryByText, getByText } = render(
        <Router>
          <Sidebar />
        </Router>
      );

      expect(getByAltText(/user management/i)).toBeInTheDocument();

      expect(queryByText(/user management/i)).not.toBeInTheDocument();

      fireEvent.mouseOver(getByAltText(/user management/i));
      fireEvent.mouseEnter(getByAltText(/user management/i));
      expect(getByText(/user management/i)).toBeInTheDocument();

      fireEvent.mouseOver(getByAltText(/user management/i));
      fireEvent.mouseLeave(getByAltText(/user management/i));
      expect(queryByText(/user management/i)).not.toBeInTheDocument();
    });
  });
});
