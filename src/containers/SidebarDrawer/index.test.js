import React from "react";
import { render } from "@testing-library/react";
import { mockUserContext } from "../../../test/utils/mockUserContext";
import { PUBLIC_MENU } from "./constants";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import SidebarDrawer from "./index";

describe("Sidebar", () => {
  describe("Public", () => {
    beforeEach(() => {
      const guestUser = { role: "guest" };
      mockUserContext(guestUser);
    });

    it("should render all public menu links", () => {
      const menuAltTexts = PUBLIC_MENU.map(item => item.imgAlt);

      const { getByAltText } = render(
        <Router>
          <SidebarDrawer />
        </Router>
      );

      menuAltTexts.forEach(item => {
        expect(getByAltText(item)).toBeInTheDocument();
      });
    });

    it("should render logout link", () => {
      const { getByAltText } = render(
        <Router>
          <SidebarDrawer />
        </Router>
      );

      expect(getByAltText(/logout/)).toBeInTheDocument();
    });
  });

  describe("Admin only", () => {
    it("should render user management link", () => {
      const adminUser = { role: "admin" };
      mockUserContext(adminUser);
      const { getByAltText } = render(
        <Router>
          <SidebarDrawer />
        </Router>
      );

      expect(getByAltText(/user management/)).toBeInTheDocument();
    });
  });
});
