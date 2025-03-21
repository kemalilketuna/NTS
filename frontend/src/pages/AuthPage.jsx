import React from 'react';
import { Box, Grid2 } from '@mui/material';
import AuthComponent from '../components/authPage/AuthComponent';
import NTSTitle from '../components/authPage/NTSTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 4,
    }
}

const AuthPage = () => {
    useAuthRedirect();

    return (

        <Box sx={styles.page}>
            <Grid2 container>
                <Grid2 xs={12} md={6}>
                    <Box sx={styles.authBox}>
                        <NTSTitle />
                    </Box>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Box sx={styles.authBox}>
                        <AuthComponent />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AuthPage;
