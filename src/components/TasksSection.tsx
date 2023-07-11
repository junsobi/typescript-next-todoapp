import React, { useContext } from 'react';
import TaskTitle from '@/components/TaskTitle';
import TaskItems from '@/components/TaskItems';
import TaskSummary from '@/components/TaskSummary';
import { TasksContext } from '@/context/TasksContext';

const TasksSection: React.FC = () => {
  const { tasks } = useContext(TasksContext);

  const incompletedTasks = tasks.filter((task) => task.status !== 'completed');

  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <>
      <TaskTitle title="Incompleted" />
      <TaskItems tasks={incompletedTasks} testId="Incompleted-section" />
      <TaskTitle title="Completed" />
      <TaskItems tasks={completedTasks} testId="Completed-section" />
      <TaskSummary tasks={tasks} />
    </>
  );
};

export default TasksSection;
