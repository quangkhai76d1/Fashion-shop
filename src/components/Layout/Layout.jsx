import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ProductViewModal from "../Product/ProductViewModal";

import Routes from "../../routes/Routes";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

const Layout = () => {
  //Handle firebase

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("User is not logged in");
          return;
        }

        console.log("Loged in user:", user.displayName);
        const token = await user.getIdToken();
        console.log("Loged in user token", token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Header {...props} />
            <div className='container'>
              <div className='main'>
                <Routes />
              </div>
            </div>
            <Footer />
            <ProductViewModal />
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
