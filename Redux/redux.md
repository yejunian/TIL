# Redux

- JavaScript 애플리케이션을 위한 예측 가능한 상태 컨테이너
- 일관적으로 동작하고, 서로 다른 환경에서 작동하고, 테스트하기 쉬운 애플리케이션을 작성하도록 도와줌

## React에서 Redux의 필요성

- React의 데이터 흐름은 컴포넌트 계층 구조를 따라 아래로 내려가는 단방향 흐름
- 어떤 컴포넌트에서 일으킨 state 변화를 다른 컴포넌트에 반영하려면 복잡한 과정을 거쳐야 할 수 있음
  - 가장 가까운 공통 조상에서 state를 관리하도록 변경
  - State를 관리하는 공통 조상에서 state 변화를 일으키는 컴포넌트까지 props로 콜백을 정의해 넘겨주기
- 컴포넌트 구조가 복잡해지면 서로 다른 컴포넌트 간 데이터 교환 구현 방법도 복잡해질 수 있음
  - 공통 조상이 멀리 있다면 먼 길을 돌아가는 데이터 흐름이 생김
  - 해당 props를 실제로는 사용하지 않고 전달만 하는 컴포넌트가 생김

## Redux가 꼭 필요하지 않을 수도 있다

- React를 배운 지 얼마 안 된 경우: React 공식 문서 중 「React로 생각하기」([한국어](https://ko.reactjs.org/docs/thinking-in-react.html)/[영어](https://reactjs.org/docs/thinking-in-react.html)) 문서의 방법 활용
- 컴포넌트 구조가 작고 간단하다면 React 공식 문서의 방법대로 구현해도 괜찮음
- Redux의 아이디어를 Redux 없이도 적용 가능
- Redux가 꼭 필요한 상황인지 생각해 보기

-----

## 참고 자료

- [Redux 한국어 문서](https://lunit.gitbook.io/redux-in-korean/).
- velopert, [「Redux (1) 소개 및 개념 정리」](https://velog.io/@velopert/Redux-1-소개-및-개념정리-zxjlta8ywt), 2018.
- Dan Abramov, Sangyeop Bono Yu 역, [「당신에게 Redux는 필요 없을지도 모릅니다.」](https://medium.com/@Dev_Bono/당신에게-redux는-필요-없을지도-모릅니다-b88dcd175754), 2017.
