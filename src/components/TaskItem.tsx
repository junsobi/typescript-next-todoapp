import React, { useState } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';
import { useTaskItem } from '@/hooks/useTaskItem';
import TaskText from './TaskText';
import Input from './Input';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const {
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
  } = useTaskItem(task);

  return (
    <li
      data-testid={`task-${task.title}`}
      className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-100"
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
