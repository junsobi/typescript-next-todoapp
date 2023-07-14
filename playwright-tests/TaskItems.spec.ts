import { test, expect } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오 1 : 유저는 task리스트를 볼 수 있으며, 내용이 없는 경우 empty라는 글씨를 본다.', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate((tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, mockTasks);
    await page.reload();
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('TaskItems 컴포넌트에 tasklist가 있는가?', async ({ page }) => {
    for (let task of mockTasks) {
      const taskElement = await page.$(`text=${task.title}`);
      expect(taskElement).toBeTruthy();
    }
  });

  test('TaskItems에 들어오는 데이터가 없을 때 Empty라는 문구가 뜨는가', async ({
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.setItem('tasks', JSON.stringify([]));
    });
    await page.reload();
    const emptyElement = await page.$('text=Empty');
    expect(emptyElement).toBeTruthy();
  });
});
