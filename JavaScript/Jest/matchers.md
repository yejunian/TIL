# Matchers

## Common Matchers

```js
test('2 + 2 = 4' () => {
  expect(2 + 2).toBe(4);
})
```

- `expect(2 + 2)`는 expectation object 반환
- Expectation object로는 주로 matcher 호출
  - 여기서는 `.toBe(4)`가 matcher
- Jest는 작동 중 실패하는 모든 matcher 추적해서 에러 메시지 출력

### `toBe`, `toEqual`

- `toBe`는 [`Object.is`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is)를 사용하여 **값이 정확히 일치하는지** 검사(`===`와 다름!)
- `toEqual`은 객체나 배열의 **모든 필드를 재귀적으로** 검사

## Truthiness

- 적용 예시 상황: `undefined`, `null`, `false`를 구분해야 하는 경우, 또는 구분하지 않으려는 경우
- `toBeNull`: `null`만 일치
- `toBeUndefined`: `undefined`만 일치
- `toBeDefined`: `toBeUndefined`의 반대
- `toBeTruthy`: `if` 문에서 `true`로 다루는 값에 일치
- `toBeFalsy`: `if` 문에서 `false`로 다루는 값에 일치

## Number

- 숫자 비교에 쓸 수 있는 matcher
- `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan`, `toBeLessThanOrEqual`
- 숫자 타입에서는 `toBe`와 `toEqual`이 똑같은 결과를 보임
- `toBeCloseTo`: 부동 소수점 비교 시 사용

## String

- `toMatch`: 정규 표현식과 일치하는지 검사

## Array, Iterable

- `toContain`: 배열이나 이터러블이 특정 항목을 포함하는지 검사

## Exception

- `toThrow`: 특정 함수가 특정 에러를 던지는지 검사
  - `toThrow()`: 모든 에러 검사
  - `toThrow(Error)`: 특정 에러 검사
  - `toThrow('Lorem ipsum')`: 에러 메시지 일치 검사
  - `toThrow(/Lorem ipsum/)`: 정규 표현식으로 에러 메시지 검사
