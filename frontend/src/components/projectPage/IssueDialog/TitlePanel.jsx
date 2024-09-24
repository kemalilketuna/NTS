import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, TextField } from '@mui/material'
import apiClient from '../../../api/apiClient';
import { useDispatch } from 'react-redux';
import { updateIssue } from '../../../redux/projectSlice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function TitlePanel({ issueDetail, setIssueDetail }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(issueDetail.title);
    const buttonRef = useRef(null);
    const textFieldRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmit = () => {
        if (newTitle.trim() === '') {
            setNewTitle(issueDetail.title);
            setIsEditing(false);
            return;
        }
        if (newTitle === issueDetail.title) {
            setIsEditing(false);
            return;
        }
        apiClient.updateIssue(issueDetail.id, { title: newTitle });
        const updatedIssue = { ...issueDetail, title: newTitle };
        setIssueDetail(updatedIssue);
        dispatch(updateIssue(updatedIssue));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewTitle(issueDetail.title);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            handleCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isEditing && textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [isEditing]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', height: '10vh', width: '100%' }}>
            {isEditing ? (
                <Box ref={buttonRef} sx={{ width: '100%', position: 'relative' }}>
                    <TextField
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        variant="outlined"
                        size="small"
                        autoFocus
                        sx={{
                            mr: 1,
                            width: '100%',
                            '& .MuiInputBase-root': {
                                borderRadius: '5px',
                                fontSize: '2rem',
                                backgroundColor: 'background.paper',
                                height: '3.2rem',
                                paddingLeft: '-10px',
                            },
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        inputRef={textFieldRef} // Add ref to TextField
                    />
                    <Box sx={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: '-2.7rem',
                        right: 0,
                        gap: '0.5rem',
                    }}>
                        <IconButton
                            onClick={handleSubmit}
                            sx={{
                                color: 'primary.main',
                                backgroundColor: 'background.paper',
                                borderRadius: 1,
                                padding: '8px',
                                '&:hover': {
                                    backgroundColor: 'background.default',
                                }
                            }}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleCancel}
                            sx={{
                                color: 'primary.main',
                                backgroundColor: 'background.paper',
                                borderRadius: 1,
                                padding: '8px',
                                '&:hover': {
                                    backgroundColor: 'background.default',
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <Box onClick={handleEditClick} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', height: '10vh', cursor: 'text', width: '100%' }}>
                    <Typography variant="h4" sx={{ ml: 1.7, mr: 1.5, fontSize: '2rem' }}> {issueDetail.title}</Typography>
                </Box>
            )}
        </Box >
    )
}

export default TitlePanel