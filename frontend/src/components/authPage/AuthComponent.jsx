import React from 'react';
import { Box, Typography } from '@mui/material';
import GithubSignInButton from './GithubSignInButton';
import GoogleSignInButton from './GoogleSignInButton';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/themeSlice';

const styles = {
    authBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50vh',
        justifyContent: 'center',
        backgroundColor: 'background.paper',
        margin: '3rem',
        padding: 4,
        borderRadius: 3,
        border: 3,
        borderColor: 'primary.main',
    }
}

const AuthComponent = () => {
    const isDarkTheme = useSelector(selectTheme);

    return (
        <Box sx={{
            ...styles.authBox,
            borderColor: isDarkTheme ? '#ddd' : 'primary.main',
        }}>
            <Typography variant='h5' marginBottom={2} sx={{
                color: 'text.primary',
                fontSize: '1.5rem',
                fontWeight: '600',
                fontFamily: 'Arial',
                letterSpacing: '0.01rem',
            }}>Sign In to Get Started</Typography>
            <GoogleSignInButton />
            <GithubSignInButton />
        </Box>
    );
};

export default AuthComponent;
