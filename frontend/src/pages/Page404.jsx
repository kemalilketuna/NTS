import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Lottie from 'react-lottie-player'
import animationData from '../assets/404.json';

const styles = {
    page404: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'background.paper',
    },
    title: {
        variant: "h1",
        color: 'primary'
    },
    subTitle: {
        variant: "h5",
        color: 'primary'
    },
    button: {
        variant: "outlined",
        color: "primary",
        href: "/projects",
        sx: {
            marginTop: 5,
        }
    },
    lottie: {
        width: '60vw',
        height: '60vh'
    }
}

const Page404 = () => {

    return (
        <Box sx={styles.page404}>
            <Typography {...styles.title}>We think you're lost</Typography>
            <Typography {...styles.subTitle}>If you click on the dinosaur it will take you back to the home page.</Typography>

            <Button {...styles.button} >
                <Lottie
                    loop
                    animationData={animationData}
                    play
                    style={styles.lottie}
                />
            </Button>
        </Box >
    );
}

export default Page404;