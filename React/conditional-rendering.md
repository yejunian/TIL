# 조건부 렌더링

- `if`나 조건 연산자(`... ? ... : ...`)로 현재 상태에 맞게 렌더링할 수 있음
- `condition && exprIfTrue` 형태로 `condition`이 `true`일 때만 `exprIfTrue`를 표시할 수 있음
  - JSX에서 중괄호 안에 쓴 표현식 평가 결과가 boolean이면 아무 것도 표시하지 않음
  - 더 실험해 보니 표현식 평가 결과가
    - undefined, null, function일 때도 아무 것도 표시하지 않음
    - 일반 object면 렌더링 실패
    - 배열이면 인덱스 순서대로 돌면서 표현식 평가 결과를 연달아 표시(`{[1, 23, null, 4]}`는 `1234`로 나옴)
- 앞선 실험 결과처럼 렌더링될 때 컴포넌트 자체를 숨기고 싶다면 엘리먼트 대신 `null` 반환
  - `null`을 반환한다고 해서 lifecycle 메서드 호출에 영향을 주지는 않음(예: 여전히 `componentDidUpdate()`가 호출됨)
