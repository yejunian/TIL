# 비동기 코드 테스트

- 참고: [*Testing Asynchronous Code*](https://jestjs.io/docs/en/asynchronous)

## 콜백 테스트

- Jest에서는 실행의 끝에 도달하면 테스트가 완료됨
  - 비동기 함수 호출 시 콜백이 끝나기 전에 테스트가 끝나 버릴 수 있음
- 테스트 함수에 첫 번째 매개 변수(`done`) 넣어서 사용(아래 예제 참고)
  - 테스트를 끝내기 전에 `done` 콜백이 호출될 때까지 대기
  - `done`이 호출되지 않으면 타임아웃 에러로 테스트 실패
  - `expect`가 실패하면 에러를 던져서 `done`이 호출되지 않을 수 있음
    - 실패한 이유를 알려면 `expect`를 `try` 블록으로 감싸고 `catch (e)` 블록에서 `done(e)` 호출

```javascript
test('Testing callbacks', done => {
  function callback(data) {
    try {
      expect(data).toBe('hello');
      done();
    } catch (e) {
      done(e);
    }
  }

  fetchData(callback); // fetch some data
});
```

## Promise

- 테스트에서 Promise를 반환(return)하면 resolve될 때까지 대기
  - 주의: `return`을 빼먹으면 resolve되기 전에 테스트가 종료될 수 있음
  - Promise가 reject되면 테스트 실패

```javascript
test('testing Promise', () => {
  return fetchData().then(data => {
    expect(data).toBe('hello');
  })
});
```

- Promise가 reject되어야 맞는 경우
  - `catch` 메서드 사용
  - 테스트를 끝내기 전에 `expect.assertions(n)`으로 assertion을 호출한 횟수 명시
    - 횟수가 맞지 않으면 테스트 실패

```javascript
test('testing Promise reject', () => {
  expect.assertion(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

## `.resolves` / `.rejects`

- `expect`에 이어서 `.resolves`를 사용하면 Promise가 resolve될 때까지 대기 후 진행
  - Promise가 reject되면 테스트 실패
  - `return` 빼먹으면 Promise가 처리되기 전에 테스트가 종료될 수 있음
- `expect`에 이어서 `.rejects`를 사용하면 위와 반대로 Promise가 reject될 때까지 대기 후 진행
  - Promise가 resolve되면 테스트 실패
  - `return` 관련 내용도 동일

## `async` / `await`

- `async` / `await`을 쓸 수도 있음
- `test`의 인자로 전달되는 함수에 `async` 붙이기
- 비동기 처리를 기다려야 하는 곳에 `await` 붙이기(?)
