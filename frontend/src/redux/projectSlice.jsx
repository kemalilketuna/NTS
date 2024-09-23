import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const fetchProjectDetail = createAsyncThunk(
    'project/fetchProjectDetail',
    async (projectId) => {
        const response = await apiClient.getProjectDetail(projectId);
        return response;
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectDetail: {
            id: '',
            name: '',
            description: '',
            stages: [],
            createdBy: null,
            createdAt: null,
            updatedAt: null,
        },
        status: 'idle',
        error: null,
    },
    reducers: {
        setProjectDetail: (state, action) => {
            state.projectDetail = action.payload;
        },
        setColumns: (state, action) => {
            state.projectDetail.stages = action.payload;
        },
        updateIssue: (state, action) => {
            const issue = action.payload;
            const stage = state.projectDetail.stages.find(stage => stage.id === issue.stage);
            const issueIndex = stage.issues.findIndex(i => i.id === issue.id);
            if (issueIndex !== -1) {
                stage.issues[issueIndex] = issue;
            }
        },
        changeIssueStage: (state, action) => {
            const { issueId, sourceId, destinationId } = action.payload;
            const sourceStage = state.projectDetail.stages.find(stage => stage.id === sourceId);
            const destinationStage = state.projectDetail.stages.find(stage => stage.id === destinationId);
            const issueIndex = sourceStage.issues.findIndex(i => i.id === issueId);
            if (issueIndex !== -1) {
                const [removed] = sourceStage.issues.splice(issueIndex, 1);
                destinationStage.issues.push(removed);
            }
        },
        addIssue: (state, action) => {
            const issue = action.payload;
            const stage = state.projectDetail.stages.find(stage => stage.id === issue.stageId);
            stage.issues.push(issue);
        },
        removeIssue: (state, action) => {
            const issue = action.payload;
            const stage = state.projectDetail.stages.find(stage => stage.id === issue.stageId);
            const issueIndex = stage.issues.findIndex(i => i.id === issue.id);
            if (issueIndex !== -1) {
                stage.issues.splice(issueIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjectDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projectDetail = action.payload;
            })
            .addCase(fetchProjectDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectProject = (state) => state.project.projectDetail;
export const selectColumns = (state) => state.project.projectDetail.stages;
export const selectIssue = (state) => state.project.projectDetail.stages.issues;
export const { setProjectDetail, setColumns, updateIssue, addIssue, changeIssueStage } = projectSlice.actions;
export default projectSlice.reducer;