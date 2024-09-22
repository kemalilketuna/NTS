import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import apiClient from '../../api/apiClient';
import { makeStyles } from '@mui/styles';
import ProjectIconSelectionComponent from './ProjectIconSelectionComponent';
import { useNavigate } from 'react-router-dom';
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

const CreateProjectForm = () => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formValues);
            const data = await apiClient.createProject(formValues);
            navigate(`/project/${data.id}`);
        } catch (error) {
            console.error('Error creating project:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
    };

    const handleRemoveFile = () => {
        setFormValues({
            ...formValues,
            icon: null,
        });
    };

    const icon = formValues.icon;

    return (
        <Box component="form" onSubmit={handleSubmit} className={classes.form} encType="multipart/form-data">
            <Stack spacing={3}>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: '600', fontSize: '1.5rem' }}>Create Project</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                    <ProjectIconSelectionComponent icon={icon} handleFileChange={handleFileChange} handleRemoveFile={handleRemoveFile} />
                </Box>
                <TextField
                    fullWidth
                    id="name"
                    label="Project Name"
                    name="name"
                    maxLength={50}
                    required
                    error={!!errors.name}
                    helperText={errors.name && errors.name[0]}
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    maxLength={500}
                    value={formValues.description}
                    error={!!errors.description}
                    helperText={errors.description && errors.description[0]}
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
