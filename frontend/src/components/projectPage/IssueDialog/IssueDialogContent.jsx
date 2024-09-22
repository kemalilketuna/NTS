import React from 'react'
import { Box, Typography, Divider } from '@mui/material'

const LeftPanel = ({ issueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography>
                    b
                </Typography>
            </Box>
        </Box>
    )
}

const RightPanel = ({ issueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography>
            </Typography>
        </Box>
    )
}


const IssueDialogContent = ({ issueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '70%', height: '100%', pr: 2 }}>
                <LeftPanel issueDetail={issueDetail} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: '30%', height: '100%', pl: 2 }}>
                <RightPanel issueDetail={issueDetail} />
            </Box>
        </Box>
    )
}

export default IssueDialogContent