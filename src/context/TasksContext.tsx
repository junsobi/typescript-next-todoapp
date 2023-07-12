import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/types/type';
import { v4 as uuidv4 } from 'uuid';

interface ContextProps {
  tasks: Task[];
  addTask: (
    task: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  editTask: (
    task: Pick<Task, 'id'> &
      Omit<Task, 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => void;
  //id를 가지고 있지만 , 만든시간,수정시간은 가지고잇지않는 타입의 객체를 매개변수로 받겠다.
  toggleTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  clearCompletedTasks: () => void;
}

interface TasksProviderProps {
  children: ReactNode;
  initialTasks?: Task[];
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

export const TasksProvider: React.FC<TasksProviderProps> = ({
  children,
  initialTasks = [],
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
      },
    ]);
  };

  const editTask = (
    taskToEdit: Omit<Task, 'createdDateTime' | 'lastModifiedDateTime'>,
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

  const toggleTask = (taskToToggle: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskToToggle.id
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
