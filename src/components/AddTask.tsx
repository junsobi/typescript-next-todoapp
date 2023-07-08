import React, { useState, useContext } from 'react';
import Input from './Input';
import Button from './Button';
import { TasksContext } from '@/context/TasksContext';

const AddTask: React.FC = () => {
  const { addTask } = useContext(TasksContext);

  const [task, setTask] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      if (addTask) {
        addTask(task);
        setTask('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && task.trim()) {
      handleAddTask();
    }
  };

  return (
    <div className="flex justify-between ">
      <Input
        className="w-11/12 h-10 mb-8 rounded pl-10"
        placeholder="해야할일..."
        value={task}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end w-1/12">
        <Button
          className="addTask w-10 h-10 rounded bg-gray-300"
          onClick={handleAddTask}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
