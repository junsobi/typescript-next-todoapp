import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';

const useClearAll = () => {
  const { clearCompletedTasks } = useContext(TasksContext);

  const handleClearAll = () => {
    clearCompletedTasks();
  };

  return {
    onClick: handleClearAll,
    className: 'bg-gray-200  px-3 py-1 rounded hover:bg-gray-300 shadow-md',
    children: '🧹',
  };
};

export default useClearAll;
