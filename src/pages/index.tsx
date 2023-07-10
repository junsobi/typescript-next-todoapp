import React, { useContext } from 'react';
import Layout from '@/components/Layout';
import TaskTitle from '@/components/TaskTitle';
import AddTask from '@/components/AddTask';
import useFetchTasks from '@/hooks/useFetchTasks';
import TaskItems from '@/components/TaskItems';
import TaskSummary from '@/components/TaskSummary';
import { TasksContext } from '@/context/TasksContext';

const App: React.FC = () => {
  const { tasks } = useContext(TasksContext);

  const incompletedTasks = tasks?.filter((task) => task.status !== 'completed');

  const completedTasks = tasks?.filter((task) => task.status === 'completed');

  return (
    <Layout>
      <AddTask />
      <TaskTitle title="Incompleted" />
      {incompletedTasks && (
        <TaskItems tasks={incompletedTasks} testId="Incompleted-section" />
      )}
      <TaskTitle title="Completed" />
      {completedTasks && (
        <TaskItems tasks={completedTasks} testId="Completed-section" />
      )}
      {tasks && <TaskSummary tasks={tasks} />}
    </Layout>
  );
};

export default App;
