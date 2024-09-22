import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './Theme.jsx';
import { useSelector } from 'react-redux';
import { selectTheme } from './redux/themeSlice.jsx';
import { ToastContainer } from 'react-toastify';
// Pages
import AuthPage from '../src/pages/AuthPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateProfilePage from './pages/CreateProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Page404 from './pages/Page404';
import ProjectPage from './pages/ProjectPage';

function App() {
  const isDarkMode = useSelector(selectTheme);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
