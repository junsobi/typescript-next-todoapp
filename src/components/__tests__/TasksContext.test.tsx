import { render, screen, fireEvent } from '@testing-library/react';
import { TasksProvider, TasksContext } from '@/context/TasksContext';
import { useContext } from 'react';

// 더미 컴포넌트 생성
const DummyComponent = () => {
  const { tasks, addTask } = useContext(TasksContext);

  if (!addTask || !tasks) {
    return null;
  }

  const addTestTask = () => {
    addTask('Test task');
  };

  return (
    <>
      <button onClick={addTestTask}>Add Task</button>
      {tasks.map((task, index) => (
        <p key={index}>{task.title}</p>
      ))}
    </>
  );
};

describe('TasksContext', () => {
  test('addTask 함수가 tesk를 만들어 내고 있는가', () => {
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
});
