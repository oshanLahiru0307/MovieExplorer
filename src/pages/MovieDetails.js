import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
  Rating,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import Footer from '../components/Footer';

const API_KEY = '9ebf7c6a9831f1eb4a438a10c619a5a8';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        setMovie(response.data);
        
        // Check if movie is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === response.data.id));
      } catch (error) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(20,20,20,1) 100%)',
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 8,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Back
          </Button>

          <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
            {movie.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              Play
            </Button>
            <IconButton
              onClick={toggleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Details Section */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {/* Overview and Genres Section */}
            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              {/* Overview */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {movie.overview}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, color: 'text.primary', mb: 2 }}>
                  <Typography variant="body1">
                    {new Date(movie.release_date).getFullYear()} Year
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    <Typography variant="body1">
                      {Math.round(movie.vote_average * 10)}% Vote Average
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ color: 'text.primary', fontSize: '1.2rem' }} />
                    <Typography variant="body1">
                      {movie.runtime} Mins
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Genres */}
              <Box sx={{ width: '300px' }}>
                <Typography variant="h6" gutterBottom>
                  Genres
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Cast and Production Companies Section */}
            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              {/* Cast Section */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Cast
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                  {movie.credits?.cast?.slice(0, 6).map((actor) => (
                    <Box
                      key={actor.id}
                      sx={{
                        flex: '0 0 auto',
                        width: 120,
                        textAlign: 'center',
                      }}
                    >
                      <Paper
                        component="img"
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        sx={{
                          width: 120,
                          height: 180,
                          objectFit: 'cover',
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" noWrap>
                        {actor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {actor.character}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Production Companies */}
              <Box sx={{ width: '300px' }}>
                <Typography variant="h6" gutterBottom>
                  Production Companies
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {movie.production_companies?.map((company) => (
                    <Box key={company.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {company.logo_path && (
                        <Paper
                          component="img"
                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                          alt={company.name}
                          sx={{
                            width: 92,
                            height: 'auto',
                            backgroundColor: 'transparent',
                          }}
                        />
                      )}
                      <Typography variant="body2">{company.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {trailer && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default MovieDetails; 