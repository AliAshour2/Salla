import React, { useState } from 'react';

import SignUpComponent from './SignUp/SignUpComponent';
import SignInComponent from './SignIn/SignInComponent';







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
