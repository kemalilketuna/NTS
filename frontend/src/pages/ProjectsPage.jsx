import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/general/header/HeaderComponent';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import SearchPanel from '../components/projectsPage/SearchPanel';
import CreateProject from '../components/projectsPage/CreateProject';

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
                    height: '75vh',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    margin: 5,
                    gap: 5,
                }}
            >
                <SearchPanel />
                <CreateProject />
            </Box>
        </Box>
    );
}

export default ProjectsPage;
