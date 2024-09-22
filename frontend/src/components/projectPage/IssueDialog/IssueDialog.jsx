import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Grow } from '@mui/material';

function IssueDialog({ open, handleClose, item }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Grow}
            TransitionProps={{
                timeout: 500,
            }}
            fullWidth
            PaperProps={{
                sx: { height: '85vh', maxWidth: '85vw', borderRadius: '5px', border: '1px solid', borderColor: 'border.main' }
            }}
        >
            <DialogTitle>{item.title}</DialogTitle>
            <DialogContent>
                <Typography>Priority: {item.priority}</Typography>
            </DialogContent>
        </Dialog>
    )
}

export default IssueDialog