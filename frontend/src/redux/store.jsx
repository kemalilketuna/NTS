
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import projectsSlice from './projectsSlice';
import panelSlice from './panelSlice';
import projectSlice from './projectSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice,
        projects: projectsSlice,
        panelIsOpen: panelSlice,
        project: projectSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore paths in the state or action payload you know to be non-serializable
                ignoredActions: ['user/setUser'],
                ignoredPaths: ['user.user'],
            },
        }),
});

export default store;