import React, { useState } from "react";
import UserCard from "./UserCard.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
const EditProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about:
      user.about ||
      "Elon Reeve Musk FRS is a businessman and investor known for his key roles in the space company SpaceX and the automotive company Tesla, Inc. Building the future of humanity.",
    skills: user.skills || ["Product Design", "AI", "Robotics", "Engineering"],
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleCommit = async () => {
    try {
      setError("");
      const { firstName, lastName, photoUrl, age, gender, about, skills } =
        profile;

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, age, about, skills },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.userData));
    } catch (err) {
      setError(err.response.data);
    }
  };

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const SectionHeader = ({ title, icon }) => (
    <div className="flex items-center gap-2 mb-6 mt-2">
      <div className="p-2 bg-[#FF416C]/10 rounded-lg text-[#FF416C]">
        {icon}
      </div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mb-20 px-4 pt-4">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        {/* Left Side: The "Studio" Form */}
        <div className="w-full lg:w-[60%] space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <header className="flex flex-col gap-2 mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
              Profile Studio
            </h1>
            <p className="text-gray-500 font-medium max-w-md">
              Refine your digital presence. Manage your skills, identity, and
              story to attract the right connections.
            </p>
          </header>

          <div className="bg-[#1A1C23]/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-3xl">
            {/* Identity Section */}
            <SectionHeader
              title="Identity"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                  First Name
                </label>
                <div className="relative">
                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-2xl px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)]"
                  />
                </div>
              </div>
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-2xl px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)]"
                  />
                </div>
              </div>
            </div>

            {/* Media & Stats Section */}
            <SectionHeader
              title="Assets & Details"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              }
            />

            <div className="space-y-6 mb-8">
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                  Profile Image Source
                </label>
                <input
                  name="photoUrl"
                  value={profile.photoUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-2xl px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                    Current Age
                  </label>
                  <input
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    type="number"
                    className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-2xl px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)]"
                  />
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                    Gender Identity
                  </label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-2xl px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)] appearance-none cursor-pointer"
                  >
                    <option value="male" className="bg-[#1A1C23]">
                      Male
                    </option>
                    <option value="female" className="bg-[#1A1C23]">
                      Female
                    </option>
                    <option value="others" className="bg-[#1A1C23]">
                      Others
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Narrative & Skills Section */}
            <SectionHeader
              title="Narrative & Stack"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              }
            />

            <div className="group space-y-2 mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[#FF416C] transition-colors">
                About your journey
              </label>
              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/20 border border-white/5 group-focus-within:border-[#FF416C]/50 focus:outline-none rounded-[1.5rem] px-5 py-4 text-white font-medium transition-all group-focus-within:shadow-[0_0_20px_rgba(124,140,253,0.1)] resize-none leading-relaxed"
              />
            </div>

            <div className="group space-y-4 mb-10">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-[FF416C] transition-colors">
                Professional Skills
              </label>
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g. React, Docker...)"
                  className="flex-grow bg-black/20 border border-white/5 group-focus-within:border-[#7C8CFD]/50 focus:outline-none rounded-2xl px-5 py-3 text-white font-medium transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#7C8CFD]/20 border border-[#7C8CFD]/30 text-[#7C8CFD] rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#7C8CFD] hover:text-white transition-all"
                >
                  Add
                </button>
              </form>

              <div className="flex flex-wrap gap-2 min-h-12 p-4 bg-black/10 rounded-2xl border border-white/5">
                {profile.skills.length === 0 && (
                  <span className="text-gray-600 text-[10px] uppercase font-bold italic py-2">
                    No skills added yet
                  </span>
                )}
                {profile.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl group/chip hover:bg-white/10 transition-colors"
                  >
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {skill}
                    </span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>{error}</div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCommit}
                className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#7C8CFD] hover:text-white transition-all shadow-2xl hover:shadow-[#7C8CFD]/40 active:scale-95 text-xs"
              >
                Commit Changes
              </button>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">
                Last updated just now
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Preview */}
        <div className="w-full lg:w-[400px] lg:sticky lg:top-32 flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
          <div className="relative w-full group">
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#7C8CFD]/20 via-[#EC4899]/10 to-transparent blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Profile Showcase
                </span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7C8CFD]/60 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-white/10"></div>
                  <div className="w-1 h-1 rounded-full bg-white/10"></div>
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-transform duration-500">
                <UserCard
                  user={{
                    ...profile,
                    age: parseInt(profile.age) || 0,
                  }}
                  isPreview={false}
                />
              </div>

              <div className="mt-8 bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group-hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C8CFD] to-[#EC4899] flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(124,140,253,0.3)]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold uppercase tracking-tight">
                    Studio Preview
                  </span>
                  <span className="text-gray-500 text-[10px] font-medium">
                    Synced with your local changes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
