import React, { useState, useRef, useEffect } from 'react';
import { MenuItem, Box, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import notify from '../../general/cards/ErrorCard';

function CreateProjectMenuItem() {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const inputRef = useRef(null);

    const handleCreate = async () => {
        setIsCreating(false);
        if (newProjectName.trim()) {
            try {
                const project = await apiClient.createProject(newProjectName);
                navigate(`/project/${project.id}`);
            } catch (error) {
                notify('Failed to create project');
            }
            setNewProjectName('');
        }
    };


    useEffect(() => {
        if (isCreating && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCreating]);

    return (
        <MenuItem onClick={() => {
            if (!isCreating) {
                setIsCreating(true);
            }
        }} sx={{ p: 0, height: '45px' }}>
            <Box display="flex" flexDirection="row" alignItems='center' justifyContent='center' width={1}>
                {!isCreating ? (
                    <>
                        <AddIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="body1" fontWeight={500} fontSize={17} color="text.primary" mt={0.5} ml={0.5} mr={2}>
                            Create Project
                        </Typography>
                    </>
                ) : (
                    <Box display="flex" alignItems="space-between" width={1} p={1}>
                        <TextField
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Enter project name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputRef={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreate();
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '30px', // Adjust this value as needed
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '5px 10px', // Adjust padding to center the text vertically
                                },
                            }}
                        />
                        <IconButton onClick={handleCreate} sx={{
                            borderRadius: '0%',
                            backgroundColor: 'transparent',
                            width: '20px',
                            height: '30px',
                            padding: 0,
                            margin: 0,
                            marginLeft: 1,
                            '> svg': {
                                color: 'primary.main',
                            },
                            '&:hover': {
                                backgroundColor: 'transparent',
                                '> svg': {
                                    color: 'primary.main',
                                },
                            },
                        }}>
                            <CheckIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </MenuItem >
    );
}

export default CreateProjectMenuItem;
