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
  const [prevTaskTitle, setPrevTaskTitle] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setNewTaskTitle(task.title);
  }, [task]);

  const handleLabelClick = () => {
    setIsEditing(true);
    setPrevTaskTitle(newTaskTitle); // 현재 값 저장
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
    setNewTaskTitle(prevTaskTitle); // 이전 값으로 복원
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

  const getDueDateText = (): string | null => {
    if (task.DueDateTime) {
      const today = new Date();
      const dueDate = new Date(task.DueDateTime);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return 'D-day';
      } else if (diffDays < 0) {
        return `D+${Math.abs(diffDays)}`;
      } else {
        return `D-${diffDays}`;
      }
    }
    return null;
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
          <>
            {task.DueDateTime && (
              <span className="dueDateText px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs cursor-pointer ">
                {getDueDateText()}
              </span>
            )}
            <TaskText
              className={
                task.status === 'completed'
                  ? 'w-auto line-through text-gray-400'
                  : 'w-auto !text-gray-900'
              }
              onClick={handleLabelClick}
            >
              {task.title}
            </TaskText>
          </>
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
