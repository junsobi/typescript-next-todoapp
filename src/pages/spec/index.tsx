import React from 'react';
import Layout from '@/components/Layout';
import { NextPageWithLayout } from '../_app';
import Scheme from '@/components/Scheme';
import TestScenario from '@/components/TestScenario';

const SpecPage: NextPageWithLayout = () => {
  return (
    <>
      <Scheme />
      <TestScenario />
    </>
  );
};

SpecPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SpecPage;
