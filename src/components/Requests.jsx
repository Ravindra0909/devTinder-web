import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => {
    return store.requests;
  });
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatRelativeTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 15) return "Just now";
      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d ago`;

      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    requests && (
      <div className="w-full max-w-4xl mx-auto mb-20 px-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-1 bg-[#EC4899] rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EC4899]">
                Inbound Signals
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.85] drop-shadow-2xl">
              Requests <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/10">
                Received
              </span>
            </h1>
          </div>

          <div className="relative group bg-[#1A1C23] border border-white/5 p-5 rounded-2xl shadow-xl min-w-[160px]">
            <span className="text-[8px] font-black uppercase text-gray-500 tracking-[0.3em] block mb-1">
              Queue Status
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tabular-nums tracking-tighter">
                {requests.length}
              </span>
              <span className="text-[10px] font-bold text-[#7C8CFD] uppercase">
                Pending
              </span>
            </div>
          </div>
        </header>

        {requests.length === 0 ? (
          <div className="bg-[#1A1C23]/20 border border-dashed border-white/5 rounded-[3rem] p-24 text-center flex flex-col items-center backdrop-blur-md">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-xs mb-2">
              Queue Empty
            </h3>
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              No active requests found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 relative">
            {requests.map((req) => {
              const { firstName, lastName, _id, photoUrl, skills, about } =
                req.fromUserId;
              return (
                <div
                  key={_id}
                  className="group relative bg-[#1A1C23]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-5 sm:p-6 flex flex-col md:flex-row items-center gap-8 transition-all duration-500 hover:border-white/10 hover:bg-[#1A1C23]/80"
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-6 w-full md:w-auto shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#7C8CFD]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={photoUrl}
                          alt={firstName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-white font-black text-2xl tracking-tight leading-none mb-2">
                        {firstName}{" "}
                        <span className="text-white/20 font-medium">
                          {lastName}
                        </span>
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest bg-white/5 px-2 py-1 rounded-md">
                          {formatRelativeTime(req.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio & Skills */}
                  <div className="flex-grow space-y-4 text-center md:text-left">
                    <p className="text-gray-400 text-sm font-medium leading-relaxed italic line-clamp-2">
                      "{about}"
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[8px] font-black text-[#7C8CFD] uppercase tracking-[0.2em] bg-[#7C8CFD]/5 border border-[#7C8CFD]/10 px-3 py-1.5 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <button
                      onClick={() => reviewRequest("rejected", req._id)}
                      className="flex-1 md:flex-none px-6 py-4 bg-white/5 text-gray-500 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-95"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", req._id)}
                      className="flex-1 md:flex-none px-8 py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-[#7C8CFD] hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {requests.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 opacity-20">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em]">
              Queue Termination
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default Requests;
