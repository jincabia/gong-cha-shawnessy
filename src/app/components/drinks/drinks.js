'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { styled } from '@mui/system';
import ImageComponent from '../image/ImageComponent';
import { useAuth } from '@/app/authContext/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { grey, red } from "@mui/material/colors";
import Image from 'next/image';



// const CustomDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     borderRadius: '8px',
//     padding: theme.spacing(2),
//     backgroundColor: '#d6d6d6', // Dark red background to match Gong Cha theme
//     color: '#000000',
//   },
//   '& .MuiDialogTitle-root': {
//     fontWeight: 'bold',
//   },
//   '& .MuiDialogContentText-root': {
//     color: '#000000',
//   },
//   '& .MuiDialogActions-root': {
//     justifyContent: 'space-between',
//   },
//   '& .MuiButton-root': {
//     color: '#FFFFFF',
//     borderColor: 'black',
//   },
// }));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    padding: theme.spacing(2),
    backgroundColor: '#dddddd',
    color: '#000000',
  },
  '& .MuiDialogTitle-root': {
    fontWeight: 'bold',
  },
  '& .MuiDialogContentText-root': {
    color: '#000000',
  },
  '& .MuiDialogActions-root': {
    justifyContent: 'center',
  },
  '& .MuiButton-root': {
    color: '#FFFFFF',
    backgroundColor: red[900],
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}));

const Drink = ({ name, price, id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [showPopup, setPopup] = useState(false);

  const handleClick = () => {
    if (user) {
      router.push(`/menu/${id}`);
    } else {
      setPopup(true);
    }
  };

  const handleSigninRedirect = () => {
    router.push('/signin');
  };

  const handleClose = () => {
    setPopup(false);
  };

  return (
    <div className='h-64'>
      <button onClick={handleClick}>
        <div className='sm:w-64 md:w-52 h-min p-4 rounded-lg shadow-xl flex flex-col items-center justify-between text-center'>
          <div className='flex justify-center items-center'>
            <ImageComponent imagePath={`${name}.png`} />
          </div>
        </div>
        <div className='flex items-start justify-around mt-4'>
          <h1 className='text-black font-semibold w-3/4 text-xs mb-2'>{name}</h1>
        </div>
      </button>
      
      <div className=' w-1/4 lg:w-1/8 mx-auto'>
      
        <CustomDialog open={showPopup} onClose={handleClose} maxWidth="sm">

      
          
          <div className='flex justify-between items-center'>
            <DialogTitle>Sign In Required</DialogTitle>
            <button onClick={handleClose} className=' pb-10'>
              <CloseIcon sx={{ color: 'black', fontSize: 20 }} />
            </button>
          </div>
          <DialogContent>
            <DialogContentText>
              <p className='text-sm text-slate-600'>
                To continue, you will need to sign in.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleSigninRedirect} className='bg-red-800 rounded-md py-2 px-4 text-white shadow-md'>
              Sign in
            </button>
            {/* <Button onClick={handleSigninRedirect} variant="contained">
              Sign In
            </Button> */}
          </DialogActions>
        </CustomDialog>

      </div>
     
    </div>
  );
};

export default Drink;

