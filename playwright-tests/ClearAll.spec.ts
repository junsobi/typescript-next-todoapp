import { test, expect, Page } from '@playwright/test';

test.describe('시나리오 6 : Clear All 버튼을 눌러 완료된 task 들을 삭제한다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');

    //Given : 완료되어야할 테스크를 추가한다.
    await page.fill('input[placeholder="해야할일..."]', 'forClearAllTask');
    await page.click('text=+');

    //Given : 완료되어야할 테스크의 체크박스를 눌러 완료 표시한다.
    await page.click(
      `[data-testid="task-forClearAllTask"] >> css=[data-testid="checkbox-visible"]`,
    );
  });

  test('완료된 task가 존재 할 때, Clear All 버튼을 누르면, Task 리스트에서 완료된 Task 가 삭제된다.', async () => {
    //Given : 완료된 테스크가 존재할때
    const initialTask = await page.$('text=forClearAllTask');
    expect(initialTask).not.toBeNull();

    //When : Clear All 버튼을 누르면
    await page.click('text=Clear All');

    //Then : Task 리스트에서 완료된 Task 가 삭제된다
    const task = await page.$('text=forClearAllTask');
    expect(task).toBeNull();
  });
});
