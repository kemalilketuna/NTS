// AddBoxButton.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, ClickAwayListener } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';


const AddBoxButton = ({ columnId, handleAddBox, showInputID, setShowInputID }) => {
    const [newBoxContent, setNewBoxContent] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (showInputID === columnId) {
            inputRef.current?.focus();
        }
        if (showInputID !== columnId) {
            setNewBoxContent('');
        }
    }, [showInputID, columnId]);

    const handleInputChange = (event) => {
        setNewBoxContent(event.target.value);
    };

    const handleCreate = () => {
        handleAddBox(columnId, newBoxContent)
        setShowInputID('');
        setNewBoxContent('');
    }

    const handleCancel = () => {
        setShowInputID('');
        setNewBoxContent('');
    }

    const theme = useTheme();
    const highlightedColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.main;

    return (
        <>
            {showInputID === columnId ? (
                <ClickAwayListener onClickAway={handleCancel}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <TextField
                            inputRef={inputRef}
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
                            onClick={handleCreate}
                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, opacity: '0.9' }}
                        >
                            Add
                        </Button>
                    </Box>
                </ClickAwayListener>
            ) : (
                <Button
                    variant="outlined"
                    onClick={() => {
                        setShowInputID(columnId);
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
