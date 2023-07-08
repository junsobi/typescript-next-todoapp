import React from 'react';
import Button from './Button';
import { Task } from '@/types/type';

interface TaskSummaryProps {
  tasks: Task[];
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(
    (task) => task.status === 'completed',
  ).length;

  return (
    <div className="flex justify-between belowPart">
      <div>Completed Todos : {completedTasks}</div>
      <div className="deleteButtons flex gap-4">
        <Button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
          Delete selected
        </Button>
        <Button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TaskSummary;
