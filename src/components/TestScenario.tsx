import { useState } from 'react';
import Panel from '@/components/Panel';

const TestScenario = () => {
  return (
    <div className="p-8">
      <p className="text-2xl mb-8">Test Scenario</p>
      <Panel title="Scenario 1: 유저는 Task 리스트를 볼 수 있으며, 완료되지 않은 테스크는 상단에, 완료된 테스크는 리스트 하단에 표시됩니다.">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> Task 리스트가 존재할
            때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 페이지에 접속하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> Task 리스트가
                    보입니다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Given: </span> 완료된 테스크와
            미완료된 테스크가 모두 존재할 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 페이지에 접속하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 완료된
                    테스크들은 아래쪽 영역에 표시됩니다.
                  </li>
                  <li>
                    <span className="font-semibold">And: </span> 완료되지 않은
                    테스크들은 윗쪽 영역에 표시됩니다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 2: 유저는 새로운 Task를 생성할 수 있습니다.">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> 유저가 Task 생성
            버튼을 볼 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 버튼을 클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> Task 생성 폼이
                    보입니다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Given: </span> 유저가 Task 생성 폼을
            볼 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> Task 이름을
                입력하고, Task 생성 버튼을 클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 새로운 Task가
                    리스트에 추가됩니다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 3: 유저가 Task 내용을 편집한다">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> Task 가 리스트에
            존재할 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 내용을 변경하고
                싶은 Task의 라벨을 클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> input창으로
                    변경된다
                  </li>
                  <li>
                    <span className="font-semibold">And: </span> input창에
                    변경하고 싶은 내용을 적을 수 있게 되는데, input창에는 기존
                    Task 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">When: </span> input창에 변경
                내용을 적고 input 외 영역을 클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 입력한
                    내용으로 Task가 변경되고, input창이 없어진다
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">When: </span> input창에 변경
                내용을 적고 엔터를 누르면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 입력한
                    내용으로 Task가 변경되고, input창이 없어진다
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">When: </span> input창에 변경
                내용을 적고 esc를 누르면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 입력하기 전
                    내용으로 돌아간다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 4: 유저는 리스트의 태스크들을 완료 처리하거나 완료 취소 처리한다.">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> 완료되지 않은 테스크
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 체크박스를
                클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 체크 박스가
                    체크된다.
                  </li>
                  <li>
                    <span className="font-semibold">And: </span> 완료 리스트로
                    넘어간다.
                  </li>
                  <li>
                    <span className="font-semibold">And: </span> 테스크 설명에
                    취소선이 생긴다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Given: </span> 완료된 테스크
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 체크박스를
                클릭하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 체크가
                    해제된다
                  </li>
                  <li>
                    <span className="font-semibold">And: </span> 대기 리스트로
                    올라간다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 5: 유저가 Task를 삭제한다">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> 리스트에 Task가 있을
            때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 해당하는 Task에
                호버하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 삭제 버튼이
                    나온다.
                  </li>
                  <li>
                    <span className="font-semibold">When: </span> 삭제 버튼을
                    누르면
                    <ul className="pl-5 list-disc">
                      <li>
                        <span className="font-semibold">Then: </span> Task가
                        삭제되고, 리스트에서 없어진다.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 6: Clear All 버튼을 눌러 완료된 task 들을 삭제한다.">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> 완료된 task가 존재 할
            때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> Clear All 버튼을
                누르면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> Task
                    리스트에서 완료된 Task 가 삭제된다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 7: 유저가 리스트를 드래그앤 드롭을 하는 상황">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> 미완료 리스트가 두 개
            이상일 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 유저가 하나의
                태스크를 드래그하면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 리스트간
                    순서를 바꿀 수 있다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
      <Panel title="Scenario 8: 유저가 완료기한을 정하고(수정하고) 싶다">
        <div className="p-4 space-y-4 bg-white rounded shadow">
          <div>
            <span className="font-semibold">Given: </span> task에 마감 기한이
            없는 task가 존재할 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 리스트 좌측의
                달력을 누르면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 달력이 나온다
                  </li>
                  <li>
                    <span className="font-semibold">When: </span> 달력에서 마감
                    날짜를 선택하면
                    <ul className="pl-5 list-disc">
                      <li>
                        <span className="font-semibold">Then: </span> 달력이
                        사라지며, 마감 기한이 정해지고 리스트 좌측에 마감
                        기한까지 d-day가 나온다.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Given: </span> 리스트에 마감 기한이
            있는 task가 존재할 때
            <ul className="pl-5 list-disc">
              <li>
                <span className="font-semibold">When: </span> 리스트 좌측의
                d-day를 누르면
                <ul className="pl-5 list-disc">
                  <li>
                    <span className="font-semibold">Then: </span> 달력이 나온다
                    (달력에는 현재 정해진 날짜를 보여준다)
                  </li>
                  <li>
                    <span className="font-semibold">When: </span> 달력에서 마감
                    날짜를 선택하면
                    <ul className="pl-5 list-disc">
                      <li>
                        <span className="font-semibold">Then: </span> 달력이
                        사라지며, 마감 기한이 수정되고 리스트 좌측에 마감
                        기한까지 d-day가 나온다.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default TestScenario;
