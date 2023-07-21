import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/hooks/useGlobalState';
import Layout from '@/components/Layout';
import TodoLayout from '@/components/TodoLayout';
import TasksSection from '@/components/TasksSection';
import { NextPageWithLayout } from '../_app';
import { tasksState } from '@/recoil/serverTaskManager';
import { useFetchTasks } from '@/hooks/useFetchTasks';

const UseRecoilPage: NextPageWithLayout = () => {
  const setGlobalState = useSetRecoilState(globalState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const fetchedTasks = useFetchTasks();

  useEffect(() => {
    setGlobalState({ stateManager: 'recoil-with-server' });
  }, [setGlobalState]);

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  return (
    <TodoLayout>
      <TasksSection />
    </TodoLayout>
  );
};

UseRecoilPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UseRecoilPage;
