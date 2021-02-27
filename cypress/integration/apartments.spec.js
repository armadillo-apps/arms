/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { sgdFormatter, thbFormatter } from "../../src/utils/formatMoney";
import { fillOutApartmentForm } from "../actions/apartmentActions";

describe("Apartments, Occupant, and ApartmentAssign", () => {
  before(() => {
    cy.loginAdmin();
    cy.persistSession();
    cy.visitHome();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("token");
    cy.restoreSession();
    cy.intercept("/**").as("GetRequest");
  });

  const apartmentName = faker.company.companyName();
  const apartmentName2 = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();

  const normaliseWhiteSpace = string => {
    return string.replace(String.fromCharCode(160), " ");
  };
  const monthlyRent = 1000;
  const monthlyRentSgdFormatted = normaliseWhiteSpace(
    sgdFormatter.format(monthlyRent)
  );
  const monthlyRentThbFormatted = normaliseWhiteSpace(
    thbFormatter.format(monthlyRent)
  );

  const name = faker.name.firstName();
  const employeeId = faker.random.uuid();

  const modName = faker.name.firstName();
  const modEmployeeId = faker.random.uuid();

  const invalidNewApartment = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2019-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: -1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  const invalidNewApartment2 = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2019-05-01",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  const newApartment = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: moment(new Date()).add(1, "months").format("YYYY-MM-DD"),
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  const newApartment2 = {
    apartmentName: apartmentName2,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2020-07-10",
    monthlyRent,
    currency: "THB",
    capacity: 1,
    bedrooms: 1,
    country: "Thailand",
    status: "Active"
  };

  const newApartmentForSearchbarTest = {
    apartmentName: "Parc Sophia",
    address: "123 Parc Lane",
    landlordName,
    accountNumber,
    leaseStart: "2018-07-01",
    leaseEnd: "2021-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  describe("Create, edit, view, and search Occupant", () => {
    it("should create a new occupant and show occupant profile", () => {
      const status = "allocated";
      const gender = "female";

      cy.get('a[href="/occupants"]').click();
      cy.get("button").contains("+ Add Occupant").click();

      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(modName);
      cy.get("input[name=employeeId]").type(modEmployeeId);
      cy.get("select[name=gender]").select(gender);
      cy.get("textarea[name=remarks]").type("BAD REMARKS");
      cy.get("select[name=homeOffice]").select("Australia, Melbourne");
      cy.get("select[name=status]").select(status);
      cy.get("input[type=submit]").click();
      cy.wait("@GetRequest");
      cy.get("[data-testid=Occupant__searchBar]").type(modName);
      cy.get(".react-toast-notifications__toast__dismiss-icon > path").click();
      cy.get("td").contains(modName).click();
      cy.wait("@GetRequest");
      cy.get("h1").contains(modName);
      cy.get("h2").contains(modEmployeeId);
      cy.get("h2").contains(gender);
      cy.get("h2").contains(/Home Office: Australia, Melbourne/i);
      cy.get("span").contains(status);
    });

    it("should be able to edit the occupant details", () => {
      cy.get('a[href="/occupants"]').click();

      cy.get("td").contains(modEmployeeId).click();
      cy.get("button").contains(/edit/i).click();
      cy.get("input[name=name]").clear().type(name);
      cy.get("input[name=employeeId]").clear().type(employeeId);
      cy.get("select[name=gender]").select("male");
      cy.get("textarea[name=remarks]").clear().type("testing");
      cy.get("select[name=homeOffice]").select("Singapore, Singapore");
      cy.get("select[name=status]").select("Unallocated");
      cy.get("input[type=submit]").click();
      cy.wait("@GetRequest");
      cy.wait("@GetRequest");
      cy.contains(`Successfully updated occupant: ${name}`);
      cy.contains(name);
      cy.get("h2").contains(employeeId);
      cy.get("h2").contains(/Gender: Male/i);
      cy.get("h2").contains(/Home Office: Singapore, Singapore/i);
      cy.get("span").contains(/unallocated/i);

      cy.get('a[href="/occupants"]').click();

      cy.contains(name);
      cy.contains(employeeId);
    });

    it("should be able to filter occupants using searchbar", () => {
      const newOccupantname = "Bob";

      cy.get('a[href="/occupants"]').click();
      cy.get("button").contains("+ Add Occupant").click();

      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(newOccupantname);
      cy.get("select[name=status]").select("Inactive");
      cy.get("input[type=submit]").click();
      cy.get("a")
        .contains(/occupants/i)
        .click();
      cy.get("input")
        .should("have.attr", "placeholder", "Search Occupant")
        .type(newOccupantname);
      cy.contains(name).should("not.exist");
      cy.contains(newOccupantname);
    });
  });

  describe("Create, edit, and view Apartment", () => {
    beforeEach(() => {
      cy.visitHome();
      cy.get("button").contains("+ Add Apartment").click();
    });

    it("should be unable to create a new apartment with -ve inputs", () => {
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment);

      cy.get("input[type=submit]").click();
      cy.get("input[name=Capacity]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it("should be unable to create a new apartment with lease end before lease start date", () => {
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment2);

      cy.get("input[type=submit]").click();
      cy.get("input[name=LeaseEnd]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it.skip("should create a new apartment in Singapore and show apartment profile", () => {
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment);

      cy.get("input[type=submit]").click();

      cy.get("[data-testid=Apartment__searchBar]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName);

      const vacancy = 1;
      cy.get("tbody tr").contains("tr", apartmentName).contains("td", vacancy);

      const status = "active";
      cy.get("td").contains(status);

      cy.get("td").contains(apartmentName).click();
      cy.get("h1").contains(apartmentName);

      cy.get("div").should("have.class", "address").contains(address);
      cy.get("div").should("have.class", "country").contains("Singapore");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentSgdFormatted);
      cy.get("span").contains(/Active/i);
    });

    it.skip("should create a new apartment in Thailand and show apartment profile", () => {
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment2);

      cy.get("input[type=submit]").click();

      cy.get("[data-testid=Apartment__searchBar]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName2);

      const vacancy = 1;
      cy.get("tbody tr").contains("tr", apartmentName2).contains("td", vacancy);

      const status = "active";
      cy.get("td").contains(status);

      cy.get("td").contains(apartmentName2).click();
      cy.get("h1").contains(apartmentName2);

      cy.get("div").should("have.class", "address").contains(address);
      cy.get("div").should("have.class", "country").contains("Thailand");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentThbFormatted);
      cy.get("span").contains(/Active/i);
    });

    it("should be able to filter apartments using searchbar", () => {
      fillOutApartmentForm(newApartmentForSearchbarTest);
      cy.get("input[type=submit]").click();

      cy.get('a[href="/apartments"]').click();

      cy.get("[data-testid=Apartment__searchBar]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(newApartmentForSearchbarTest.apartmentName);
      cy.contains(apartmentName).should("not.exist");
      cy.contains(newApartmentForSearchbarTest.apartmentName);
      cy.get("[data-testid=Apartment__searchBar]")
        .should("have.attr", "placeholder", "Search Apartment")
        .clear();
    });
  });

  describe.skip("Assign occupant to apartment", () => {
    const checkInDate = moment(new Date()).subtract(1, "months");
    const checkoutDate = moment(new Date()).add(1, "days");

    it("should not be able to assign an occupant to apartment if the check-in and out dates not within the lease period", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button").contains("+").click();
      cy.get("input[id=occupantToAssign]").type(name);
      cy.contains("Select").click();
      cy.get("input[id=checkInDate]").type("2000-01-01");
      cy.get("input[id=checkOutDate]").type("2000-10-01");
      cy.get("input[type=submit]").click();
      cy.contains(`Successfully assigned ${name} to ${apartmentName}`).should(
        "not.exist"
      );

      cy.contains(
        "Unable to assign occupant to apartment - No lease found for the selected dates"
      );
      cy.get("button.modalCloseButton").click();
    });

    it("be able to assign an occupant to apartment", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button").contains("+").click();
      cy.get("input[id=occupantToAssign]").type(name);
      cy.contains("Select").click();
      cy.get("input[id=checkInDate]").type(checkInDate.format("YYYY-MM-DD"));
      cy.get("input[id=checkOutDate]").type("2000-10-01");
      cy.get("input[type=submit]").click();
      cy.get("input[id=checkOutDate]").should("have.focus");
      cy.contains(`Successfully assigned ${name} to ${apartmentName}`).should(
        "not.exist"
      );

      const assignOccupantCheckoutDate = checkoutDate.format("YYYY-MM-DD");
      cy.get("input[id=checkOutDate]").type(assignOccupantCheckoutDate);
      cy.get("input[type=submit]").click();
      cy.contains(`Successfully assigned ${name} to ${apartmentName}`);
      cy.get("button.modalCloseButton").click();

      cy.get('a[href="/apartments"]').click();

      const vacancy = 0;
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", vacancy)
        .invoke("attr", "class")
        .should("contain", "inverted");
    });

    it("be able to cancel the assign operation", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button").contains("+").click();
      cy.get("input[id=occupantToAssign]").type(name);
      cy.contains("Select").click();
      cy.get("input[id=checkInDate]").type("2016-05-01");
      cy.get("input[id=checkOutDate]").type("2016-10-01");
      cy.get("button").contains("Cancel").click();
      cy.get("input").should(
        "have.attr",
        "placeholder",
        "Search occupants here..."
      );
      cy.get("button[class=modalCloseButton]").contains("X").click();
      cy.contains("Occupant");
    });

    const monthlyRentCheckoutDate = checkoutDate.format("D MMM YY");
    it("should be able to view apartment name, check-in & check-out dates and monthly rent on occupant profile", () => {
      cy.get('a[href="/occupants"]').click();

      cy.contains(name).click();
      cy.contains(apartmentName);
      cy.contains(checkInDate.format("D MMM YY"));
      cy.contains(monthlyRentCheckoutDate);
      cy.contains(monthlyRentSgdFormatted);
      cy.get("tbody tr").should("have.length", 1);
    });
  });

  describe.skip("Change apartment status", () => {
    it("should show an error message if status of apartment with an occupant is changed to inactive", () => {
      cy.get('a[href="/apartments"]').click();
      cy.get("[data-testid=Apartment__searchBar]").type(apartmentName);
      cy.contains(apartmentName).click();

      cy.get("button").contains("Edit").click();

      cy.get("select[name=status]").select("Inactive");
      cy.contains(
        "Unable to change to inactive when there are current or future occupants"
      );

      cy.get("[data-testid=editApartmentForm__cancelButton]").scrollIntoView();
      cy.get("[data-testid=editApartmentForm__cancelButton]").click();
    });
  });

  describe.skip("Remove occupant stay from history", () => {
    it("be able to cancel occupant stay deletion", () => {
      cy.get('a[href="/apartments"]').click();

      cy.get("[data-testid=Apartment__searchBar]").type(apartmentName);
      cy.contains(apartmentName).click();
      cy.get('button[id="isConfirmationModalOpen"]').click();
      cy.get("button").contains("Cancel").click();
      cy.contains(name);
    });

    it("be able to remove an occupant's stay from an apartment", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get('button[id="isConfirmationModalOpen"]').click();
      cy.get("button").contains("Delete").click();
      cy.contains(name).should("not.exist");
      cy.contains("No occupants yet!");
    });
  });

  describe.skip("Edit apartment details", () => {
    it("should be able to edit apartment status to inactive", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button").contains("Edit").click();

      cy.get("select[name=status]").select("inactive");
      cy.get("[data-testid=editApartmentForm__updateButton]").click();
      cy.get("button[class=editApartmentForm__closeButton]").click();

      cy.get('a[href="/apartments"]').click();

      const status = "inactive";
      cy.get("tbody tr").contains("tr", apartmentName).contains("td", status);
    });

    it("should be able to edit apartment details", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button").contains("Edit").click();

      cy.get("[data-testid=editApartmentForm]").should("exist");
      cy.get("[data-testid=editApartmentForm__cancelButton]").scrollIntoView();
      cy.get("[data-testid=editApartmentForm__cancelButton]").click();
      cy.get("[data-testid=editApartmentForm]").should("not.exist");

      cy.get("button").contains("Edit").click();
      cy.get("input[id=name]").clear().type("The Beacon");
      cy.get("input[id=address]").clear().type("Fake street 11");
      cy.get("input[id=bedrooms]").clear().type("10");
      cy.get("input[id=capacity]").clear().type("10");
      cy.get("select[id=country]").select("Thailand");
      cy.get("select[id=status]").select("Inactive");
      cy.get("input[id=leaseStart]").clear().type("2020-11-12");
      cy.get("input[id=leaseEnd]").clear().type("2020-12-12");
      cy.get("input[id=monthlyRent]").clear().type("8000");
      cy.get("select[id=currency]").select("THB");
      cy.get("input[id=landlordName]").clear().type("Tony Stark");
      cy.get("input[id=landlordAccountNumber]").clear().type("12345");
      cy.get("textarea[id=remarks]").clear().type("Awesome");
      cy.get("[data-testid=editApartmentForm__updateButton]").click();
      cy.contains("Successfully updated apartment: The Beacon");
      cy.get("button[class=editApartmentForm__closeButton]").click();
      cy.get("[data-testid=editApartmentForm]").should("not.exist");
    });
  });

  describe("Maintain user session after log in", () => {
    it("should remain logged in on the same page after refresh", () => {
      cy.visitHome();
      cy.get("h1").contains("Apartments");

      cy.visitHome();
      cy.get("button").contains("+ Add Apartment").click();
      cy.reload();
      cy.get("h1").contains("Create New Apartment");

      cy.get('a[href="/occupants"]').click();
      cy.reload();
      cy.get("h1").contains("Occupants");

      cy.get('a[href="/occupants"]').click();
      cy.get("button").contains("+ Add Occupant").click();
      cy.reload();
      cy.get("h1").contains("Create New Occupant");

      cy.get('a[href="/apartments"]').click();
      cy.reload();
      cy.get("h1").contains("Apartments");
    });
  });
});
