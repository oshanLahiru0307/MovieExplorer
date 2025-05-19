import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    avatar: 'https://i.pravatar.cc/300',
    preferences: ['Action', 'Drama', 'Sci-Fi'],
    watchlist: [],
  });

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12 }}>
      <Container maxWidth="lg">
        {/* Profile Header */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'background.paper',
            color: 'text.primary',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {/* Profile Image */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={userProfile.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: '4px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '&:hover': { backgroundColor: 'background.paper' },
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>

            {/* Bio Data */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {userProfile.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userProfile.email}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Member since {userProfile.joinDate}
              </Typography>
            </Box>

            {/* Edit Button */}
            <Button
              variant="outlined"
              sx={{
                height: 'fit-content',
                borderColor: 'divider',
                '&:hover': { 
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>

        {/* Profile Content */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Left Sidebar */}
          <Box sx={{ width: '300px', flexShrink: 0 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {userProfile.preferences.map((pref) => (
                  <Chip
                    key={pref}
                    label={pref}
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: 'primary.main',
                    }}
                  />
                ))}
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Change Password
                </Button>
                <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Notification Settings
                </Button>
                <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Privacy Settings
                </Button>
                <Divider sx={{ my: 1 }} />
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<LogoutIcon />}
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'error.main',
                    borderColor: 'error.main',
                    '&:hover': {
                      borderColor: 'error.dark',
                      backgroundColor: 'error.light',
                      color: 'error.dark',
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
              >
                <Tab label="Favorites" />
                <Tab label="Watchlist" />
                <Tab label="History" />
              </Tabs>

              <Box sx={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Favorite Movies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {favorites.map((movie) => (
                        <Box
                          key={movie.id}
                          sx={{
                            flex: '0 0 auto',
                            width: { xs: '140px', sm: '160px', md: '180px' },
                            transition: 'all 0.3s ease-in-out',
                            transform: 'scale(0.95)',
                            '&:hover': {
                              transform: 'scale(1)',
                              zIndex: 1,
                            },
                          }}
                        >
                          <MovieCard
                            movie={movie}
                            isFavorite={true}
                            onToggleFavorite={() => {}}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Watchlist
                    </Typography>
                    {userProfile.watchlist.length === 0 ? (
                      <Typography color="text.secondary">
                        Your watchlist is empty. Add movies to watch later!
                      </Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {userProfile.watchlist.map((movie) => (
                          <Box
                            key={movie.id}
                            sx={{
                              flex: '0 0 auto',
                              width: { xs: '140px', sm: '160px', md: '180px' },
                              transition: 'all 0.3s ease-in-out',
                              transform: 'scale(0.95)',
                              '&:hover': {
                                transform: 'scale(1)',
                                zIndex: 1,
                              },
                            }}
                          >
                            <MovieCard
                              movie={movie}
                              isFavorite={false}
                              onToggleFavorite={() => {}}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Watch History
                    </Typography>
                    <Typography color="text.secondary">
                      Your watch history will appear here.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Profile; 