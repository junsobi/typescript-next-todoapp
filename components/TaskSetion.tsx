import React from 'react';
import ToDoItem, { ToDoItemProps } from './ToDoItem';

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
