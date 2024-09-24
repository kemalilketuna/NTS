import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { PiWarningDiamondFill } from "react-icons/pi";
import { useTheme } from '@mui/material/styles';

const ConfirmationDialog = ({ open, handleClose, handleConfirm, title, content }) => {
    const theme = useTheme();

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
            PaperProps={{
                sx: {
                    padding: '5px 20px 10px 20px', width: '30vw', borderRadius: '5px', border: `1px solid ${theme.palette.border.main}`,
                    backgroundColor: theme.palette.background.main, // Set background to background.main
                }
            }}
        >
            <DialogTitle sx={{ color: 'text.secondary', fontSize: '1.5rem', display: 'flex', alignItems: 'center', paddingBottom: '7px' }}>
                <PiWarningDiamondFill size={24} color={theme.palette.secondary.main} style={{ marginRight: '8px', marginBottom: '6px' }} />
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1rem', fontWeight: 500, color: 'text.secondary', opacity: 0.85 }}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    onClick={handleConfirm}
                    variant='contained'
                    color="secondary"
                    size='small'
                    sx={{
                        minWidth: '55px',
                        fontSize: '1rem',
                        padding: '0px',
                        borderRadius: '4px'
                    }}
                >
                    Ok
                </Button>
                <Button onClick={handleClose} color="text" size='large' sx={{ mt: 0.5, fontWeight: 600, opacity: 0.65 }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default ConfirmationDialog;
