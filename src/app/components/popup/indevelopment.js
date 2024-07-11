import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

export const ProgressPopup = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={handleClose}

    //   PaperProps={{
    //     style: { borderRadius: 10, padding: 20 }
    //   }}
    >

    <div className='justify-center mx-auto py-2'>

        <Image src={'/RedGongChaLogo.png'}
                width={60}
                height={60}
                alt='Gong Cha Logo'
                
        />
    </div>

      {/* <DialogTitle style={{ textAlign: 'start', fontWeight: 'bold' }}>Notice</DialogTitle> */}
      <DialogContent style={{ textAlign: 'start', color: '#555' }}>
       This project is still in development.

       <p className='font-semibold text-black my-2'>
        Ordering ahead has not yet been implemented.
       </p>

        <div className='flex flex-col mb-2 text-black '>
            
            <p className='  w-full text-sm'> 
                Though you are able to customize your drinks, then call
            </p>
            <p className=' font-semibold text-md my-2'> {`(403) 453-4273`}  to order ahead. </p>
        </div>
       Thank you for your understanding.
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <button 
        className='bg-red-800 rounded-md py-2 px-4 text-white shadow-md' 
        onClick={handleClose}
        > 
            Close
        </button>
        {/* <Button variant="contained" onClick={handleClose} style={{ borderRadius: 20, padding: '5px 20px' }}>
          Close
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
