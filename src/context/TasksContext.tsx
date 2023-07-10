import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/types/type';

interface ContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  editTask: (id: string, title: string) => void;
}

interface TasksProviderProps {
  children: ReactNode;
  initialTasks?: Task[];
}

export const TasksContext = createContext<Partial<ContextProps>>({});

export const TasksProvider: React.FC<TasksProviderProps> = ({
  children,
  initialTasks = [],
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

  const editTask = (id: string, newTitle: string) => {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle, lasModifiedDateTime: new Date() };
        }
        return task;
      });
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};
