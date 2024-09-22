import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch } from 'react-redux';
import { setIsPanelOpen } from '../../../redux/panelSlice';

const LeftPanel = ({ children }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const openedByMouseRef = useRef(false);

    const togglePanel = () => {
        setOpen(!open);
        dispatch(setIsPanelOpen(!open));
        openedByMouseRef.current = false;
    };

    const handleMouseEnter = () => {
        setShowButton(true);
    };

    const handleMouseLeave = () => {
        // Don't hide the button immediately
    };

    const handleMouseMove = (event) => {
        const panelWidth = 200; // Width of the panel
        const buffer = 100; // Additional buffer zone
        const triggerZone = 10; // Zone to trigger panel opening
        const closeZone = panelWidth + 50; // Zone to close panel if opened by mouse

        if (event.clientX > panelWidth + buffer) {
            setShowButton(false);
        } else {
            setShowButton(true);
        }

        // Open panel if mouse is too far left
        if (event.clientX < triggerZone && !open) {
            setOpen(true);
            dispatch(setIsPanelOpen(true));
            openedByMouseRef.current = true;
        }

        // Close panel if opened by mouse and mouse moves back right
        if (openedByMouseRef.current && open && event.clientX > closeZone) {
            setOpen(false);
            dispatch(setIsPanelOpen(false));
            openedByMouseRef.current = false;
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [open]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '60px',
                left: 0,
                width: '17vw',
                height: 'calc(100vh - 64px)',
                transform: open ? 'translateX(0)' : 'translateX(-90%)',
                transition: 'transform 0.3s ease',
                display: 'flex',
            }}
        >
            <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    flex: 1,
                    backgroundColor: 'background.paper',
                    boxShadow: 'none',
                    color: 'black',
                    borderRight: '1px solid',
                    borderColor: 'border.main'
                }}
            >
                {open && children}
            </Box>
            {showButton && (
                <IconButton
                    onClick={togglePanel}
                    sx={{
                        position: 'fixed',
                        top: '40px',
                        right: '-17px',
                        zIndex: 1300,
                        backgroundColor: 'background.paper',
                        '> svg': {
                            color: 'primary.main',
                        },
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            '> svg': {
                                color: 'background.paper',
                            },
                        },
                        color: 'black',
                        width: '35px',
                        height: '35px',
                        border: '1px solid',
                        borderColor: 'border.main',
                    }}
                >
                    {open ? <KeyboardArrowLeftIcon sx={{ fontSize: 25, }} /> : <KeyboardArrowRightIcon sx={{ fontSize: 25, }} />}
                </IconButton>
            )}
        </Box>
    );
};

export default LeftPanel;
