import { useFetchTasks } from './queries/useFetchTasks';
import { useClearCompletedTasksMutation } from './mutations/useCelarCompletedTasksMutation';
import { useTaskMutations } from './mutations/useTaskMutations';
import { useToggleTaskMutation } from './mutations/useToggleTaskMutation';

export function useReactQueryTaskManager() {
  const tasksQuery = useFetchTasks();
  const { addTask, editTask, deleteTask } = useTaskMutations();
  const toggleTaskMutation = useToggleTaskMutation(tasksQuery);
  const clearCompletedTasksMutation =
    useClearCompletedTasksMutation(tasksQuery);

  return {
    tasks: tasksQuery.data ?? [],
    addTask,
    editTask,
    deleteTask,
    toggleTask: toggleTaskMutation.mutate,
    clearCompletedTasks: clearCompletedTasksMutation.mutate,
  };
}
