# 리스트와 Key

## 배열로 엘리먼트 배열 만들기

- `Array.prototype.map()`으로 데이터를 담은 배열에서 엘리먼트를 담은 배열을 만들 수 있다.
- 그런데 `<li>` 엘리먼트에 `key` prop을 지정하지 않으면, 리스트의 각 자식에 고유한 `key` prop이 있어야 한다는 경고 메시지가 나온다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((item) =>
  <li key={item.toString()}>
    {item}
  </li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

- 참고: JSX의 중괄호 안에 `map()` 함수를 넣을 수도 있음

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((item) =>
        <ListItem
          key={item.toString()}
          value = {item} />
      )}
    </ul>
  );
}
```

## Key

- `key`는 엘리먼트 리스트를 만들 때 들어가야 하는 **문자열**로 된 특수한 attribute다.

### Key를 선택하는 방법

1. 리스트에서 고유하게 식별할 수 있는 문자열
   - 일반적으로 데이터의 ID
2. 그게 불가하면 항목의 인덱스
   - 주의: 항목의 순서가 바뀌면 성능 저하나 state 관련 문제가 생길 수 있음
   - 리스트 항목에 key를 지정하지 않으면 기본적으로 인덱스를 key로 사용

### Key 관련 주의사항

- Key를 항목의 인덱스로 지정했는데 항목의 순서가 바뀌면 성능 저하나 state 관련 문제가 생길 수 있음
- Key로 컴포넌트 추출 시 **배열**에 들어가는 엘리먼트에 key를 넣어야 함
  - 그러니까 웬만하면 `map()` 안에 들어가는 엘리먼트에 key를 넣게 됨
- Key가 전체 범위에서까지 고유하지 않아도 됨
  - Key는 형제 사이에서만 고유한 값이면 괜찮음
  - 서로 다른 리스트에서 동일한 key 사용 가능
- Key는 컴포넌트로 전달되지 않음
  - Key와 동일한 값을 props에 전달하려면 다른 이름으로 prop 전달
  - 예: `const content = posts.map((post) => <Post key={post.id} id={post.id} />);`
    - 여기서는 `id`라는 이름으로 `Post` 컴포넌트에 prop 전달
    - `Post` 컴포넌트는 `props.id`는 읽을 수 있지만 `props.key`는 읽을 수 없음
