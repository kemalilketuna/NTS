import { Box, Typography } from '@mui/material'
import React from 'react'

const styles = {
    line: {
        color: 'primary.main',
        fontWeight: '600',
        fontSize: '120px',
        marginTop: '-45px',
        letterSpacing: '-4px',
    },
    subline: {
        color: 'primary.main',
        fontSize: '20px',
        letterSpacing: '1px',
        fontFamily: 'Sanchez',
    }
}

const Line = ({ name, paddingLeft }) => {
    return (
        <>
            <Typography variant='h1' sx={styles.line} paddingLeft={paddingLeft} color='text.primarly'>
                {name}
            </Typography>
        </>
    )
}

const Subline = ({ name, paddingLeft }) => {
    return (
        <Box sx={{ paddingLeft: paddingLeft }}>
            <Typography variant='h6' sx={styles.subline} color='text.primarly'>
                {name}
            </Typography>
        </Box >
    )
}

function NTSTitle() {
    return (
        <Box marginRight={1} sx={{ width: '40vw' }}>
            <Line name="Nartian" paddingLeft={0} />
            <Line name="Task " paddingLeft={'7.5vw'} />
            <Line name="System" paddingLeft={'15vw'} />
            <Subline name="A SIMPLE COLLABORATION TOOL" paddingLeft={0} />
        </Box>
    )
}

export default NTSTitle