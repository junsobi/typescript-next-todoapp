import React from 'react';
import Layout from '@/components/Layout';
import TasksProvider from '@/context/TasksContext';
import TodoLayout from '@/components/TodoLayout';
import TasksSection from '@/components/TasksSection';
import { NextPageWithLayout } from '../_app';

const UseContextPage: NextPageWithLayout = () => {
  return (
    <TasksProvider>
      <TodoLayout>
        <TasksSection />
      </TodoLayout>
    </TasksProvider>
  );
};

UseContextPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UseContextPage;
