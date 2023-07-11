import React from 'react';
import TaskTitle from '@/components/TaskTitle';
import TaskItems from '@/components/TaskItems';
import TaskSummary from '@/components/TaskSummary';
import useTasks from '@/hooks/useTasks';

const TasksSection: React.FC = () => {
  const { incompletedTasks, completedTasks, tasks } = useTasks();

  return (
    <>
      <TaskTitle title="Incompleted" />
      <TaskItems {...incompletedTasks} />
      <TaskTitle title="Completed" />
      <TaskItems {...completedTasks} />
      <TaskSummary tasks={tasks} />
    </>
  );
};

export default TasksSection;
