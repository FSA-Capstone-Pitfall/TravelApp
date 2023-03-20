import React, { useState } from 'react';
import LoginDialog from './LoginDialog';
import SignupDialog from './SignupDialog';

function AuthDialog({ mode, open, onClose }) {
  const [isLoginShown, setIsLoginShown] = useState(mode === 'login');

  const toggleDialog = () => {
    setIsLoginShown(!isLoginShown);
  };

  return (
    <>
      {isLoginShown ? (
        <LoginDialog
          open={open}
          onClose={onClose}
          toggleDialog={toggleDialog}
        />
      ) : (
        <SignupDialog
          open={open}
          onClose={onClose}
          toggleDialog={toggleDialog}
        />
      )}
    </>
  );
}

export default AuthDialog;
