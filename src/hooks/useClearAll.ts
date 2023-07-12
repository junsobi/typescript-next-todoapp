import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';

const useClearAll = () => {
  const { clearCompletedTasks } = useContext(TasksContext);

  const handleClearAll = () => {
    clearCompletedTasks();
  };

  return {
    onClick: handleClearAll,
    className: 'bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500',
    children: 'Clear All',
  };
};

export default useClearAll;
