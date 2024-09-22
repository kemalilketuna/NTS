import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Stack,
    CircularProgress,
} from '@mui/material';
import PictureSelectionComponent from './PictureSelectionComponent';
import apiClient from '../../api/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, setUser } from '../../redux/userSlice';
import { createFileFromBlob } from '../../api/utils';
import { useNavigate } from 'react-router-dom';

function EditProfileFrom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        profile_picture: '',
    });
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user === null) {
                dispatch(fetchUser());
            } else {
                try {
                    const profilePhoto = await createFileFromBlob(user.profile_picture, 'avatar.jpg');
                    const photoURL = profilePhoto ? URL.createObjectURL(profilePhoto) : null;
                    setPhoto(photoURL);
                    setProfile({
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        profile_picture: profilePhoto,
                    });
                } catch (error) {
                    setProfile({
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        profile_picture: null,
                    });
                }
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [dispatch, user]);


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
        const update = {}
        for (const key in profile) {
            if (profile[key] !== user[key]) {
                update[key] = profile[key];
            }
        }

        try {
            const data = await apiClient.updateProfile(profile);
            dispatch(setUser(data));
            navigate(-1);
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
                    maxLength={40}
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
                    maxLength={255}
                    error={!!errors.email}
                    helperText={errors.email && errors.email[0]}
                />
                <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    maxLength={500}
                    value={profile.bio}
                    onChange={handleChange}
                    error={!!errors.bio}
                    helperText={errors.bio && errors.bio[0]}
                />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                }}>
                    <Button onClick={() => {
                        navigate(-1);
                    }} size='large' color='secondary' sx={{ width: '10vw' }}>
                        Cancel
                    </Button>
                    <Button type="submit" size='large' sx={{ width: '10vw' }}>
                        Save
                    </Button>
                </Box>

            </Stack>
        </form>
    )
}

export default EditProfileFrom