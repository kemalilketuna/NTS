import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, ClickAwayListener, InputAdornment } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { MdKeyboardReturn } from "react-icons/md";

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: -1.7,
        marginTop: 2
    },
    textField: {
        position: 'relative',
        flexGrow: 1,
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
        },
    },
    createButton: {
        height: '27px',
        borderRadius: '4px',
        opacity: '0.9',
        position: 'absolute',
        bottom: 5,
        right: 5,
        padding: '0px 10px',
    },
    returnIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '3px',
        transition: 'background-color 0.3s ease',
    },
    addButton: (highlightedColor) => ({
        padding: 1.2,
        backgroundColor: 'transparent',
        color: highlightedColor,
        borderColor: highlightedColor,
        margin: -2,
        marginTop: 0.5,
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: highlightedColor,
            borderColor: highlightedColor,
        },
        textAlign: 'left',
        justifyContent: 'flex-start',
    }),
    addButtonText: {
        marginTop: 0.35,
        padding: 0
    }
};

const AddIssueButton = ({ columnId, handleAddBox, showInputID, setShowInputID }) => {
    const [newBoxContent, setNewBoxContent] = useState('');
    const inputRef = useRef(null);
    const theme = useTheme();
    const highlightedColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.main;

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
        handleAddBox(columnId, newBoxContent);
        setShowInputID('');
        setNewBoxContent('');
    };

    const handleCancel = () => {
        setShowInputID('');
        setNewBoxContent('');
    };

    const renderTextField = () => (
        <TextField
            inputRef={inputRef}
            value={newBoxContent}
            onChange={handleInputChange}
            maxLength={5}
            multiline
            rows={4}
            variant="outlined"
            size="small"
            sx={styles.textField}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={handleCreate}
                                endIcon={<MdKeyboardReturn style={styles.returnIcon} />}
                                sx={styles.createButton}
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
    );

    const renderAddButton = () => (
        <Button
            onClick={() => setShowInputID(columnId)}
            sx={styles.addButton(highlightedColor)}
            startIcon={<Add sx={{ color: highlightedColor }} />}
        >
            <Box sx={styles.addButtonText}>
                Create
            </Box>
        </Button>
    );

    return (
        <>
            {showInputID === columnId ? (
                <ClickAwayListener onClickAway={handleCancel}>
                    <Box sx={styles.container}>
                        {renderTextField()}
                    </Box>
                </ClickAwayListener>
            ) : (
                renderAddButton()
            )}
        </>
    );
};

export default AddIssueButton;
