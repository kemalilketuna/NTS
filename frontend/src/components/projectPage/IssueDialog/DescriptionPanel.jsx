import React, { useState } from 'react';
import { Box, Typography, Button, useTheme, Divider } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import apiClient from '../../../api/apiClient';
import { updateIssue } from '../../../redux/projectSlice';
import { useDispatch } from 'react-redux';

const DescriptionPanel = ({ issueDetail, setIssueDetail }) => {
    const theme = useTheme();
    const [isEditorOpen, setEditorOpen] = useState(false);
    const [description, setDescription] = useState(issueDetail.description ?? '');
    const dispatch = useDispatch();
    const handleSave = async () => {
        try {
            apiClient.updateIssue(issueDetail.id, { description: description });
            const updatedIssue = { ...issueDetail, description: description };
            setEditorOpen(false);
            setIssueDetail(updatedIssue);
            dispatch(updateIssue(updatedIssue));
        } catch (error) {
            console.error('Error updating issue description:', error);
        }
    };

    const handleEditorChange = (value) => {
        setDescription(value);
    };

    const handleCancel = () => {
        setDescription(issueDetail.description ?? '');
        setEditorOpen(false);
    };

    return (
        <Box>
            <Typography variant="h6" pl={1}>Description</Typography>
            {!isEditorOpen ? (
                <Box
                    onClick={() => setEditorOpen(true)}
                    sx={{
                        cursor: 'pointer',
                        border: `1px solid transparent`,
                        '&:hover': {
                            border: `1px solid rgba(255, 255, 255, 0.2)`,
                            borderRadius: '5px',
                            transition: 'background-color 0.3s ease',
                        },
                    }}
                >
                    <Box data-color-mode={theme.palette.mode} sx={{
                        '&:hover': {
                            backgroundColor: theme.palette.background.paper,
                            transition: 'background-color 0.3s ease',
                        },
                    }}>
                        <MDEditor.Markdown
                            source={description || 'Add a description...'}
                            style={{
                                backgroundColor: 'transparent', color: theme.palette.text.primary, padding: '10px', borderRadius: '5px',
                                fontFamily: 'inherit !important',
                                fontSize: '14px !important',
                            }}
                            className='markdown-preview'
                        />
                    </Box>
                </Box>
            ) : (
                <Box >
                    <Box sx={{
                        bgcolor: 'background.default', borderRadius: '5px', mt: 1,
                    }}>
                        <MDEditor
                            value={description}
                            onChange={handleEditorChange}
                            preview='live'
                            height={300}
                            data-color-mode={theme.palette.mode}
                        />
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCancel} color='secondary' sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant='outlined' size='small'>
                            Save
                        </Button>
                    </Box>
                </Box>
            )
            }
            <Divider sx={{ mt: 2, mb: 2, borderColor: 'border.main' }} />
        </Box >
    );
}

export default DescriptionPanel;