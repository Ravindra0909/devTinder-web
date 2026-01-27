import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("stokes@gmail.com");
  const [password, setPassword] = useState("Stokes@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));

      return navigate("/");
    } catch (error) {
      setError(error.response.data);

      console.error("Login failed:", error);
    }
  };
  return (
    <div className="card bg-base-300 w-full max-w-sm shadow-2xl border border-white/5 align-middle mx-auto my-10">
      <div className="card-body p-10 gap-8">
        <h2 className="text-center text-3xl font-semibold text-gray-200">
          Login
        </h2>

        <div className="space-y-6">
          <div className="form-control w-full">
            <label className="label px-1">
              <span className="label-text text-gray-300 text-sm font-medium">
                Email ID
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full bg-[#1A1F26] border-gray-700 focus:border-[#7C8CFD] focus:outline-none transition-all duration-200"
            />
          </div>

          <div className="form-control w-full">
            <label className="label px-1">
              <span className="label-text text-gray-300 text-sm font-medium">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full bg-[#1A1F26] border-gray-700 focus:border-[#7C8CFD] focus:outline-none transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#7C8CFD] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="card-actions justify-center pt-4">
            <button
              onClick={handleLogin}
              className="btn btn-primary w-full bg-[#7C8CFD] hover:bg-[#6B7AE8] border-none text-white font-bold text-lg shadow-lg shadow-[#7C8CFD]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
