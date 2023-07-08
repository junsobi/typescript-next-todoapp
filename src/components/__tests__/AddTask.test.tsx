import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '@/pages/index';

// - **Scenario: 유저는 인풋창에 해야되는 일들을 입력하고 리스트에 추가한다.**
// - given: 유저가 인풋창에 Task 내용을 입력했을 때
//   - when: 추가 버튼을 누르면
//     - then: 대기리스트 제일 아래에 완료되지 않은 Task가 추가 된다.
//   - when: 엔터 버튼을 누르면
//     - then: 대기리스트 제일 아래에 완료되지 않은 Task가 추가 된다.
// - given: 유저가 인풋창에 아무것도 입력하지 않았을 때
//   - when: 추가 버튼을 누르면
//     - then: 아무런 동작도 하지 않는다.
//   - when: 엔터 버튼을 누르면
//     - then: 아무런 동작도 하지 않는다.

describe('AddTask', () => {
  test('유저가 인풋창에 Task 내용을 입력하고 추가버튼을 누르면 Incompleted 섹션 제일 아래 Task가 추가된다', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('해야할일...');
    fireEvent.change(input, { target: { value: 'new task' } });

    const button = screen.getByText('+');
    fireEvent.click(button);

    const tasks = screen.getAllByTestId('task');
    const newTask = tasks[tasks.length - 1];

    expect(newTask).toHaveTextContent('new task');
    expect(newTask).not.toHaveClass('completed');
  });
});
