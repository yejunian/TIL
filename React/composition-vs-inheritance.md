# 합성 vs 상속

- React 문서에서는 컴포넌트를 상속보다는 **합성(composition) 방식 권장**
- UI가 아닌 기능을 재사용하려면 별도의 JavaScript 모듈로 분리 후 컴포넌트에서 import하여 사용

## Containment: `props.children`

- 어떤 자식 엘리먼트가 들어올지 예상할 수 없는 컴포넌트
  - 예: 사이드바, 다이얼로그
- 자식 엘리먼트를 나타내는 `children` prop을 출력에 그대로 전달(`props.children`)

### 컴포넌트에 여러 개의 ‘구멍’이 필요한 경우

- 사용자 정의 prop 사용
- 예: 좌우 분할 창(SplitPane)
  - `SplitPane` 컴포넌트는 `left`, `right` prop을 받아서 좌우 래퍼(wrapper) 안에 `left`, `right` prop으로 받은 내용 출력

## 특수화(Specialization)

- 어떤 컴포넌트의 ‘특수한 경우’인 컴포넌트를 고려해야 하는 경우
- ‘구체적인’ 컴포넌트가 ‘일반적인’ 컴포넌트를 렌더링하고 props를 통해 내용 구성
