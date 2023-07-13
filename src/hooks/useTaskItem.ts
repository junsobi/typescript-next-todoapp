import { useState, useContext } from 'react';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';

export const useTaskItem = (task: Task) => {
  const { editTask, toggleTask, deleteTask } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [originalTitle, setOriginalTitle] = useState(task.title);

  const handleLabelClick = () => {
    setOriginalTitle(task.title);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const saveEdit = () => {
    editTask({ ...task, title: newTaskTitle || '' });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setNewTaskTitle(originalTitle);
    setIsEditing(false);
  };

  const handleInputBlur = () => saveEdit();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleTask(task);
  };

  const handleDeleteButtonClick = () => deleteTask(task.id);

  return {
    newTaskTitle,
    isEditing,
    handleLabelClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleCheckboxClick,
    handleDeleteButtonClick,
  };
};
