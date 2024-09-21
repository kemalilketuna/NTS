import React from 'react';
import { Box } from '@mui/material';
import HeaderComponent from '../components/general/header/HeaderComponent';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import SearchPanel from '../components/projectsPage/SearchPanel';
import CreateProjectForm from '../components/projectsPage/CreateProjectForm';

const ProjectsPage = () => {
    useAuthRedirect();

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <HeaderComponent />
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
                <CreateProjectForm />
            </Box>
        </Box>
    );
}

export default ProjectsPage;
