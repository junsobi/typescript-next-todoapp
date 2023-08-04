import apiClient from '@/utils/apiClient';
import { Task, PartialTask } from '@/types/type';

export async function fetchTasks(): Promise<Task[]> {
  const response = await apiClient.get('/rest/v1/todos');
  return response.data;
}

export async function addTask(
  task: Omit<Task, 'id' | 'createdDateTime' | 'lastModifiedDateTime'>,
) {
  return apiClient.post('/rest/v1/todos', {
    title: task.title,
    content: task.content,
  });
}

export async function editTask(task: PartialTask) {
  return apiClient.patch(`/rest/v1/todos?id=eq.${task.id}`, task);
}

export async function deleteTask(taskId: string) {
  return apiClient.delete(`/rest/v1/todos?id=eq.${taskId}`);
}

export async function toggleTask({
  taskId,
  task,
}: {
  taskId: string;
  task: Task;
}) {
  task.status = task.status === 'completed' ? 'inProgress' : 'completed';
  return apiClient.patch(`/rest/v1/todos?id=eq.${taskId}`, task);
}

export async function clearCompletedTasks(completedTasks: Task[]) {
  if (completedTasks) {
    return Promise.all(
      completedTasks.map((task) =>
        apiClient.delete(`/rest/v1/todos?id=eq.${task.id}`),
      ),
    );
  }
}
