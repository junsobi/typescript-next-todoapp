import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

export type ToDoItemProps = {
  text: string;
  completed: boolean;
};

const ToDoItem = ({ text, completed }: ToDoItemProps) => (
  <li className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-500">
    <div className="flex gap-4">
      <Checkbox className="task-check" checked={completed} />
      <span className={completed ? 'w-full line-through' : 'w-full'}>
        {text}
      </span>
    </div>
    <Button className="delete-btn">🗑️</Button>
  </li>
);

export default ToDoItem;
