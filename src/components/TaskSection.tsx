import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

type TaskProps = {
  title: string;
  tasks: {
    text: string;
    completed: boolean;
  }[];
};

const TaskSection = ({ title, tasks }: TaskProps) => (
  <div className="task-container mb-5">
    <h2 className="text-2xl mb-3">{title}</h2>
    <ul>
      {tasks.map((task, i) => (
        <li
          key={i}
          className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300"
        >
          <div className="flex gap-4">
            <Checkbox className="task-check" checked={task.completed} />
            <span className={task.completed ? 'w-full line-through' : 'w-full'}>
              {task.text}
            </span>
          </div>
          <Button className="delete-btn">🗑️</Button>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskSection;
