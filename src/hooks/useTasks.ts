import { useTaskManager } from './useTaskManager';

const useTasks = () => {
  const { tasks } = useTaskManager();

  const incompletedTasks = {
    tasks: tasks.filter((task) => task.status !== 'completed'),
    testId: 'Incompleted-section',
  };

  const completedTasks = {
    tasks: tasks.filter((task) => task.status === 'completed'),
    testId: 'Completed-section',
  };

  return {
    tasks,
    incompletedTasks,
    completedTasks,
  };
};

export default useTasks;
