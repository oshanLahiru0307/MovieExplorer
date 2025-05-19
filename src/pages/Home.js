import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import Footer from '../components/Footer';

const API_KEY = '9ebf7c6a9831f1eb4a438a10c619a5a8';
const BASE_URL = 'https://api.themoviedb.org/3';

const categories = [
  { id: 'trending', title: 'Trending Now', endpoint: 'trending/movie/day' },
  { id: 'top_rated', title: 'Top Rated', endpoint: 'movie/top_rated' },
  { id: 'upcoming', title: 'Coming Soon', endpoint: 'movie/upcoming' },
  { id: 'popular', title: 'Popular on Netflix', endpoint: 'movie/popular' },
];

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [genres, setGenres] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState({});
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [activeSlides, setActiveSlides] = useState({});
  const slideRefs = useRef({});
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedMovie();
    fetchAllMovies();
    fetchGenres();
    // Start auto-sliding for each category
    categories.forEach(category => {
      startAutoSlide(category.id);
    });

    return () => {
      // Cleanup auto-sliding intervals
      categories.forEach(category => {
        if (slideRefs.current[category.id]) {
          clearInterval(slideRefs.current[category.id]);
        }
      });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    applyFilters();
  }, [movies, selectedGenre, selectedYear, selectedRating]);

  const fetchCategories = async () => {
    try {
      const promises = categories.map(async (category) => {
        const response = await axios.get(
          `${BASE_URL}/${category.endpoint}?api_key=${API_KEY}`
        );
        return { [category.id]: response.data.results };
      });

      const results = await Promise.all(promises);
      const moviesByCategory = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setCategoryMovies(moviesByCategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch movie categories');
    }
  };

  const fetchFeaturedMovie = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
      );
      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      setFeaturedMovie(randomMovie);
    } catch (error) {
      setError('Failed to fetch featured movie');
    }
  };

  const fetchAllMovies = async (page = 1) => {
    try {
      setLoadingMore(true);
      const response = await axios.get(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
      );
      setAllMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      setError('Failed to fetch movies');
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...movies];

    if (selectedGenre) {
      filtered = filtered.filter(movie => 
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(movie => 
        new Date(movie.release_date).getFullYear().toString() === selectedYear
      );
    }

    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(movie => 
        movie.vote_average >= minRating
      );
    }

    setFilteredMovies(filtered);
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchMovies(query);
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === movie.id);
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const startAutoSlide = (categoryId) => {
    if (slideRefs.current[categoryId]) {
      clearInterval(slideRefs.current[categoryId]);
    }

    slideRefs.current[categoryId] = setInterval(() => {
      setActiveSlides(prev => ({
        ...prev,
        [categoryId]: (prev[categoryId] || 0) + 1
      }));
    }, 5000); // Slide every 5 seconds
  };

  const handleMoreInfo = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAllMovies(newPage);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
  };

  return (
    <Box sx={{ pt: 8 }}>
      {featuredMovie && (
        <Box
          sx={{
            position: 'relative',
            height: '80vh',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
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
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              {featuredMovie.title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: '50%' }}>
              {featuredMovie.overview}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
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
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleMoreInfo(featuredMovie.id)}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                More Info
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Filter Controls */}
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                value={selectedGenre}
                label="Genre"
                onChange={handleGenreChange}
                size="small"
              >
                <MenuItem value="">All</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={handleYearChange}
                size="small"
              >
                <MenuItem value="">All</MenuItem>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={selectedRating}
                label="Rating"
                onChange={handleRatingChange}
                size="small"
              >
                <MenuItem value="">All</MenuItem>
                {[8, 7, 6, 5, 4].map((rating) => (
                  <MenuItem key={rating} value={rating.toString()}>
                    {rating}+ Stars
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={clearFilters}
              size="small"
              sx={{ height: 40 }}
            >
              Clear Filters
            </Button>
          </Stack>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {searchQuery ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={3} sx={{ maxWidth: '1200px', justifyContent: 'center' }}>
                  {filteredMovies.map((movie) => (
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
                          mx: 'auto'
                        }}
                      >
                        <MovieCard
                          movie={movie}
                          isFavorite={isFavorite(movie.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <>
                {categories.map((category) => (
                  <Box key={category.id} sx={{ mb: 6, position: 'relative' }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      {category.title}
                    </Typography>
                    <Box
                      sx={{
                        position: 'relative',
                        '&::before, &::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          width: '100px',
                          height: '100%',
                          zIndex: 2,
                          pointerEvents: 'none',
                        },
                        '&::before': {
                          left: 0,
                          background: 'linear-gradient(to right, rgba(20,20,20,1), rgba(20,20,20,0))',
                        },
                        '&::after': {
                          right: 0,
                          background: 'linear-gradient(to left, rgba(20,20,20,1), rgba(20,20,20,0))',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          overflowX: 'auto',
                          pb: 2,
                          scrollBehavior: 'smooth',
                          msOverflowStyle: 'none',  /* Hide scrollbar for IE and Edge */
                          scrollbarWidth: 'none',  /* Hide scrollbar for Firefox */
                          '&::-webkit-scrollbar': {  /* Hide scrollbar for Chrome, Safari and Opera */
                            display: 'none',
                          },
                          px: '100px', // Add padding to show peek effect
                        }}
                        ref={(el) => {
                          if (el) {
                            const movies = categoryMovies[category.id] || [];
                            const slideWidth = 180;
                            const maxSlides = Math.ceil(movies.length / 5);
                            const currentSlide = activeSlides[category.id] || 0;
                            const scrollPosition = (currentSlide % maxSlides) * slideWidth * 5;
                            el.scrollLeft = scrollPosition;
                          }
                        }}
                      >
                        {categoryMovies[category.id]?.map((movie) => (
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
                              isFavorite={isFavorite(movie.id)}
                              onToggleFavorite={toggleFavorite}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}

                {/* All Movies Section */}
                <Box sx={{ mb: 6, position: 'relative' }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
                    All Movies
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      maxWidth: '100%',
                      mx: 'auto',
                    }}
                  >
                    {[0, 1, 2].map((rowIndex) => (
                      <Box
                        key={rowIndex}
                        sx={{
                          position: 'relative',
                          width: '100%',
                          '&::before, &::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '100px',
                            height: '100%',
                            zIndex: 2,
                            pointerEvents: 'none',
                          },
                          '&::before': {
                            left: 0,
                            background: 'linear-gradient(to right, rgba(20,20,20,1), rgba(20,20,20,0))',
                          },
                          '&::after': {
                            right: 0,
                            background: 'linear-gradient(to left, rgba(20,20,20,1), rgba(20,20,20,0))',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            overflowX: 'auto',
                            pb: 2,
                            scrollBehavior: 'smooth',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                              display: 'none',
                            },
                            px: { xs: '50px', sm: '100px' },
                            justifyContent: 'center',
                          }}
                        >
                          {allMovies
                            .slice(rowIndex * 6, (rowIndex + 1) * 6)
                            .map((movie) => (
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
                                  isFavorite={isFavorite(movie.id)}
                                  onToggleFavorite={toggleFavorite}
                                />
                              </Box>
                            ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  
                  {/* Pagination Controls */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    mt: 4,
                    gap: 2
                  }}>
                    <Button
                      variant="outlined"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loadingMore}
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Previous
                    </Button>
                    
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      Page {currentPage} of {totalPages}
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loadingMore}
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                  
                  {loadingMore && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <CircularProgress size={24} />
                    </Box>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default Home; 