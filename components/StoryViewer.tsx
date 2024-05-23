import React, { useState, useEffect } from "react";
import { StoryViewerProps, User } from "../types";

const StoryViewer: React.FC<StoryViewerProps> = ({ user, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 50);

    if (progress >= 100) {
      setProgress(0);
      if (currentStoryIndex < user.stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else {
        onClose();
      }
    }

    return () => clearInterval(interval);
  }, [progress, currentStoryIndex, user.stories.length, onClose]);

  const handleNextStory = () => {
    if (currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md bg-white p-4 rounded-lg relative">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="relative" onClick={handleNextStory}>
          <div className="absolute top-0 left-0 w-full flex space-x-1">
            {user.stories.map((_, index) => (
              <div
                key={index}
                className="h-1 bg-gray-300 flex-1 mx-1"
                style={{
                  background: index === currentStoryIndex ? "blue" : "gray",
                  transform:
                    index === currentStoryIndex
                      ? `scaleX(${progress / 100})`
                      : undefined,
                  transformOrigin: "left",
                  transition: "transform 0.05s linear",
                }}
              ></div>
            ))}
          </div>
          <img
            src={user.stories[currentStoryIndex]}
            alt={`Story ${currentStoryIndex + 1}`}
            className="w-full h-auto rounded-lg mt-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
