import React from 'react';
import dynamic from 'next/dynamic';

const DynamicUseRecoilPage = dynamic(
  () => import('@/components/UseRecoilPage'),
  { ssr: false },
);

const UseContextIndex: React.FC = () => {
  return <DynamicUseRecoilPage />;
};

export default UseContextIndex;
