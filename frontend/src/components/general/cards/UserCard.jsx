import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchUser } from '../../../redux/userSlice';
import { Box, Button, Avatar, Typography } from '@mui/material';

function UserCard() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);


    if (user === null) {
        return null;
    }

    return (

        <Button
            variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                textTransform: 'none',
                borderColor: 'transparent',
            }}
        >
            <Avatar
                alt={user.username ?? ''}
                src={user.profile_picture ?? ''}
                sx={{
                    width: '32px',
                    height: '32px',
                    marginRight: '8px',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography fontWeight={500} color='text.primarly'>
                    {user.username ?? ''}
                </Typography>
            </Box>
        </Button>

    );
};


export default UserCard