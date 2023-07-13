import React from 'react';
import Layout from '@/components/Layout';
import AddTask from '@/components/AddTask';
import TasksSection from '@/components/TasksSection';
import { TasksProvider } from '@/context/TasksContext';
import { mockTasks } from '@/data/mockTasks';

const App: React.FC = () => {
  return (
    <TasksProvider>
      <Layout>
        <AddTask />
        <TasksSection />
      </Layout>
    </TasksProvider>
  );
};

export default App;
