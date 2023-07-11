import React from 'react';

type CheckboxProps = {
  className: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이 부분을 수정
};

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <input type="checkbox" {...props} />;
};

export default Checkbox;
