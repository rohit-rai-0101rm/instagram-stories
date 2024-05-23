"use client";
import React, { useState, useEffect } from "react";
import { User } from "../types";

interface StoryViewerProps {
  user: User;
  onClose: () => void;
}

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md bg-white p-4 rounded-lg">
        <div className="relative">
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
            className="w-full h-auto rounded-lg mt-2"
          />
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
