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
                        backgroundColor: photo ? 'transparent' : 'gray'
                    }}
                    src={photo || ''}
                >
                    {!photo && <AddPhotoAlternateIcon />}
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
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%'
                    }}
                >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            )}
        </Box>
    );
};

export default PictureSelectionComponent;
