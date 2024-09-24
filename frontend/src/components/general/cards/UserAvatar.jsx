import React from 'react'
import { Avatar, Typography } from '@mui/material'

function UserAvatar({ user }) {
    const isProfilePictureNull = user.profile_picture === null;
    const usernameInitials = user.username ? user.username.slice(0, 2).toUpperCase() : '';

    return (
        <Avatar
            alt={user.username ?? ''}
            src={isProfilePictureNull ? undefined : user.profile_picture}
            sx={{
                width: '32px',
                height: '32px',
                backgroundColor: isProfilePictureNull ? 'secondary.soft' : undefined,
            }}
        >
            <Typography fontWeight={600} color='white' marginTop={'3px'}>
                {isProfilePictureNull ? usernameInitials : null}
            </Typography>
        </Avatar>
    )
}

export default UserAvatar