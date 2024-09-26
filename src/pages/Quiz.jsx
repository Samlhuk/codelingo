// src/pages/Quiz.jsx
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Quiz = () => {
  const { state } = useLocation();
  const { lesson, module } = state;
  const { user, updateUser } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === lesson.quiz.answer) {
      setFeedback("Correct! 🎉");
      handleLessonComplete();
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  const handleLessonComplete = () => {
    // Update user progress and badges
    const updatedProgress = { ...user.progress };
    if (!updatedProgress[module.moduleId]) {
      updatedProgress[module.moduleId] = [];
    }
    if (!updatedProgress[module.moduleId].includes(lesson.lessonId)) {
      updatedProgress[module.moduleId].push(lesson.lessonId);
    }

    const updatedBadges = [...user.badges];
    if (!updatedBadges.includes(lesson.badge)) {
      updatedBadges.push(lesson.badge);
    }

    const updatedUser = {
      ...user,
      progress: updatedProgress,
      badges: updatedBadges,
      level: Math.floor(updatedBadges.length / 5) + 1, // Example leveling logic
    };

    updateUser(updatedUser);
    navigate("/profile"); // Redirect to profile after completing quiz
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="mb-4 text-blue-500"
      >
        &larr; Back to Lesson
      </button>
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2">Quiz:</h3>
        <p className="mb-2">{lesson.quiz.question}</p>
        <form onSubmit={handleQuizSubmit}>
          {lesson.quiz.options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">{option}</span>
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
        {feedback && <p className="mt-4 text-lg">{feedback}</p>}
      </div>
    </div>
  );
};

export default Quiz;
