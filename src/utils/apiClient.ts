import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const headers = {
  apikey: API_KEY,
};

const apiClient = {
  get: (url: string): Promise<AxiosResponse> =>
    axios.get(`${API_URL}${url}`, { headers }),
  post: (url: string, body: Record<string, unknown>): Promise<AxiosResponse> =>
    axios.post(`${API_URL}${url}`, body, { headers }),
  patch: (url: string, body: any): Promise<AxiosResponse> =>
    axios.patch(`${API_URL}${url}`, body, { headers }),
  delete: (url: string): Promise<AxiosResponse> =>
    axios.delete(`${API_URL}${url}`, { headers }),
};

export default apiClient;
