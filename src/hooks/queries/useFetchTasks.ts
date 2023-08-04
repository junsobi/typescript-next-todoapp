import { useQuery } from 'react-query';
import { Task } from '@/types/type';
import apiClient from '@/utils/apiClient';

const TASKS_KEY = 'tasks';

export function useFetchTasks() {
  return useQuery<Task[]>(TASKS_KEY, async () => {
    const response = await apiClient.get('/rest/v1/todos');
    return response.data;
  });
}
