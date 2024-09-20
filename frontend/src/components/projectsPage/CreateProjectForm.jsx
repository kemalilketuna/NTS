import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

const CreateProjectForm = ({ onSubmit }) => {
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2}>
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
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Icon
                    <input
                        type="file"
                        hidden
                        name="icon"
                        onChange={handleFileChange}
                    />
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default CreateProjectForm;
