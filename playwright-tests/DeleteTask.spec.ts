import { test, expect, Page } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오 5 : 유저가 Task를 삭제한다', () => {
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

  test('리스트에 Task가 있을 때, 해당하는 Task 우측 삭제 버튼을 누르면, Task가 삭제되고, 리스트에서 없어진다', async () => {
    const taskToDelete = 'Buy Groceries';

    const taskItem = await page.$(`text=${taskToDelete}`);
    if (!taskItem) {
      throw new Error('Task item not found');
    }

    await taskItem.hover(); // 호버 이벤트 추가
    await page.waitForTimeout(500); // 호버 이펙트가 적용되기를 기다림

    await page.evaluate(() => {
      const deleteButton = Array.from(document.querySelectorAll('button')).find(
        (button) => button.innerText === '🗑️',
      );
      if (!deleteButton) {
        throw new Error('Delete button not found');
      }
      deleteButton.click();
    });

    const task = await page.$(`text=${taskToDelete}`);
    expect(task).toBeNull();
  });
});
