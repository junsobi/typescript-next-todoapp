import { useEffect } from 'react';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import {
  Task,
  PartialTask,
  TaskManagerPropsWithOptimisticId,
} from '@/types/type';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const tasksState = atom<Task[]>({
  key: 'serverTasksState',
  default: [],
});

export function useServerTaskManager(): TaskManagerPropsWithOptimisticId {
  const [tasks, setTasks] = useRecoilState(tasksState);

  //ADD

  const addTask = async (taskToAdd: PartialTask) => {
    console.log('adding task with server-recoil');
    const serverTask = {
      title: taskToAdd.title,
      content: taskToAdd.content,
    };
    // 가상 id 부여(Optimistic UI) - 더 빠른 반응을 위해
    const tempId = Date.now().toString();
    setTasks((oldTasks) => [
      ...oldTasks,
      {
        ...taskToAdd,
        id: tempId,
        categories: taskToAdd.categories ?? [],
        status: taskToAdd.status ?? 'inProgress',
        createdDateTime: taskToAdd.createdDateTime ?? new Date(),
        lastModifiedDateTime: taskToAdd.lastModifiedDateTime ?? new Date(),
        DueDateTime: taskToAdd.DueDateTime ?? null,
      },
    ]);

    try {
      await axios.post(`${API_URL}/rest/v1/todos`, serverTask, {
        headers: {
          apikey: API_KEY,
        },
      });

      const response = await axios.get(`${API_URL}/rest/v1/todos`, {
        headers: {
          apikey: API_KEY,
        },
      });
      console.log(response);
      // Optimistic UI 업데이트에 대한 실제 서버 응답
      setTasks(response.data);
    } catch (error) {
      // 에러 처리
      console.error(error);

      // 가상 id 롤백
      setTasks((oldTasks) => oldTasks.filter((task) => task.id !== tempId));
    }
  };

  //Edit

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

    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...taskToEdit } : task,
      ),
    );

    try {
      await axios.patch(
        `${API_URL}/rest/v1/todos?id=eq.${taskToEdit.id}`,
        taskToEdit,
        {
          headers: {
            apikey: API_KEY,
          },
        },
      );
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    console.log('deleting task with server-recoil');

    const oldTasks = tasks;

    setTasks(oldTasks.filter((task) => task.id !== taskId));

    try {
      await axios.delete(`${API_URL}/rest/v1/todos?id=eq.${taskId}`, {
        headers: {
          apikey: API_KEY,
        },
      });
    } catch (error) {
      setTasks(oldTasks);
      console.error(error);
    }
  };

  const toggleTask = async (taskId: string) => {
    console.log('toggling task with server-recoil');

    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) return;

    const newStatus =
      taskToToggle.status === 'completed' ? 'inProgress' : 'completed';

    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    try {
      await axios.patch(
        `${API_URL}/rest/v1/todos?id=eq.${taskId}`,
        { status: newStatus },
        {
          headers: {
            apikey: API_KEY,
          },
        },
      );
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  const clearCompletedTasks = async () => {
    console.log('clearing completed tasks with server-recoil');

    const completedTasks = tasks.filter((task) => task.status === 'completed');

    const oldTasks = tasks;

    setTasks(oldTasks.filter((task) => task.status !== 'completed'));

    try {
      await Promise.all(
        completedTasks.map((task) =>
          axios.delete(`${API_URL}/rest/v1/todos?id=eq.${task.id}`, {
            headers: {
              apikey: API_KEY,
            },
          }),
        ),
      );
    } catch (error) {
      setTasks(oldTasks);
      console.error(error);
    }
  };
  // console.log(tasks);
  return {
    tasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
  };
}
