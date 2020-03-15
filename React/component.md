# 컴포넌트(Component)

- JavaScript 함수와 유사
- ‘props’라고 하는 입력을 받아서, 어떻게 표시되는지를 기술하는 React 엘리먼트 반환
- 주의
  - 컴포넌트 이름은 항상 대문자로 시작(소문자로 시작하는 이름은 DOM 태그로 처리됨)
  - props는 읽기 전용(모든 React 컴포넌트는 props를 다룰 때 순수 함수[pure function]처럼 동작해야 함)

## 함수 컴포넌트, 클래스 컴포넌트 예제

### 함수 컴포넌트

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

### 클래스 컴포넌트

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

## 렌더링

- React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있음

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

const element = <Welcome name="React" />;
ReactDOM.render(
  element,
  document.getElementById('root');
)
```

- 위 코드에서 `ReactDOM.render()` 호출 시 처리 과정
  1. `{name: "React"}`를 인자로 주어 `Welcome` 컴포넌트 호출
  2. `Welcome` 컴포넌트는 `<h1>Hello, React!</h1>` 엘리먼트 반환
  3. ReactDOM이 DOM 업데이트
