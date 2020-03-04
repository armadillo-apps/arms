import React, { createContext, useContext, useReducer } from "react";
import { staysReducer } from "../reducer/staysReducer";

const StaysContext = createContext({ stays: [] });
export default StaysContext;
export const useStaysContext = () => useContext(StaysContext);

export const StaysProvider = (stays, children) => {
  const [state, dispatch] = useReducer(staysReducer, stays);
  return (
    <StaysContext.Provider value={{ state, dispatch }}>
      {children}
    </StaysContext.Provider>
  );
};
