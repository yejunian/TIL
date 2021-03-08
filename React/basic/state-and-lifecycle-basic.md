# State와 Lifecycle 기본

## State의 필요성

- 코드를 한 번만 작성하고 컴포넌트가 스스로 업데이트하도록 해야 함
- 앞서 간략하게 배운 [엘리먼트](https://ko.reactjs.org/docs/rendering-elements.html)([TIL](./element.md))와 [컴포넌트](https://ko.reactjs.org/docs/components-and-props.html)([TIL](./component.md))만으로는 **외부**에서 `ReactDOM.render()`를 호출해 주어야 컴포넌트를 업데이트할 수 있음

## State 추가

1. 함수 컴포넌트를 클래스 컴포넌트로 변경
2. `render()` 메서드의 `this.props`를 `this.state`로 변경
3. `this.state`를 초기화하는 constructor 추가
   - 매개 변수로 `props` 받기
   - constructor에서는 먼저 `super(props)`로 상위 클래스의 constructor를 호출해야 함
4. 엘리먼트에서 불필요한 prop 삭제

## 클래스에 Lifecycle 메서드

- `componentDidMount()`: 컴포넌트 인스턴스를 생성(`constructor()`)하고 DOM에 렌더링(`render()`)한 뒤 실행
- `componentWillUnmount()`: 컴포넌트를 DOM에서 제거할 때 호출
- Lifecycle 관련 더 자세한 내용은 [「React.Component」](https://ko.reactjs.org/docs/react-component.html) 레퍼런스 참고

## State 사용 시 주의·참고

- State(`this.state`)를 직접 수정하지 말고 `setState()`를 사용할 것
  - `this.state`는 `constructor()`에서만 직접 지정할 수 있음
- State 업데이트는 비동기적일 수 있음
  - `this.props`와 `this.state`가 비동기적으로 업데이트될 수 있음
  - 서로 다른 시점의 `this.props`와 `this.state`를 참조하는 것을 피하려면, 객체 대신 함수를 받는 `setState()` 사용
    - `this.setState((state, props) => ({...}))`
- 하향식(top-down) 데이터 흐름(단방향)
  - 모든 state는 항상 특정한 컴포넌트에 속해 있음
  - 그 state에서 파생된 데이터는 트리 구조에서 자신의 ‘아래’에 있는 컴포넌트에만 영향을 줌
