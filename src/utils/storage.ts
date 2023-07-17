import { Task } from '@/types/type';

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

export const loadTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== 'undefined') {
    const storedTasks = window.localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};
