import { useTaskManager } from '@/hooks/useTaskManager';

const useClearAll = () => {
  const { clearCompletedTasks } = useTaskManager();

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
