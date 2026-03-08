import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Exfeed from "./components/Exfeed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import AuthContainer from "./components/AuthContainer";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<AuthContainer />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
