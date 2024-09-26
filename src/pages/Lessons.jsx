// src/pages/Lessons.jsx
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import modulesData from "../data/modules.json";

const Lessons = () => {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("HTML");
  const lessonRefs = useRef({}); // Store refs for each lesson
  const navigate = useNavigate();
  const location = useLocation();
  const [nextLessonId, setNextLessonId] = useState(null); // Store the next lesson ID

  useEffect(() => {
    setCategories(modulesData.categories);

    // Handle navigation state for scrolling to the next lesson
    if (location.state) {
      const { nextLessonId, category } = location.state;

      if (category) {
        setSelectedCategory(category);
      }

      if (nextLessonId) {
        setNextLessonId(nextLessonId);
      }
    }
  }, [location.state]);

  useEffect(() => {
    // When selectedCategory changes, check if nextLessonId is set
    if (nextLessonId && lessonRefs.current[nextLessonId]) {
      // Delay to ensure the DOM has rendered the lessons
      setTimeout(() => {
        const lessonElement = lessonRefs.current[nextLessonId];
        if (lessonElement) {
          // Scroll into view
          lessonElement.scrollIntoView({ behavior: "smooth", block: "center" });

          // Add highlight class
          lessonElement.classList.add("bg-amber-100");

          // Remove highlight after 2 seconds
          setTimeout(() => {
            lessonElement.classList.remove("bg-amber-100");
            setNextLessonId(null); // Reset the state
          }, 2000);
        }
      }, 300); // Adjust delay as needed
    }
  }, [selectedCategory, nextLessonId]);

  const handleLessonClick = (lesson, level, category) => {
    navigate(`/lessons/${lesson.lessonId}`, {
      state: { lesson, module: level, category },
    });
  };

  const selectedModule = categories.find(
    (cat) => cat.name === selectedCategory
  );

  if (!selectedModule) {
    return <div>Selected category doesn't exist.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {selectedCategory} Lessons
      </h2>

      {/* Category Selection (Filters) */}
      <div className="mb-8 flex space-x-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-6 py-2 rounded-full border-2 transition-colors duration-300 ${
              selectedCategory === cat.name
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        {/* SVG Path (vertical line) */}
        <svg
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full"
          width="2"
          height="1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="1" y1="0" x2="1" y2="1000" stroke="gray" strokeWidth="2" />
        </svg>

        {/* Lessons Path */}
        <div className="space-y-16">
          {selectedModule.levels.map((level) => (
            <div key={level.level} className="flex items-center justify-center">
              <div className="relative">
                {level.lessons.map((lesson) => (
                  <div
                    key={lesson.lessonId}
                    className="mb-4 bg-white duration-500 ease-in-out"
                    ref={(el) => (lessonRefs.current[lesson.lessonId] = el)} // Store refs for each lesson
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-8 h-8 ${
                        user.progress[selectedCategory]?.[
                          level.level
                        ]?.includes(lesson.lessonId)
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } rounded-full absolute left-1/2 transform -translate-x-1/2 -top-3`}
                    />
                    {/* Lesson Details */}
                    <div className="p-6 rounded shadow-md w-80 mt-4 text-center">
                      <h4 className="text-lg font-semibold mb-4">
                        {level.level} Level
                      </h4>
                      <ul className="list-none">
                        <li>
                          <button
                            onClick={() =>
                              handleLessonClick(lesson, level, selectedCategory)
                            }
                            className={`text-blue-600 hover:underline font-medium ${
                              user.progress[selectedCategory]?.[
                                level.level
                              ]?.includes(lesson.lessonId)
                                ? "line-through"
                                : ""
                            }`}
                          >
                            {lesson.title}{" "}
                            {user.progress[selectedCategory]?.[
                              level.level
                            ]?.includes(lesson.lessonId) && "✓"}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
