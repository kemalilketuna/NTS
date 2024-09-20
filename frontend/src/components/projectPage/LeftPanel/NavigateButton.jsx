import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavigateButton({ text, link }) {
    const navigate = useNavigate();

    return (
        <Button variant='outlined' sx={{
            width: '100%',
            marginBottom: 2,
            border: '0px',
            borderRadius: '3px',
            '&:hover': {
                backgroundColor: 'background.default',
                borderRadius: '3px',
            },
            height: '35px',
        }} onClick={() => {
            navigate(link)
        }}>
            <Typography variant='body2' fontSize={14} color='text.primary' sx={{
                opacity: '0.7', textTransform: 'none',
                '&:hover': {
                    opacity: '1',
                },
            }}>
                {text}
            </Typography>
        </Button>
    );
}

export default NavigateButton;