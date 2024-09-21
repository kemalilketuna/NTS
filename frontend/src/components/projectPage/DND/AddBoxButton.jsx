// AddBoxButton.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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

    const theme = useTheme();
    const highlightedColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.main;
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
                        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, opacity: '0.8' }}
                    >
                        Add
                    </Button>
                </Box>
            ) : (
                <Button
                    variant="outlined"
                    // color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.error.main}
                    onClick={() => {
                        setShowInput(true);
                    }}
                    sx={{ marginTop: 2, backgroundColor: 'background.paper', color: highlightedColor, borderColor: highlightedColor }}
                    startIcon={<Add />}
                >
                    <Box mt={0.35} p={0}>
                        Create
                    </Box>
                </Button>
            )}
        </>
    );
};

export default AddBoxButton;
