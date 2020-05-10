import { renderHook } from "@testing-library/react-hooks";
import { useApartmentData } from "./useApartmentData";
import axios from "../api/axios";

const spyGet = jest.spyOn(axios, "get");

describe("useApartmentData", () => {
  it("should return apartment and update isLoading state when apartment id is valid", async () => {
    spyGet.mockReturnValue({ data: { expected: "output" } });
    const { result, waitForNextUpdate } = renderHook(() =>
      useApartmentData(123)
    );

    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.apartment).toEqual({});

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.apartment).toEqual({ expected: "output" });
  });
});
