// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)] space-y-8 p-4 bg-gray-100">
      <div class="w-full max-w-4xl flex flex-col md:flex-row mt-4 mb-8">
        <div class="w-full md:w-1/5">
          <img
            src="/public/characters/character2.png"
            alt="Character"
            class="w-full h-auto max-w-32 mx-auto"
          />
        </div>

        {/* Speech Bubble */}
        <div class="w-full md:w-4/5 md:ml-4 bg-white p-8 rounded-lg shadow-lg relative mt-4 md:mt-0">
          <div class="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-white border-t-transparent border-b-transparent"></div>
          <p class="text-lg font-semibold text-gray-800">
            Welcome to codelingo! Here, you can progress through engaging
            lessons on HTML, CSS, and JavaScript, earn badges, and level up.
            Let's make web development fun and rewarding. Click on signup to get
            started!
          </p>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
