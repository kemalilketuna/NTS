import React, { useState } from 'react';
import { IconButton, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const PictureSelectionComponent = ({ photo, handleFileChange, handleRemovePhoto }) => {
    const [hover, setHover] = useState(false);

    return (
        <Box
            style={{
                position: 'relative',
                width: '13vw',
                height: '13vw',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="upload-photo"
            />
            <label htmlFor="upload-photo">
                <Avatar
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                        backgroundColor: photo ? 'transparent' : 'rgba(170, 170, 170, 1)',
                        transition: 'background-color 0.3s ease',
                    }}
                    src={photo || ''}
                >
                    {!photo && <AddPhotoAlternateIcon fontSize="large" sx={{ color: 'background.default' }} />}
                </Avatar>
            </label>
            {photo && hover && (
                <IconButton
                    onClick={handleRemovePhoto}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(170, 170, 170, 0.7)',
                        transition: 'background-color 0.3s ease',
                        borderRadius: '50%'
                    }}
                >
                    <DeleteIcon fontSize="large" sx={{ color: 'background.default' }} />
                </IconButton>
            )}
        </Box>
    );
};

export default PictureSelectionComponent;
