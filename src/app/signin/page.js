'use client'
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, } from "firebase/auth";
import { useAuth } from '../authContext/AuthContext';
import { writeUserData } from '../components/writeuserdata/writeuserdata';
import GoogleIcon from '@mui/icons-material/Google';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import { grey, red } from "@mui/material/colors";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

  const errorMsgHandling = (msg) =>
  {
    if (msg === 'Firebase: Error (auth/invalid-email).')
    {
      setError('Please enter a valid Email Address');
    }

    if(msg ==='Firebase: Error (auth/missing-password).')
    {
      setError('Please enter a valid Password');
    }

    if(msg ==='Firebase: Error (auth/invalid-credential).')
    {
      setError('Account Not Found')
    }
    else console.log(msg)
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError(null); // Clear any previous errors
        // console.log('Signed in user:', user);
        router.back();
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
          // console.log('Signed in user:', user);
          router.push('/')
          writeUserData(user);
        }
      })
      .catch((error) => {
        errorMsgHandling(error.message);
        console.error('Sign-in error:', error);
      });
  };
    

  return (
    <div className="h-max pb-10 ">

            <button onClick={()=> router.back()} className='m-2 text-black'>
                <ChevronLeftIcon fontSize='large'/>
            </button>

      


      {user ? (
        <>
        
          
          <main className='text-black p-4 flex flex-col mx-auto md:w-5/12 lg:w-fit  '>

          
            <h1 className='sm:text-large md:text-2xl font-bold mb-4 border-b-2 border-slate-300 lg:w-fit text-center mx-auto  '>
              {"Hi, you're all ready to get started!"}
              </h1>

            {/* TODO */}

            <div className='bg-gray-100 p-4 rounded-lg my-5 shadow-md lg:w-full md:w-full text-center mx-auto'>
              <div className='mb-2'>
                <div className='text-lg font-medium'>Start Browsing the Menu.</div>
              </div>
              <button className=" bg-red-800 rounded-md py-2 px-4 text-white shadow-md w-full" 
            onClick={()=> router.push('/menu')}>Browse the menu</button>
            </div>

            <div className='bg-gray-100 p-4 rounded-lg my-5 shadow-md lg:w-full md:w-full text-center mx-auto '>
              <div className='mb-4'>
                <div className='text-sm text-gray-600'>Signed in as:</div>
                <div className='font-medium'>{user.email}</div>
              </div>
              <button
                onClick={signOut}
                className='bg-red-800 rounded-md py-2 px-4 text-white shadow-md w-full'
              >
                Sign Out
              </button>
            </div>

          </main>
          
        </>
      ) : (
        <>

        
        

        <div className='flex flex-col text-black py-10 w-screen text-center mx-auto rounded-lg shadow-md p-10 py-50 bg-gray-100 lg:w-2/5 lg:mx-auto'>


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

                {error && <div className="text-center"
                style={{ color: 'red' }}>Error: {error}</div>}
              
              </form>
                <button onClick={()=>router.push('/passwordrecovery')} className="text-red-900 font-medium my-5  w-fit mx-auto">
                  Forgot Password?
                </button>

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

              <button onClick={() => router.push('/signup')} className="bg-slate-600 text-white rounded-md py-2 px-3 mb-3 ">
                  Create an Account
              </button>

        </div>

        
        
        </>
      )}
      
    </div>
  );
};

export default SignIn;
