import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Grow, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import apiClient from '../../../api/apiClient';
import IssueDialogContent from './IssueDialogContent';

function IssueDialog({ open, handleClose, item }) {
    const [issueDetail, setIssueDetail] = useState(null);

    useEffect(() => {
        if (open) {
            const fetchIssueDetail = async () => {
                try {
                    const response = await apiClient.getIssueDetail(item.id);
                    setIssueDetail(response.data);
                } catch (error) {
                    console.error('Error fetching issue detail:', error);
                }
            };
            fetchIssueDetail();
        }
    }, [open, item.id]);

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

            <DialogContent>
                <IssueDialogContent issueDetail={issueDetail} />
            </DialogContent>
        </Dialog>
    )
}

export default IssueDialog