import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TasksProvider } from '@/context/TasksContext';
import App from '@/pages/usecontext/index';
import { mockTasks } from '@/data/mockTasks';

describe('시나리오 6 : Clear All 버튼을 눌러 완료된 task 들을 삭제한다.', () => {
  beforeEach(() => {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('완료된 task가 존재 할 때, Clear All 버튼을 누르면, Task 리스트에서 완료된 Task 가 삭제된다.', async () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );

    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);

    await waitFor(() => {
      expect(screen.queryByText('Buy Groceries')).not.toBeInTheDocument();
      expect(screen.queryByText('Refactoring')).not.toBeInTheDocument();

      expect(screen.getByText('Empty')).toBeInTheDocument();
    });
  });
});
