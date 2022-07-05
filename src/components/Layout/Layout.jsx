import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ProductViewModal from "../Product/ProductViewModal";

import Routes from "../../routes/Routes";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "fashion-shop-app-9d900",
  storageBucket: "fashion-shop-app-9d900.appspot.com",
  messagingSenderId: "607985441440",
  appId: "1:607985441440:web:369f7ad0e910288aed07c5",
  measurementId: "G-NRWKYYTCF9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
