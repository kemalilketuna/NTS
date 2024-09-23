import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, TextField, Button } from '@mui/material'
import { FaEdit } from "react-icons/fa";
import { useTheme } from '@mui/material';
import apiClient from '../../../api/apiClient';
import { useDispatch } from 'react-redux';
import { updateIssue } from '../../../redux/projectSlice';

function TitlePanel({ issueDetail, setIssueDetail }) {
    const theme = useTheme();
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
        apiClient.updateIssue(issueDetail.id, { title: newTitle });
        const updatedIssue = { ...issueDetail, title: newTitle };
        setIssueDetail(updatedIssue);
        dispatch(updateIssue(updatedIssue));
        setIsEditing(false);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsEditing(false);
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
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', height: '10vh' }}>
            {isEditing ? (
                <Box ref={buttonRef}>
                    <TextField
                        value={newTitle}
                        label="Rename"
                        onChange={(e) => setNewTitle(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            mr: 1,
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        inputRef={textFieldRef} // Add ref to TextField
                    />
                    <Button onClick={handleSubmit} sx={{ fontWeight: 'bold' }}> Save</Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{ ml: 1, mr: 1.5 }}> {issueDetail.title}</Typography>
                    <IconButton
                        onClick={handleEditClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <FaEdit color={theme.palette.primary.main} />
                    </IconButton>
                </>
            )}
        </Box >
    )
}

export default TitlePanel