import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      if (!firstName || !lastName || !emailId || !password) {
        setError("Registration data incomplete.");
        return;
      }

      if (password.length < 8) {
        setError("Password fails security audit (min 8).");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  return (
    <div className="card bg-[#161B22] w-full max-w-[480px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-[#FF416C]/10 animate-in fade-in slide-in-from-bottom-12 duration-1000 mx-auto rounded-[3.5rem] overflow-hidden">
      <div className="card-body p-10 md:p-14 gap-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            Join <span className="text-[#FF416C]">Network</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
            Scale your professional connections
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            {/* First Name */}
            <div className="form-control w-full group">
              <label className="label px-2 py-2">
                <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                  First Name
                </span>
              </label>
              <input
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ada"
                className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-900 transition-all rounded-[1.5rem] text-sm font-medium"
              />
            </div>

            {/* Last Name */}
            <div className="form-control w-full group">
              <label className="label px-2 py-2">
                <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                  Last Name
                </span>
              </label>
              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lovelace"
                className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-900 transition-all rounded-[1.5rem] text-sm font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control w-full group">
            <label className="label px-2 py-2">
              <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                Network ID (Email)
              </span>
            </label>
            <input
              name="email"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="ada.lovelace@first.dev"
              className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-900 transition-all rounded-[1.5rem] text-sm font-medium"
            />
          </div>

          {/* Password */}
          <div className="form-control w-full group">
            <label className="label px-2 py-2">
              <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                Create Password
              </span>
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-900 transition-all rounded-[1.5rem] text-sm font-medium"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
              <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] border-none text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_-10px_rgba(255,65,108,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(255,65,108,0.5)] transition-all transform active:scale-[0.98] h-16 rounded-[1.5rem] group mt-4"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span>Deploy Profile</span>
            )}
          </button>
        </form>

        {/* Switch */}
        <div className="text-center pt-2">
          <button
            onClick={onSwitchToLogin}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-[#FF416C] transition-colors"
          >
            Existing Identity?
            <span className="text-[#FF416C] ml-2">Authorize Here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
