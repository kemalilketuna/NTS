import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: true,
};

const panelSlice = createSlice({
    name: 'panelIsOpen',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const selectIsPanelOpen = (state) => state.panelIsOpen.isOpen;
export const { setIsOpen: setIsPanelOpen } = panelSlice.actions;
export default panelSlice.reducer;