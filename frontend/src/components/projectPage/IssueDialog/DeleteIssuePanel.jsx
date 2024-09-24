import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import apiClient from '../../../api/apiClient';
import { useDispatch } from 'react-redux';
import { removeIssue } from '../../../redux/projectSlice';
import ConfirmationDialog from '../../general/ConfirmationDialog';

function DeleteIssuePanel({ issueDetail }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        apiClient.deleteIssue(issueDetail.id);
        dispatch(removeIssue(issueDetail))
    }

    const handleOpenConfirmationDialog = () => {
        setOpen(true)
    }

    const handleCloseConfirmationDialog = () => {
        setOpen(false)
    }

    return (
        <Box>
            <Typography variant='h6' mb={0}>Remove Issue</Typography>
            <Button color='error' size='large' onClick={handleOpenConfirmationDialog}>Delete Issue</Button>
            <Divider sx={{ mb: 2, mt: 3, borderColor: 'border.main' }} />
            <ConfirmationDialog
                open={open}
                handleClose={handleCloseConfirmationDialog}
                handleConfirm={handleDelete}
                title="Delete Issue"
                content="Are you sure you want to delete this issue?"
            />
        </Box>
    )
}

export default DeleteIssuePanel