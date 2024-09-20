import React, { useEffect, useState, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
    TextField,
} from '@mui/material';
import { format } from 'date-fns';
import apiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { makeStyles } from '@mui/styles';

const formatDescription = (description) => {
    if (!description) {
        return "No description";
    }
    if (description.length > 30) {
        return `${description.substring(0, 50)}...`;
    }
    return description;
};

const ProjectTableRow = ({ project, onRowClick }) => {
    return (
        <TableRow
            key={project.id}
            onClick={() => onRowClick(project)}
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'background.default',
                },
            }}
        >
            <TableCell>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={project.icon} alt={project.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Box>
                    <Typography variant="body1" fontWeight={500} ml={1} mt={0.7} color='text.primary'>
                        {project.name}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: '30px', height: '30px' }} alt={project.created_by.username} src={project.created_by.profile_picture} />
                    <Typography variant="body1" fontWeight={500} ml={1} mt={0.7} color='text.primary'>
                        {project.created_by.username}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell>{formatDescription(project.description)}</TableCell>
            <TableCell>{format(new Date(project.created_at), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
        </TableRow>
    );
};

const NoProjectRow = () => {
    return (
        <TableRow>
            <TableCell colSpan={4}>
                <Typography variant="body1" color='text.primary' textAlign='center'>
                    No project has been itialized
                </Typography>
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: '75vh', // Set the max height of the table container to make it scrollable
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none' // For Chrome, Safari, and Opera
        },
    },
    tableHead: {
        '& th': {
            fontWeight: 'bold',
            color: theme.palette.text.primary, // Ensure text color is white
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

const SearchPanel = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiClient.getProjects();
            setProjects(response.results);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiClient.getProjects(search);
            setProjects(response.results);
        };
        fetchProjects();
    }, [search]);

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: 4,
                minWidth: '70vw',
            }}
        >
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <TextField
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search projects"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            margin: 2,
                                            mr: 1,
                                        }}
                                        inputRef={inputRef}
                                    />
                                    <SearchOutlinedIcon />
                                </Box>
                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Creation Time</TableCell>
                        </TableRow>
                        {projects.length === 0 ? (
                            <NoProjectRow />
                        ) : (
                            projects.map((project) => (
                                <ProjectTableRow
                                    key={project.id}
                                    project={project}
                                    onRowClick={(project) => navigate(`/project/${project.id}`)}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SearchPanel;