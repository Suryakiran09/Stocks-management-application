import React from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';
import StockData from './StockData';

interface WatchlistProps {
  watchlist: any[];
  stockData: any;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, stockData }) => {
  return (
    <Box mt={2}>
      {watchlist.map((item) => (
        <Paper key={item.id} elevation={3} style={{ marginBottom: '20px', padding: '10px' }}>
          <Typography variant="h6">{item.stock_symbol}</Typography>
          {stockData[item.stock_symbol] && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StockData data={stockData[item.stock_symbol].data} />
              </Grid>
            </Grid>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default Watchlist;
