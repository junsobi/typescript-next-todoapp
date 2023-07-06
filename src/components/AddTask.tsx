import React from 'react';
import Input from './Input';
import Button from './Button';

const AddTask: React.FC = () => (
  <div className="flex justify-between ">
    <Input
      className="w-11/12 h-10 mb-8 rounded pl-10 "
      placeholder="해야할일..."
    />
    <div className="flex justify-end w-1/12">
      <Button className="addTask w-10 h-10 rounded bg-gray-300">+</Button>
    </div>
  </div>
);

export default AddTask;
