import React, { useEffect, useState, useRef, useCallback } from 'react';
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: '75vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    tableHead: {
        '& th': {
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

const formatDescription = (description) => {
    if (!description) return "No description";
    return description.length > 30 ? `${description.substring(0, 50)}...` : description;
};

const ProjectTableRow = ({ project, onRowClick }) => (
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={project.icon} alt={project.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Box>
                <Typography variant="body1" fontWeight={500} ml={1} mt={0.7} color='text.primary'>
                    {project.name}
                </Typography>
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: '30px', height: '30px' }} alt={project.created_by.username} src={project.created_by.profile_picture} />
                <Typography variant="body1" fontWeight={500} ml={1} mt={0.7} color='text.primary'>
                    {project.created_by.username}
                </Typography>
            </Box>
        </TableCell>
        <TableCell>{formatDescription(project.description)}</TableCell>
        <TableCell padding='none' sx={{ width: 'auto' }}>
            {format(new Date(project.created_at), 'yyyy-MM-dd HH:mm:ss')}
        </TableCell>
        <TableCell width={10} >
            <IconButton sx={{ height: '30px', width: '30px', backgroundColor: 'red' }} onClick={(e) => {
                e.stopPropagation();
            }}>
                <DeleteOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
        </TableCell>
    </TableRow >
);

const NoProjectRow = () => (
    <TableRow>
        <TableCell colSpan={4}>
            <Typography variant="body1" color='text.primary' textAlign='center'>
                No project has been initialized
            </Typography>
        </TableCell>
    </TableRow>
);

const SearchPanel = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const fetchProjects = useCallback(async (page, search) => {
        setLoading(true);
        const response = await apiClient.getProjects({ page: page, search: search });
        setProjects((prevProjects) => [...prevProjects, ...response.results]);
        setCount(response.count);
        setLoading(false);
    }, []);

    useEffect(() => {
        setProjects([]);
        setPage(1);
    }, [search]);

    useEffect(() => {
        fetchProjects(page, search);
    }, [fetchProjects, page, search]);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && !loading && count > projects.length) {
            setPage(page + 1);
        }
    };

    return (
        <Box sx={{ backgroundColor: 'background.paper', borderRadius: 4, minWidth: '70vw' }}>
            <TableContainer component={Paper} className={classes.tableContainer} onScroll={handleScroll}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <TextField
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search projects"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{ margin: 2, mr: 1 }}
                                        inputRef={inputRef}
                                    />
                                    <SearchOutlinedIcon />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ width: '30%' }}>Project</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Creation Time</TableCell>
                            <TableCell></TableCell>
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
        </Box >
    );
};

export default SearchPanel;