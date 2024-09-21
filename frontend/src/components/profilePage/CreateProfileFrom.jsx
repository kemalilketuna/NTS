import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Stack,
    CircularProgress,
} from '@mui/material';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import PictureSelectionComponent from './PictureSelectionComponent';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import apiClient from '../../api/apiClient';
import { createFileFromBlob } from '../../api/utils';

function CreateProfileFrom() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        profile_picture: null,
        idToken: '',
    });
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = user.providerData[0];
                let profilePhoto = null;
                try {
                    profilePhoto = await createFileFromBlob(userData.photoURL, 'avatar.jpg');
                    const photoURL = profilePhoto ? URL.createObjectURL(profilePhoto) : null;
                    setPhoto(photoURL);
                } catch (error) {
                    console.error('Error creating profile photo:', error);
                }
                const idToken = await user.getIdToken();
                setProfile({
                    username: userData.displayName.replace(/\s/g, '-').toLocaleLowerCase('tr-TR'),
                    email: userData.email,
                    bio: '',
                    profile_picture: profilePhoto,
                    idToken: idToken,
                });
            } else {
                console.log('No user signed in');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        setProfile((prevProfile) => ({
            ...prevProfile,
            profile_picture: null,
        }));
    };


    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const photoURL = URL.createObjectURL(file);
            setPhoto(photoURL);
            setProfile((prevProfile) => ({
                ...prevProfile,
                profile_picture: file,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', profile.username);
            formData.append('email', profile.email);
            formData.append('bio', profile.bio);
            formData.append('idToken', profile.idToken);
            if (profile.profile_picture) {
                formData.append('profile_picture', profile.profile_picture);
            }

            const response = await axios.post(`${endpoints.baseUrl}${endpoints.account.createProfile}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            apiClient.setAuthTokens(response.data.access, response.data.refresh);
            window.location.href = '/projects';
        } catch (error) {
            console.error('Error creating profile:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} sx={{ marginTop: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PictureSelectionComponent
                        photo={photo}
                        handleFileChange={handleFileChange}
                        handleRemovePhoto={handleRemovePhoto}
                    />
                </Box>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username && errors.username[0]}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email && errors.email[0]}
                />
                <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={profile.bio}
                    onChange={handleChange}
                    error={!!errors.bio}
                    helperText={errors.bio && errors.bio[0]}
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: 'primary.dark', width: '40%', alignSelf: 'center' }}>
                    Save Changes
                </Button>
            </Stack>
        </form>
    )
}

export default CreateProfileFrom