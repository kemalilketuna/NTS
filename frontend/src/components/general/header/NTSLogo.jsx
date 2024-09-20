import React from 'react'
import { Box } from '@mui/system'
import redTaskIcon from '../../../assets/red_task_icon.svg';
import orangeTaskIcon from '../../../assets/orange_task_icon.svg';
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/themeSlice';

const style = {
    logo: {
        display: 'flex',
        alignItems: 'center',
        width: '120px',
    },
}

function NTSLogo() {
    const isDarkTheme = useSelector(selectTheme);

    if (isDarkTheme) {
        return (
            < Box sx={style.logo} >
                <img src={orangeTaskIcon} width={'26px'} alt='Task Icon' />
                <Typography variant='h5' fontWeight={700} fontSize={30} color='primary.main' fontFamily={'League Spartan'} sx={{ marginTop: '8px' }}>NTS</Typography>
            </Box >
        )
    }

    return (
        <Box sx={style.logo}>
            <img src={redTaskIcon} width={'26px'} alt='Task Icon' />
            <Typography variant='h5' fontWeight={700} fontSize={30} color='secondary.soft' fontFamily={'League Spartan'} sx={{ marginTop: '8px' }}>NTS</Typography>
        </Box>
    )
}

export default NTSLogo