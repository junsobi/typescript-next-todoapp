import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

export type ToDoItemProps = {
  text: string;
  completed: boolean;
};

const ToDoItem = ({ text, completed }: ToDoItemProps) => (
  <li className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300">
    <div className="flex gap-4">
      <Checkbox className="task-check" checked={completed} />
      <span className={completed ? 'w-full line-through' : 'w-full'}>
        {text}
      </span>
    </div>
    <Button className="delete-btn">🗑️</Button>
  </li>
);

type TaskSectionProps = {
  title: string;
  tasks: ToDoItemProps[];
};

const TaskSection = ({ title, tasks }: TaskSectionProps) => (
  <div className="task-container mb-5">
    <h2 className="text-2xl mb-3">{title}</h2>
    <ul>
      {tasks.map((task, i) => (
        <ToDoItem key={i} {...task} />
      ))}
    </ul>
  </div>
);

export default TaskSection;
