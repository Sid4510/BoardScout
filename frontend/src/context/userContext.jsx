import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (token, name) => {
    localStorage.setItem("token", token);
    setUser({ token, name });
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
