import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, TextField, Button } from '@mui/material'
import { FaEdit } from "react-icons/fa";
import { useTheme } from '@mui/material';
import apiClient from '../../../api/apiClient';

function TitlePanel({ issueDetail, setIssueDetail }) {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(issueDetail.title);
    const buttonRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmit = async () => {
        const updatedIssue = await apiClient.updateIssue(issueDetail.id, { title: newTitle });
        setIssueDetail(updatedIssue);
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
                    />
                    <Button onClick={handleSubmit}> Save</Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{ m: 2, ml: 1 }}> {issueDetail.title}</Typography>
                    <IconButton onClick={handleEditClick}> {/* Added onClick handler */}
                        <FaEdit color={theme.palette.primary.main} mb={0.5} />
                    </IconButton>
                </>
            )
            }
        </Box >
    )
}

export default TitlePanel