import { useState } from "react";
import Login from "./Login";
import SignUpPage from "./SignUpPage";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLogin ? (
        <Login onSwitchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUpPage onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthContainer;
