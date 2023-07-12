import { Task } from '@/types/type';

const useTaskText = (task: Task, startEditing: () => void) => {
  return {
    className: task.status === 'completed' ? 'w-auto line-through' : 'w-auto',
    onClick: startEditing,
    children: task.title,
  };
};

export default useTaskText;
