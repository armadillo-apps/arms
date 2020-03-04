import { staysReducer } from "./staysReducer";

describe("staysReducer", () => {
  it("should return initial state", () => {
    const initialState = "abc";
    expect(staysReducer(initialState, { type: "INVALID" })).toBe(initialState);
  });
});
