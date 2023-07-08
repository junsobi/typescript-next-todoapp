import { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '../types/type';

const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/data/tasks.json');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};

export default useFetchTasks;
