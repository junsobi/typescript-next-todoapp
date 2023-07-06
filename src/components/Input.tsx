import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...props }: InputProps) => {
  return <input type="text" {...props} />;
};

export default Input;
