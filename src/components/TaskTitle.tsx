import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

type TaskTitleProps = {
  title: string;
};

const TaskTitle: React.FC<TaskTitleProps> = ({ title }) => (
  <div className="task-container mb-5 hidden">
    <h2 className="text-2xl my-3">{title}</h2>
  </div>
);

export default TaskTitle;
