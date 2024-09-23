import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import HeaderComponent from '../components/general/header/HeaderComponent';
import LeftPanel from '../components/projectPage/LeftPanel/LeftPanel';
import LeftPanelChild from '../components/projectPage/LeftPanel/LeftPanelChild';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { useSelector } from 'react-redux';
import { selectIsPanelOpen } from '../redux/panelSlice';
import DragAndDropComponent from '../components/projectPage/DND/DNDComponent';
import { useDispatch } from 'react-redux';
import { fetchProjectDetail } from '../redux/projectSlice';
import { useParams } from 'react-router-dom';

function ProjectPage() {
    useAuthRedirect();

    const isPanelOpen = useSelector(selectIsPanelOpen);
    const dispatch = useDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        console.log('fetching project detail');
        dispatch(fetchProjectDetail(projectId));
    }, [dispatch]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <HeaderComponent />
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <LeftPanel >
                    <LeftPanelChild />
                </LeftPanel>
                <Box sx={{
                    flex: 1, padding: 2, transition: 'margin-left 0.3s',
                    marginLeft: isPanelOpen ? '17vw' : '2vw', // Adjust this value based on panel width
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '12vh',
                    }}>
                        <DragAndDropComponent />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ProjectPage;
