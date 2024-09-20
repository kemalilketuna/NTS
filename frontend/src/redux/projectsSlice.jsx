import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

const initialState = {
    projects: [],
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Thunk to fetch projects data
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await apiClient.getProjects();
    return response;
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearProjects: (state) => {
            state.projects = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload.results;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearProjects } = projectsSlice.actions;
export const selectProjects = (state) => state.projects.projects;
export const selectProjectsStatus = (state) => state.projects.status;
export const selectProjectsError = (state) => state.projects.error;
export default projectsSlice.reducer;
