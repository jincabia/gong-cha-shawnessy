'use client'
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../authContext/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const { user, signOut } = useAuth();

  const signInWithEmail = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(null); // Clear any previous errors
        console.log('Signed in user:', user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };

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
      <h2>Sign In</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <h2>Or</h2>
      <form onSubmit={signInWithEmail}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
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
