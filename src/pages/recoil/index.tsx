import React, { FC } from 'react';

import Layout from '@/components/Layout';
import TasksProvider from '@/context/TasksContext';
import ContextLayout from '@/components/contextLayout';
import TasksSection from '@/components/TasksSection';
import { RecoilRoot } from 'recoil';

const UseRecoilPage: React.FC = () => {
  return (
    <RecoilRoot>
      <Layout>
        <ContextLayout>
          <TasksSection />
        </ContextLayout>
      </Layout>
    </RecoilRoot>
  );
};

export default UseRecoilPage;
