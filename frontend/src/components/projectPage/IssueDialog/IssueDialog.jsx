import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Grow, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import apiClient from '../../../api/apiClient';

function IssueDialog({ open, handleClose, item }) {
    const [issueDetail, setIssueDetail] = useState(null);

    useEffect(() => {
        if (open) {
            const fetchIssueDetail = async () => {
                try {
                    const response = await apiClient.getIssueDetail(item.id);
                    console.log(response);
                    setIssueDetail(response.data);
                } catch (error) {
                    console.error('Error fetching issue detail:', error);
                }
            };
            fetchIssueDetail();
        }
    }, [open, item.id]);

    console.log(issueDetail);

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
                sx: { height: '85vh', maxWidth: '85vw', borderRadius: '5px', border: '1px solid', borderColor: 'border.secondary' }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'text.primary'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>Priority: {item.priority}</Typography>
            </DialogContent>
        </Dialog>
    )
}

export default IssueDialog