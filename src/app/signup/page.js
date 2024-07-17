'use client'
import { useState,useRef  } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { useAuth } from '../authContext/AuthContext';
import { writeUserData } from '../components/writeuserdata/writeuserdata';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



/**
 * // Work on Error Handling, Sign up Page
  // Work on Styling this page as well
 * 
 */

const Signup = ({ message }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const { user, signOut } = useAuth();

  const router = useRouter();

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const [msg,setMsg] = useState('');

  

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError(null); // Clear any previous errors
        // console.log('Signed in user:', user);
        writeUserData(user);
        router.push('/signin')

      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign-in error:', error);
      });
  };

  const handleErrorMsg = (message) =>
  {
    if(message === 'Firebase: Error (auth/email-already-in-use).')
    {
      setError('Email already in use.');
    }

  }

  const signUpWithEmail = (e) => {
    e.preventDefault();
    setError('')
    setMsg('')
    if(!email)
    {
      setError('Please enter an email.')
      emailRef.current.focus();
      return;
    }

    if(!password || !confirmPassword)
    {
      setError("Please enter a password")
      passRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      confirmPassRef.current.focus();
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(null); // Clear any previous errors
        // console.log('Signed up user:', user);
        writeUserData(user);
        console.log(user);
        sendEmailVerification(user)
          .then(() => {
            // console.log('Email verification sent!');
            
            setMsg('A verification email has been sent to your email address.');
            setError('')
            auth.signOut(); // Sign out the user immediately
          })
          // Error in email verification sending
          .catch((error) => {

            setError(error.message);
            // console.error('Email verification error:', error);
          });
        })
        .catch((error) => {
          // console.log(error)
        handleErrorMsg(error.message)
        // setError(error.message);
        // console.error('Sign-up error:', error);
      });
  };


  return (
    <div className=" items-center justify-center h-max   pb-10 "> {/**bg-gray-50 */}
     <button onClick={()=> router.back()} className='m-2 text-black'>
                <ChevronLeftIcon fontSize='large'/>
            </button>
      <div className='flex flex-col text-black  h-max  text-center mx-auto  rounded-lg shadow-md p-10 py-50 bg-gray-100 lg:w-2/5 lg:mx-auto'> {/**bg-white */}

            <div className='text-center justify-center mx-auto pb-3'>
                <Image src={'/RedGongChaLogo.png'}
                    width={100}
                    height={100}
                    alt='Gong Cha Logo'
                />
            </div>

            <h1 className="text-3xl text-red-800 font-semibold pb-5">Sign Up!</h1>

            <form className="flex flex-col " onSubmit={signUpWithEmail}>
                <input
                    type="email"
                    ref={emailRef}
                    className={`rounded-md py-2 px-3 mb-5 border ${error && email === '' ? 'border-red-500' : 'border-gray-300'} `}
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    ref={passRef}
                    className={`rounded-md py-2 px-3 mb-5 border ${error && password === '' ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    ref={confirmPassRef}
                    className={`rounded-md py-2 px-3 mb-5 border ${error && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="bg-red-800 text-white rounded-md py-2 px-3 mb-3">
                    Sign Up
                </button>

                {error && <div className="text-red-600 my-4">{error}</div>}
                {msg && <div className="text-slate-600 my-4">{msg}</div>}

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

            <button onClick={() => router.push('/signin')} className="bg-slate-600 text-white rounded-md py-2 px-3 mb-3">
                  Sign in to your Account
                </button>

            
      </div>
    </div>
  );
};

export default Signup;
