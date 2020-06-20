import {
  authenticateUser,
  createNewApartment,
  createNewOccupant,
  createNewUser,
  createStay,
  editUserRole,
  fetchApartmentById,
  fetchApartments,
  fetchOccupantById,
  fetchOccupants,
  fetchStays,
  fetchUsers,
  getApartmentProfileHistory,
  getUserId,
  loginUser,
  logoutUser,
  removeStay,
  removeUser,
  updateApartment,
  updateOccupant,
  updatePassword
} from "./api";
import axios from "./axios";

const testInput = {
  name: "John",
  employeeId: "12345",
  gender: "male",
  remarks: "test",
  homeOffice: "singapore",
  status: "active",
  email: "test@test.com",
  password: "abc123",
  role: "admin",
  apartmentId: "5d303529e51a310017aa063c",
  occupantId: "5d2ef34111ead80017be83df",
  checkInDate: new Date("2009-10-10"),
  checkOutDate: new Date("2010-10-10"),
  leaseId: "5d401557d855f9677f345692",
  _id: "5d303529e51a310017aa063c",
  userId: "5d303529e51a310017aa063c",
  stayId: "303529e51a310017aa0"
};

describe("GET routes", () => {
  let spyGet;
  beforeEach(() => {
    spyGet = jest.spyOn(axios, "get");
    spyGet.mockReturnValue({ data: { expected: "output" } });
  });

  afterEach(() => {
    spyGet.mockClear();
  });

  it("should authenticate user and return user info", async () => {
    const output = await authenticateUser();

    expect(spyGet).toHaveBeenCalledWith("/users/authenticate", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get apartments data", async () => {
    const output = await fetchApartments();

    expect(spyGet).toHaveBeenCalledWith("/apartments", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get apartment data by id", async () => {
    const { apartmentId } = testInput;
    const output = await fetchApartmentById(apartmentId);

    expect(spyGet).toHaveBeenCalledWith(`/apartments/${apartmentId}`, {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });
  it("should get occupants data", async () => {
    const output = await fetchOccupants();

    expect(spyGet).toHaveBeenCalledWith("/occupants", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get occupant data by id", async () => {
    const { occupantId } = testInput;
    const output = await fetchOccupantById(occupantId);

    expect(spyGet).toHaveBeenCalledWith(`/occupants/${occupantId}`, {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get users data", async () => {
    const output = await fetchUsers();

    expect(spyGet).toHaveBeenCalledWith("/users", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get user ID by email", async () => {
    const mockGet = jest.spyOn(axios, "get");
    mockGet.mockReturnValue({
      data: [{ email: "user@email.com", _id: "id123" }]
    });

    const userEmail = "user@email.com";
    const userId = await getUserId(userEmail);

    expect(mockGet).toHaveBeenCalledWith("/users", {
      withCredentials: true
    });
    expect(userId).toBe("id123");
  });

  it("should get stays data", async () => {
    const output = await fetchStays();

    expect(spyGet).toHaveBeenCalledWith("/stays?", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
  });

  it("should get apartment profile history", async () => {
    const apartmentId = "1234";
    const output = await getApartmentProfileHistory(apartmentId);

    expect(spyGet).toHaveBeenCalledWith(
      `/stays/apartmentProfileHistory/${apartmentId}`,
      {
        withCredentials: true
      }
    );
    expect(output).toEqual({ expected: "output" });
  });
});

describe("POST routes", () => {
  let spyPost;
  beforeEach(() => {
    spyPost = jest.spyOn(axios, "post");
    spyPost.mockReturnValue({ data: "Success message" });
  });

  afterEach(() => {
    spyPost.mockClear();
  });

  it("should post new apartment details to endpoint", async () => {
    const input = { input: "body" };
    const output = await createNewApartment(input);

    expect(spyPost).toHaveBeenCalledWith("/apartments", input, {
      withCredentials: true
    });
    expect(output).toEqual("Success message");
  });

  it("should post new occupant details to endpoint", async () => {
    const { name, employeeId, gender, remarks, homeOffice, status } = testInput;

    const output = await createNewOccupant(
      name,
      employeeId,
      gender,
      remarks,
      homeOffice,
      status
    );

    expect(spyPost).toHaveBeenCalledWith(
      "/occupants",
      { name, employeeId, gender, remarks, homeOffice, status },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should post new user details to endpoint", async () => {
    const { name, email, password, role } = testInput;
    const output = await createNewUser(name, email, password, role);

    expect(spyPost).toHaveBeenCalledWith(
      "/users/new",
      { name, email, password, role },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should post new stay details to endpoint", async () => {
    const {
      occupantId,
      apartmentId,
      checkInDate,
      checkOutDate,
      leaseId
    } = testInput;
    const output = await createStay(
      occupantId,
      apartmentId,
      checkInDate,
      checkOutDate,
      leaseId
    );

    expect(spyPost).toHaveBeenCalledWith(
      "/stays",
      { occupantId, apartmentId, checkInDate, checkOutDate, leaseId },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should post user login details to endpoint", async () => {
    const { email, password } = testInput;
    const output = await loginUser(email, password);

    expect(spyPost).toHaveBeenCalledWith(
      "/users/login",
      { email, password },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should logout user", async () => {
    const output = await logoutUser({});

    expect(spyPost).toHaveBeenCalledWith(
      "/users/logout",
      {},
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });
});

describe("PUT routes", () => {
  let spyPut;
  beforeEach(() => {
    spyPut = jest.spyOn(axios, "put");
    spyPut.mockReturnValue({ data: "Success message" });
  });

  afterEach(() => {
    spyPut.mockClear();
  });

  it("should update occupant details", async () => {
    const {
      name,
      employeeId,
      gender,
      remarks,
      homeOffice,
      status,
      _id
    } = testInput;

    const output = await updateOccupant({
      name,
      employeeId,
      gender,
      remarks,
      homeOffice,
      status,
      _id
    });
    expect(spyPut).toHaveBeenCalledWith(
      `/occupants/${_id}`,
      {
        _id,
        name,
        employeeId,
        gender,
        remarks,
        homeOffice,
        status
      },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should update apartment details", async () => {
    const {
      apartmentId,
      name,
      address,
      bedrooms,
      capacity,
      country,
      status,
      leases,
      landlord,
      remarks
    } = testInput;

    const output = await updateApartment(
      apartmentId,
      name,
      address,
      bedrooms,
      capacity,
      country,
      status,
      leases,
      landlord,
      remarks
    );
    expect(spyPut).toHaveBeenCalledWith(
      `/apartments/${apartmentId}`,
      {
        name,
        address,
        bedrooms,
        capacity,
        country,
        status,
        leases,
        landlord,
        remarks
      },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });
});

describe("PATCH routes", () => {
  let spyPatch;
  beforeEach(() => {
    spyPatch = jest.spyOn(axios, "patch");
    spyPatch.mockReturnValue({ data: "Success message" });
  });

  afterEach(() => {
    spyPatch.mockClear();
  });

  it("should update user role", async () => {
    const { userId, role } = testInput;

    const output = await editUserRole(userId, role);
    expect(spyPatch).toHaveBeenCalledWith(
      `/users/${userId}`,
      { role },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });

  it("should update password", async () => {
    const { userId, password, newPassword } = testInput;

    const output = await updatePassword(userId, password, newPassword);
    expect(spyPatch).toHaveBeenCalledWith(
      `/users/password/${userId}`,
      { password, newPassword },
      {
        withCredentials: true
      }
    );
    expect(output).toEqual("Success message");
  });
});

describe("DELETE routes", () => {
  let spyDelete;
  beforeEach(() => {
    spyDelete = jest.spyOn(axios, "delete");
    spyDelete.mockReturnValue({ data: "Success message" });
  });

  afterEach(() => {
    spyDelete.mockClear();
  });

  it("should remove stay", async () => {
    const { stayId } = testInput;

    const output = await removeStay(stayId);

    expect(spyDelete).toHaveBeenCalledWith(`/stays/${stayId}`, {
      withCredentials: true
    });
    expect(output).toEqual("Success message");
  });

  it("should remove user", async () => {
    const { userId } = testInput;

    const output = await removeUser(userId);

    expect(spyDelete).toHaveBeenCalledWith(`/users/${userId}`, {
      withCredentials: true
    });
    expect(output).toEqual("Success message");
  });
});
