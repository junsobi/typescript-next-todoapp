import { test, expect, Page } from '@playwright/test';

test.describe('시나리오3 : 유저가 task 내용을 편집한다.', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');

    // Given : 사용자가 페이지를 방문하고 새로운 task를 입력한다.
    await page.fill('input[placeholder="해야할일..."]', 'ForEditTask');
    await page.click('text=🔥');

    //Given : Task가 리스트에 존재할때.
    const taskLabel = await page.$(`text=ForEditTask`);

    //When : 내용을 변경하고 싶은 Task의 라벨을 클릭하면
    await taskLabel?.click();
  });

  test('클릭시 Task 라벨이 input창으로 바뀌고 기존 내용이 적혀있으며, 마지막 글자에 포커스가 있다', async ({
    page,
  }) => {
    // then: input창으로 변경된다
    // and: input창에 변경하고 싶은 내용을 적을 수 있게 되는데,
    //      input창에는 기존 Task 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
    const taskInput = await page.$('input[value="ForEditTask"]');
    const focused = await page.evaluate(
      (el) => el === document.activeElement,
      taskInput,
    );
    expect(focused).toBe(true);
  });

  test('input창 외 영역을 클릭하면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async ({
    page,
  }) => {
    //when: input창에 변경 내용을 적고 input 외 영역을 클릭하면
    await page.type('input[value="ForEditTask"]', ' - 수정');
    await page.click('body');

    // Then : 입력한 내용으로 Task가 변경되고
    expect(await page.$(`text=ForEditTask - 수정`)).toBeTruthy();

    // Then : input창이 없어진다 (span 태그로 바뀌었는지 확인)
    const inputTag = await page.$('input[value="ForEditTask - 수정"]');
    expect(inputTag).toBeNull();
  });

  test('input창에 변경 내용을 적고 엔터를 누르면 입력한 내용으로 Task가 변경되고, input창이 없어진다', async ({
    page,
  }) => {
    // when: input창에 변경 내용을 적고 엔터를 누르면
    await page.type('input[value="ForEditTask"]', ' - 수정');
    await page.press('input[value="ForEditTask - 수정"]', 'Enter');

    // Then : 입력한 내용으로 Task가 변경되고
    expect(await page.$(`text=ForEditTask - 수정`)).toBeTruthy();

    // Then : input창이 없어진다 (span 태그로 바뀌었는지 확인)
    const inputTag = await page.$('input[value="ForEditTask - 수정"]');
    expect(inputTag).toBeNull();
  });

  test('input창에 변경 내용을 적고 esc를 누르면 입력한 내용이 취소되고 원래 Task 내용으로 돌아가며, input창이 없어진다', async ({
    page,
  }) => {
    //when : input창에 변경 내용을 적고 esc를 누르면
    await page.type('input[value="ForEditTask"]', ' - 수정');
    await page.press('input[value="ForEditTask - 수정"]', 'Escape');

    // Then : 입력하기 전 내용으로 Task가 변경되고
    expect(await page.$(`text=ForEditTask`)).toBeTruthy();

    // Then : input창이 없어진다 (span 태그로 바뀌었는지 확인)
    const inputTag = await page.$('input[value="ForEditTask"]');
    expect(inputTag).toBeNull();
  });
});
