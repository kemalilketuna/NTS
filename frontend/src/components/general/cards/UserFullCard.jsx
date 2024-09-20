import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'

function UserFullCard({ user }) {
    const isProfilePictureNull = user.profile_picture == null;
    const usernameInitials = user.username ? user.username.slice(0, 2).toUpperCase() : '';

    return (
        <Box sx={{
            height: '50px',
            width: '240px',
            color: 'black',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
        }}>
            <Avatar
                alt={user.username ?? ''}
                src={isProfilePictureNull ? undefined : user.profile_picture}
                sx={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: isProfilePictureNull ? 'secondary.soft' : undefined,
                }}
            >
                <Typography fontWeight={600} color='background.default' marginTop={'3px'}>
                    {isProfilePictureNull ? usernameInitials : null}
                </Typography>
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1" fontFamily={'League Spartan'} color='text.primary'>
                    {user.username}
                </Typography>
                <Typography variant="body2" fontSize={12} fontWeight={400} color='text.primary' sx={{ opacity: 0.75 }}>
                    {user.email}
                </Typography>
            </Box>
        </Box>
    )
}

export default UserFullCard