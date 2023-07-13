import React, { ReactNode } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { TasksProvider } from '@/context/TasksContext';
import App from '@/pages/index';
import { mockTasks } from '@/data/mockTasks';

describe('시나리오3 : 유저가 task 내용을 편집한다.', () => {
  beforeEach(() => {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('클릭시 Task 라벨이 input창으로 바뀌고 기존 내용이 적혀있으며, 마지막 글자에 포커스가 있다', () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );

    const taskLabel = screen.getByText('Complete Project');
    fireEvent.click(taskLabel);

    const taskInput = screen.getByDisplayValue('Complete Project');
    expect(document.activeElement).toBe(taskInput);
  });

  test('input창 외 영역을 클릭하면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );

    const taskLabel = screen.getByText('Complete Project');
    fireEvent.click(taskLabel);

    const taskInput = screen.getByDisplayValue('Complete Project');
    fireEvent.change(taskInput, {
      target: { value: 'Complete Project - 수정' },
    });

    fireEvent.blur(taskInput);

    await waitFor(() => {
      expect(screen.getByText('Complete Project - 수정')).toBeInTheDocument();
    });

    test('input창에 변경 내용을 적고 엔터를 누르면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async () => {
      render(
        <TasksProvider>
          <App />
        </TasksProvider>,
      );

      const taskLabel = screen.getByText('Complete Project');
      fireEvent.click(taskLabel);

      const taskInput = screen.getByDisplayValue('Complete Project');

      fireEvent.change(taskInput, {
        target: { value: 'Complete Project - 수정' },
      });

      act(() => {
        fireEvent.keyDown(taskInput, { key: 'Enter', code: 'Enter' });
      });

      await waitFor(() => {
        expect(screen.getByText('Complete Project - 수정')).toBeInTheDocument();
      });
    });
  });
});
