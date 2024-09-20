import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, toggleTheme } from '../../redux/themeSlice'

function ChangeThemeButton() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectTheme);
    return (
        <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={() => { dispatch(toggleTheme()) }} />}
            label={`Toggle ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        />
    )
}

export default ChangeThemeButton