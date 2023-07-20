import { test, expect, Page } from '@playwright/test';
import { mockTasks } from '../src/data/mockTasks';

test.describe('시나리오 4 : 유저는 리스트의 테스크들을 완료처리하거나 완료 취소 처리할 수 있다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');
  });

  test('유저가 미완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시되고 취소선이 그어진다.', async ({
    page,
  }) => {
    //Given : 미완료 섹션에 'inCompletToComplet'이라는 테스크가 있다.
    await page.fill('input[placeholder="해야할일..."]', 'inCompletToComplet');
    await page.click('text=🔥');

    //When : 유저가 'inCompletToComplet' 테스크의 체크박스를 클릭한다.
    await page.click(
      `[data-testid="task-inCompletToComplet"] >> css=[data-testid="checkbox-visible"]`,
    );

    //Then : 체크표시가 되고 취소선이 그어진다.
    expect(
      await page.$(
        `[data-testid="task-inCompletToComplet"] >> span.line-through`,
      ),
    ).toBeTruthy();
    expect(
      await page.$(
        `[data-testid="task-inCompletToComplet"] >> [data-testid="checkbox-svg"]`,
      ),
    ).toBeTruthy();
  });

  test('유저가 완료 섹션에 있는 테스크의 체크박스를 클릭하면 체크표시, 취소선이 해제된다.', async ({
    page,
  }) => {
    //Given : 완료처리가되어있는 Task가 있다.
    await page.fill('input[placeholder="해야할일..."]', 'CompletToinComplete');
    await page.click('text=🔥');
    await page.click(
      `[data-testid="task-CompletToinComplete"] >> css=[data-testid="checkbox-visible"]`,
    );

    //When : 유저가 'CompletToinComplet' 테스크의 체크박스를 클릭한다.
    await page.click(
      `[data-testid="task-CompletToinComplete"] >> css=[data-testid="checkbox-svg"]`,
    );

    //Then : 체크표시와 취소선이 사라진다.
    expect(
      await page.$(
        `[data-testid="task-CompletToinComplete"] >> span.line-through`,
      ),
    ).toBeNull();
    expect(
      await page.$(
        `[data-testid="task-CompletToinComplete"] >> [data-testid="checkbox-svg"]`,
      ),
    ).toBeNull();
  });
});
