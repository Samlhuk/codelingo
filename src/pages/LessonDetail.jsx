// src/pages/LessonDetail.jsx
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const LessonDetail = () => {
  const { state } = useLocation();
  const { lesson, module, category } = state;
  const { user, updateUser, badges } = useContext(UserContext);
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === lesson.quiz.answer) {
      setFeedback("Correct!");
      setIsCorrect(true);
      handleLessonComplete();
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  const handleLessonComplete = () => {
    const updatedProgress = { ...user.progress };
    if (!updatedProgress[category]) {
      updatedProgress[category] = {};
    }
    if (!updatedProgress[category][module.level]) {
      updatedProgress[category][module.level] = [];
    }
    if (!updatedProgress[category][module.level].includes(lesson.lessonId)) {
      updatedProgress[category][module.level].push(lesson.lessonId);
    }

    // Check if all lessons in this level are completed to award a badge
    const totalLessons = module.lessons.length;
    const completedLessons = updatedProgress[category][module.level].length;
    let earnedBadge = null;

    if (completedLessons === totalLessons) {
      const badge = badges.find(
        (b) => b.category === category && b.level === module.level
      );
      if (badge && !user.badges.includes(badge.badgeId)) {
        earnedBadge = badge.badgeId;
      }
    }

    const updatedBadges = earnedBadge
      ? [...user.badges, earnedBadge]
      : [...user.badges];
    const updatedLevel = Math.floor(updatedBadges.length / 2) + 1;

    const updatedUser = {
      ...user,
      progress: updatedProgress,
      badges: updatedBadges,
      level: updatedLevel,
    };

    updateUser(updatedUser);
  };

  const handleNextLesson = () => {
    const currentLessonIndex = module.lessons.findIndex(
      (l) => l.lessonId === lesson.lessonId
    );
    const nextLesson = module.lessons[currentLessonIndex + 1];

    if (nextLesson) {
      navigate("/lessons", {
        state: { nextLessonId: nextLesson.lessonId, category },
      });
    } else {
      alert("Congratulations! You have completed all lessons in this level.");
      navigate("/lessons", { state: { category } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <button
        onClick={() => navigate("/lessons")}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back to Lessons
      </button>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6">{lesson.title}</h2>
        {!isQuizVisible ? (
          <>
            {/* Lesson Content */}
            <p className="mb-6">{lesson.content}</p>
            {/* Code Example */}
            <SyntaxHighlighter
              language={getLanguage(lesson.codeExample)}
              style={okaidia}
              className="mb-6"
            >
              {lesson.codeExample}
            </SyntaxHighlighter>
            <button
              onClick={() => setIsQuizVisible(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
            >
              Take Quiz
            </button>
          </>
        ) : (
          <>
            {/* Quiz Section */}
            <form onSubmit={handleQuizSubmit}>
              <h3 className="text-xl font-semibold mb-4">Quiz:</h3>
              <p className="mb-4">{lesson.quiz.question}</p>
              {lesson.quiz.options.map((option, index) => (
                <div key={index} className="mb-4">
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
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
            {/* Feedback */}
            {feedback && <p className="mt-6 text-lg">{feedback}</p>}
            {/* Show Character When Correct */}
            {isCorrect && (
              <>
                <img
                  src="/public/characters/character3.png"
                  alt="Correct Character"
                  className="h-48 mt-4 mx-auto"
                />
                <button
                  onClick={handleNextLesson}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full transition-colors duration-300 hover:bg-green-600"
                >
                  Next Lesson
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const getLanguage = (code) => {
  if (code.trim().startsWith("<")) {
    return "html";
  } else if (code.trim().startsWith("body") || code.trim().startsWith(".")) {
    return "css";
  } else {
    return "javascript";
  }
};

export default LessonDetail;
