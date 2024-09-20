import React from 'react';
import {
    Box, Typography, Container,
} from '@mui/material';
import EditProfileFrom from '../components/profilePage/EditProfileFrom';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

function EditProfilePage() {
    useAuthRedirect();
    return (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" fontSize={'2rem'} color='text.primary' fontWeight={600} fontFamily={'Arial'}>
                    Edit Profile
                </Typography>
                <EditProfileFrom />
            </Box>
        </Container>
    );
}

export default EditProfilePage;