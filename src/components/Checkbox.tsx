import React from 'react';

type CheckboxProps = {
  name: string;
  className: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <input type="checkbox" {...props} />;
};

export default Checkbox;
