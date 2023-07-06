import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ...props }: ButtonProps) => {
  return <button {...props}></button>;
};

export default Button;
