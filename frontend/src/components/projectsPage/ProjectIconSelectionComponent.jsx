import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectIconSelectionComponent = ({ icon, handleFileChange, handleRemoveFile }) => {
    const [hover, setHover] = useState(false);
    const [iconUrl, setIconUrl] = useState('');

    useEffect(() => {
        if (icon && icon instanceof File) {
            const url = URL.createObjectURL(icon);
            setIconUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof icon === 'string') {
            setIconUrl(icon);
        } else {
            setIconUrl('');
        }
    }, [icon]);

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
                        backgroundColor: iconUrl ? 'transparent' : 'rgba(170, 170, 170, 1)',
                        transition: 'background-color 0.3s ease',
                    }}
                    src={iconUrl}
                >
                    {!iconUrl && <AddPhotoAlternateIcon sx={{ color: 'background.default' }} />}
                </Avatar>
            </label>
            {iconUrl && hover && (
                <IconButton
                    onClick={handleRemoveFile}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(170, 170, 170, 0.7)',
                        borderRadius: '50%',
                    }}
                >
                    <DeleteIcon sx={{ color: 'background.default' }} />
                </IconButton>
            )}
        </Box>
    );
};

export default ProjectIconSelectionComponent;