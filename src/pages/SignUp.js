import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import loginBanner from '../Assets/login.jpg'

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Signup attempt:', formData);
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
            Create Your Account
          </Typography>

          <Typography variant="body1" sx={{ color: '#b3b3b3', mb: 4, textAlign: 'center' }}>
            Join Movie Explorer and start your journey
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
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
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  size="small"
                  sx={{
                    color: '#737373',
                    '&.Mui-checked': {
                      color: '#737373',
                    },
                    padding: '0 9px',
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                  I agree to the Terms of Service and Privacy Policy
                </Typography>
              }
              sx={{ 
                mt: 2, 
                mb: 2,
                alignItems: 'flex-start',
                marginLeft: 0,
                '& .MuiFormControlLabel-label': {
                  marginTop: '2px'
                }
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
              Create Account
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#737373', mb: 1 }}>
                Already have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp; 