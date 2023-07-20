import { useEffect } from 'react';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { Task } from '@/types/type';
import { TaskManagerProps } from '@/types/type';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const tasksState = atom<Task[]>({
  key: 'serverTasksState',
  default: [],
});

export function useServerTaskManager(): TaskManagerProps {
  const [tasks, setTasks] = useRecoilState(tasksState);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     console.log('fetching tasks with server-recoil');
  //     const response = await axios.get(`${API_URL}/rest/v1/todos`, {
  //       headers: {
  //         apikey: API_KEY,
  //       },
  //     });
  //     setTasks(response.data);
  //   };
  //   fetchTasks();
  // }, []);

  const addTask = async (
    taskToAdd: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
  ) => {
    console.log('adding task with server-recoil');
    const serverTask = {
      title: taskToAdd.title,
      content: taskToAdd.content,
    };
    const response = await axios.post(`${API_URL}/rest/v1/todos`, serverTask, {
      headers: {
        apikey: API_KEY,
      },
    });
    setTasks((oldTasks) => [...oldTasks, response.data]);
  };

  const editTask = async (
    taskToEdit: Pick<Task, 'id'> &
      Partial<
        Omit<
          Task,
          'id' | 'createdDateTime' | 'lastModifiedDateTime' | 'DueDateTime'
        > & {
          DueDateTime?: Date | null;
        }
      >,
  ) => {
    console.log('editing task with server-recoil');
    await axios.patch(
      `${API_URL}/rest/v1/todos?id=eq.${taskToEdit.id}`,
      taskToEdit,
      {
        headers: {
          apikey: API_KEY,
        },
      },
    );
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...taskToEdit } : task,
      ),
    );
  };

  const toggleTask = async (taskId: string) => {
    console.log('toggling task with server-recoil');
    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) return;

    const newStatus =
      taskToToggle.status === 'completed' ? 'inProgress' : 'completed';

    const response = await axios.patch(
      `${API_URL}/rest/v1/todos?id=eq.${taskId}`,
      { status: newStatus },
      {
        headers: {
          apikey: API_KEY,
        },
      },
    );

    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const deleteTask = async (taskId: string) => {
    console.log('deleting task with server-recoil');
    await axios.delete(`${API_URL}/rest/v1/todos?id=eq.${taskId}`, {
      headers: {
        apikey: API_KEY,
      },
    });

    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== taskId));
  };

  const clearCompletedTasks = async () => {
    console.log('clearing completed tasks with server-recoil');
    const completedTasks = tasks.filter((task) => task.status === 'completed');

    await Promise.all(
      completedTasks.map((task) =>
        axios.delete(`${API_URL}/rest/v1/todos?id=eq.${task.id}`, {
          headers: {
            apikey: API_KEY,
          },
        }),
      ),
    );

    setTasks((oldTasks) =>
      oldTasks.filter((task) => task.status !== 'completed'),
    );
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
