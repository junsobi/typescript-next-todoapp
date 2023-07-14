import { render, screen } from '@testing-library/react';
import TaskItems from '@/components/TaskItems';
import App from '@/pages/index';
import { mockTasks } from '../src/data/mockTasks';
import { Task } from '@/types/type';

// - **Scenario 1: 유저는 Task 리스트를 볼 수 있으며, 완료되지 않은 테스크는 상단에, 완료된 테스크는 리스트 하단에 표시됩니다.**
// - given: Task 리스트가 존재할 때
//   - when: 페이지에 접속하면
//     - then: Task 리스트가 보입니다.
// - given: Task 리스트가 존재하지 않을 때
//   - when: 페이지에 접속하면
//     - then: "Empty"라는 문구가 출력됩니다.
// - given: 완료된 테스크와 미완료된 테스크가 모두 존재할 때
//   - when: 페이지에 접속하면
//     - then: 완료된 테스크들은 아래쪽 영역에 표시됩니다.
//     - and 완료되지 않은 테스크들은 윗쪽 영역에 표시됩니다.

describe('시나리오 1 : 유저는 task리스트를 볼수 있으며 내용이 없는경우 empty라는 글씨를 본다.', () => {
  test('TaskItems 컴포넌트에 tasklist가 있는가?', () => {
    render(<TaskItems tasks={mockTasks} testId="task-items" />);
    const taskElement = screen.queryByTestId('task-list');
    expect(taskElement).toBeInTheDocument();
  });

  test('TaskItems에 들어오는 데이터가 없을때 Empty라는 문구가 뜨는가', () => {
    render(<TaskItems tasks={[]} testId="task-items" />);
    const emptyElement = screen.getByText(/empty/i);
    expect(emptyElement).toBeInTheDocument();
  });
});
