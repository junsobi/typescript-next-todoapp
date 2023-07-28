import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useMutationOptions } from './useMutationOptions';
import {
  Task,
  PartialTask,
  TaskManagerPropsWithOptimisticId,
} from '@/types/type';
import { AxiosResponse } from 'axios';
import apiClient from '@/utils/apiClient';

export function useReactQueryTaskManager(): TaskManagerPropsWithOptimisticId {
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await apiClient.get('/rest/v1/todos');
    return response.data;
  };

  const tasksQuery = useQuery<Task[]>('tasks', fetchTasks);

  // Add Task

  const addTaskMutation = useMutation(
    useMutationOptions(
      'tasks',
      (task: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>) =>
        apiClient.post('/rest/v1/todos', {
          title: task.title,
          content: task.content,
        }),
      (previousTasks: any, newTask: any) => [
        ...previousTasks,
        {
          ...newTask,
          id: Date.now().toString(),
          categories: newTask.categories ?? [],
          status: newTask.status ?? 'inProgress',
          createdDateTime: newTask.createdDateTime ?? new Date(),
          lastModifiedDateTime: newTask.lastModifiedDateTime ?? new Date(),
          DueDateTime: newTask.DueDateTime ?? null,
        },
      ],
      (previousTasks: any, newTask: any) => previousTasks,
    ),
  );

  // Edit Task

  const editTaskMutation = useMutation(
    useMutationOptions(
      'tasks',
      async (task: PartialTask) =>
        await apiClient.patch(
          `/rest/v1/todos?id=eq.${task.id}`,
          task as Record<string, unknown>,
        ),
      (previousTasks: Task[], updatedTask: PartialTask) =>
        previousTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
        ),
      (previousTasks: Task[], updatedTask: PartialTask) => previousTasks,
    ),
  );

  // Delete Task

  const deleteTaskMutation = useMutation(
    useMutationOptions(
      'tasks',
      async (taskId: string) =>
        await apiClient.delete(`/rest/v1/todos?id=eq.${taskId}`),
      (previousTasks: Task[], taskId: string) =>
        previousTasks.filter((task) => task.id !== taskId),
      (previousTasks: Task[], taskId: string) => previousTasks,
    ),
  );

  // Toggle Task

  const toggleTaskMutation = useMutation(
    useMutationOptions(
      'tasks',
      async (taskId: string) => {
        const task = tasksQuery.data?.find((task: Task) => task.id === taskId);
        if (!task) return;
        task.status = task.status === 'completed' ? 'inProgress' : 'completed';
        await apiClient.patch(`/rest/v1/todos?id=eq.${taskId}`, task);
      },
      (previousTasks: Task[], taskId: string) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status:
                  task.status === 'completed' ? 'inProgress' : 'completed',
              }
            : task,
        ),
      (previousTasks: Task[], taskId: string) => previousTasks,
    ),
  );

  // Clear Completed Tasks

  const clearCompletedTasksMutation = useMutation(
    useMutationOptions(
      'tasks',
      async () => {
        const completedTasks = tasksQuery.data?.filter(
          (task: Task) => task.status === 'completed',
        );
        if (completedTasks) {
          await Promise.all(
            completedTasks.map((task) =>
              apiClient.delete(`/rest/v1/todos?id=eq.${task.id}`),
            ),
          );
        }
      },
      (previousTasks: Task[]) =>
        previousTasks.filter((task) => task.status !== 'completed'),
      (previousTasks: Task[]) => previousTasks,
    ),
  );

  return {
    tasks: tasksQuery.data ?? [],
    addTask: addTaskMutation.mutate,
    editTask: editTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    clearCompletedTasks: () => clearCompletedTasksMutation.mutate(undefined),
  };
}
