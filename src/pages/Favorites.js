import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Alert severity="info">
          You haven't added any movies to your favorites yet.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Box
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
                  onToggleFavorite={toggleFavorite}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites; 