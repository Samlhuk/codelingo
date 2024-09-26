// src/pages/Signup.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(UserContext); // Destructure signup from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      if (username.trim() === "" || password.trim() === "") {
        setError("Please enter both username and password.");
        return;
      }
      signup(username, password); // Call the signup function from context
      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      setError(err.message); // Display error if username exists
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="w-full border rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
