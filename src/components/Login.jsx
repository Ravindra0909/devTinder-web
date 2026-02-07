import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = ({ onSwitchToSignUp }) => {
  const [emailId, setEmailId] = useState("kohli@gmail.com");
  const [password, setPassword] = useState("Kohli@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-[#161B22] w-full max-w-[460px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-[#FF416C]/10 animate-in fade-in slide-in-from-bottom-12 duration-1000 mx-auto rounded-[3.5rem] overflow-hidden my-8">
      <div className="card-body p-10 md:p-14 gap-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,65,108,0.2)] hover:scale-105 transition-transform cursor-default">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </div>

          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            Dev<span className="text-[#FF416C]">Tinder</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
            Initialize Authorization
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="form-control w-full group">
            <label className="label px-2 py-2">
              <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                Developer Handle (Email)
              </span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
                setError("");
              }}
              placeholder="name@repository.dev"
              className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-800 transition-all rounded-[1.5rem] text-sm font-medium"
            />
          </div>

          {/* Password */}
          <div className="form-control w-full group">
            <label className="label px-2 py-2 flex justify-between">
              <span className="label-text text-gray-500 text-[10px] font-black uppercase tracking-widest group-focus-within:text-[#FF416C] transition-colors">
                Security Token
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] font-black text-[#FF416C]/50 hover:text-[#FF416C] transition-colors uppercase tracking-widest"
              >
                {showPassword ? "Mask" : "Unmask"}
              </button>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="input input-lg w-full bg-[#0A0B10]/50 border-white/5 focus:border-[#FF416C]/50 focus:outline-none placeholder:text-gray-800 transition-all rounded-[1.5rem] text-sm font-medium"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl animate-in zoom-in duration-300">
              <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] border-none text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_-10px_rgba(255,65,108,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(255,65,108,0.5)] transition-all transform active:scale-[0.98] h-16 rounded-[1.5rem]"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                Authenticate
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            )}
          </button>
        </form>
        <div className="text-center pt-2">
          <button
            onClick={onSwitchToSignUp}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-[#FF416C] transition-colors"
          >
            New Node?{" "}
            <span className="text-white border-b border-[#FF416C]/30 ml-2">
              Initialize Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
