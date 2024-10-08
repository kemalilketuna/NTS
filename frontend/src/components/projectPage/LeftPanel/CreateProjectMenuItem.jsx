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
    const containerRef = useRef(null); // Ref for the component container

    const handleCreate = async () => {
        setIsCreating(false);
        if (newProjectName.trim()) {
            try {
                const project = { name: newProjectName };
                const data = await apiClient.createProject(project);
                navigate(`/project/${data.id}`);
            } catch (error) {
                notify('Failed to create project');
            }
            setNewProjectName('');
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewProjectName('');
        inputRef.current.blur();
    };

    useEffect(() => {
        if (isCreating && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCreating]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                handleCancel();
            }
        };

        if (isCreating) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCreating]);

    return (
        <MenuItem ref={containerRef} onClick={() => {
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
                            maxLength={50}
                            inputRef={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreate();
                                    inputRef.current.blur();
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
