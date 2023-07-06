import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TaskSection from '../../components/TaskSetion';

const App: React.FC = () => {
  const tasks = [
    { text: 'Task1', completed: false },
    { text: 'Task2', completed: true },
  ];

  return (
    <div
      className="h-screen w-screen bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: 'url(/abstract.jpg)' }}
    >
      <div className="h-5/6 w-11/12 bg-white bg-opacity-95 rounded-3xl overflow-auto p-5">
        <h1 className="text-5xl text-center font-bold mb-5">ToDo List</h1>
        <div className="flex justify-between ">
          <Input
            className="w-11/12 h-10 rounded pl-10 mb-3"
            placeholder="해야할일..."
          />
          <div className="flex justify-end w-1/12">
            <Button className="addTask w-10 h-10 rounded bg-gray-300">+</Button>
          </div>
        </div>

        <TaskSection
          title="Incompleted"
          tasks={tasks.filter((task) => !task.completed)}
        />
        <TaskSection
          title="Completed"
          tasks={tasks.filter((task) => task.completed)}
        />

        <div className="flex justify-between belowPart">
          <div>
            Completed Todos : {tasks.filter((task) => task.completed).length}
          </div>
          <div className="deleteButtons flex gap-4">
            <Button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
              Delete selected
            </Button>

            <Button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
