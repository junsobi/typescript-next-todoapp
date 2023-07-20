import { atom, useRecoilState } from 'recoil';
import { Task } from '@/types/type';
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { TaskManagerProps } from '@/types/type';

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: loadTasksFromLocalStorage(),
});

export function useLocalTaskManager(): TaskManagerProps {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const addTask = (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    console.log('Adding with nonserver-recoil');
    const newTask: Task = {
      ...taskToAdd,
      id: uuidv4(),
      status: taskToAdd.status || 'inProgress',
      createdDateTime: new Date(),
      lastModifiedDateTime: new Date(),
      DueDateTime: taskToAdd.DueDateTime || null,
    };

    setTasks((oldTasks) => {
      const newTasks = [...oldTasks, newTask];
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
  };

  const editTask = (
    taskToEdit: Pick<Task, 'id'> &
      Partial<
        Omit<
          Task,
          'createdDateTime' | 'lastModifiedDateTime' | 'DueDateTime'
        > & { DueDateTime?: Date | null }
      >,
  ) => {
    console.log('Editing with nonserver-recoil');
    setTasks((oldTasks) => {
      const updatedTasks = oldTasks.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, ...taskToEdit, lastModifiedDateTime: new Date() }
          : task,
      );
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const toggleTask = (taskId: string) => {
    console.log('Toggling with nonserver-recoil');
    setTasks((oldTasks: Task[]) => {
      const toggledTasks: Task[] = oldTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'inProgress' : 'completed',
            }
          : task,
      );
      saveTasksToLocalStorage(toggledTasks);
      return toggledTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    console.log('Deleting with nonserver-recoil');
    setTasks((oldTasks) => {
      const remainingTasks = oldTasks.filter((task) => task.id !== taskId);
      saveTasksToLocalStorage(remainingTasks);
      return remainingTasks;
    });
  };

  const clearCompletedTasks = () => {
    console.log('Clearing completed tasks with nonserver-recoil');
    setTasks((oldTasks) => {
      const inProgressTasks = oldTasks.filter(
        (task) => task.status !== 'completed',
      );
      saveTasksToLocalStorage(inProgressTasks);
      return inProgressTasks;
    });
  };

  return {
    tasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
  };
}
