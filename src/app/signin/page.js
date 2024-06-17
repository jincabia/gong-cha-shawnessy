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
    <div className='text-black'>

      <h1>{message}</h1>
      <h2>Sign In</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      
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
