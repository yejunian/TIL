# Context

## Context 사용 목적

- 중간 컴포넌트의 props를 거치지 않고 데이터 전달
- 다양한 레벨에 중첩된 많은 컴포넌트로 데이터 전달

## Context를 써야 하는 상황

- 공유하려는 데이터가 React 컴포넌트 트리 안에서 전역적이라고 볼 수 있는 경우
  - 예: 로그인한 사용자, 테마, 언어 등
- 그러니까, 수많은 컴포넌트에 일일이 데이터를 넘겨야 하는 경우

## Context 적용 전 고려 사항

- Context를 사용하면 컴포넌트 재사용이 어려워짐
- 여러 레벨에 걸쳐 props를 넘기는 것을 제거하는 데는 컴포넌트 합성([한국어](https://ko.reactjs.org/docs/composition-vs-inheritance.html#containment)/[영어](https://reactjs.org/docs/composition-vs-inheritance.html#containment))이 더 간단할 수 있음
  - 해당 props를 사용하는 컴포넌트 자체를 props로 전달해서, 전달하는 props 개수를 하나로 줄일 수 있음
  - 그러나 복잡한 로직을 상위로 올리면 상위 컴포넌트가 더 복잡해짐
- 같은 데이터를 트리 안 여러 레벨에 걸쳐 있는 여러 컴포넌트에 주어야 하는 경우
  - Context로 모든 하위 컴포넌트에 브로드캐스트하는 것이 좋음

## API 및 예시

- React 공식 문서 &gt; 고급 안내서 &gt; Context의 [API](https://ko.reactjs.org/docs/context.html#api) 문단과 [예시](https://ko.reactjs.org/docs/context.html#examples) 문단 참고

-----

## 참고 자료

- [React 공식 문서 &gt; 고급 안내서 &gt; Context](https://ko.reactjs.org/docs/context.html)
