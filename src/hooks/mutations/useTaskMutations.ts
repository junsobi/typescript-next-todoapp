import { useMutation, useQueryClient } from 'react-query';
import { Task, PartialTask } from '@/types/type';
import apiClient from '@/utils/apiClient';

const TASKS_KEY = 'tasks';

export function useTaskMutations() {
  const queryClient = useQueryClient();

  const mutationOptions = {
    onMutate: async (task: PartialTask | string) => {
      await queryClient.cancelQueries(TASKS_KEY);

      const previousTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      queryClient.setQueryData(TASKS_KEY, (old: Task[] = []) => {
        if (typeof task === 'string') {
          return old.filter((t: Task) => t.id !== task);
        }
        return old.map((t: Task) => (t.id === task.id ? { ...t, ...task } : t));
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
  };

  const addTaskMutation = useMutation(
    (task: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>) =>
      apiClient.post('/rest/v1/todos', {
        title: task.title,
        content: task.content,
      }),
    mutationOptions,
  );

  const editTaskMutation = useMutation(
    (task: PartialTask) =>
      apiClient.patch(`/rest/v1/todos?id=eq.${task.id}`, task),
    mutationOptions,
  );

  const deleteTaskMutation = useMutation(
    (taskId: string) => apiClient.delete(`/rest/v1/todos?id=eq.${taskId}`),
    mutationOptions,
  );

  return {
    addTask: addTaskMutation.mutate,
    editTask: editTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}
