import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/hooks/useGlobalState';
import Layout from '@/components/Layout';
import TasksProvider from '@/context/TasksContext';
import TodoLayout from '@/components/TodoLayout';
import TasksSection from '@/components/TasksSection';
import { NextPageWithLayout } from '../_app';

const UseServerRecoilPage: NextPageWithLayout = () => {
  const setGlobalState = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalState({ stateManager: 'recoil' });
  }, [setGlobalState]);

  return (
    <TodoLayout>
      <TasksSection />
    </TodoLayout>
  );
};

UseServerRecoilPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UseServerRecoilPage;
