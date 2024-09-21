import React from 'react'
import { Box } from '@mui/system'
import NTSLogo from './NTSLogo'
import SlideDownMenu from './SlideDownMenu'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        height: '60px',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.border.main,
        width: '100%',
    },
}));


function Header() {
    const classes = useStyles();

    return (
        <Box className={classes.header} >
            <NTSLogo />
            <SlideDownMenu />
        </Box>
    )
}

export default Header