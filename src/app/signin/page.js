'use client'
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, } from "firebase/auth";import { useAuth } from '../authContext/AuthContext';
import { writeUserData } from '../components/writeuserdata/writeuserdata';
import GoogleIcon from '@mui/icons-material/Google';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import { grey, red } from "@mui/material/colors";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * // Work on Error Handling, Sign up Page
  // Work on Styling this page as well
 * 

  Work on when the user is logged in
 */

const SignIn = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const { user, signOut } = useAuth();

  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError(null); // Clear any previous errors
        console.log('Signed in user:', user);
        writeUserData(user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };


  const signInWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          setError('Please verify your email before logging in.');
          auth.signOut(); // Optionally sign out the user immediately
        } else {
          setError(null); // Clear any previous errors
          console.log('Signed in user:', user);
          writeUserData(user);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };
  

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('Password reset email sent!');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Password reset error:', error);
      });
  };

  

  return (
    <div className="h-max py-10">


      {user ? (
        <>
          <h1>Hi You are Already Signed In!</h1>
          <p>Start browsing the menu or check out your cart or profile stuff</p>
          <div>
            <div>Signed in as: {user.email}</div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </>
      ) : (
        <>

        
        

        <div className='flex flex-col text-black py-10 w-min text-center mx-auto rounded-lg shadow-md p-10 py-50 bg-gray-100'>

          <div className=' text-center justify-center mx-auto pb-3'>

            <Image src={'/RedGongChaLogo.png'}
            width={100}
            height={100}
            alt='Gong Cha Logo'
            
            />

          </div>

            
            <h1 className="text-3xl text-red-800 font-semibold pb-5  ">Welcome Back!</h1>
            <p className='pb-5 text-slate-400 text-xs'>Sign in to start Customizing Drinks</p>
              <form className="flex flex-col" onSubmit={signInWithEmail}>
                <input
                  type="text"
                  className="rounded-md py-2 px-3 mb-5"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="rounded-md py-2 px-3 mb-5"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-red-800 text-white rounded-md py-2 px-3 mb-3 ">
                  Sign In
                </button>
              
                <button onClick={resetPassword} className="text-slate-600 my-5">
                  Forgot Password?
                </button>
              </form>

              <div className='flex items-center justify-between pb-5'>
                <div className='flex-grow border-t border-slate-300'></div>
                <span className='mx-4 text-sm text-slate-600'>or</span>
                <div className='flex-grow border-t border-slate-300'></div>
              </div>

              <button
                className="bg-red-800 text-white rounded-md py-2 mb-5 px-3 flex items-center space-x-2"
                onClick={signInWithGoogle}
              >
                <div className="flex-shrink-0">
                  <GoogleIcon />
                </div>
                <div className="flex-grow text-center">
                  <h1>Continue With Google</h1>
                </div>
              </button>

              <button onClick={() => router.push('/signup')} className="bg-slate-600 text-white rounded-md py-2 px-3 mb-3">
                  Create an Account
              </button>

        </div>

        
        
        </>
      )}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default SignIn;
