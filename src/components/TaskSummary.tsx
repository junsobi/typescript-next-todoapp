import React from 'react';
import Button from './Button';
import { Task } from '@/types/type';
import useClearAll from '@/hooks/useClearAll';

interface TaskSummaryProps {
  tasks: Task[];
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ tasks }) => {
  const clearAllProps = useClearAll();
  const completedTasks = tasks.filter(
    (task) => task.status === 'completed',
  ).length;

  return (
    <div className="flex justify-between belowPart">
      <div>Completed Todos : {completedTasks}</div>
      <div className="deleteButtons flex gap-4">
        <Button {...clearAllProps} />
      </div>
    </div>
  );
};

export default TaskSummary;
