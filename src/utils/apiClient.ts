import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY,
  },
});

export default apiClient;
