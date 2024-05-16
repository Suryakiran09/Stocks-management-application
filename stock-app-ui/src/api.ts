// src/api.ts
import axios from 'axios';

const BASE_URL = 'https://stock-list-api.onrender.com/';

export const registerUser = (username: string, password: string) => {
  return axios.post(`${BASE_URL}register/`, { username, password });
};

export const loginUser = (username: string, password: string) => {
  return axios.post(`${BASE_URL}login/`, { username, password });
};

export const createWatchlist = (token: string, stockSymbol: string) => {
  return axios.post(
    `${BASE_URL}watchlist/`,
    { stock_symbol: stockSymbol },
    { headers: { Authorization: `Token ${token}` } }
  );
};

export const getWatchlist = (token: string) => {
  return axios.get(`${BASE_URL}watchlist/`, {
    headers: { Authorization: `Token ${token}` },
  });
};

export const getStockData = (token: string) => {
  return axios.get(`${BASE_URL}stock-data/`, {
    headers: { Authorization: `Token ${token}` },
  });
};
