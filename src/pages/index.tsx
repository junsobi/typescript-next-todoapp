import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/hooks/useGlobalState';
import Layout from '@/components/Layout';
import GuideLine from '@/components/GuideLine';

const HomePage = () => {
  const setGlobalState = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalState({ stateManager: 'context' });
  }, [setGlobalState]);

  return (
    <Layout>
      <GuideLine />
    </Layout>
  );
};

export default HomePage;
