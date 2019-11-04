/* eslint-disable jest/expect-expect */
import faker from "faker";
import moment from "moment";

describe("Apartments, Occupant, and ApartmentAssign", () => {
  const baseUrl = Cypress.env("baseUrl");

  const apartmentName = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = "1000";

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
    capacity: -1,
    bedrooms: 1
  };

  const invalidNewApartment2 = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2019-05-01",
    monthlyRent,
    capacity: 1,
    bedrooms: 1
  };

  const newApartment = {
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart: "2019-07-01",
    leaseEnd: "2020-07-10",
    monthlyRent,
    capacity: 1,
    bedrooms: 1
  };

  const newApartmentForSearchbarTest = {
    apartmentName: "Parc Sophia",
    address: "123 Parc Lane",
    landlordName,
    accountNumber,
    leaseStart: "2018-07-01",
    leaseEnd: "2021-07-10",
    monthlyRent,
    capacity: 1,
    bedrooms: 1
  };

  const fillOutApartmentForm = ({
    apartmentName,
    address,
    landlordName,
    accountNumber,
    leaseStart,
    leaseEnd,
    monthlyRent,
    capacity,
    bedrooms
  }) => {
    cy.get("input[name=Name]").type(apartmentName);
    cy.get("input[name=Address]").type(address);
    cy.get("input[name=LandLordName]").type(landlordName);
    cy.get("input[name=LandLordAccount]").type(accountNumber);
    cy.get("input[name=LeaseStart]").type(leaseStart);
    cy.get("input[name=LeaseEnd]").type(leaseEnd);
    cy.get("input[name=Rent]").type(monthlyRent);
    cy.get("input[name=Capacity]").should("not.be.disabled");
    cy.get("input[name=Capacity]")
      .clear()
      .type(capacity);
    cy.get("input[name=Bedrooms]")
      .clear()
      .type(bedrooms);
    cy.get("input[name=Country").type("THIS IS HOME, TRULY");
    cy.get("textarea[name=Remarks]").type("testing!!!");
  };

  describe("Create, edit, view, and search Occupant", () => {
    it("should create a new occupant and show occupant profile", () => {
      const homeOffice = "Home Office: Melbourne, Australia";
      const status = "allocated";
      const gender = "female";

      cy.visit(`${baseUrl}/newOccupant`);
      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(modName);
      cy.get("input[name=employeeId]").type(modEmployeeId);
      cy.get("select[name=gender]").select(gender);
      cy.get("textarea[name=remarks]").type("BAD REMARKS");
      cy.get("select[name=homeOffice]").select("Melbourne, Australia");
      cy.get("select[name=status]").select(status);
      cy.get("input[type=submit]").click();
      cy.get("a")
        .contains("OCCUPANTS")
        .click();
      cy.get("input[type=text]").type(modName);
      cy.get("td")
        .contains(modEmployeeId)
        .click();
      cy.get("h1").contains(modName);
      cy.get("h2").contains(modEmployeeId);
      cy.get("h2").contains(gender);
      cy.get("h2").contains(/Home Office: Melbourne, Australia/i);
      cy.get("span").contains(status);
    });

    it("should be able to edit the occupant details", () => {
      cy.visit(`${baseUrl}/occupants`);
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

      cy.get("a")
        .contains("OCCUPANTS")
        .click();
      cy.contains(name);
      cy.contains(employeeId);
    });

    it("should be able to filter occupants using searchbar", () => {
      const newOccupantname = "Bob";
      cy.visit(`${baseUrl}/newOccupant`);
      cy.get("h1").contains("Create New Occupant");
      cy.get("input[name=name]").type(newOccupantname);
      cy.get("select[name=status]").select("inactive");
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
      cy.visit(`${baseUrl}/newApartment`);
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment);

      cy.get("input[type=submit]").click();
      cy.get("input[name=Capacity]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);
      cy.get("a")
        .contains("APARTMENTS")
        .click();
      cy.contains(apartmentName).should("not.exist");
    });

    it("should be unable to create a new apartment with lease end before lease start date", () => {
      cy.visit(`${baseUrl}/newApartment`);
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(invalidNewApartment2);

      cy.get("input[type=submit]").click();
      cy.get("input[name=LeaseEnd]").should("have.focus");
      cy.get("input[name=Name]").should("have.value", apartmentName);
      cy.get("a")
        .contains("APARTMENTS")
        .click();
      cy.contains(apartmentName).should("not.exist");
    });

    it("should create a new apartment and show apartment profile", () => {
      cy.visit(`${baseUrl}/newApartment`);
      cy.get("h1").contains("Create New Apartment");

      fillOutApartmentForm(newApartment);

      cy.get("input[type=submit]").click();
      cy.get("a")
        .contains("APARTMENTS")
        .click();
      cy.get("input[type=text]").type(apartmentName);

      const vacancy = 1;
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", vacancy);

      cy.get("td")
        .contains(apartmentName)
        .click();
      cy.get("h1").contains(apartmentName);
      cy.get("h2").contains("Address");
      cy.get("p").contains(address);
    });

    it("should be able to filter apartments using searchbar", () => {
      cy.visit(`${baseUrl}/newApartment`);
      fillOutApartmentForm(newApartmentForSearchbarTest);
      cy.get("input[type=submit]").click();
      cy.get("a")
        .contains("APARTMENTS")
        .click();
      cy.get("input")
        .should("have.attr", "placeholder", "Search Apartment")
        .type(newApartmentForSearchbarTest.apartmentName);
      cy.contains(apartmentName).should("not.exist");
      cy.contains(newApartmentForSearchbarTest.apartmentName);
    });
  });

  describe("Assign occupant to apartment", () => {
    const checkoutDate = moment().add(1, "days");

    it("be able to assign an occupant to apartment", () => {
      cy.visit(`${baseUrl}`);
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

      cy.get("a")
        .contains("APARTMENTS")
        .click();
      const vacancy = 0;
      cy.get("tbody tr")
        .contains("tr", apartmentName)
        .contains("td", vacancy)
        .should("have.class", "inverted");
    });

    it("be able to cancel the assign operation", () => {
      cy.visit(`${baseUrl}`);
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
      cy.visit(`${baseUrl}/occupants`);
      cy.contains(name).click();
      cy.contains(apartmentName);
      cy.contains("1 May 18");
      cy.contains(monthlyRentCheckoutDate);
      cy.contains("$1,000.00");
      cy.get("tbody tr").should("have.length", 1);
    });
  });

  describe("Remove occupant stay from history", () => {
    it("be able to cancel occupant stay deletion", () => {
      cy.visit(`${baseUrl}`);
      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("X")
        .click();
      cy.get("button")
        .contains("Cancel")
        .click();
      cy.contains(name);
    });
    it("be able to remove an occupant's stay from an apartment", () => {
      cy.visit(`${baseUrl}`);
      cy.contains(apartmentName).click();
      cy.get("button")
        .contains("X")
        .click();
      cy.get("button")
        .contains("Delete")
        .click();
      cy.contains(name).should("not.exist");
      cy.contains("No occupants yet!");
    });
  });
  describe("Edit apartment details", () => {
    it("should be able to edit apartment details", () => {
      cy.visit(`${baseUrl}`);
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
      cy.get("input[id=country]")
        .clear()
        .type("Indonesia");
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
});
