import React from 'react';

type TaskInputProps = {
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};

const TaskInput: React.FC<TaskInputProps> = ({
  className,
  value,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
}) => {
  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
    />
  );
};

export default TaskInput;
