import React, { createContext, useMemo, useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TokenContext = createContext();

function TokenProvider(props) {
  const [user] = useLocalStorage("user");
  const [token, setToken] = useState(user?.token);
  const value = useMemo(() => [token, setToken], [token]);
  return <TokenContext.Provider value={value} {...props} />;
}

function useToken() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}

export { TokenProvider, useToken };

// export default TokenContext;
