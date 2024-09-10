import React, { useState } from 'react';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';

const AuthComponent: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      {isSignIn ? <SignInComponent onSwitch={handleToggle} /> : <SignUpComponent onSwitch={handleToggle} />}
    </>
  );
};

export default AuthComponent;
