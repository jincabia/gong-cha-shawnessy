// Popup when click on a drink
'use client'
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const SignUpDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Customize Drink
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Sign Up Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To customize your drink, you will need to sign up.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
