import React from 'react';
import { Box, Typography, Select, MenuItem, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateIssue } from '../../../redux/projectSlice';
import apiClient from '../../../api/apiClient';
import GetPriorityAssests from '../../general/PriorityAssets';

function SelectPriorityPanel({ issueDetail, setIssueDetail }) {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const updatedIssue = { ...issueDetail, priority: event.target.value }
        setIssueDetail(updatedIssue)
        dispatch(updateIssue(updatedIssue))
        apiClient.updateIssuePriority(issueDetail.id, event.target.value)
    }


    return (
        <Box>
            <Typography variant="h6" mb={1} >Priority</Typography>
            <Select
                value={issueDetail.priority}
                onChange={handleChange}
                sx={{
                    width: '100%', borderRadius: '4px', height: '40px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiSelect-icon': {
                        display: 'none',
                    },
                    '&:hover': {
                        backgroundColor: 'background.paper',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            borderRadius: '4px',

                        },
                    },
                }}
            >
                <MenuItem
                    value={1}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <img width={20} height={20} style={{ marginBottom: '3px' }} src={GetPriorityAssests(1)} alt="Highest" />
                        <Typography>Highest</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={2} sx={{
                    '&.Mui-selected': {
                        backgroundColor: 'transparent',
                    },
                }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img width={20} height={20} style={{ marginBottom: '3px' }} src={GetPriorityAssests(2)} alt="High" />
                        <Typography>High</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={3} sx={{
                    '&.Mui-selected': {
                        backgroundColor: 'transparent',
                    },
                }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img width={20} height={20} style={{ marginBottom: '3px' }} src={GetPriorityAssests(3)} alt="Medium" />
                        <Typography>Medium</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={4} sx={{
                    '&.Mui-selected': {
                        backgroundColor: 'transparent',
                    },
                }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img width={20} height={20} style={{ marginBottom: '3px' }} src={GetPriorityAssests(4)} alt="Low" />
                        <Typography>Low</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={5} sx={{
                    '&.Mui-selected': {
                        backgroundColor: 'transparent',
                    },
                }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img width={20} height={20} style={{ marginBottom: '3px' }} src={GetPriorityAssests(5)} alt="Lowest" />
                        <Typography>Lowest</Typography>
                    </Box>
                </MenuItem>
            </Select>
            <Divider sx={{ mb: 2, mt: 3, borderColor: 'border.main' }} />
        </Box>
    )
}

export default SelectPriorityPanel