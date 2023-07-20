import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function useFetchTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log('fetching tasks with server-recoil');
      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return tasks;
}
