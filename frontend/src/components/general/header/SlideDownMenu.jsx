import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Grow, Typography, Box, Divider } from '@mui/material';
import { selectUser, fetchUser, clearUser } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOutFromApp } from '../../../api/utils';
import { useNavigate } from 'react-router-dom';
import UserFullCard from '../cards/UserFullCard';
import AvatarButton from './AvatarButton';
import ChangeThemeButton from '../ChangeThemeButton';
import ConfirmationDialog from '../ConfirmationDialog';

const style = {
    menu: {
        borderRadius: 0.5,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        paddingTop: 1,
        border: '0.1px solid',
        borderColor: 'border.main'
    },
};

function SlideDownMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    // State management
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [ConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    // Fetch user on mount and when user changes
    useEffect(() => {
        if (user === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    // Event handlers
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        setConfirmationDialogOpen(false);
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
        handleClose();
    };

    const handleSignOut = () => {
        setAnchorEl(null);
        setConfirmationDialogOpen(true);
    };

    const handleConfirmSignOut = () => {
        setConfirmationDialogOpen(false);
        dispatch(clearUser());
        signOutFromApp();
    };

    const handleCancelSignOut = () => setConfirmationDialogOpen(false);

    if (user === null) return null;

    return (
        <Box>
            <AvatarButton user={user} handleClick={handleClick} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Grow}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: { sx: style.menu },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingLeft: 3 }}>
                    <Typography variant='body2' fontWeight={600} fontSize={13} color='text.secondary' sx={{ opacity: '0.85' }}>Account</Typography>
                    <UserFullCard user={user} />
                </Box>
                <Divider sx={{
                    my: 1,
                }} />
                <MenuItem >
                    <ChangeThemeButton />
                </MenuItem>
                <Divider sx={{
                    my: 1,
                }} />
                <MenuItem onClick={handleEditProfile}>
                    <Typography color='text.primary' fontWeight={600} letterSpacing={0.5} fontSize={17} marginLeft={1} sx={{ opacity: '0.8' }}>
                        Edit Profile
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <Typography color='secondary.main' fontWeight={600} letterSpacing={0.5} fontSize={17} marginLeft={1} sx={{ opacity: '0.8' }} >
                        Sign Out
                    </Typography>
                </MenuItem>
            </Menu >
            <ConfirmationDialog
                open={ConfirmationDialogOpen}
                handleClose={handleCancelSignOut}
                handleConfirm={handleConfirmSignOut}
                title="Confirm Sign Out"
                content="Are you sure you want to sign out?"
            />
        </Box >
    );
}

export default SlideDownMenu;
