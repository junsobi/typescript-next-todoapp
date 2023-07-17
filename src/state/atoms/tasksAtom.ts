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
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setSelf(JSON.parse(savedTasks));
      }
      return () => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
          setSelf(JSON.parse(tasks));
        }
      };
    },
  ],
});

export function TaskManager() {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const addTask = (taskToAdd: Task) => {
    setTasks((oldTasksList) => [
      ...oldTasksList,
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

  const editTask = (taskToEdit: Task) => {
    setTasks((oldTasksList) =>
      oldTasksList.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, ...taskToEdit, lastModifiedDateTime: new Date() }
          : task,
      ),
    );
  };

  const toggleTask = (taskId: string) => {
    setTasks((oldTasksList) =>
      oldTasksList.map((task) =>
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
    setTasks((oldTasksList) =>
      oldTasksList.filter((task) => task.id !== taskId),
    );
  };

  const clearCompletedTasks = () => {
    setTasks((oldTasksList) =>
      oldTasksList.filter((task) => task.status !== 'completed'),
    );
  };

  return { addTask, editTask, toggleTask, deleteTask, clearCompletedTasks };
}
