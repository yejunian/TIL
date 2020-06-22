# JavaScript에서의 시간 측정

## 밀리초 단위 측정

```javascript
const begin = Date.now();
// something...
const diff = Date.now() - begin;
```

`Date`의 정적 메서드인 [`Date.now()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/now)는 UTC 기준 1970년 1월 1일 0시 0분 0초에서 경과한 밀리초 단위의 시간을 `Number`형의 정수로 반환한다. 이를 이용하여 타임스탬프나 시간차를 밀리초의 정밀도로 구할 수 있다.

이미 생성한 `Date` 객체의 것을 구하려면 `Date.prototype.getTime()`이나 `Date.prototype.valueOf()` 메서드를 사용한다. 다만, 현재 시각의 밀리초 단위 값을 바로 구할 때는 `new Date().getTime()`보다는 `Date.now()`를 사용하는 것이 좋겠다.

-----

## 웹 브라우저에서 Web API로 고정밀(?) 시간 측정

```javascript
const begin = window.performance.now();
// something...
const diff = window.performance.now() - begin;
```

[performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)는 time origin에서 경과한 고정밀 단위의 시간을 밀리초 단위로 리턴한다. 다만, 보안 문제를 피하기 위해 브라우저가 임의로 정밀도를 제한할 수 있다. MDN 문서에 관련 내용이 다음과 같이 나와 있다.

> It's important to keep in mind that to mitigate potential security threats such as Spectre, browsers typically round the returned value by some amount in order to be less predictable. This inherently introduces a degree of inaccuracy by limiting the resolution or precision of the timer. For example, Firefox rounds the returned time to 1 millisecond increments.  
> 스펙터와 같은 잠재적인 보안 위협을 완화하기 위해 브라우저는 일반적으로 예측 가능성을 낮추기 위해 반환된 값을 어느 정도 반올림합니다. 이것은 본질적으로 타이머의 해상도 또는 정밀도를 제한함으로써 어느 정도의 부정확성을 초래합니다. 예를 들어 Firefox는 반환된 시간을 1ms 단위로 반올림합니다.

그러니까, `performance.now()`는 보안 문제 때문에 실제로는 원하는 만큼 정밀하게 작동하지 않을 수 있다. MDN 문서에 따르면 브라우저 설정에 따라서도 정밀도가 달라질 수 있는 것 같다. Chrome에서 다음과 같이 `performance.now()`를 100,000번 호출하여 배열에 넣은 뒤에 중복된 값을 제거했더니 7,911개만 남았다.

```javascript
function testTime(count) {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(performance.now());
  }
  return result;
}

function removeDuplications(arr) {
  const result = [arr[0]];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i - 1] !== arr[i]) {
      result.push(arr[i]);
    }
  }
  return result;
}

const result = testTime(100000);
const reducedResult = removeDuplications(result);
console.log(reducedResult.length); // 7911
console.log(reducedResult[reducedResult.length - 1] - reducedResult[0]); // 44.54000000259839
```

Chrome에서 44.54ms 동안 7911개의 고유한 `performance.now()`를 남겼으니, 여기서 측정된 정밀도는 5.63µs 정도 되겠다. Safari에서도 같은 코드로 측정해 봤는데, 14개만 남고 1ms 정밀도로 결과가 나타난다(정수에 가깝게 나오긴 하지만, 항상 정수 값은 아니었다.). 여기서 알 수 있는 점은 브라우저마다 정밀도가 다르다는 것이다.

-----

## Node.js에서 나노초 단위의 시간차 측정

```javascript
const begin = process.hrtime();
// something...
const diff = process.hrtime(begin);
```

Node.js에서 [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)은 초 단위 값과 초 미만 단위를 나노초로 표현한 값을 포함하는 배열 `[seconds, nanoseconds]`를 리턴한다. 인수 없이 호출하거나, 길이 2인 배열을 인수로 넘길 수 있다.

주의사항은 Node.js 문서에서 확인할 수 있다. 첫째, 반환되는 시각은 과거의 임의의 시각에 상대적이고 특정한 날의 시각(예: 1970년 1월 1일 0시 0분 0초)과는 관계가 없다. 따라서 타임스탬프 같은 절대적인 기준이 필요한 곳이 아니라 시간차를 구하는 곳에 쓰인다. 둘째, 인수로 배열이 아닌 값을 넘기면 `TypeError`가 발생하며, 사용자가 임의로 작성한 배열을 넘기는 경우에는 제대로 된 결과가 나오지 않을 수 있다. 문서에는 `TypeError`만 언급되어 있는데, 인수로 넘긴 배열의 길이가 2가 아니면 `RangeError`가 발생한다.

[`process.hrtime.bigint()`](https://nodejs.org/api/process.html#process_process_hrtime_bigint)로 `bigint`형의 값을 바로 구할 수도 있다.
