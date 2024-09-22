// ConfirmDialog.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ open, handleClose, handleConfirm, title, content }) => {

    const handleBackdropClick = (event) => {
        // Check if the click happened outside the dialog content
        if (event.target === event.currentTarget) {
            handleClose(); // close dialog if clicked outside
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            onClick={handleBackdropClick}
            PaperProps={{ style: { padding: '5px 20px 15px 20px' } }}
        >
            <DialogTitle sx={{ textAlign: 'center', color: 'primary.main', fontSize: '1.5rem' }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-evenly' }}>
                <Button onClick={handleClose} color="secondary" size='large' sx={{ fontWeight: 600 }}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="text.secondary" size='large' sx={{ fontWeight: 600 }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
