import { render, screen, fireEvent } from '@testing-library/react';
import { TasksProvider, TasksContext } from '@/context/TasksContext';
import { useContext } from 'react';

// 더미 컴포넌트 생성
const DummyComponent = () => {
  const { tasks, addTask, editTask, toggleTask } = useContext(TasksContext);

  const addTestTask = () => {
    addTask({
      title: 'Test task',
      status: 'inProgress',
      content: '',
      categories: [],
    });
  };

  const editTestTask = () => {
    if (tasks.length > 0) {
      editTask({
        id: tasks[0].id,
        title: 'Edited test task',
        status: 'inProgress',
        content: '',
        categories: [],
      });
    }
  };

  const toggleTestTask = () => {
    if (tasks.length > 0) {
      toggleTask(tasks[0]);
    }
  };

  return (
    <>
      <button onClick={addTestTask}>Add Task</button>
      <button onClick={editTestTask}>Edit Task</button>
      <button onClick={toggleTestTask}>Toggle Task</button>
      {tasks.map((task, index) => (
        <p key={index}>{task.title}</p>
      ))}
    </>
  );
};

describe('TasksContext', () => {
  test('addTask 함수가 task를 만들어 내고 있는가', () => {
    render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>,
    );

    const button = screen.getByText('Add Task');
    fireEvent.click(button);

    const newTask = screen.getByText('Test task');
    expect(newTask).toBeInTheDocument();
  });

  test('editTask 함수가 task를 수정하는가', async () => {
    render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>,
    );

    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);

    const editButton = screen.getByText('Edit Task');
    fireEvent.click(editButton);

    const editedTask = screen.getByText('Edited test task');
    expect(editedTask).toBeInTheDocument();
  });

  test('toggleTask 함수가 task의 상태를 바꾸는가', async () => {
    render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>,
    );

    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);

    const toggleButton = screen.getByText('Toggle Task');
    fireEvent.click(toggleButton);

    const toggledTask = screen.getByText('Test task');
  });
});
