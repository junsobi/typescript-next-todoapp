import React, { ReactNode } from 'react';

type TaskItemLayoutProps = {
  children: ReactNode;
};

const TaskItemLayout: React.FC<TaskItemLayoutProps> = ({ children }) => (
  <li
    data-testid="task"
    className="border-b border-gray-200 p-2 flex justify-between items-center gap-4 hover:bg-gray-300"
  >
    {children}
  </li>
);

export default TaskItemLayout;
