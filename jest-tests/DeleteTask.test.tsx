import { act } from 'react-dom/test-utils';
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

// - **Scenario 5: 유저가 Task를 삭제한다**
// - given: 리스트에 Task가 있을 때
//   - when: 해당하는 Task 우측 삭제 버튼을 누르면
//     - then: Task가 삭제되고, 리스트에서 없어진다

describe('시나리오 5 : 유저가 Task를 삭제한다', () => {
  test('리스트에 Task가 있을 때, 해당하는 Task 우측 삭제 버튼을 누르면, Task가 삭제되고, 리스트에서 없어진다', async () => {
    render(
      <TasksProvider>
        <App />
      </TasksProvider>,
    );

    const input = screen.getByPlaceholderText('해야할일...');
    fireEvent.change(input, { target: { value: '삭제할일' } });
    const addButton = screen.getByText('+');
    act(() => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      const taskItem = screen.getByText('삭제할일');
      expect(taskItem).toBeInTheDocument();
    });

    const incompletedSection = screen.getByTestId('Incompleted-section');

    const taskItems = within(incompletedSection).getAllByTestId(/task-/);
    const lastTaskItem = taskItems[taskItems.length - 1];

    act(() => {
      fireEvent.mouseEnter(lastTaskItem);
    });

    const deleteButton = within(lastTaskItem).getByText('🗑️');

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      const taskItem = screen.queryByText('삭제할일');
      expect(taskItem).not.toBeInTheDocument();
    });
  });
});
