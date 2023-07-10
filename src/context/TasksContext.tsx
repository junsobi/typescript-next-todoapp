import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/types/type';
import { mockTasks } from '@/data/mockTasks';

interface ContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  editTask: (id: string, title: string) => void;
  toggleTask: (id: string) => void;
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

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'completed' ? 'inProgress' : 'completed',
            }
          : task,
      ),
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
};
