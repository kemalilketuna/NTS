import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import apiClient from '../../../api/apiClient'

const Comment = ({ comment }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: 'red' }}>
            <Typography variant='h6'>{comment.title}</Typography>
            <Typography variant='body1'>{comment.content}</Typography>
        </Box>
    )
}

function CommentsDialog({ issueDetail, setIssueDetail }) {
    const [newComment, setNewComment] = useState({
        title: '',
        content: '',
    });

    const handleCreateComment = async () => {
        const { data } = await apiClient.createComment(issueDetail.id, newComment);
        setIssueDetail({ ...issueDetail, comments: [...issueDetail.comments, data] });
    };

    return (
        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 1 }}>
            <Typography variant='h6'>Comments</Typography>
            <TextField
                variant='outlined'
                fullWidth
                multiline
                maxRows={2}
                placeholder='Add a comment...'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleCreateComment();
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '5px',
                        },
                    },
                }}
            />
        </Box>
    )
}

export default CommentsDialog