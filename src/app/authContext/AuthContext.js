// AuthContext.js
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { app } from '../_utils/firebase';

const auth = getAuth(app);


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    firebaseSignOut(auth).then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);
