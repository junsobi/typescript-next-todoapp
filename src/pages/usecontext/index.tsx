import React, { FC } from 'react';

import Layout from '@/components/Layout';
import TasksProvider from '@/context/TasksContext';
import ContextLayout from '@/components/contextLayout';
import TasksSection from '@/components/TasksSection';
import { RecoilRoot } from 'recoil';

const UseContextPage: React.FC = () => {
  return (
    <RecoilRoot>
      <TasksProvider>
        <Layout>
          <ContextLayout>
            <TasksSection />
          </ContextLayout>
        </Layout>
      </TasksProvider>
    </RecoilRoot>
  );
};

export default UseContextPage;
