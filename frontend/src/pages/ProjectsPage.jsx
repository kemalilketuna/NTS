import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/general/header/HeaderComponent';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import SearchPanel from '../components/projectsPage/SearchPanel';

const ProjectsPage = () => {
    useAuthRedirect();

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '70vh',
                    margin: 3,
                }}
            >
                <SearchPanel />
            </Box>
        </Box>
    );
}

export default ProjectsPage;
