import { test, expect, Page } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오 6 : Clear All 버튼을 눌러 완료된 task 들을 삭제한다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');
    await page.evaluate((tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, mockTasks);
    await page.reload();
  });

  test.afterEach(async () => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('완료된 task가 존재 할 때, Clear All 버튼을 누르면, Task 리스트에서 완료된 Task 가 삭제된다.', async () => {
    const initialTask1 = await page.$('text=Buy Groceries');
    const initialTask2 = await page.$('text=Refactoring');
    expect(initialTask1).not.toBeNull();
    expect(initialTask2).not.toBeNull();

    await page.click('text=Clear All');

    const task1 = await page.$('text=Buy Groceries');
    const task2 = await page.$('text=Refactoring');
    expect(task1).toBeNull();
    expect(task2).toBeNull();
  });
});
