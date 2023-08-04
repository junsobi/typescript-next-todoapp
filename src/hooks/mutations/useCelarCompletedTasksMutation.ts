import { useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { Task } from '@/types/type';
import apiClient from '@/utils/apiClient';

const TASKS_KEY = 'tasks';

export function useClearCompletedTasksMutation(
  tasksQuery: UseQueryResult<Task[]>,
) {
  const queryClient = useQueryClient();

  return useMutation(
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
    {
      onMutate: async () => {
        await queryClient.cancelQueries(TASKS_KEY);
        const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);
        queryClient.setQueryData(
          TASKS_KEY,
          previousTasks?.filter((task) => task.status !== 'completed'),
        );
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
