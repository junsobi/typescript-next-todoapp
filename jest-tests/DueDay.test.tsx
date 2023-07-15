import { render, fireEvent, screen } from '@testing-library/react';
import { TasksProvider } from '../src/context/TasksContext';
import App from '@/pages/index';
import { mockTasks } from '@/data/mockTasks';

describe('시나리오 8: 유저가 완료기한을 정하고(수정하고) 싶다.', () => {
  beforeEach(() => {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('given: task에 마감 기한이 없는 task가 존재할 때, when: 리스트 좌측의 달력을 누르면, then: 달력이 나온다', async () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );
    fireEvent.click(screen.getByTestId('calendar-icon-1'));
    expect(await screen.findByTestId('calendar-popup-1')).toBeInTheDocument();
  });

  test('when: 달력에서 마감 날짜를 선택하면, then: 달력이 사라지며, 마감기한이 정해지고 리스트 좌측에 마감기한까지 d-day가 나온다', async () => {
    fireEvent.click(screen.getByTestId('calendar-date-7-1'));
    expect(
      await screen.queryByTestId('calendar-popup-1'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('task-due-date-1')).toHaveTextContent('D-7');
  });
});
