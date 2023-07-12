import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';
import { Task } from '@/types/type';

const useDeleteBtn = (task: Task) => {
  const { deleteTask } = useContext(TasksContext);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return {
    onClick: handleDelete,
    className: 'delete-btn',
    children: '🗑️',
    'data-testid': `delete-btn-${task.id}`,
  };
};

export default useDeleteBtn;
