import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
const Signin = () => {
  return (
    <div className='sign-in'>
      <h2>Login Form</h2>
      <p>or login with social accounts</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Signin;
