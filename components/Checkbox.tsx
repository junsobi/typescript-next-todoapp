import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return <input type="checkbox" checked={checked} onChange={onChange} />;
};

export default Checkbox;
