import faker from "faker";

describe("Apartments, Occupant, and ApartmentAssign", () => {
  const baseUrl = Cypress.env("baseUrl");

  const apartmentName = faker.company.companyName();
  const landlordName = faker.name.firstName();
  const address = faker.address.streetAddress();
  const accountNumber = faker.finance.account();
  const monthlyRent = faker.random.number();

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
    leaseEnd: "2019-07-10",
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
    cy.get("input[name=Capacity]").type(capacity);
    cy.get("input[name=Bedrooms]").type(bedrooms);
    cy.get("input[name=Country").type("THIS IS HOME, TRULY");
    cy.get("textarea[name=Remarks]").type("testing!!!");
  };

  it("should create a new occupant and show occupant profile", () => {
    const status = "allocated";

    cy.visit(`${baseUrl}/newOccupant`);
    cy.get("h1").contains("Create New Occupant");
    cy.get("input[name=name]").type(modName);
    cy.get("input[name=employeeId]").type(modEmployeeId);
    cy.get("input[name=gender]").type("female");
    cy.get("textarea[name=remarks]").type("BAD REMARKS");
    cy.get("input[name=country]").type("Thailand");
    cy.get("select[name=status]").select(status);
    cy.get("input[type=submit]").click();
    cy.get("a")
      .contains("OCCUPANTS")
      .click();
    cy.get("td")
      .contains(modEmployeeId)
      .click();
    cy.get("h1").contains(modName);
    cy.get("h2").contains(modEmployeeId);
    cy.get("h2").contains(/Gender: Female/i);
    cy.get("h2").contains(/Country: Thailand/i);
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
    cy.get("input[name=gender]")
      .clear()
      .type("male");
    cy.get("textarea[name=remarks]")
      .clear()
      .type("testing");
    cy.get("input[name=country]")
      .clear()
      .type("Singapore");
    cy.get("select[name=status]").select("Unallocated");
    cy.get("input[type=submit]").click();
    cy.contains(`Successfully update new occupant: ${name}`);
    cy.get("button")
      .contains(/close/i)
      .click();
    cy.get("h1").contains(name);
    cy.get("h2").contains(employeeId);
    cy.get("h2").contains(/Gender: Male/i);
    cy.get("h2").contains(/Country: Singapore/i);
    cy.get("span").contains(/unallocated/i);
  });

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
    cy.get("td")
      .contains(apartmentName)
      .click();
    cy.get("h1").contains(apartmentName);
    cy.get("h2").contains("Address");
    cy.get("p").contains(address);
  });

  it("be able to assign an occupant to apartment", () => {
    cy.visit(`${baseUrl}`);
    cy.contains(apartmentName).click();
    cy.get("button")
      .contains("+")
      .click();
    cy.get("input[id=occupantToAssign]").type(name);
    cy.contains("Select").click();
    cy.get("input[id=checkInDate]").type("2015-05-01");
    cy.get("input[id=checkOutDate]").type("2000-10-01");
    cy.get("input[type=submit]").click();
    cy.get("input[id=checkOutDate]").should("have.focus");
    cy.contains(`Successfully assigned ${name} to ${apartmentName}`).should(
      "not.exist"
    );

    cy.get("input[id=checkOutDate]").type("2015-10-01");
    cy.get("input[type=submit]").click();
    cy.contains(`Successfully assigned ${name} to ${apartmentName}`);
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

  it("should be able to view apartment name, check-in & check-out dates and monthly rent", () => {
    cy.visit(`${baseUrl}/occupants`);
    cy.contains(name).click();
    cy.contains(apartmentName);
    cy.contains("1 May 15");
    cy.contains("1 Oct 15");
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
