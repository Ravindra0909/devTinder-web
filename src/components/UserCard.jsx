import React from "react";

const UserCard = ({ user, onIgnore, onAccept, isPreview = false }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;

  return (
    <div
      className={`card w-full bg-[#1A1C23] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden ring-1 ring-white/10 select-none ${isPreview ? "pointer-events-none" : ""} rounded-[2rem]`}
    >
      {/* Image Section */}
      <figure className="h-[240px] sm:h-[380px] md:h-[320px] overflow-hidden relative">
        <img
          src={photoUrl || "https://picsum.photos/seed/dev/400/500"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C23] via-[#1A1C23]/20 to-transparent"></div>

        {/* Floating Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
            {firstName}{" "}
            <span className="hidden sm:inline opacity-80">{lastName}</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            {age && (
              <span className="text-lg font-bold text-white/60">{age} yrs</span>
            )}
            {gender && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7C8CFD] bg-[#7C8CFD]/20 px-3 py-1 rounded-full border border-[#7C8CFD]/30 backdrop-blur-md">
                {gender}
              </span>
            )}
          </div>
        </div>
      </figure>

      {/* Profile Body */}
      <div className="card-body p-6 md:p-8 gap-5">
        <p className="text-gray-400 text-sm leading-relaxed italic opacity-80 line-clamp-3">
          "{about || "A developer building the future..."}"
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 py-1">
          {skills &&
            skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-lg"
              >
                {skill}
              </span>
            ))}
          {skills && skills.length > 3 && (
            <span className="text-[10px] text-gray-600 font-black tracking-widest self-center ml-1">
              +{skills.length - 3} MORE
            </span>
          )}
        </div>

        {/* Controls */}
        {!isPreview && (
          <div className="card-actions flex gap-4 mt-4">
            <button
              onClick={onIgnore}
              className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all active:scale-95 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl"
            >
              Skip
            </button>
            <button
              onClick={onAccept}
              className="flex-2 btn h-14 bg-[#7C8CFD] border-none text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#6B7AE8] shadow-2xl shadow-[#7C8CFD]/30 transition-all active:scale-95 rounded-2xl flex-[2]"
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
