// src/components/Badges.jsx
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Badges = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Your Badges:</h3>
      <div className="flex flex-wrap space-x-2 space-y-2">
        {user.badges.length > 0 ? (
          user.badges.map((badge, index) => (
            <img
              key={index}
              src={`/public/assets/badges/${badge}.png`}
              alt={badge}
              className="w-16 h-16"
            />
          ))
        ) : (
          <p>You haven't earned any badges yet.</p>
        )}
      </div>
    </div>
  );
};

export default Badges;
