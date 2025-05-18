import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Create a wrapper component to handle conditional Navbar rendering
function AppContent() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#E50914', // Netflix red
      },
      secondary: {
        main: '#FFFFFF',
      },
      background: {
        default: darkMode ? '#141414' : '#FFFFFF',
        paper: darkMode ? '#181818' : '#F5F5F5',
      },
    },
    typography: {
      fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 600,
          },
          contained: {
            '&:hover': {
              backgroundColor: '#F40612',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#181818' : '#FFFFFF',
            borderRadius: 8,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Don't show Navbar on login page
  const showNavbar = location.pathname !== '/login';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showNavbar && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
