import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
        return JSON.parse(savedTheme);
    } else {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode;
    }
};

const initialState = {
    isDarkMode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        },
        setTheme: (state, action) => {
            state.isDarkMode = action.payload;
            localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
        },
    },
});

export const selectTheme = (state) => state.theme.isDarkMode;
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
