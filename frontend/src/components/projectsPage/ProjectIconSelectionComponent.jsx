import React, { useState } from 'react';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectIconSelectionComponent = ({ icon, handleFileChange, handleRemoveFile }) => {
    const [hover, setHover] = useState(false);

    return (
        <Box
            style={{
                position: 'relative',
                width: '15vh',
                height: '15vh',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="upload-icon"
            />
            <label htmlFor="upload-icon">
                <Avatar
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                        backgroundColor: icon ? 'transparent' : 'gray'
                    }}
                    src={icon || ''}
                >
                    {!icon && <AddPhotoAlternateIcon sx={{ color: 'background.default' }} />}
                </Avatar>
            </label>
            {icon && hover && (
                <IconButton
                    onClick={handleRemoveFile}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'gray',
                        borderRadius: '50%'
                    }}
                >
                    <DeleteIcon fontSize="large" sx={{ color: 'background.default' }} />
                </IconButton>
            )}
        </Box>
    );
};

export default ProjectIconSelectionComponent;
