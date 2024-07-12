'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Image from "next/image";
import {sendPasswordResetEmail,getAuth } from "firebase/auth";




export default  function PasswordRecovery()
{
    const router = useRouter();
    const [message,setMessage] = useState('')
    const [errorMsg,setError] = useState('')
    
    const auth = getAuth();

    

    const [email, setEmail] = useState('');

    const resetPassword = (e) => {
        e.preventDefault();
        if(email.trim() === "")
        {
            setError('Please Enter Email');
            return;
        }
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setError('');
            setMessage('Password reset email sent!');
          })
          .catch((error) => {
            setMessage('');
            setError(error.message);
            // console.error('Password reset error:', error);
          });
      };


    

    return(
        <div>
            <button onClick={()=> router.back()} className='m-2 text-black'>
                <ChevronLeftIcon fontSize='large'/>
            </button>

            <div className='flex flex-col text-black py-10 w-screen text-center mx-auto rounded-lg shadow-md p-10 py-50 bg-gray-100 lg:w-2/5 lg:mx-auto'>

        <div className=' text-center justify-center mx-auto pb-3'>

          <Image src={'/RedGongChaLogo.png'}
          width={100}
          height={100}
          alt='Gong Cha Logo'
          
          />

        </div>

          
          <h1 className="text-3xl text-red-800 font-semibold pb-5  ">Password Recovery</h1>
            <form className="flex flex-col" onSubmit={resetPassword}>
              <input
                type="text"
                className="rounded-md py-2 px-3 mb-5"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <button type="submit" className="bg-red-800 text-white rounded-md py-2 px-3 mb-3 ">
                Sign In
              </button>
            
            </form>
            {errorMsg && (
                <p className="text-red-500 text-center underline">
                    {errorMsg}
                </p>
            )}
            {message &&(
                <p className="text-center underline ">{message}</p>
            )}

            

      </div>


        </div>

        


    );
}