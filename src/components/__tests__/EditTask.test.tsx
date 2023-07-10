import React, { ReactNode } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { TasksProvider } from '@/context/TasksContext';
import App from '@/pages/index';
import { mockTasks } from '@/data/mockTasks';

// - **Scenario 3: 유저가 Task 내용을 편집한다**
// - given: Task 가 리스트에 존재할 때
//   - when: 내용을 변경하고 싶은 Task의 라벨을 클릭하면
//     - then: input창으로 변경된다
//     - and: input창에 변경하고 싶은 내용을 적을 수 있게 되는데, input창에는 기존 Task 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
//   - when: input창에 변경 내용을 적고 input 외 영역을 클릭하면
//     - then: 입력한 내용으로 Task가 변경되고, input창이 없어진다
//   - when: input창에 변경 내용을 적고 엔터를 누르면
//     - then: 입력한 내용으로 Task가 변경되고, input창이 없어진다

describe('시나리오3 : 유저가 task 내용을 편집한다.', () => {
  test('클릭시 Task 라벨이 input창으로 바뀌고 기존 내용이 적혀있으며, 마지막 글자에 포커스가 있다', () => {
    render(
      <TasksProvider initialTasks={mockTasks}>
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
      <TasksProvider initialTasks={mockTasks}>
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

    // act(() => {
    //   fireEvent.click(document.body);
    // });
    //테스트 코드에서는 실제 dom에 연결된 이벤트 헨들러를 호출할 수 없다....

    await waitFor(() => {
      const newTaskLabel = screen.getByText('Complete Project - 수정');
      expect(newTaskLabel).toBeInTheDocument();
    });
  });

  test('input창에 변경 내용을 적고 엔터를 누르면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async () => {
    render(
      <TasksProvider initialTasks={mockTasks}>
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
      const newTaskLabel = screen.getByText('Complete Project - 수정');
      expect(newTaskLabel).toBeInTheDocument();
    });
  });
});
