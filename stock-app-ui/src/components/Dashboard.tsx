import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWatchlist, getWatchlist, getStockData } from '../api';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import Watchlist from './Watchlist';

const Dashboard: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any>({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await getWatchlist(token);
        setWatchlist(response.data);
      } catch (error) {
        console.error('Failed to fetch watchlist:', error);
      }
    };

    fetchWatchlist();
  }, [navigate]);

  const handleAddStock = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await createWatchlist(token, stockSymbol);
      const response = await getWatchlist(token);
      setWatchlist(response.data);
      setStockSymbol('');
    } catch (error) {
      setError('Stock already Exists.');
      setStockSymbol('');
      console.error('Failed to add stock to watchlist:', error);
    }
  };

  const handleFetchStockData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await getStockData(token);
      console.log(response.data)
      setStockData(response.data);
    } catch (error) {
      setError('May be the API reach rate limit');
      console.error('Failed to fetch stock data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField 
        label="Stock Symbol" 
        value={stockSymbol} 
        onChange={(e) => setStockSymbol(e.target.value)} 
        fullWidth 
        margin="normal"
      />
      <h3>Example Stocks: AAPL, GOOG, MSFT, AMZN, TSLA</h3>
      <Button onClick={handleAddStock} variant="contained" color="primary" fullWidth>
        Add Stock
      </Button>
      <Button onClick={handleFetchStockData} variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
        Fetch Stock Data
      </Button>
      <Watchlist watchlist={watchlist} stockData={stockData} />
    </Container>
  );
};

export default Dashboard;
