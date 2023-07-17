import React, { useState, useEffect, useContext } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';
import TaskText from './TaskText';
import Input from './Input';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
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
  return (
    <li
      data-testid={`task-${task.title}`}
      className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-100 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-4 w-full">
        <Checkbox
          checked={task.status === 'completed'}
          onChange={handleCheckboxClick}
        />

        {isEditing ? (
          <Input
            className="w-full"
            value={newTaskTitle}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        ) : (
          <TaskText
            className={
              task.status === 'completed'
                ? 'w-auto line-through text-gray-400'
                : 'w-auto'
            }
            onClick={handleLabelClick}
          >
            {task.title}
          </TaskText>
        )}
      </div>

      {isHovered && (
        <Button className="delete-btn" onClick={handleDeleteButtonClick}>
          🗑️
        </Button>
      )}
    </li>
  );
};

export default TaskItem;
