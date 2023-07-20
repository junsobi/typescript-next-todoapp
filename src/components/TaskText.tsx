import React, { ReactNode } from 'react';

type TaskTextProps = {
  className: string;
  onClick: () => void;
  children: ReactNode;
};

const TaskText: React.FC<TaskTextProps> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  );
};

export default TaskText;
