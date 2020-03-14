# JSX

- 첫 인상: ES6에 추가된 템플릿 리터럴의 확장판 같다.
- 실체: `React.createElement()` 호출로 컴파일된다. `React.createElement()`는 ‘React 엘리먼트’라는 객체를 생성한다.

## JSX 표현식 예제

```jsx
// Hello, world!
<h1>Hello, world!</h1>
// 비어 있는 태그는 '/>'로 닫기
<img src="./hello.png" alt="Hello, world!" />
// JSX에 자식 포함하기
(
  <div>
    <h1>Hello!</h1>
    <p>Lorem ipsum dolor sit amet</p>
  </div>
)

// 중괄호로 JavaScript 표현식 넣기
<h1>Hello, {name}!</h1>
<h1>Hello, {getName(user)}!</h1>

// JSX attribute
// 문자열 attribute
<button type="button" className="btnButton">Button</button>
// 표현식 attribute: 중괄호 밖에 따옴표 넣지 말 것!
<img src={article.thumbnail.url} alt={article.thumbnail.alt} />

// JSX 표현식을 여러 줄에 나누어 쓸 때는 소괄호로 묶어서 세미콜론 자동 삽입 방지
(
  <h1>
    Hello, {getName(user)}!
  </h1>
)
```
