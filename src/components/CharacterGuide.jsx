// src/components/CharacterGuide.jsx
import React from "react";
import CharacterImage from "../assets/characters/character1.png"; // Adjust the path and filename accordingly

const CharacterGuide = () => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-md">
      <img src={CharacterImage} alt="Character Guide" className="w-24 h-24" />
      <div>
        <h2 className="text-xl font-semibold">Guide Name</h2>
        <p className="text-gray-600">I'm here to help you learn!</p>
      </div>
    </div>
  );
};

export default CharacterGuide;
