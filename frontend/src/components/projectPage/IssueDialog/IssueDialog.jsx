import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Grow, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import apiClient from '../../../api/apiClient';
import IssueDialogContent from './IssueDialogContent';

function IssueDialog({ open, handleClose, item }) {
    const [issueDetail, setIssueDetail] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (open) {
            const fetchIssueDetail = async () => {
                try {
                    const data = await apiClient.getIssueDetail(item.id);
                    setIssueDetail(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching issue detail:', error);
                }
            };
            fetchIssueDetail();
        }
    }, [open, item]);

    if (loading) {
        return <></>
    }
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
                sx: {
                    height: '85vh', maxWidth: '85vw', borderRadius: '5px', border: '1px solid', borderColor: 'border.secondary',
                    '& .MuiDialogContent-root': {
                        backgroundColor: 'background.default'
                    }
                }
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
                <IssueDialogContent issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            </DialogContent>
        </Dialog>
    )
}

export default IssueDialog