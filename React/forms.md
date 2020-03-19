# 폼

- HTML 폼 엘리먼트는 자체적으로 내부 상태가 있음
- React로 일반적인 HTML 폼 엘리먼트와 동일한 동작을 구현하려면 HTML 폼 엘리먼트를 그대로 사용
- JavaScript로 폼의 제출을 처리하려면 제어 컴포넌트 사용

## 제어 컴포넌트(Controlled Component)

- 제어 컴포넌트: React로 값을 제어하는 입력 폼 엘리먼트
- React state를 ‘단일 진실 공급원’(single source of truth)으로 만들기 → React 컴포넌트가 폼에 발생하는 사용자 입력값을 제어
  - 사용자 입력 수정(예: 자동 대문자화)이나 유효성 검사가 간단해짐

## `<textarea>`

- HTML에서 `<textarea>`는 텍스트를 자식으로 정의
- React에서 `<textarea>`는 `value` attribute를 사용
  - 단일 행 입력 폼과 비슷하게 작성 가능

```jsx
class MultilineText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Lorem ipsum dolor sit amet'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(`Submitted text:\n${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Multiline Text:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## `<select>`

- HTML에서는 다음과 같이 `<select>`로 드롭다운 메뉴를 만든다.

```html
<select>
  <option value="lorem">Lorem</option>
  <option selected value="ipsum">Ipsum</option>
  <option value="dolor">Dolor</option>
</select>
```

- React에서는 `selected` attribute를 넣는 대신 `<select>`에 `value` attribute를 넣는다.
  - 장점: 한 곳에서만 업데이트하면 된다.
    - HTML 문법처럼 하면 선택을 해제할 항목과 선택할 항목을 모두 수정해야 함
    - React에서는 `<select>`에서만 수정해도 됨
      - 그러니까 `<select value={this.state.value} onChange={this.handleChange}> ... </select>`라고 작성했다면 `handleChange(event)` 메서드에서 `value` state를 `event.target.value`로 변경하면 됨

## 다중 입력 제어

- 여러 `<input>`을 한 핸들러로 제어하려면, 각 엘리먼트에 `name` attribute를 주고 `event.target.name`으로 핸들러가 수행할 작업을 선택하도록 작성
  - 예: `this.setState({[name]: value})` (ES6의 computed property name)

## 제어 입력에 null 값 지정

- 제어 컴포넌트에 value prop을 지정하면 사용자가 변경 불가

```jsx
ReactDOM.render(<input value="Cannot Change" />, someNode);
```

- 그걸 `null`로 바꾸면 사용자가 제어 가능
  - 아래 예제에서는 1초 뒤부터 내용 변경 가능

```jsx
ReactDOM.render(<input value="Cannot Change" />, someNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, someNode);
}, 1000);
```
