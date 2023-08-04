import { useQuery, useQueryClient } from 'react-query';
import { Task } from '@/types/type';
import { fetchTasks } from './tasksApi';

const TASKS_KEY = 'tasks';

export function useFetchTasks() {
  return useQuery<Task[]>(TASKS_KEY, fetchTasks);
}
