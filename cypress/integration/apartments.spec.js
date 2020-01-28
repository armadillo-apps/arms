/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";
import { sgdFormatter, thbFormatter } from "../../src/utils/formatMoney";

describe("Apartments, Occupant, and ApartmentAssign", () => {
  before(() => {
    cy.visit(`${BASE_URL}`);
    // Visiting BASE_URL prevents request from being called twice.
    // visit issue https://github.com/cypress-io/cypress/issues/2777 for more information
  });

  beforeEach(() => {
    cy.visit(`${BASE_URL}`);
    cy.get("input[name=email]").type(`${Cypress.env("TEST_ADMIN_USER")}`);
    cy.get("input[name=password]").type(
      `${Cypress.env("TEST_ADMIN_PASSWORD")}`
    );
    cy.get("input[type=submit]").click();
  });

  const BASE_URL = Cypress.env("BASE_URL");

  const apartmentName = faker.company.companyName();
  const apartmentName2 = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";
  const monthlyRentSgdFormatted = sgdFormatter.format(monthlyRent);
  const monthlyRentThbFormatted = thbFormatter.format(monthlyRent);

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
    leaseEnd: "2020-07-10",
    monthlyRent,
    currency: "SGD",
    capacity: 1,
    bedrooms: 1,
    country: "Singapore",
    status: "Active"
  };

  const newApartment2 = {
    apartmentName2,
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

  const fillOutApartmentForm = ({
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart,
    leaseEnd,
    monthlyRent,
    currency,
    capacity,
    bedrooms,
    country,
    status
  }) => {
    cy.get("input[name=Name]").type(apartmentName);
    cy.get("input[name=Address]").type(address);
    cy.get("input[name=LandLordName]").type(landlordName);
    cy.get("input[name=LandLordAccount]").type(accountNumber);
    cy.get("input[name=LeaseStart]").type(leaseStart);
    cy.get("input[name=LeaseEnd]").type(leaseEnd);
    cy.get("input[name=Rent]").type(monthlyRent);
    cy.get("select[name=Currency]").select(currency);
    cy.get("input[name=Capacity]").should("not.be.disabled");
    cy.get("input[name=Capacity]")
      .clear()
      .type(capacity);
    cy.get("input[name=Bedrooms]")
      .clear()
      .type(bedrooms);
    cy.get("select[name=status]").select(status);
    cy.get("select[name=Country").select(country);
    cy.get("textarea[name=Remarks]").type("testing!!!");
  };

  const fillOutApartmentForm2 = ({
    apartmentName2,
    address,
    landlordName,
    accountNumber,
    leaseStart,
    leaseEnd,
    monthlyRent,
    currency,
    capacity,
    bedrooms,
    country,
    status
  }) => {
    cy.get("input[name=Name]").type(apartmentName2);
    cy.get("input[name=Address]").type(address);
    cy.get("input[name=LandLordName]").type(landlordName);
    cy.get("input[name=LandLordAccount]").type(accountNumber);
    cy.get("input[name=LeaseStart]").type(leaseStart);
    cy.get("input[name=LeaseEnd]").type(leaseEnd);
    cy.get("input[name=Rent]").type(monthlyRent);
    cy.get("select[name=Currency]").select(currency);
    cy.get("input[name=Capacity]").should("not.be.disabled");
    cy.get("input[name=Capacity]")
      .clear()
      .type(capacity);
    cy.get("input[name=Bedrooms]")
      .clear()
      .type(bedrooms);
    cy.get("select[name=status]").select(status);
    cy.get("select[name=Country").select(country);
    cy.get("textarea[name=Remarks]").type("testing!!!");
  };

  describe("Create, edit, view, and search Occupant", () => {
    it("should create a new occupant and show occupant profile", () => {
      const status = "allocated";
      const gender = "female";

      cy.get('a[href="/newOccupant"]').click();

      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(modName);
      cy.get("input[name=employeeId]").type(modEmployeeId);
      cy.get("select[name=gender]").select(gender);
      cy.get("textarea[name=remarks]").type("BAD REMARKS");
      cy.get("select[name=homeOffice]").select("Australia, Melbourne");
      cy.get("select[name=status]").select(status);
      cy.get("input[type=submit]").click();
      cy.get("input[type=text]").type(modName);
      cy.get("td")
        .contains(modEmployeeId)
        .click();
      cy.get("h1").contains(modName);
      cy.get("h2").contains(modEmployeeId);
      cy.get("h2").contains(gender);
      cy.get("h2").contains(/Home Office: Australia, Melbourne/i);
      cy.get("span").contains(status);
    });

    it("should be able to edit the occupant details", () => {
      cy.get('a[href="/occupants"]').click();

      cy.get("td")
        .contains(modEmployeeId)
        .click();
      cy.get("button")
        .contains(/edit/i)
        .click();
      cy.get("input[name=name]")
        .clear()
        .type(name);
      cy.get("input[name=employeeId]")
        .clear()
        .type(employeeId);
      cy.get("select[name=gender]").select("male");
      cy.get("textarea[name=remarks]")
        .clear()
        .type("testing");
      cy.get("select[name=homeOffice]").select("Singapore, Singapore");
      cy.get("select[name=status]").select("Unallocated");
      cy.get("input[type=submit]").click();
      cy.contains(`Successfully updated occupant: ${name}`);
      cy.get("button")
        .contains(/close/i)
        .click();
      cy.get("h1").contains(name);
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

      cy.get('a[href="/newOccupant"]').click();

      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(newOccupantname);
      cy.get("select[name=status]").select("Inactive");
      cy.get("input[type=submit]").click();
      cy.get("a")
        .contains("OCCUPANTS")
        .click();
      cy.get("input")
        .should("have.attr", "placeholder", "Search Occupant")
        .type(newOccupantname);
      cy.contains(name).should("not.exist");
      cy.contains(newOccupantname);
    });
  });

  describe("Create, edit, and view Apartment", () => {
    it("should be unable to create a new apartment with -ve inputs", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment);

      cy.get("input[type=submit]").click();
      cy.get("input[name=Capacity]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it("should be unable to create a new apartment with lease end before lease start date", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment2);

      cy.get("input[type=submit]").click();
      cy.get("input[name=LeaseEnd]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);

      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).should("not.exist");
    });

    it("should create a new apartment in Singapore and show apartment profile", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment);

      cy.get("input[type=submit]").click();

      cy.get("input[type=text]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName);

      const vacancy = 1;
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", vacancy);

      const status = "Active";
      cy.get("td").contains(status);

      cy.get("td")
        .contains(apartmentName)
        .click();
      cy.get("h1").contains(apartmentName);

      cy.get("div")
        .should("have.class", "address")
        .contains(address);
      cy.get("div")
        .should("have.class", "country")
        .contains("Singapore");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentSgdFormatted);
      cy.get("span").contains(/Active/i);
    });

    it("should create a new apartment in Thailand and show apartment profile", () => {
      cy.get('a[href="/newApartment"]').click();

      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm2(newApartment2);

      cy.get("input[type=submit]").click();

      cy.get("input[type=text]")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(apartmentName2);

      const vacancy = 1;
      cy.get("tbody tr")
        .contains("tr", apartmentName2)
        .contains("td", vacancy);

      const status = "Active";
      cy.get("td").contains(status);

      cy.get("td")
        .contains(apartmentName2)
        .click();
      cy.get("h1").contains(apartmentName2);

      cy.get("div")
        .should("have.class", "address")
        .contains(address);
      cy.get("div")
        .should("have.class", "country")
        .contains("Thailand");
      cy.get("table")
        .should("have.class", "apartmentProfile__leases")
        .contains(monthlyRentThbFormatted);
      cy.get("span").contains(/Active/i);
    });

    it("should be able to filter apartments using searchbar", () => {
      cy.get('a[href="/newApartment"]').click();

      fillOutApartmentForm(newApartmentForSearchbarTest);
      cy.get("input[type=submit]").click();

      cy.get('a[href="/apartments"]').click();

      cy.get("input")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(newApartmentForSearchbarTest.apartmentName);
      cy.contains(apartmentName).should("not.exist");
      cy.contains(newApartmentForSearchbarTest.apartmentName);
    });
  });

  describe("Assign occupant to apartment", () => {
    const checkoutDate = moment(new Date()).add(1, "days");

    it("be able to assign an occupant to apartment", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("+")
        .click();
      cy.get("input[id=occupantToAssign]").type(name);
      cy.contains("Select").click();
      cy.get("input[id=checkInDate]").type("2018-05-01");
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
        .should("have.class", "inverted");
    });

    it("be able to cancel the assign operation", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("+")
        .click();
      cy.get("input[id=occupantToAssign]").type(name);
      cy.contains("Select").click();
      cy.get("input[id=checkInDate]").type("2016-05-01");
      cy.get("input[id=checkOutDate]").type("2016-10-01");
      cy.get("button")
        .contains("Cancel")
        .click();
      cy.get("input").should(
        "have.attr",
        "placeholder",
        "Search occupants here..."
      );
      cy.get("button[class=modalCloseButton]")
        .contains("X")
        .click();
      cy.contains("Occupant");
    });

    const monthlyRentCheckoutDate = checkoutDate.format("D MMM YY");
    it("should be able to view apartment name, check-in & check-out dates and monthly rent on occupant profile", () => {
      cy.get('a[href="/occupants"]').click();

      cy.contains(name).click();
      cy.contains(apartmentName);
      cy.contains("1 May 18");
      cy.contains(monthlyRentCheckoutDate);
      cy.contains(monthlyRentSgdFormatted);
      cy.get("tbody tr").should("have.length", 1);
    });
  });

  describe("Change apartment status", () => {
    it("should show an error message if status of apartment with an occupant is changed to inactive", () => {
      cy.get('a[href="/apartments"]').click();
      cy.get("input[type=text]").type(apartmentName);
      cy.contains(apartmentName).click();

      cy.get("button")
        .contains("Edit")
        .click();

      cy.get("select[name=status]").select("Inactive");
      cy.contains(
        "Unable to change to inactive when there are current or future occupants"
      );
    });
  });

  describe("Remove occupant stay from history", () => {
    it("be able to cancel occupant stay deletion", () => {
      cy.get('a[href="/apartments"]').click();

      cy.get("input[type=text]").type(apartmentName);
      cy.contains(apartmentName).click();
      cy.get('button[id="isConfirmationModalOpen"]').click();
      cy.get("button")
        .contains("Cancel")
        .click();
      cy.contains(name);
    });

    it("be able to remove an occupant's stay from an apartment", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get('button[id="isConfirmationModalOpen"]').click();
      cy.get("button")
        .contains("Delete")
        .click();
      cy.contains(name).should("not.exist");
      cy.contains("No occupants yet!");
    });
  });

  describe("Edit apartment details", () => {
    it("should be able to edit apartment status to inactive", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("Edit")
        .click();

      cy.get("select[id=status]").select("Inactive");
      cy.get("input[class=editApartmentForm__updateButton]").click();
      cy.get("button[class=editApartmentForm__closeButton]").click();

      cy.get('a[href="/apartments"]').click();

      const status = "Inactive";
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", status);
    });

    it("should be able to edit apartment details", () => {
      cy.get('a[href="/apartments"]').click();

      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("Edit")
        .click();
      cy.get("form[class=editApartmentFormContainer]").should("exist");
      cy.get("input[class=editApartmentForm__cancelButton]").scrollIntoView();
      cy.get("input[class=editApartmentForm__cancelButton]").click();
      cy.get("form[class=editApartmentFormContainer]").should("not.exist");
      cy.get("button")
        .contains("Edit")
        .click();
      cy.get("input[id=name]")
        .clear()
        .type("The Beacon");
      cy.get("input[id=address]")
        .clear()
        .type("Fake street 11");
      cy.get("input[id=bedrooms]")
        .clear()
        .type("10");
      cy.get("input[id=capacity]")
        .clear()
        .type("10");
      cy.get("select[id=country]").select("Thailand");
      cy.get("select[id=status]").select("Inactive");
      cy.get("input[id=leaseStart]")
        .clear()
        .type("2020-11-12");
      cy.get("input[id=leaseEnd]")
        .clear()
        .type("2020-12-12");
      cy.get("input[id=monthlyRent]")
        .clear()
        .type("8000");
      cy.get("select[id=currency]").select("THB");
      cy.get("input[id=landlordName]")
        .clear()
        .type("Tony Stark");
      cy.get("input[id=landlordAccountNumber]")
        .clear()
        .type("12345");
      cy.get("textarea[id=remarks]")
        .clear()
        .type("Awesome");
      cy.get("input[class=editApartmentForm__updateButton]").click();
      cy.contains("Successfully updated apartment: The Beacon");
      cy.get("button[class=editApartmentForm__closeButton]").click();
      cy.get("form[class=editApartmentFormContainer]").should("not.exist");
    });
  });

  describe("Maintain user session after log in", () => {
    it("should remain logged in on the same page after refresh", () => {
      cy.get("h1").contains("Apartments");

      cy.get('a[href="/occupants"]').click();
      cy.reload();
      cy.get("h1").contains("Occupants");

      cy.get('a[href="/newApartment"]').click();
      cy.reload();
      cy.get("h1").contains("Create New Apartment");

      cy.get('a[href="/newOccupant"]').click();
      cy.reload();
      cy.get("h1").contains("Create New Occupant");

      cy.get('a[href="/apartments"]').click();
      cy.reload();
      cy.get("h1").contains("Apartments");
    });
  });

  describe("Successfully logout", () => {
    it("should allow logout for users", () => {
      cy.get('a[href="/"]').click();

      cy.get("h2").contains("User Login");
    });
  });
});
