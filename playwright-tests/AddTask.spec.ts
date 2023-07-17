import { test, expect, Page } from '@playwright/test';

test.describe('시나리오 2 : 유저는 인풋창에 해야되는 일들을 입력하고 리스트에 추가한다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');
  });

  test('유저가 인풋창에 Task 내용을 입력하고 추가버튼을 누르면 Incompleted 섹션 제일 아래 Task가 추가된다', async () => {
    //Given : 유저가 인풋창에 Task 내용을 입력하고
    await page.fill('input[placeholder="해야할일..."]', 'new task');

    //When : 유저가 추가버튼을 누르면
    await page.click('text=🔥');

    //Then : Task가 추가된다
    const newTask = await page.$(`[data-testid="task-new task"]`);
    expect(newTask).toBeTruthy();
  });

  test('유저가 인풋창에 Task 내용을 입력하고 엔터 버튼을 누르면 대기리스트 제일 아래에 완료되지 않은 Task가 추가된다', async () => {
    //Given : 유저가 인풋창에 Task 내용을 입력하고
    await page.fill('input[placeholder="해야할일..."]', 'new task');

    //When : 유저가 엔터버튼을 누르면
    await page.keyboard.press('Enter');

    //Then : Task가 추가된다
    const newTask = await page.$(`[data-testid="task-new task"]`);
    expect(newTask).toBeTruthy();
  });

  test('유저가 인풋창에 아무것도 입력하지 않았을 때 추가 버튼을 누르면 아무런 동작도 하지 않는다', async () => {
    //Given : 유저가 인풋창에 아무것도 입력하지 않고
    await page.fill('input[placeholder="해야할일..."]', '');

    //When : 유저가 추가버튼을 누르면
    await page.click('text=🔥');

    //Then : 아무런 동작도 하지 않는다
    const tasks = await page.$$('[data-testid="Incompleted-section"]');
    expect(tasks.length).toBe(0);
  });

  test('유저가 인풋창에 아무것도 입력하지 않았을 때 엔터 버튼을 누르면 아무런 동작도 하지 않는다', async () => {
    //Given : 유저가 인풋창에 아무것도 입력하지 않고
    await page.fill('input[placeholder="해야할일..."]', '');

    //When : 유저가 추가버튼을 누르면
    await page.keyboard.press('Enter');

    //Then : 아무런 동작도 하지 않는다
    const tasks = await page.$$('[data-testid="Incompleted-section"]');
    expect(tasks.length).toBe(0);
  });
});
