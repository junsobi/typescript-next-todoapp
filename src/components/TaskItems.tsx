import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import { Task } from '@/types/type';

type TaskItemsProps = {
  tasks: Task[];
};

const TaskItems: React.FC<TaskItemsProps> = ({ tasks }) => (
  <ul data-testid="task-list">
    {tasks.map((task, i) => (
      <li
        key={i}
        className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300"
      >
        <div className="flex gap-4">
          <Checkbox
            className="task-check"
            checked={task.status === 'completed'}
          />
          <span
            className={
              task.status === 'completed' ? 'w-full line-through' : 'w-full'
            }
          >
            {task.title}
          </span>
        </div>
        <Button className="delete-btn">🗑️</Button>
      </li>
    ))}
  </ul>
);

export default TaskItems;
