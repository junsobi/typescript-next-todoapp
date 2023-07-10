import React from 'react';

type CheckboxProps = {
  className: string;
  checked?: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <input type="checkbox" {...props} />;
};

export default Checkbox;
