import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

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

export default AttachmentsPanel