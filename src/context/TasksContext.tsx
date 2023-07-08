import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/types/type';

interface ContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<Partial<ContextProps>>({});

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Math.random().toString(),
        title,
        status: 'inProgress',
        content: '',
        categories: [],
        createdDateTime: new Date(),
        lastModifiedDateTime: new Date(),
      },
    ]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};
