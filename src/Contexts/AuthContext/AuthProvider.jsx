import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth)
  }

  const UpdateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  const updatePass = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // Observer
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => {
      unSubscriber();
    };
  }, []);

  const AuthInfo = {
    user,
    loading,
    registerUser,
    logIn,
    googleLogin,
    logOut,
    UpdateUserProfile,
    updatePass,
  };

  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;
