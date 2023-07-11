import React, { useState, useContext } from 'react';
import Input from './Input';
import Button from './Button';
import { TasksContext } from '@/context/TasksContext';

const AddTask: React.FC = () => {
  const { addTask } = useContext(TasksContext);

  const [title, setTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTask = () => {
    addTask({
      title: title.trim(),
      status: 'inProgress',
      content: '',
      categories: [],
    });
    setTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false &&
      title.trim()
    ) {
      handleAddTask();
    }
  };

  return (
    <div className="flex justify-between ">
      <Input
        id="taskInput"
        className="w-11/12 h-10 mb-8 rounded pl-10"
        placeholder="해야할일..."
        value={title}
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
