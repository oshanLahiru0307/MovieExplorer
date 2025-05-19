import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
  InputAdornment,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0A0A0A',
        color: 'white',
        py: 8,
        mt: 8,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content Row */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
          mb: 6
        }}>
          {/* Left Section - Logo and Mission */}
          <Box sx={{ 
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2
            }}>
              <Box sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%', 
                bgcolor: '#E50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <LocalMoviesIcon sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red' }}>
              FILMEX
              </Typography>
            </Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)'
              }}
            >
              Navigating the future of cinema, one story at a time.
            </Typography>
            {/* Social Media Icons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2
            }}>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                size="small"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                size="small"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                size="small"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Middle Section - Quick Links */}
          <Box sx={{ 
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 3
            }}>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, fontSize: '0.8rem', fontWeight: 600 }}>
                  Movies
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>New Releases</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Top Rated</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Coming Soon</Link>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, fontSize: '0.8rem', fontWeight: 600 }}>
                  Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Help Center</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Contact Us</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>FAQs</Link>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, fontSize: '0.8rem', fontWeight: 600 }}>
                  Account
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Sign In</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>Create Account</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, fontSize: '0.7rem' }}>My List</Link>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Section - Email Subscription */}
          <Box sx={{ 
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h6">
              SIGN UP FOR EMAILS
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Get early access to new releases and exclusive content.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#E50914' },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: '#E50914',
                          '&:hover': { bgcolor: '#f40612' },
                        }}
                      >
                        <SendIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>
        </Box>

        {/* Footer Bottom Bar */}
        <Box sx={{ 
          pt: 3, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            © {new Date().getFullYear()} MovieVerse. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.875rem', opacity: 0.7, '&:hover': { opacity: 1 } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.875rem', opacity: 0.7, '&:hover': { opacity: 1 } }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 2, 
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center'
          }}
        >
          123 Cinema Street, Hollywood, CA 90028
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 