import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '@/types/type';
import { v4 as uuidv4 } from 'uuid';
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from '@/utils/storage';

export interface ContextProps {
  tasks: Task[];
  addTask: (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  editTask: (
    taskToEdit: Pick<Task, 'id'> &
      Omit<Task, 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  clearCompletedTasks: () => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<ContextProps>({
  tasks: [],
  addTask: () => undefined,
  editTask: () => undefined,
  toggleTask: () => undefined,
  deleteTask: () => undefined,
  clearCompletedTasks: () => undefined,
});
//더미함수를 주어 비즈니스로직에서 ? 를 안써도되게함
//실제구현에선 더미함수를 대체하게될거임.

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadAndSetTasks = async () => {
      const storedTasks = loadTasksFromLocalStorage();
      if (storedTasks) {
        setTasks(storedTasks);
      }
    };

    if (typeof window !== 'undefined') {
      loadAndSetTasks();
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && typeof window !== 'undefined') {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks]);

  const addTask = (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...taskToAdd,
        id: uuidv4(),
        status: 'inProgress',
        createdDateTime: new Date(),
        lastModifiedDateTime: new Date(),
        DueDateTime: taskToAdd.DueDateTime || null,
      },
    ]);
  };

  const editTask = (
    taskToEdit: Pick<Task, 'id'> &
      Omit<Task, 'createdDateTime' | 'lastModifiedDateTime' | 'DueDateTime'> & {
        DueDateTime?: Date | null;
      },
  ) => {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === taskToEdit.id) {
          return { ...task, ...taskToEdit, lastModifiedDateTime: new Date() };
        }
        return task;
      });
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'inProgress' : 'completed',
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const clearCompletedTasks = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== 'completed'),
    );
  };

  // const clearCompletedTasks = () => {
  //   setTasks((currentTasks) =>
  //     currentTasks.filter((task) => task.status !== 'completed'),
  //   );
  //   saveTasksToLocalStorage(
  //     tasks.filter((task) => task.status !== 'completed'),
  //   );
  // };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        toggleTask,
        deleteTask,
        clearCompletedTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
