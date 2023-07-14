import { test, expect } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오 4 : 유저는 리스트의 테스크들을 완료처리하거나 완료 취소 처리할 수 있다.', () => {
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

  test('유저가 미완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시되고 취소선이 그어지며 완료섹션으로 이동한다.', async ({
    page,
  }) => {
    const taskElementsBefore = await page.$$('[data-testid^="task-"]');
    const taskTextsBefore = await Promise.all(
      taskElementsBefore.map((task) => task.innerText()),
    );
    const indexBefore = taskTextsBefore.indexOf('Complete Project');

    await page.click(
      `[data-testid="task-Complete Project"] >> css=[data-testid="checkbox-visible"]`,
    );

    expect(
      await page.$(
        `[data-testid="task-Complete Project"] >> span.line-through`,
      ),
    ).toBeTruthy();

    const taskElementsAfter = await page.$$('[data-testid^="task-"]');
    const taskTextsAfter = await Promise.all(
      taskElementsAfter.map((task) => task.innerText()),
    );
    const indexAfter = taskTextsAfter.indexOf('Complete Project');

    expect(indexAfter).toBeGreaterThan(indexBefore);
  });

  test('유저가 완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시, 취소선이 해제되며 미완료 섹션으로 이동한다.', async ({
    page,
  }) => {
    const taskElementsBefore = await page.$$('[data-testid^="task-"]');
    const taskTextsBefore = await Promise.all(
      taskElementsBefore.map((task) => task.innerText()),
    );
    const indexBefore = taskTextsBefore.indexOf('Buy Groceries');

    await page.click(
      `[data-testid="task-Buy Groceries"] >> css=[data-testid="checkbox-svg"]`,
    );

    expect(
      await page.$(`[data-testid="task-Buy Groceries"] >> span.line-through`),
    ).toBeNull();

    const taskElementsAfter = await page.$$('[data-testid^="task-"]');
    const taskTextsAfter = await Promise.all(
      taskElementsAfter.map((task) => task.innerText()),
    );
    const indexAfter = taskTextsAfter.indexOf('Buy Groceries');

    expect(indexAfter).toBeLessThan(indexBefore);
  });
});
