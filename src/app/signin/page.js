'use client';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { writeUserData } from '../components/writeuserdata/writeuserdata';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signUpWithEmail = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError(null);
        console.log('Signed up user:', user);
        await writeUserData(user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-up error:', error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        setUser(user);
        setError(null);
        console.log('Signed in user:', user);
        await writeUserData(user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center m-10 pt-36" style ={{color: 'black'}}>
      <h1 className="text-2xl text-red-800 py-4 font-bold">Sign In</h1>
      <form className="pb-5 flex flex-col">
        <input 
          className="rounded-md py-2 px-3 my-2 shadow-md" 
          type="text" 
          placeholder="Email" />
        <input 
          className="rounded-md py-2 px-3 my-2 shadow-md" 
          type="text" 
          placeholder="Password" />
        <div className="flex flex-row">
          
        </div>
      </form>
      <button className="bg-red-800 text-white py-2 px-4 rounded-md shadow-md" onClick={signInWithGoogle}>Sign in with Google</button>
      {user && <div>Signed in as: {user.displayName}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default Auth;
