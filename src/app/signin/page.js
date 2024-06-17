'use client'
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../authContext/AuthContext';

const SignIn = ({message}) => {
  const [error, setError] = useState(null);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const { user, signOut } = useAuth();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError(null); // Clear any previous errors
        console.log('Signed in user:', user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };

  return (
    <div className="flex flex-col text-black py-36 w-64">
      <h1>{message}</h1>
      <h2 className="text-2xl text-red-800 font-semibold pb-5">Sign In</h2>
      <form className="flex flex-col">
        <input 
          type="text"
          className="rounded-md py-2 px-3 mb-3"
          placeholder="Email" />
        <input 
          type="password"
          className="rounded-md py-2 px-3 mb-5"
          placeholder="Password" />
      </form>
      <button 
        className="bg-red-800 text-white rounded-md py-2 px-3" 
        onClick={signInWithGoogle}>
          Sign in with Google
      </button>
      {user && (
        <div>
          <div>Signed in as: {user.email}</div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default SignIn;
