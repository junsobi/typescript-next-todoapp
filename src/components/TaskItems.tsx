import React, { useContext, useState } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import { Task } from '@/types/type';
import { TasksContext } from '@/context/TasksContext';

type TaskItemsProps = {
  tasks: Task[];
};

const TaskItems: React.FC<TaskItemsProps> = ({ tasks }) => {
  const { editTask } = useContext(TasksContext);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleLabelClick = (taskId: string, taskTitle: string) => {
    setEditTaskId(taskId);
    setNewTaskTitle(taskTitle);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  if (tasks.length === 0) {
    return <div>Empty</div>;
  }

  const handleInputBlur = () => {
    if (editTaskId && editTask) {
      editTask(editTaskId, newTaskTitle || '');
      setEditTaskId(null);
      setNewTaskTitle('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editTaskId && editTask) {
      editTask(editTaskId, newTaskTitle || '');
      setEditTaskId(null);
      setNewTaskTitle('');
    }
  };

  return (
    <ul data-testid="task-list">
      {tasks.map((task, i) => (
        <li
          key={i}
          data-testid="task"
          className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300"
        >
          <div className="flex gap-4 w-full">
            <Checkbox
              className="task-check"
              checked={task.status === 'completed'}
            />

            {editTaskId === task.id ? (
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
                onClick={() => handleLabelClick(task.id, task.title)}
              >
                {task.title}
              </span>
            )}
          </div>
          <Button className="delete-btn">🗑️</Button>
        </li>
      ))}
    </ul>
  );
};

export default TaskItems;
