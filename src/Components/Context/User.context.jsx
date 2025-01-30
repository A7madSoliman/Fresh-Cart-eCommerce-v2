import { createContext, useState } from "react";

export const userContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function Logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <userContext.Provider value={{ token, setToken, Logout }}>
      {children}
    </userContext.Provider>
  );
}
