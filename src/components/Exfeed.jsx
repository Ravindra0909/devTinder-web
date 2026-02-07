import React, { useState } from "react";
import UserCard from "./UserCard";

const Exfeed = ({ feed }) => {
  const currentUser = feed?.[0];
  const nextUser = feed?.[1];

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="bg-[#1A1C23] p-8 rounded-3xl border border-gray-800 shadow-2xl w-full max-w-[360px]">
          <div className="text-5xl mb-6">👋</div>
          <h2 className="text-xl font-bold text-white mb-2">
            No more developers!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            You've reached the end of the current stack.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full relative">
      <div className="text-center mb-6 z-20">
        <h1 className="text-2xl font-black text-white uppercase italic opacity-80">
          Feed
        </h1>
      </div>

      <div
        className="relative w-full max-w-[420px] h-[640px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Preview card */}
        {nextUser && (
          <div className="absolute w-full scale-[0.93] opacity-30 blur-[1px] pointer-events-none">
            <UserCard user={nextUser} isPreview />
          </div>
        )}

        {/* Active card */}
        {currentUser && (
          <div className="absolute w-full z-10">
            <UserCard
              key={currentUser._id}
              user={currentUser}
              onActionComplete={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Exfeed;
