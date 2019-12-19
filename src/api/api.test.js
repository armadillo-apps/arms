import {
  fetchApartments,
  fetchOccupants,
  fetchUsers,
  fetchStays,
  getApartmentProfileHistory,
  createNewApartment
} from "./api";
import axios from "./axios";

describe("GET routes", () => {
  let spyGet;
  beforeEach(() => {
    spyGet = jest.spyOn(axios, "get");
    spyGet.mockReturnValue({ data: { expected: "output" } });
  });

  afterEach(() => {
    spyGet.mockClear();
  });

  it("should get apartments data", async () => {
    const output = await fetchApartments();

    expect(spyGet).toHaveBeenCalledWith("/apartments", {
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

  it("should get users data", async () => {
    const output = await fetchUsers();

    expect(spyGet).toHaveBeenCalledWith("/users", {
      withCredentials: true
    });
    expect(output).toEqual({ expected: "output" });
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
});
