import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

const mockApi = jest.fn();

describe("useFetch", () => {
  const mockParam = "someParam";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should toggle isFetching to true and return data when api call is successful", async () => {
    const mockData = { data: { expected: "output" } };
    mockApi.mockReturnValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockApi, mockParam)
    );

    expect(mockApi).toHaveBeenCalledTimes(1);
    expect(mockApi).toBeCalledWith(mockParam);
    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toEqual({});

    await waitForNextUpdate();

    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });

  it("should toggle isError to true when api call fails", async () => {
    mockApi.mockRejectedValue("");
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockApi, mockParam)
    );

    expect(mockApi).toHaveBeenCalledTimes(1);
    expect(result.current.isError).toBe(false);

    await waitForNextUpdate();

    expect(result.current.isError).toBe(true);
  });

  it("should still return data when call with only 1 argument", async () => {
    const mockData = { data: { expected: "output" } };
    mockApi.mockReturnValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockApi));

    expect(mockApi).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({});

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
  });
});
