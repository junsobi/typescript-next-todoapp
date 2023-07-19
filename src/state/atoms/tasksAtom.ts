import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { Task } from '@/types/type';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from '@/utils/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
});

export function TaskManager() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/server-recoil') {
      axios
        .get(`${API_URL}rest/v1/todos`, {
          headers: {
            apikey: API_KEY,
          },
        })
        .then((response) => {
          setTasks(response.data);
        });
    } else {
      setTasks(loadTasksFromLocalStorage());
    }
  }, [router.pathname]); // eslint-disable-line

  const addTask = async (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    const newTask = {
      ...taskToAdd,
      id: uuidv4(),
      status: taskToAdd.status || 'inProgress',
      createdDateTime: new Date(),
      lastModifiedDateTime: new Date(),
      DueDateTime: taskToAdd.DueDateTime || null,
    };

    if (router.pathname === '/server-recoil') {
      const serverTask = {
        title: taskToAdd.title,
        content: taskToAdd.content,
      };
      const response = await axios.post(
        `${API_URL}/rest/v1/todos`,
        serverTask,
        {
          headers: {
            apikey: API_KEY,
          },
        },
      );
      setTasks((oldTasksList) => [...oldTasksList, response.data]);
    } else {
      setTasks((oldTasksList) => {
        const newTasksList = [...oldTasksList, newTask];
        saveTasksToLocalStorage(newTasksList);
        return newTasksList;
      });
    }
  };

  const editTask = async (
    taskToEdit: Pick<Task, 'id'> &
      Omit<Task, 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    if (router.pathname === '/server-recoil') {
      await axios.patch(
        `${API_URL}/rest/v1/todos?id=eq.${taskToEdit.id}`,
        taskToEdit,
        {
          headers: {
            apikey: API_KEY,
          },
        },
      );

      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });

      setTasks(response.data);
    } else {
      setTasks((oldTasksList) => {
        const updatedTasks = oldTasksList.map((task) =>
          task.id === taskToEdit.id
            ? { ...task, ...taskToEdit, lastModifiedDateTime: new Date() }
            : task,
        );
        saveTasksToLocalStorage(updatedTasks);
        return updatedTasks;
      });
    }
  };

  const toggleTask = async (taskId: string) => {
    if (router.pathname === '/server-recoil') {
      const taskToToggle = tasks.find((task) => task.id === taskId);
      if (!taskToToggle) return;

      const newStatus =
        taskToToggle.status === 'completed' ? 'inProgress' : 'completed';
      await axios.patch(
        `${API_URL}/rest/v1/todos?id=eq.${taskId}`,
        { status: newStatus },
        {
          headers: {
            apikey: API_KEY,
          },
        },
      );

      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });

      setTasks(response.data);
    } else {
      setTasks((oldTasksList: Task[]) => {
        const toggledTasks: Task[] = oldTasksList.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status:
                  task.status === 'completed' ? 'inProgress' : 'completed',
              }
            : task,
        );

        saveTasksToLocalStorage(toggledTasks);

        return toggledTasks;
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    if (router.pathname === '/server-recoil') {
      await axios.delete(`${API_URL}/rest/v1/todos?id=eq.${taskId}`, {
        headers: {
          apikey: API_KEY,
        },
      });

      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });

      setTasks(response.data);
    } else {
      setTasks((oldTasksList) => {
        const remainingTasks = oldTasksList.filter(
          (task) => task.id !== taskId,
        );
        saveTasksToLocalStorage(remainingTasks);
        return remainingTasks;
      });
    }
  };

  const clearCompletedTasks = async () => {
    if (router.pathname === '/server-recoil') {
      const completedTasks = tasks.filter(
        (task) => task.status === 'completed',
      );

      await Promise.all(
        completedTasks.map((task) =>
          axios.delete(`${API_URL}/rest/v1/todos?id=eq.${task.id}`, {
            headers: {
              apikey: API_KEY,
            },
          }),
        ),
      );

      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });

      setTasks(response.data);
    } else {
      setTasks((oldTasksList) => {
        const inProgressTasks = oldTasksList.filter(
          (task) => task.status !== 'completed',
        );
        saveTasksToLocalStorage(inProgressTasks);
        return inProgressTasks;
      });
    }
  };

  return { addTask, editTask, toggleTask, deleteTask, clearCompletedTasks };
}
