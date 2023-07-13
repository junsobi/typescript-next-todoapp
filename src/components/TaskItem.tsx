import React from 'react';
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
    handleLabelClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleCheckboxClick,
    handleDeleteButtonClick,
  } = useTaskItem(task);

  return (
    <li
      data-testid="task"
      className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300"
    >
      <div className="flex gap-4 w-full">
        <Checkbox
          name="checkbox"
          className="task-check"
          checked={task.status === 'completed'}
          onChange={handleCheckboxClick}
          aria-label={task.title}
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
              task.status === 'completed' ? 'w-auto line-through' : 'w-auto'
            }
            onClick={handleLabelClick}
          >
            {task.title}
          </TaskText>
        )}
      </div>
      <Button className="delete-btn" onClick={handleDeleteButtonClick}>
        🗑️
      </Button>
    </li>
  );
};

export default TaskItem;
