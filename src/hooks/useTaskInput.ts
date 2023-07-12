import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Task } from '@/types/type';
import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';

const useTaskInput = (initialTitle: string, task: Task) => {
  const { editTask } = useContext(TasksContext);
  const [newTaskTitle, setNewTaskTitle] = useState(initialTitle);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const saveEdit = () => {
    editTask({ ...task, title: newTaskTitle || '' });
  };

  const handleInputBlur = () => {
    saveEdit();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return {
    name: 'forTaskChange',
    className: 'w-full',
    value: newTaskTitle,
    onChange: handleInputChange,
    onBlur: handleInputBlur,
    onKeyDown: handleInputKeyDown,
    autoFocus: true,
  };
};

export default useTaskInput;
