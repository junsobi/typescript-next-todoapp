import { useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { Task, PartialTask } from '@/types/type';
import apiClient from '@/utils/apiClient';

const TASKS_KEY = 'tasks';

export function useToggleTaskMutation(tasksQuery: UseQueryResult<Task[]>) {
  const queryClient = useQueryClient();

  return useMutation(
    async (taskId: string) => {
      const task = tasksQuery.data?.find((task: Task) => task.id === taskId);
      if (!task) return;
      task.status = task.status === 'completed' ? 'inProgress' : 'completed';
      await apiClient.patch(`/rest/v1/todos?id=eq.${taskId}`, task);
    },
    {
      onMutate: async (task: PartialTask | string) => {
        await queryClient.cancelQueries(TASKS_KEY);
        const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);
        queryClient.setQueryData(TASKS_KEY, (old: Task[] = []) => {
          if (typeof task === 'string') {
            return old.filter((t: Task) => t.id !== task);
          }
          return old.map((t: Task) =>
            t.id === task.id ? { ...t, ...task } : t,
          );
        });

        return { previousTasks };
      },
      onError: (err: any, newTask: any, context: any) => {
        if (context?.previousTasks) {
          queryClient.setQueryData(TASKS_KEY, context.previousTasks);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(TASKS_KEY);
      },
    },
  );
}
