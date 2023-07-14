import React from 'react';
import { Task } from '@/types/type';
import TaskItem from './TaskItem';

type TaskItemsProps = {
  tasks: Task[];
  testId: string;
};

const TaskItems: React.FC<TaskItemsProps> = ({ tasks, testId }) => {
  if (tasks.length === 0) {
    return <div className="hidden">Empty</div>;
  }

  return (
    <div data-testid="task-list">
      <ul data-testid={testId}>
        {tasks.map((task, taskIndex) => (
          <TaskItem key={taskIndex} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskItems;
