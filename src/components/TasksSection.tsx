import React, { useMemo } from 'react';
import TaskTitle from '@/components/TaskTitle';
import TaskItems from '@/components/TaskItems';
import TaskSummary from '@/components/TaskSummary';
import { useTaskManager } from '@/hooks/useTaskManager';

const TasksSection: React.FC = () => {
  const { tasks } = useTaskManager();

  const incompletedTasks = useMemo(() => {
    return {
      tasks: tasks.filter((task) => task.status !== 'completed'),
      testId: 'Incompleted-section',
    };
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return {
      tasks: tasks.filter((task) => task.status === 'completed'),
      testId: 'Completed-section',
    };
  }, [tasks]);

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
