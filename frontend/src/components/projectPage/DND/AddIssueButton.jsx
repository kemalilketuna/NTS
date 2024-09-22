import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, ClickAwayListener, InputAdornment } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { MdKeyboardReturn } from "react-icons/md";

const AddIssueButton = ({ columnId, handleAddBox, showInputID, setShowInputID }) => {
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
                            maxLength={50}
                            multiline
                            rows={3}
                            variant="outlined"
                            size="small"
                            sx={{
                                position: 'relative',
                                flexGrow: 1,
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={handleCreate}
                                                endIcon={<MdKeyboardReturn style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '3px' }} />}
                                                sx={{
                                                    height: '27px',
                                                    borderRadius: '4px', opacity: '0.9',
                                                    position: 'absolute', bottom: 5, right: 5,
                                                    padding: '0px 10px',
                                                }}
                                            >
                                                Create
                                            </Button>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreate();
                                }
                            }}
                        />
                    </Box>
                </ClickAwayListener>
            ) : (
                <Button
                    variant="outlined"
                    onClick={() => {
                        setShowInputID(columnId);
                    }}
                    sx={{ padding: 1.2, marginTop: 2, backgroundColor: 'background.default', color: highlightedColor, borderColor: highlightedColor }}
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

export default AddIssueButton;
