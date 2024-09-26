// src/pages/Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, badges } = useContext(UserContext); // Make sure badges are accessed from context
  const navigate = useNavigate();

  // Filter the badges that the user has earned
  const earnedBadges = badges.filter((badge) =>
    user.badges.includes(badge.badgeId)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div class="w-full max-w-4xl flex flex-col md:flex-row mt-4 mb-8">
        <div class="w-full md:w-1/5">
          <img
            src="/public/characters/character2.png"
            alt="Character"
            class="w-full h-auto max-w-32 mx-auto"
          />
        </div>

        <div class="w-full md:w-4/5 md:ml-4 bg-white p-8 rounded-lg shadow-lg relative mt-4 md:mt-0">
          <div class="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-white border-t-transparent border-b-transparent"></div>
          <p class="text-lg font-semibold text-gray-800">
            This is your profile. It shows your level and the badges you have
            earned. The more lessons you complete, the higher your level and the
            more badges you will earn. Click on 'Learn' below to start learning.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        <p className="mb-6">
          <strong>Level:</strong> {user.level}
        </p>

        <h3 className="text-2xl font-semibold mb-4">Badges:</h3>
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div key={badge.badgeId} className="flex flex-col items-center">
                <img
                  src={`/public/badges/${badge.badgeId}.png`}
                  alt={badge.name}
                  className="w-16 h-16 mb-2"
                />
                <p className="font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No badges earned yet. Complete lessons and quizzes to earn badges!
          </p>
        )}

        <button
          onClick={() => navigate("/lessons")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
        >
          Learn
        </button>
      </div>
    </div>
  );
};

export default Profile;
