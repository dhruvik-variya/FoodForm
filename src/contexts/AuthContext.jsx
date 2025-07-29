import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const signup = (name, email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = existingUsers.some((user) => user.email === email);
      if (userExists) return false;

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // Reminder: Do NOT store plain passwords in real apps
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const userWithoutPassword = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        setUser(userWithoutPassword);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userWithoutPassword)
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
