import React, { ReactNode } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { TasksProvider } from '@/context/TasksContext';
import App from '@/pages/index';
import { mockTasks } from '@/data/mockTasks';

// - **Scenario 4: 유저는 리스트의 태스크들을 완료 처리하거나 완료 취소 처리한다.**
// - given: 완료되지 않은 테스크
//   - when : 체크박스를 클릭하면
//     - then : 체크 박스가 체크된다.
//     - and : 완료 리스트로 넘어간다.
//     - and : 테스크 설명에 취소선이 생긴다.
// - given : 완료된 테스크
//   - when : 체크박스를 클릭하면
//     - then: 체크가 해제된다
//     - and: 대기 리스트로 올라간다.

describe('시나리오4 : 유저는 리스트의 테스크들을 완료처리하거나 완료 취소 처리할 수 있다.', () => {
  beforeEach(() => {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('유저가 미완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시되고 취소선이 그어지며 완료섹션으로 이동한다.', async () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Complete Project' });
    fireEvent.click(checkbox);

    await waitFor(() => {
      const completedSection = screen.getByTestId('Completed-section');
      const incompletedSection = screen.getByTestId('Incompleted-section');

      expect(completedSection).toContainElement(
        screen.getByText('Complete Project'),
      );
      expect(incompletedSection).not.toContainElement(
        screen.getByText('Complete Project'),
      );

      const checkedCheckbox = screen.getByRole('checkbox', {
        name: 'Complete Project',
        checked: true,
      });
      const task = screen.getByText('Complete Project');

      expect(checkedCheckbox).toBeInTheDocument();
      expect(task).toHaveClass('line-through');
    });
  });
  test('유저가 완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시, 취소선이 해제되며 미완료 섹션으로 이동한다.', async () => {
    render(
      <TasksProvider initialTasks={mockTasks}>
        <App />
      </TasksProvider>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Buy Groceries' });
    fireEvent.click(checkbox);

    await waitFor(() => {
      const completedSection = screen.getByTestId('Completed-section');
      const incompletedSection = screen.getByTestId('Incompleted-section');

      expect(completedSection).not.toContainElement(
        screen.getByText('Buy Groceries'),
      );
      expect(incompletedSection).toContainElement(
        screen.getByText('Buy Groceries'),
      );

      const checkedCheckbox = screen.getByRole('checkbox', {
        name: 'Buy Groceries',
        checked: false,
      });
      const task = screen.getByText('Buy Groceries');

      expect(checkedCheckbox).toBeInTheDocument();
      expect(task).not.toHaveClass('line-through');
    });
  });
});
