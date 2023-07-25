import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import {
  Task,
  PartialTask,
  TaskManagerPropsWithOptimisticId,
} from '@/types/type';
import { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function useReactQueryTaskManager(): TaskManagerPropsWithOptimisticId {
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/rest/v1/todos`, {
      headers: {
        apikey: API_KEY,
      },
    });
    return response.data;
  };

  const tasksQuery = useQuery<Task[]>('tasks', fetchTasks);

  const addTaskMutation = useMutation<
    AxiosResponse<any>, // Mutation 응답 타입
    unknown, // 에러 타입
    Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>, // Mutation 입력 타입
    { previousTasks: Task[] | undefined } // 컨텍스트 타입
  >(
    (task: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>) => {
      // Mutation 함수 내용은 그대로 유지
      return axios
        .post(
          `${API_URL}/rest/v1/todos`,
          { title: task.title, content: task.content },
          {
            headers: {
              apikey: API_KEY,
            },
          },
        )
        .then((response) => {
          return response;
        });
    },
    {
      onMutate: async (
        newTask: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
      ) => {
        const tempId = Date.now().toString();
        const previousTasks = queryClient.getQueryData<Task[]>('tasks');

        queryClient.setQueryData<Task[]>('tasks', (old = []) => [
          ...old,
          {
            ...newTask,
            id: tempId,
            categories: newTask.categories ?? [],
            status: newTask.status ?? 'inProgress',
            createdDateTime: newTask.createdDateTime ?? new Date(),
            lastModifiedDateTime: newTask.lastModifiedDateTime ?? new Date(),
            DueDateTime: newTask.DueDateTime ?? null,
          },
        ]);

        return { previousTasks };
      },
      onError: (err, newTask, context) => {
        queryClient.setQueryData('tasks', context?.previousTasks);
      },
      onSuccess: async () => {
        const response = await axios.get(`${API_URL}/rest/v1/todos`, {
          headers: {
            apikey: API_KEY,
          },
        });

        queryClient.setQueryData('tasks', response.data);

        queryClient.invalidateQueries('tasks');
      },
    },
  );

  const editTask = async (task: PartialTask) => {
    await axios.patch(`${API_URL}/rest/v1/todos?id=eq.${task.id}`, task, {
      headers: {
        apikey: API_KEY,
      },
    });
  };
  // Edit Task
  const editTaskMutation = useMutation(editTask, {
    onMutate: async (updatedTask: PartialTask) => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      if (previousTasks) {
        queryClient.setQueryData<Task[]>('tasks', (old = []) =>
          old.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
          ),
        );
      }

      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      queryClient.setQueryData<Task[]>('tasks', context?.previousTasks || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  // Delete Task

  const deleteTask = async (taskId: string) => {
    await axios.delete(`${API_URL}/rest/v1/todos?id=eq.${taskId}`, {
      headers: {
        apikey: API_KEY,
      },
    });
  };

  const deleteTaskMutation = useMutation(deleteTask, {
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      if (previousTasks) {
        queryClient.setQueryData<Task[]>('tasks', (old = []) =>
          old.filter((task) => task.id !== taskId),
        );
      }

      return { previousTasks };
    },
    onError: (err, taskId, context) => {
      queryClient.setQueryData<Task[]>('tasks', context?.previousTasks || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  // Toggle Task

  const toggleTask = async (taskId: string) => {
    const task = tasksQuery.data?.find((task: Task) => task.id === taskId);
    if (!task) return;
    task.status = task.status === 'completed' ? 'inProgress' : 'completed';
    await axios.patch(`${API_URL}/rest/v1/todos?id=eq.${taskId}`, task, {
      headers: {
        apikey: API_KEY,
      },
    });
  };

  const toggleTaskMutation = useMutation(toggleTask, {
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      if (previousTasks) {
        queryClient.setQueryData<Task[]>('tasks', (old = []) =>
          old.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status:
                    task.status === 'completed' ? 'inProgress' : 'completed',
                }
              : task,
          ),
        );
      }

      return { previousTasks };
    },
    onError: (err, taskId, context) => {
      queryClient.setQueryData<Task[]>('tasks', context?.previousTasks || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  // Clear Completed Tasks

  const clearCompletedTasks = async () => {
    const completedTasks = tasksQuery.data?.filter(
      (task: Task) => task.status === 'completed',
    );
    if (completedTasks) {
      await Promise.all(
        completedTasks.map((task) =>
          axios.delete(`${API_URL}/rest/v1/todos?id=eq.${task.id}`, {
            headers: {
              apikey: API_KEY,
            },
          }),
        ),
      );
    }
  };

  const clearCompletedTasksMutation = useMutation(clearCompletedTasks, {
    onMutate: async () => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      if (previousTasks) {
        queryClient.setQueryData<Task[]>('tasks', (old = []) =>
          old.filter((task) => task.status !== 'completed'),
        );
      }

      return { previousTasks };
    },
    onError: (err, voidVar, context) => {
      queryClient.setQueryData<Task[]>('tasks', context?.previousTasks || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  // console.log(tasksQuery.data);
  return {
    tasks: tasksQuery.data ?? [],
    addTask: addTaskMutation.mutate,
    editTask: editTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    clearCompletedTasks: clearCompletedTasksMutation.mutate,
  };
}
