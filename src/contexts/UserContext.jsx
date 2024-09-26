// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import badgesData from "../data/badges.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    progress: {},
    badges: [],
    level: 1,
  });

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Signup function
  const signup = (username, password) => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.username === username) {
      throw new Error("Username already exists.");
    }

    const newUser = {
      username,
      password,
      progress: {},
      badges: [],
      level: 1,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Login function
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  // Update user function (for progress, badges)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{ user, signup, login, updateUser, badges: badgesData.badges }}
    >
      {children}
    </UserContext.Provider>
  );
};
