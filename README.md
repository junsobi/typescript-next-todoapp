# BDD 기법을 이용한 개발

## 개발 스택 : typeScript, Next, tailwindcss

<details>
<summary> <h2> Spec(Bdd를 활용한 시나리오) </h2> </summary>
<div markdown="1">

- **Scenario 1: 유저는 Task 리스트를 볼 수 있으며, 완료되지 않은 테스크는 상단에, 완료된 테스크는 리스트 하단에 표시됩니다.**
- given: Task 리스트가 존재할 때
  - when: 페이지에 접속하면
    - then: Task 리스트가 보입니다.
- given: Task 리스트가 존재하지 않을 때
  - when: 페이지에 접속하면
    - then: "Empty"라는 문구가 출력됩니다.
- given: 완료된 테스크와 미완료된 테스크가 모두 존재할 때
  - when: 페이지에 접속하면
    - then: 완료된 테스크들은 아래쪽 영역에 표시됩니다.
    - and 완료되지 않은 테스크들은 윗쪽 영역에 표시됩니다.

---

---

- **Scenario 2: 유저는 인풋창에 해야되는 일들을 입력하고 리스트에 추가한다.**
- given: 유저가 인풋창에 Task 내용을 입력했을 때
  - when: 추가 버튼을 누르면
    - then: 대기리스트 제일 아래에 완료되지 않은 Task가 추가 된다.
  - when: 엔터 버튼을 누르면
    - then: 대기리스트 제일 아래에 완료되지 않은 Task가 추가 된다.
- given: 유저가 인풋창에 아무것도 입력하지 않았을 때
  - when: 추가 버튼을 누르면
    - then: 아무런 동작도 하지 않는다.
  - when: 엔터 버튼을 누르면
    - then: 아무런 동작도 하지 않는다.

---

---

- **Scenario 3: 유저가 Task 내용을 편집한다**
- given: Task 가 리스트에 존재할 때
  - when: 내용을 변경하고 싶은 Task의 라벨을 클릭하면
    - then: input창으로 변경된다
    - and: input창에 변경하고 싶은 내용을 적을 수 있게 되는데, input창에는 기존 Task 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
  - when: input창에 변경 내용을 적고 input 외 영역을 클릭하면
    - then: 입력한 내용으로 Task가 변경되고, input창이 없어진다
  - when: input창에 변경 내용을 적고 엔터를 누르면
    - then: 입력한 내용으로 Task가 변경되고, input창이 없어진다

---

---

- **Scenario 4: 유저는 리스트의 태스크들을 완료 처리하거나 완료 취소 처리한다.**
- given: 완료되지 않은 테스크
  - when : 체크박스를 클릭하면
    - then : 체크 박스가 체크된다.
    - and : 완료 리스트로 넘어간다.
    - and : 테스크 설명에 취소선이 생긴다.
- given : 완료된 테스크
  - when : 체크박스를 클릭하면
    - then: 체크가 해제된다
    - and: 대기 리스트로 올라간다.

---

---

- **Scenario 5: 유저가 Task를 삭제한다**
- given: 리스트에 Task가 있을 때
  - when: 해당하는 Task 우측 삭제 버튼을 누르면
    - then: Task가 삭제되고, 리스트에서 없어진다

---

- **Scenario 6: Clear All 버튼을 눌러 완료된 task 들을 삭제한다.**
- given: 완료된 task가 존재 할 때
  - when: Clear All 버튼을 누르면
    - then: Task 리스트에서 완료된 Task 가 삭제된다.

---

---

- **Screnario 7: 유저가 리스트를 드래그앤 드롭을 하는 상황**
- given: 미완료 리스트가 두개 이상일때
  - when: 유저가 하나의 태스크를 드래그 하면
    - then: 리스트간 순서를 바꿀 수 있다.

---

---

- **Screnario 8: 유저가 완료기한을 정하고(수정하고) 싶다**
- given: task에 마감 기한이 없는 task가 존재할때
  - when: 리스트 좌측의 달력을 누르면
  - then: 달력이 나온다
    - when : 달력에서 마감 날짜를 선택하면
    - then : 달력이 사라지며, 마감기한이 정해지고 리스트 좌측에 마감기한까지 d-day가 나온다.
- given : 리스트에 마감기한이 있는 task가 존재할때
  - when : 리스트 좌측의 d-day를 누르면
  - then : 달력이 나온다(달력에는 현재 정해진 날짜를 보여준다)
    - when : 달력에서 마감날짜를 선택하면
    - then : 달력이 사라지며, 마감기한이 정해지고 리스트 좌측에 마감기한까지 d-day가 나온다.

---

</div>
</details>

## 데이터 스키마

| 필드명               | 타입                          | 설명                     |
| -------------------- | ----------------------------- | ------------------------ |
| id                   | string                        | 고유 식별자              |
| title                | string                        | 할 일의 제목             |
| content              | string                        | 할 일의 내용             |
| categories           | string[]                      | 할 일의 카테고리         |
| status               | 'inProgress' 또는 'completed' | 할 일의 상태             |
| createdDateTime      | Date                          | 할 일 생성 날짜 및 시간  |
| lastModifiedDateTime | Date                          | 마지막 수정 날짜 및 시간 |
