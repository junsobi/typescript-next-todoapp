import React, { FC } from 'react';

import Layout from '@/components/Layout';
import TasksProvider from '@/context/TasksContext';
import ContextLayout from '@/components/contextLayout';
import TasksSection from '@/components/TasksSection';

const UseRecoilPage: React.FC = () => {
  return (
    <TasksProvider>
      <Layout>
        <ContextLayout>
          <TasksSection />
        </ContextLayout>
      </Layout>
    </TasksProvider>
  );
};

export default UseRecoilPage;
