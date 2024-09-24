import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

function CommentsDialog({ issueDetail, setIssueDetail }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'red' }}>
            <Typography variant='h6'>Comments</Typography>
            <TextField
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                placeholder='Add a comment'
            />
        </Box>
    )
}

export default CommentsDialog