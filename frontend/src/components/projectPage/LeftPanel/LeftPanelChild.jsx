import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, MenuItem } from '@mui/material';
import NavigateButton from './NavigateButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useParams } from 'react-router-dom';
import CreateProjectMenuItem from './CreateProjectMenuItem';
import apiClient from '../../../api/apiClient';

const styles = {
    panel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 2,
    },
    projectMenuItem: {
        backgroundColor: 'background.paper',
        '&:hover': {
            backgroundColor: 'background.default',
        },
        height: 45,
        width: '100%',
        ml: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '2px'
    },
};

function ProjectMenuItem({ project }) {
    const navigate = useNavigate();
    return (
        <MenuItem value={project.id} sx={{
            ...styles.projectMenuItem,
            borderBottom: '1px solid',
            borderColor: 'border.main',
        }} onClick={() => {
            navigate(`/project/${project.id}`);
        }}>
            <Box display="flex" flexDirection={'row'} alignItems="center" width={1} >
                <Box width={25} height={25} mr={2}>
                    {project.icon && (
                        <img
                            src={project.icon}
                            alt={project.name}
                            style={{ ...styles.image }}
                        />
                    )}
                </Box>
                <Typography variant="body1" fontWeight={500} color='text.primary'>
                    {project.name}
                </Typography>
            </Box>
        </MenuItem >
    );
}


function LeftPanelChild() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const { projectId } = useParams();

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await apiClient.getProjects();
            setProjects(data.results);
        };
        fetchProjects();
    }, [navigate]);

    return (
        <Stack sx={{ ...styles.panel }}>
            <Box sx={{ width: '100%' }}>
                <Typography variant='h6' ml={2} mb={1} color='text.primary'>Projects</Typography>
                <Box borderBottom='1px solid' borderColor='border.main' sx={{ display: 'flex', flexDirection: 'row', ml: 1, pb: 1, justifyContent: 'start', alignItems: 'center' }}>
                    <KeyboardArrowDownIcon sx={{ color: 'text.secondary', opacity: '0.5', pl: 0, m: 0 }} />
                    <Typography variant='body1' fontSize={12} fontWeight={400} pt={'2px'} fontFamily={'Arial'} color='text.secondary' sx={{ opacity: '0.7' }}>CURRENT</Typography>
                </Box>
                {projects.map((project) => (
                    project.id === projectId && <ProjectMenuItem key={project.id} project={project} />
                ))}
                <Box borderBottom='1px solid' borderColor='border.main' sx={{ display: 'flex', flexDirection: 'row', ml: 1, pb: 1, mt: 1, justifyContent: 'start', alignItems: 'center' }}>
                    <KeyboardArrowDownIcon sx={{ color: 'text.secondary', opacity: '0.5', pl: 0, m: 0 }} />
                    <Typography variant='body1' fontSize={12} fontWeight={400} pt={'2px'} fontFamily={'Arial'} color='text.secondary' sx={{ opacity: '0.7' }}>RECENT</Typography>
                </Box>
                {projects.map((project) => (
                    project.id !== projectId && <ProjectMenuItem key={project.id} project={project} />
                ))}
                <CreateProjectMenuItem />
            </Box>
            <NavigateButton text='View all projects' link='/projects/' />
        </Stack >
    );
}

export default LeftPanelChild;
