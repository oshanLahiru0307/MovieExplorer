import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking info button
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        transition: 'transform 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          zIndex: 2,
          cursor: 'pointer',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        alt={movie.title}
        sx={{
          objectFit: 'cover',
          borderRadius: isHovered ? '4px 4px 0 0' : '4px',
        }}
      />
      {isHovered && (
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
            padding: '8px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <IconButton size="small" sx={{ color: 'white' }}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
              sx={{ color: 'white' }}
            >
              {isFavorite ? <FavoriteIcon /> : <AddIcon />}
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: 'white' }}
              onClick={handleInfoClick}
            >
              <InfoIcon />
            </IconButton>
          </Box>
          <Typography variant="subtitle2" sx={{ color: 'white', fontSize: '0.875rem' }}>
            {movie.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
            {new Date(movie.release_date).getFullYear()}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default MovieCard; 