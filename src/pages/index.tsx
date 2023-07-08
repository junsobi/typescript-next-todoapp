import React from 'react';
import Layout from '@/components/Layout';
import TaskTitle from '@/components/TaskTitle';
import AddTask from '@/components/AddTask';
import useFetchTasks from '@/hooks/useFetchTasks';
import TaskItems from '@/components/TaskItems';
import TaskSummary from '@/components/TaskSummary';

const App: React.FC = () => {
  const { tasks, loading, error } = useFetchTasks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const incompletedTasks = tasks.filter((task) => task.status !== 'completed');

  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <Layout>
      <AddTask />
      <TaskTitle title="Incompleted" />
      <TaskItems tasks={incompletedTasks} />
      <TaskTitle title="Completed" />
      <TaskItems tasks={completedTasks} />
      <TaskSummary tasks={tasks} />
    </Layout>
  );
};

export default App;
