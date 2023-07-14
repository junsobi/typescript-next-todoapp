import React, { useState, useContext, useRef } from 'react';
import Input from './Input';
import Button from './Button';
import { TasksContext } from '@/context/TasksContext';

const AddTask: React.FC = () => {
  const { addTask } = useContext(TasksContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // 인풋 엘리먼트에 대한 참조 생성

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const createTask = () => {
    if (title.trim()) {
      addTask({
        title: title.trim(),
        status: 'inProgress',
        content: '',
        categories: [],
      });
      setTitle('');
    }
  };

  const handleAddButtonClick = () => {
    createTask();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      createTask();
    }
    if (e.key === 'Escape') {
      setTitle('');
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex justify-between ">
      <input
        id="taskInput"
        ref={inputRef}
        className="w-11/12 h-10 mb-4 rounded-xl shadow-md pl-10 border"
        placeholder="해야할일..."
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end w-1/12">
        <Button
          className="addTask w-10 h-10 rounded bg-gray-300 shadow-md"
          onClick={handleAddButtonClick}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
