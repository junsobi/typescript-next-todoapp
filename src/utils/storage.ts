import { Task } from '@/types/type';

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

export const loadTasksFromLocalStorage = (): Task[] => {
  let storedTasks = null;

  if (typeof window !== 'undefined') {
    storedTasks = window.localStorage.getItem('tasks');
  }

  return storedTasks ? JSON.parse(storedTasks) : [];
};

//try catch
