// AddBoxButton.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const AddBoxButton = ({ columnId, handleAddBox }) => {
    const [newBoxContent, setNewBoxContent] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleInputChange = (event) => {
        setNewBoxContent(event.target.value);
    };

    const handleCreate = () => {
        setShowInput(false);
        handleAddBox(columnId, newBoxContent)
        setNewBoxContent('');
    }

    return (
        <>
            {showInput ? (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <TextField
                        value={newBoxContent}
                        onChange={handleInputChange}
                        label="Issue title"
                        variant="outlined"
                        size="small"
                        sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRight: 'none',
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                }
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCreate();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleCreate();
                        }}
                        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    >
                        Add
                    </Button>
                </Box>
            ) : (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setShowInput(true);
                    }}
                    sx={{ marginTop: 2, backgroundColor: 'background.paper' }}
                    startIcon={<Add />}
                >
                    Create
                </Button>
            )}
        </>
    );
};

export default AddBoxButton;
