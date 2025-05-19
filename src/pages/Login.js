import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import loginBanner from '../Assets/login.jpg'
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', formData);
    navigate('/home');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${loginBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            borderRadius: '4px',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: '#E50914',
              fontWeight: 700,
              mb: 2,
              textAlign: 'center',
            }}
          >
            FILMEX
          </Typography>

          <Typography variant="h5" sx={{ color: 'white', mb: 4, textAlign: 'center' }}>
            Welcome to Movie Explorer
          </Typography>

          <Typography variant="body1" sx={{ color: '#b3b3b3', mb: 4, textAlign: 'center' }}>
            Discover and explore your favorite movies
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email or phone number"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              size="small"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: '#333',
                  '&:hover': {
                    backgroundColor: '#454545',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#454545',
                  },
                  height: '40px',
                },
                '& .MuiInputLabel-root': {
                  color: '#8c8c8c',
                },
                '& .MuiFilledInput-input': {
                  color: 'white',
                  padding: '12px 12px 8px',
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              size="small"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: '#333',
                  '&:hover': {
                    backgroundColor: '#454545',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#454545',
                  },
                  height: '40px',
                },
                '& .MuiInputLabel-root': {
                  color: '#8c8c8c',
                },
                '& .MuiFilledInput-input': {
                  color: 'white',
                  padding: '12px 12px 8px',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#E50914',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#F40612',
                },
                py: 1,
                fontSize: '1rem',
                fontWeight: 600,
                height: '40px',
              }}
            >
              Sign In
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    size="small"
                    sx={{
                      color: '#737373',
                      '&.Mui-checked': {
                        color: '#737373',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                component={RouterLink}
                to="/help"
                sx={{
                  color: '#b3b3b3',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Need help?
              </Link>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#737373', mb: 1 }}>
                New to Movie Explorer?
              </Typography>
              <Link
                component={RouterLink}
                to="/signup"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up now
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login; 