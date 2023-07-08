import { render, screen } from '@testing-library/react';
import TaskItems from '@/components/TaskItems';
import App from '@/pages/index';
import { Task } from '@/types/type';

// - **Scenario: 유저는 Task 리스트를 볼 수 있으며, 완료되지 않은 테스크는 상단에, 완료된 테스크는 리스트 하단에 표시됩니다.**
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

const mockTasks: Task[] = [
  {
    id: '1',
    title: '테스트 1 - incompleted',
    content: '테스트1 자세한내용',
    categories: ['work', 'urgent'],
    status: 'inProgress',
    createdDateTime: new Date(),
    lastModifiedDateTime: new Date(),
  },
  {
    id: '2',
    title: '테스트 2 - completed',
    content: '테스트2 자세한내용',
    categories: ['work', 'urgent'],
    status: 'completed',
    createdDateTime: new Date(),
    lastModifiedDateTime: new Date(),
  },
];

describe('TaskItems', () => {
  test('TaskItems 컴포넌트에 tasklist가 있는가?', () => {
    render(<TaskItems tasks={mockTasks} />);
    const taskElement = screen.queryByTestId('task-list');
    expect(taskElement).toBeInTheDocument();
  });

  test('TaskItems에 들어오는 데이터가 없을때 Empty라는 문구가 뜨는가', () => {
    render(<TaskItems tasks={[]} />);
    const emptyElement = screen.getByText(/empty/i);
    expect(emptyElement).toBeInTheDocument();
  });
});
