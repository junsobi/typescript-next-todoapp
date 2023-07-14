import { test, expect, Page } from '@playwright/test';

test.describe('시나리오 2 : 유저는 인풋창에 해야되는 일들을 입력하고 리스트에 추가한다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('유저가 인풋창에 Task 내용을 입력하고 추가버튼을 누르면 Incompleted 섹션 제일 아래 Task가 추가된다', async () => {
    await page.fill('input[placeholder="해야할일..."]', 'new task');
    await page.click('text=+');
    const lastTask = await page.innerText(
      '[data-testid="Incompleted-section"] :last-child',
    );
    expect(lastTask).toBe('new task');
  });

  test('유저가 인풋창에 Task 내용을 입력하고 엔터 버튼을 누르면 대기리스트 제일 아래에 완료되지 않은 Task가 추가된다', async () => {
    await page.fill('input[placeholder="해야할일..."]', 'new task');
    await page.keyboard.press('Enter');
    const lastTask = await page.innerText(
      '[data-testid="Incompleted-section"] :last-child',
    );
    expect(lastTask).toBe('new task');
  });

  test('유저가 인풋창에 아무것도 입력하지 않았을 때 추가 버튼을 누르면 아무런 동작도 하지 않는다', async () => {
    await page.click('text=+');
    const input = await page.inputValue('input[placeholder="해야할일..."]');
    expect(input).toBe('');
  });

  test('유저가 인풋창에 아무것도 입력하지 않았을 때 엔터 버튼을 누르면 아무런 동작도 하지 않는다', async () => {
    await page.keyboard.press('Enter');
    const input = await page.inputValue('input[placeholder="해야할일..."]');
    expect(input).toBe('');
  });
});
