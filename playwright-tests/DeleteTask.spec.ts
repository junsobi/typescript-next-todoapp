import { test, expect, Page } from '@playwright/test';

test.describe('시나리오 5 : 유저가 Task를 삭제한다', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');

    // Given : 사용자가 페이지를 방문하고 새로운 task를 입력한다.
    await page.fill('input[placeholder="해야할일..."]', 'ForDeleteTask');
    await page.click('text=+');
  });

  test('리스트에 Task가 있을 때, 해당하는 task에 호버하면 삭제버튼이 나오고, 삭제 버튼을 누르면, Task가 삭제되고, 리스트에서 없어진다', async () => {
    //Given : 리스트에 Task가 있을때,
    const taskToDelete = 'ForDeleteTask';
    const taskItem = await page.$(`text=${taskToDelete}`);
    if (!taskItem) {
      throw new Error('지워야할테스크가 없습니다.');
    }

    //When : 해당하는 Task에 호버하면,
    await taskItem.hover(); // 호버 이벤트 추가
    await page.waitForTimeout(500); // 호버 이펙트가 적용되기를 기다림

    //Then : 삭제 버튼이 나온다.
    //When :삭제 버튼을 클릭하면
    await page.evaluate(() => {
      const deleteButton = Array.from(document.querySelectorAll('button')).find(
        (button) => button.innerText === '🗑️',
      );
      if (!deleteButton) {
        throw new Error('Delete button not found');
      }
      deleteButton.click();
    });

    //Then : Task가 삭제되고 리스트에서 없어진다.
    const task = await page.$(`text=${taskToDelete}`);
    expect(task).toBeNull();
  });
});
