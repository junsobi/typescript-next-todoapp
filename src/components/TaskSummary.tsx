import React from 'react';
import Button from './Button';
import { Task } from '@/types/type';
import { useTaskManager } from '@/hooks/useTaskManager';

interface TaskSummaryProps {
  tasks: Task[];
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ tasks }) => {
  const { clearCompletedTasks } = useTaskManager();

  const handleClearAll = () => {
    clearCompletedTasks();
  };

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed',
  ).length;

  return (
    <div className="flex justify-between mt-10 belowPart">
      <div>Completed Todos : {completedTasks}</div>
      <div className="deleteButtons flex gap-4 shadow-md">
        <Button
          onClick={handleClearAll}
          className="bg-gray-200  px-3 py-1 rounded hover:bg-gray-300 shadow-md"
        >
          🧹
        </Button>
      </div>
    </div>
  );
};

export default TaskSummary;
