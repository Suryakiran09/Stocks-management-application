import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(username, password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again or User exists');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField 
        label="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <TextField 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <Button onClick={handleRegister} variant="contained" color="primary" fullWidth>
        Register
      </Button>
      <Button onClick={() => navigate('/login')} variant="text" fullWidth>
        Already have an account? Login
      </Button>
      <p>Please Open Backend Website it takes upto 30 seconds to start if idle as it is a free instance <a href="https://stock-list-api.onrender.com/" target="_blank">Link</a></p>
    </Container>
  );
};

export default Register;
