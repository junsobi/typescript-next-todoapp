import { atom } from 'recoil';
import { Task } from '@/types/type';
import { loadTasksFromLocalStorage } from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: loadTasksFromLocalStorage() || [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      if (typeof window !== 'undefined') {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setSelf(JSON.parse(savedTasks));
        }
      }
      return () => {
        if (typeof window !== 'undefined') {
          const tasks = localStorage.getItem('tasks');
          if (tasks) {
            setSelf(JSON.parse(tasks));
          }
        }
      };
    },
  ],
});

export function TaskManager() {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const addTask = (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    setTasks((oldTasksList) => {
      const newTasksList = [
        ...oldTasksList,
        {
          ...taskToAdd,
          id: uuidv4(),
          status: taskToAdd.status || 'inProgress',
          createdDateTime: new Date(),
          lastModifiedDateTime: new Date(),
          DueDateTime: taskToAdd.DueDateTime || null,
        },
      ];

      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(newTasksList));
      }
      return newTasksList;
    });
  };

  const editTask = (
    taskToEdit: Pick<Task, 'id'> &
      Omit<Task, 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    setTasks((oldTasksList) => {
      const updatedTasks = oldTasksList.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, ...taskToEdit, lastModifiedDateTime: new Date() }
          : task,
      );

      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }

      return updatedTasks;
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks((oldTasksList: Task[]) => {
      const toggledTasks: Task[] = oldTasksList.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'inProgress' : 'completed',
            }
          : task,
      );

      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(toggledTasks));
      }

      return toggledTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((oldTasksList) => {
      const remainingTasks = oldTasksList.filter((task) => task.id !== taskId);

      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(remainingTasks));
      }

      return remainingTasks;
    });
  };

  const clearCompletedTasks = () => {
    setTasks((oldTasksList) => {
      const inProgressTasks = oldTasksList.filter(
        (task) => task.status !== 'completed',
      );

      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(inProgressTasks));
      }

      return inProgressTasks;
    });
  };

  return { addTask, editTask, toggleTask, deleteTask, clearCompletedTasks };
}
