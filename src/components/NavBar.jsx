import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((store) => store.requests);
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (err) {
      // handle error by showing error page
    }
  };

  return (
    <header className="navbar bg-[#1A1C23]/80 backdrop-blur-md px-4 md:px-12 py-3 border-b border-white/5 sticky top-0 z-50 shadow-xl">
      {/* Brand */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-lg md:text-xl font-black tracking-tight uppercase italic flex items-center gap-2 text-gray-100 hover:text-white transition-colors"
        >
          <span className="text-[#7C8CFD]">#</span> DEV TINDER
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3 md:gap-5">
          {/* Welcome */}
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-gray-500">
            Welcome, <span className="text-gray-200">{user.firstName}</span>
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer relative"
            >
              <div className="w-9 md:w-10 rounded-full border-2 border-transparent hover:border-[#7C8CFD] transition-all">
                <img src={user.photoUrl} alt="profile" />
              </div>

              {/* Notification dot */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#EC4899] border-2 border-[#1A1C23] rounded-full"></div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-[100] p-2 shadow-2xl menu menu-sm dropdown-content bg-[#1A1C23] rounded-2xl w-60 border border-white/5 ring-1 ring-white/10 overflow-hidden"
            >
              <li className="menu-title text-gray-500 text-[10px] uppercase font-black px-4 py-3 tracking-[0.2em] bg-white/5 mb-1">
                DEV Control
              </li>

              <li>
                <Link
                  to="/profile"
                  className="py-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="py-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="py-3 rounded-xl hover:bg-[#EC4899]/10 text-[#EC4899] transition-all flex items-center justify-between"
                >
                  Requests
                  {requests && (
                    <span className="bg-[#EC4899] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                      {requests.length}
                    </span>
                  )}
                </Link>
              </li>

              <li className="border-t border-white/5 mt-2 pt-2 px-2">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-red-400 font-bold rounded-xl hover:bg-red-500/10 flex items-center gap-2 transition-all"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
