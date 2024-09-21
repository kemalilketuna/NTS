import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import apiClient from '../../api/apiClient';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        border: '1px solid',
        borderColor: theme.palette.border.main,
        padding: theme.spacing(2.5),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
}));

const CreateProjectForm = ({ onSubmit }) => {
    const classes = useStyles();

    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        icon: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormValues({
            ...formValues,
            icon: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming onSubmit is a function passed as a prop to handle form submission
        onSubmit(formValues);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className={classes.form}>
            <Stack spacing={2}>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: '600', fontSize: '1.5rem' }}>Create Project</Typography>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Project Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ width: '70%', alignSelf: 'center', height: '40px', backgroundColor: 'background.paper' }}
                >
                    Create Project
                </Button>
            </Stack>
        </Box>
    );
};

export default CreateProjectForm;
