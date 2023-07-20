import React from 'react';

interface GradientDotProps {
  size: string;
}

const GradientDot: React.FC<GradientDotProps> = ({ size }) => {
  const dotClass = `w-${size} h-${size} mb-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full`;

  return <div className={dotClass} />;
};

export default GradientDot;
