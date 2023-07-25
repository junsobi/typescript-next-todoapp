import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/hooks/useGlobalState';
import Layout from '@/components/Layout';
import TodoLayout from '@/components/TodoLayout';
import TasksSection from '@/components/TasksSection';
import { NextPageWithLayout } from '../_app';

const queryClient = new QueryClient();

const UseReactQueryPage: NextPageWithLayout = () => {
  const setGlobalState = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalState({ stateManager: 'react-query' });
  }, []);

  return (
    <TodoLayout>
      <TasksSection />
    </TodoLayout>
  );
};

UseReactQueryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UseReactQueryPage;
