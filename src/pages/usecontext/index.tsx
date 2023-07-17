import React from 'react';
import dynamic from 'next/dynamic';

const DynamicUseContextPage = dynamic(
  () => import('@/components/UseContextPage'),
  { ssr: false },
);

const UseContextIndex: React.FC = () => {
  return <DynamicUseContextPage />;
};

export default UseContextIndex;
