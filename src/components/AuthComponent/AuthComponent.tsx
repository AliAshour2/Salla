import React, { useState } from "react";
import SignUpComponent from "./SignUp/SignUpComponent";
import SignInComponent from "./SignIn/SignInComponent";

interface AuthComponentProps {
  isSignIn: boolean; // Prop to decide the initial form
}

const AuthComponent: React.FC<AuthComponentProps> = ({ isSignIn: initialIsSignIn }) => {
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      {isSignIn ? (
        <SignInComponent onSwitch={handleToggle} />
      ) : (
        <SignUpComponent onSwitch={handleToggle} />
      )}
    </>
  );
};

export default AuthComponent;
