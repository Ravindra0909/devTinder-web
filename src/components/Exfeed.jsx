import React, { useState } from "react";
import UserCard from "./UserCard.jsx";

const Exfeed = ({ feed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const mockUsers = feed;
  const handleAction = (type) => {
    if (isAnimating || currentIndex >= mockUsers.length) return;
    setDirection(type);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
      setIsAnimating(false);
    }, 400);
  };

  const currentUser = mockUsers[currentIndex];
  const nextUser = mockUsers[currentIndex + 1];

  if (currentIndex >= mockUsers.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="bg-[#1A1C23] p-12 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="text-6xl mb-6">👋</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No more developers!
          </h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            Check back later for new connections.
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="btn btn-outline border-gray-700 text-gray-400 mt-8"
          >
            Reset Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    mockUsers && (
      <div className="flex flex-col items-center w-full max-w-4xl pt-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight mb-1 uppercase">
            Feed
          </h1>
          <p className="text-gray-500 text-sm">
            Right for Connect, Left for Skip
          </p>
        </div>

        <div
          className="relative w-full max-w-[400px] h-[640px] flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {nextUser && (
            <div className="absolute top-2 w-full scale-[0.94] opacity-40 blur-[0.5px] pointer-events-none transition-all duration-300 transform translate-z-[-10px]">
              <UserCard user={nextUser} />
            </div>
          )}

          <div
            className={`absolute w-full transition-all duration-400 ease-[cubic-bezier(0.23, 1, 0.32, 1)] z-10 ${direction === "left" ? "-translate-x-[160%] -rotate-12 opacity-0" : direction === "right" ? "translate-x-[160%] rotate-12 opacity-0" : "translate-x-0 rotate-0 opacity-100"}`}
          >
            <UserCard
              user={currentUser}
              onIgnore={() => handleAction("left")}
              onAccept={() => handleAction("right")}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Exfeed;
