import React, { useState, useContext } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { editTask, toggleTask } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const saveEdit = () => {
    editTask({
      ...task,
      title: newTaskTitle || '',
    });
    setIsEditing(false);
  };

  const handleInputBlur = () => {
    saveEdit();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleTask(task);
  };

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
          <input
            className="w-full"
            value={newTaskTitle}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={
              task.status === 'completed' ? 'w-auto line-through' : 'w-auto'
            }
            onClick={handleLabelClick}
          >
            {task.title}
          </span>
        )}
      </div>
      <Button className="delete-btn">🗑️</Button>
    </li>
  );
};

export default TaskItem;
