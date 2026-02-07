import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const filteredConnections = connections.filter(
    (c) =>
      `${c.firstName} ${c.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  );
  return (
    connections && (
      <div className="w-full max-w-6xl mx-auto mb-20 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Dynamic Background Blurs */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#7C8CFD]/10 blur-[120px] rounded-full pointer-events-none opacity-30"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-[#EC4899]/5 blur-[100px] rounded-full pointer-events-none opacity-20"></div>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#7C8CFD]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7C8CFD]/80">
                Connected Network
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-sm">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/10">
                Connections
              </span>
            </h1>
            <p className="text-gray-500 font-medium text-sm md:text-base max-w-sm border-l-2 border-white/5 pl-4 py-1">
              Browse and communicate with the developers you've synced with.
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 group-focus-within:text-[#7C8CFD] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter by name or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1C23]/80 backdrop-blur-md border border-white/5 focus:border-[#7C8CFD]/40 focus:outline-none rounded-[1.5rem] py-4 pl-12 pr-6 text-sm text-white transition-all group-focus-within:ring-4 ring-[#7C8CFD]/5 shadow-2xl"
            />
          </div>
        </header>

        {filteredConnections.length === 0 ? (
          <div className="bg-[#1A1C23]/20 border border-dashed border-white/5 rounded-[3.5rem] p-32 text-center flex flex-col items-center backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-[#7C8CFD]/10 rounded-full animate-ping opacity-20"></div>
              <svg
                className="w-10 h-10 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-3">
              No Connections
            </h3>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest max-w-[200px] leading-relaxed">
              No matching nodes found in your localized segment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConnections.map((conn) => (
              <div
                key={conn._id}
                className="group relative bg-gradient-to-b from-[#1A1C23]/80 to-[#1A1C23]/40 backdrop-blur-2xl border border-white/5 hover:border-[#7C8CFD]/40 rounded-[3rem] p-8 transition-all duration-700 hover:-translate-y-3 overflow-hidden shadow-2xl"
              >
                {/* Artistic Background Overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7C8CFD]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#7C8CFD]/5 rounded-full blur-[80px] group-hover:bg-[#7C8CFD]/15 transition-all duration-700"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Profile Image with Layered Shadows */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7C8CFD] to-[#EC4899] rounded-[2.2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 scale-110"></div>
                    <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden ring-1 ring-white/10 group-hover:ring-[#7C8CFD]/40 transition-all duration-700 shadow-3xl">
                      <img
                        src={conn.photoUrl}
                        alt={conn.firstName}
                        className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110 group-hover:rotate-2"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#111827] rounded-full flex items-center justify-center p-1 border-2 border-[#1A1C23]">
                      <div className="w-full h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-white font-black text-2xl tracking-tighter group-hover:text-white transition-colors">
                      {conn.firstName}{" "}
                      <span className="text-white/30 font-medium">
                        {conn.lastName}
                      </span>
                    </h3>
                    <div className="flex justify-center items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C8CFD] opacity-40"></span>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                        Verified Peer
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs font-medium leading-relaxed mb-8 line-clamp-2 px-2 italic">
                    "{conn.about}"
                  </p>

                  {/* Tags with unique styling */}
                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {conn.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] bg-black/20 border border-white/5 px-4 py-2 rounded-2xl group-hover:border-[#7C8CFD]/30 group-hover:text-[#7C8CFD] group-hover:bg-[#7C8CFD]/5 transition-all duration-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Creative CTA */}
                  <button className="relative w-full overflow-hidden group/btn px-8 py-5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[1.8rem] transition-all duration-500 hover:text-white hover:border-transparent active:scale-95 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7C8CFD] to-[#6B7AE8] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center gap-3">
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Chat
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Connections;
