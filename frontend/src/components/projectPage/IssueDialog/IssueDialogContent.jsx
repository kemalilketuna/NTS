import React, { useState } from 'react'; // Add useState import
import { Box, Typography, Divider, IconButton, TextField, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DescriptionPanel from './DescriptionPanel'

const AttachmentsPanel = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {issueDetail && issueDetail.attachments && issueDetail.attachments.map((file, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 100,
                            height: 100,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <Typography variant="caption" align="center">
                            {file.name}
                        </Typography>
                    </Box>
                ))}
                <IconButton
                    sx={{
                        width: 100,
                        height: 100,
                        border: '1px dashed #ccc',
                        borderRadius: 1,
                    }}
                    onClick={() => {/* Add logic to handle new file upload */ }}
                >
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

const LeftPanel = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <Typography variant="h4" sx={{ m: 2, ml: 1 }}> {issueDetail.title}</Typography>
            <Divider sx={{ mb: 2, borderColor: 'border.main' }} />
            <DescriptionPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <AttachmentsPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
        </Box>
    )
}

const RightPanel = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography>
            </Typography>
        </Box>
    )
}


const IssueDialogContent = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '70%', height: '100%', pr: 2 }}>
                <LeftPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: '30%', height: '100%', pl: 2 }}>
                <RightPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            </Box>
        </Box>
    )
}

export default IssueDialogContent