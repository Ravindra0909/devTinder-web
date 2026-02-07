import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, onActionComplete, isPreview = false }) => {
  if (!user) return null;
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, about, skills, age, gender, _id } =
    user;

  const handleAction = async (type, status, userId) => {
    if (isAnimating || isPreview) return;

    setIsAnimating(true);
    setDirection(type);

    try {
      console.log(
        `${type === "right" ? "Connecting with" : "Ignoring"} ${(firstName, _id)}`,
      );
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
      // simulate API delay
      //await new Promise((resolve) => setTimeout(resolve, 400));
    } catch (error) {
      console.error("API Call Failed", error);
    } finally {
      setTimeout(() => {
        onActionComplete();
        setDirection(null);
        setIsAnimating(false);
      }, 50);
    }
  };

  return (
    <div
      className={`
        card w-full bg-[#1A1C23] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]
        border border-white/5 overflow-hidden ring-1 ring-white/10
        select-none rounded-[2rem] transition-all duration-500
        ease-[cubic-bezier(0.23,1,0.32,1)]
        ${
          direction === "left"
            ? "-translate-x-[180%] -rotate-[30deg] opacity-0 scale-90"
            : ""
        }
        ${
          direction === "right"
            ? "translate-x-[180%] rotate-[30deg] opacity-0 scale-90"
            : ""
        }
        ${!direction ? "translate-x-0 rotate-0 opacity-100 scale-100" : ""}
        ${isPreview ? "pointer-events-none" : ""}
      `}
    >
      {/* Image */}
      <figure className="h-[340px] sm:h-[380px] md:h-[420px] overflow-hidden relative">
        <img
          src={photoUrl || "https://picsum.photos/seed/dev/400/500"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C23] via-[#1A1C23]/20 to-transparent"></div>

        {/* Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
            {firstName}{" "}
            <span className="hidden sm:inline opacity-80">{lastName}</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            {age > 0 && (
              <span className="text-lg font-bold text-white/60">{age} yrs</span>
            )}
            {gender && (
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em]
                text-[#7C8CFD] bg-[#7C8CFD]/20 px-3 py-1 rounded-full
                border border-[#7C8CFD]/30 backdrop-blur-md"
              >
                {gender}
              </span>
            )}
          </div>
        </div>
      </figure>

      {/* Body */}
      <div className="p-6 md:p-8 space-y-5">
        <p className="text-gray-400 text-sm italic opacity-80 line-clamp-3">
          "{about || "A developer building the future..."}"
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills &&
            skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 text-gray-300
                text-[10px] font-black uppercase tracking-widest
                border border-white/5 rounded-lg"
              >
                {skill}
              </span>
            ))}
          {skills && skills.length > 3 && (
            <span className="text-[10px] text-gray-600 font-black tracking-widest self-center">
              +{skills.length - 3} MORE
            </span>
          )}
        </div>

        {/* Actions */}
        {!isPreview && (
          <div className="flex gap-4 mt-4">
            <button
              disabled={isAnimating}
              onClick={() => handleAction("left", "ignored", _id)}
              className="flex-1 h-14 bg-white/5 border border-white/10
              text-gray-400 hover:bg-red-500/10 hover:text-red-400
              transition-all active:scale-95 font-black uppercase
              tracking-[0.2em] text-[10px] rounded-2xl disabled:opacity-50"
            >
              Skip
            </button>

            <button
              disabled={isAnimating}
              onClick={() => handleAction("right", "interested", _id)}
              className="flex-[2] h-14 bg-[#7C8CFD] text-white font-black
              uppercase tracking-[0.2em] text-[10px] rounded-2xl
              hover:bg-[#6B7AE8] shadow-2xl shadow-[#7C8CFD]/30
              transition-all active:scale-95 disabled:opacity-50"
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
