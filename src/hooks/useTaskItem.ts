import { useState, useContext, useEffect } from 'react';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';

export const useTaskItem = (task: Task) => {
  const { editTask, toggleTask, deleteTask } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isHovered, setIsHovered] = useState(false); // 추가

  useEffect(() => {
    setNewTaskTitle(task.title);
  }, [task]);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const saveEdit = () => {
    if (newTaskTitle.trim() !== '') {
      editTask({ ...task, title: newTaskTitle.trim() });
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputBlur = () => saveEdit();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  const handleCheckboxClick = () => {
    toggleTask(task);
  };

  const handleDeleteButtonClick = () => {
    deleteTask(task.id);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    newTaskTitle,
    isEditing,
    isHovered,
    handleLabelClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleCheckboxClick,
    handleDeleteButtonClick,
    handleMouseEnter,
    handleMouseLeave,
  };
};
