import React, { useState, useRef } from 'react'
import { Box, Typography, TextField, Divider } from '@mui/material'
import apiClient from '../../../api/apiClient'
import UserAvatar from '../../general/cards/UserAvatar'

const Comment = ({ comment }) => {
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', mt: 2, borderBottom: '1px solid',
            borderBottomColor: 'border.main',
            pb: 2
        }}>
            <UserAvatar user={comment.created_by} />
            <Divider orientation='vertical' flexItem />
            <Typography variant='body1'>{comment.content}</Typography>
        </Box>
    )
}

function CommentsPanel({ issueDetail, setIssueDetail }) {
    const [newComment, setNewComment] = useState('');
    const textFieldRef = useRef(null); // Create a ref for the TextField

    const handleCreateComment = async () => {
        setNewComment('')
        const payload = {
            content: newComment,
            issue: issueDetail.id,
            project: issueDetail.project
        }
        const data = await apiClient.createComment(payload);
        setIssueDetail({ ...issueDetail, comments: [...issueDetail.comments, data] });
    };

    return (
        <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 1 }}>
            <Typography variant='h6'>Comments</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                <UserAvatar user={issueDetail.created_by} />
                <Divider orientation='vertical' flexItem />
                <TextField
                    variant='outlined'
                    fullWidth
                    placeholder='Add a comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateComment();
                            textFieldRef.current.blur(); // Remove focus from the TextField
                        }
                    }}
                    inputRef={textFieldRef} // Attach the ref to the TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderRadius: '5px',
                            },
                        },
                    }}
                />
            </Box>
            <Divider orientation='horizontal' flexItem sx={{ mt: 2 }} />
            {issueDetail.comments.slice().reverse().map((comment) => ( // Reverse the comments order
                <Comment key={comment.id} comment={comment} />
            ))}
        </Box>
    )
}

export default CommentsPanel