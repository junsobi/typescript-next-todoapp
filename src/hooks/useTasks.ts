import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';

const useTasks = () => {
  const { tasks } = useContext(TasksContext);

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
