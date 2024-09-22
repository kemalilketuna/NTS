import React from 'react';
import {
    Box, Typography, Container,
} from '@mui/material';
import CreateProfileFrom from '../components/profilePage/CreateProfileFrom';

function CreateProfilePage() {

    return (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" fontSize={'2rem'} pb={2} fontWeight={600} color='text.primary' fontFamily={'Arial'}>
                    Create Profile
                </Typography>
                <CreateProfileFrom />
            </Box>
        </Container>
    );
}

export default CreateProfilePage;