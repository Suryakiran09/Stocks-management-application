import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  if(token){
    <Navigate to="/dashboard" />
  }

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      setError('Login Successful');
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Please check your username and password');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
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
      <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Button onClick={() => navigate('/register')} variant="text" fullWidth>
        Don't have an account? Register
      </Button>
      <h3>Please Open Backend Website it takes upto 30 seconds to start if idle as it is a free instance <a href="https://stock-list-api.onrender.com/" target="_blank">Link</a></h3>
      <h4>Logged in but Not redirected Refresh Wait & Click<Button onClick={() => navigate('/dashboard')} variant="text">Dashboard</Button> </h4>
    </Container>
  );
};

export default Login;
