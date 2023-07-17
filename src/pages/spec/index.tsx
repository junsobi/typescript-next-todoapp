import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const Scheme = dynamic(() => import('@/components/Scheme'), { ssr: false });
const TestScenario = dynamic(() => import('@/components/TestScenario'), {
  ssr: false,
});

const App: React.FC = () => {
  return (
    <Layout>
      <Scheme />
      <TestScenario />
    </Layout>
  );
};

export default App;
