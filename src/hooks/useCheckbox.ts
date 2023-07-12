import { useContext, ChangeEvent } from 'react';
import { TasksContext } from '@/context/TasksContext';
import { Task } from '@/types/type';

const useCheckbox = (task: Task) => {
  const { toggleTask } = useContext(TasksContext);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleTask(task);
  };

  return {
    name: 'checkbox',
    className: 'task-check',
    checked: task.status === 'completed',
    onChange: handleCheckboxChange,
    'aria-label': task.title,
  };
};

export default useCheckbox;
