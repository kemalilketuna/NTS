import React from 'react'
import { TextField } from '@mui/material'

function SearchTextField({ searchTerm, handleSearch }) {

    return (
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{
                backgroundColor: 'background.paper',
            }} />
    )
}

export default SearchTextField