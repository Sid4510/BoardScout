import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");
    
    if (token && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser({ token, ...userData });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData");
      }
    }
    
    setLoading(false);
  }, []);

  // Function to log in the user
  const login = (token, userData) => {
    const userToStore = {
      token,
      name: userData.name,
      email: userData.email || "",
      role: userData.role || "user",
    };
    
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userToStore));
    setUser(userToStore);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
  };

  // Function to update user profile
  const updateUser = async (updatedUserData) => {
    try {
      // Store locally first for immediate UI update
      const userToStore = { ...user, ...updatedUserData };
      
      // Remove token from storage data to avoid duplication
      const storageData = { ...userToStore };
      delete storageData.token;
      
      localStorage.setItem("userData", JSON.stringify(storageData));
      setUser(userToStore);
      
      // Here you would normally send the updated data to your backend API
      // Example (commented out until API endpoint is ready):
      /*
      if (user.token) {
        await axios.put("http://localhost:5000/api/auth/profile", updatedUserData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      */
      
      return { success: true };
    } catch (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      isLoading: loading
    }}>
      {children}
    </UserContext.Provider>
  );
};
