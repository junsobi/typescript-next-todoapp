import { test, expect } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오3 : 유저가 task 내용을 편집한다.', () => {
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

  test('클릭시 Task 라벨이 input창으로 바뀌고 기존 내용이 적혀있으며, 마지막 글자에 포커스가 있다', async ({
    page,
  }) => {
    const taskLabel = await page.$(`text=Complete Project`);
    await taskLabel?.click();
    const taskInput = await page.$('input[value="Complete Project"]');
    const focused = await page.evaluate(
      (el) => el === document.activeElement,
      taskInput,
    );
    expect(focused).toBe(true);
  });

  test('input창 외 영역을 클릭하면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async ({
    page,
  }) => {
    const taskLabel = await page.$(`text=Complete Project`);
    await taskLabel?.click();
    await page.fill(
      'input[value="Complete Project"]',
      'Complete Project - 수정',
    );
    await page.click('body'); // input 창 외부를 클릭
    expect(await page.$(`text=Complete Project - 수정`)).toBeTruthy();
  });

  test('input창에 변경 내용을 적고 엔터를 누르면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async ({
    page,
  }) => {
    const taskLabel = await page.$(`text=Complete Project`);
    await taskLabel?.click();
    await page.fill(
      'input[value="Complete Project"]',
      'Complete Project - 수정',
    );
    await page.press('input[value="Complete Project - 수정"]', 'Enter');
    expect(await page.$(`text=Complete Project - 수정`)).toBeTruthy();
  });

  test('input창에 변경 내용을 적고 esc를 누르면 입력한 내용이 취소되고 원래 Task 내용으로 돌아가며, input창이 없어진다', async ({
    page,
  }) => {
    const taskLabel = await page.$(`text=Complete Project`);
    await taskLabel?.click();
    await page.fill(
      'input[value="Complete Project"]',
      'Complete Project - 수정',
    );
    await page.press('input[value="Complete Project - 수정"]', 'Escape');
    expect(await page.$(`text=Complete Project`)).toBeTruthy();
  });
});
