import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

function CreateProject() {
    return (
        <Box>
            <Typography variant="h4">Create Project</Typography>
            <TextField label="Project Name" fullWidth />
            <TextField label="Project Description" fullWidth />
            <Button variant="contained" color="primary">
                Create Project
            </Button>
        </Box>
    )
}

export default CreateProject