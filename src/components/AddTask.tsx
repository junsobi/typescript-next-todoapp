import React, { useState, useContext, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TasksContext } from '@/context/TasksContext';
import Button from './Button';

const AddTask: React.FC = () => {
  const { addTask } = useContext(TasksContext);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        DueDateTime: dueDate,
      });
      setTitle('');
      setDueDate(null);
      setIsCalendarOpen(false);
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
      setDueDate(null);
      setIsCalendarOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleChangeDate = (date: Date) => {
    setDueDate(date);
    setIsCalendarOpen(false);
  };

  const handleDueDateTextClick = () => {
    if (dueDate) {
      setDueDate(null);
    }
  };

  const getDueDateText = (): string | null => {
    if (dueDate) {
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        return `D-${diffDays}`;
      } else if (diffDays === 0) {
        return 'D-day';
      }
    }
    return null;
  };

  const today = new Date();

  return (
    <div className="flex justify-between ">
      <div className="relative w-11/12 h-10 mb-4">
        <input
          id="taskInput"
          ref={inputRef}
          className="rounded-xl shadow-md pl-10 border w-full h-full"
          placeholder="해야할일..."
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <span
          className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleCalendarIconClick}
        >
          📅
        </span>
        {isCalendarOpen && (
          <div className="absolute z-40">
            <DatePicker
              className="datepicker absolute z-40"
              selected={dueDate}
              onChange={handleChangeDate}
              minDate={today}
              inline
              onClickOutside={() => setIsCalendarOpen(false)}
            />
          </div>
        )}

        {getDueDateText() && (
          <span
            className="dueDateText absolute left-0 bottom-10 px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs cursor-pointer"
            onClick={handleDueDateTextClick}
          >
            {getDueDateText()}
          </span>
        )}
      </div>
      <div className="flex justify-end w-1/12">
        <Button
          className="addTask w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 shadow-md"
          onClick={handleAddButtonClick}
        >
          🔥
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
