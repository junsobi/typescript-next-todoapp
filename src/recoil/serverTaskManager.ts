import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import {
  Task,
  PartialTask,
  TaskManagerPropsWithOptimisticId,
} from '@/types/type';
import apiClient from '@/utils/apiClient';

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
      title: taskToAdd.title ?? 'Default title',
      content: taskToAdd.content ?? 'Default content',
    };
    const tempId = Date.now().toString();
    setTasks((oldTasks) => [
      ...oldTasks,
      {
        ...taskToAdd,
        id: tempId,
        title: taskToAdd.title as string,
        content: taskToAdd.content as string,
        categories: taskToAdd.categories ?? [],
        status: taskToAdd.status ?? 'inProgress',
        createdDateTime: taskToAdd.createdDateTime ?? new Date(),
        lastModifiedDateTime: taskToAdd.lastModifiedDateTime ?? new Date(),
        DueDateTime: taskToAdd.DueDateTime ?? null,
      },
    ]);

    try {
      await apiClient.post('/rest/v1/todos', serverTask);
      const response = await apiClient.get('/rest/v1/todos');
      console.log(response);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      setTasks((oldTasks) => oldTasks.filter((task) => task.id !== tempId));
    }
  };

  //EDIT
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
      await apiClient.patch(
        `/rest/v1/todos?id=eq.${taskToEdit.id}`,
        taskToEdit,
      );
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  //DELETE
  const deleteTask = async (taskId: string) => {
    console.log('deleting task with server-recoil');
    const oldTasks = tasks;
    setTasks(oldTasks.filter((task) => task.id !== taskId));
    try {
      await apiClient.delete(`/rest/v1/todos?id=eq.${taskId}`);
    } catch (error) {
      setTasks(oldTasks);
      console.error(error);
    }
  };

  //TOGGLE
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
      await apiClient.patch(`/rest/v1/todos?id=eq.${taskId}`, {
        status: newStatus,
      });
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  //CLEAR
  const clearCompletedTasks = async () => {
    console.log('clearing completed tasks with server-recoil');
    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const oldTasks = tasks;
    setTasks(oldTasks.filter((task) => task.status !== 'completed'));
    try {
      await Promise.all(
        completedTasks.map((task) =>
          apiClient.delete(`/rest/v1/todos?id=eq.${task.id}`),
        ),
      );
    } catch (error) {
      setTasks(oldTasks);
      console.error(error);
    }
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
