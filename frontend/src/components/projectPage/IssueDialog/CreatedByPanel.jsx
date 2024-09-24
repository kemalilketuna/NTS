import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import UserFullCard from '../../general/cards/UserFullCard'

function CreatedByPanel({ issueDetail }) {
    return (
        <Box pt={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Divider sx={{ mb: 0, mt: 3, borderColor: 'border.main' }} />
            <Typography variant="h6" pl={0}>Created By</Typography>
            <UserFullCard user={issueDetail.created_by} />
            <Divider sx={{ mb: 2, mt: 2, borderColor: 'border.main' }} />
        </Box>
    )
}

export default CreatedByPanel