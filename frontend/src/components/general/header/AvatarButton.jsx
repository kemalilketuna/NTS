import React from 'react'
import { Box, Avatar, Typography, Button, Menu, MenuItem } from '@mui/material'

function AvatarButton({ user, handleClick }) {
    const isProfilePictureNull = user.profile_picture == null;
    const usernameInitials = user.username ? user.username.slice(0, 2).toUpperCase() : '';

    return (
        <Button onClick={handleClick} sx={{
            borderRadius: '50%',
            minWidth: '50px',
            minHeight: '50px',
            padding: '0',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
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
                    <Typography fontWeight={600} color='text.primary' marginTop={'3px'}>
                        {isProfilePictureNull ? usernameInitials : null}
                    </Typography>
                </Avatar>
            </Box>
        </Button>
    )
}

export default AvatarButton