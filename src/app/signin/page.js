'use client'
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user);
        setError(null); // Clear any previous errors
        console.log('Signed in user:', result.user);
        console.log('Access token:', token);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
    };

    const writeUidToFirestore = async (uid) => {
      try {
        // Specify the collection and document you want to add or update
        const docRef = doc(db, "users", uid);
    
        // Set the document data
        await setDoc(docRef, { uid }, { merge: true });
    
        console.log("Document written with UID: ", uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
      {user && <div>Signed in as: {user.displayName}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default SignIn;
