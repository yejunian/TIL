# 엘리먼트(Element)

- React 앱의 가장 작은 단위
- 화면에 표시할 내용 기술
- 일반 객체(plain object)
- 불변(immutable)
- **주의**
  - 컴포넌트와 혼동하지 말 것
  - 엘리먼트는 컴포넌트의 구성 요소

## DOM에 엘리먼트 렌더링 및 업데이트

- 루트 DOM 노드
  - 내부의 모든 엘리먼트를 React DOM에서 관리하는 DOM 노드
  - 일반적으로 루트 DOM 노드는 하나지만, 독립된 루트 DOM 노드를 여러 개 둘 수 있음
- `ReactDOM.render(elem, node)`로 React 엘리먼트를 DOM 노드에 렌더링
- 이미 렌더링된 엘리먼트를 업데이트하려면 새로운 엘리먼트를 생성하고 `ReactDOM.render()`로 전달
  - 일반적으로는 `ReactDOM.render()`를 한 번만 호출하고, 업데이트 목적으로는 다른 방법 사용
  - React DOM은 새 엘리먼트를 기존 엘리먼트와 비교하여 변경해야 하는 DOM만 업데이트
