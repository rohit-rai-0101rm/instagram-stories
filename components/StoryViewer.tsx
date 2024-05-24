import React, { useState, useEffect } from "react";
import { StoryViewerProps } from "../types";

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

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, target } = event;
    const { offsetWidth } = target as HTMLDivElement;
    const clickPosition = clientX;

    if (clickPosition > offsetWidth / 2) {
      handleNextStory();
    } else {
      handlePreviousStory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md h-full bg-black bg-opacity-50 p-4 rounded-lg relative flex items-center">
        <div className="absolute top-4 right-2 z-10">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
        <div className="w-full" onClick={handleClick}>
          <div className="absolute top-0 left-0 w-full flex space-x-1 mt-2 px-3">
            {user.stories.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 bg-gray-200 rounded-md overflow-hidden relative"
                style={{
                  background: "#999999",
                }}
              >
                {index === currentStoryIndex && (
                  <div
                    className="h-full bg-white absolute left-0 top-0"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.05s linear",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <img
            src={user.stories[currentStoryIndex]}
            alt={`Story ${currentStoryIndex + 1}`}
            className="w-full h-auto object-contain rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
