# `this`

JavaScript의 `this`는 함수를 호출하는 방법에 따라 결정된다. 호출 방법은 다음과 같다.

-----

## 1. 단순 호출

Non-strict 모드의 함수를 단순 호출하면 `this`는 전역 객체에 바인딩된다.

```javascript
function func() {
  return this;
}
console.log(func()); // 단순 호출, 결과는 전역 객체(global 또는 window)
```

Strict 모드의 함수를 단순 호출하면 `this`는 실행 문맥의 `this`에 바인딩된다.

```javascript
function func() {
  'use strict';
  return this;
}
console.log(func()); // 단순 호출, 결과는 undefined
console.log(global.func()); // 메서드 호출, 결과는 전역 객체
```

-----

## 2. `call`, `apply` 메서드를 이용한 호출

함수의 `call`이나 `apply` 메서드를 이용하여 `this`로 바인딩할 객체를 전달할 수 있다.

```javascript
const obj = {};
function func() {
  return this;
}
console.log(func.call(obj)); // obj
console.log(func.apply(obj, [])); // obj
```

-----

## 3. `bind` 메서드(ES5)로 바인드한 함수의 호출

ES5부터 함수에 `bind` 메서드가 추가되었다. `bind` 메서드는 해당 함수와 동일한 스코프와 동일한 내용을 가졌지만 `this`를 주어진 객체로 고정한 함수를 반환한다.

```javascript
function func() {
  return this;
}

console.log(func()); // 전역 객체(global 또는 window)

const obj = { x: 1 };
const boundFunc = func.bind(obj);
console.log(boundFunc()); // obj
```

`bind`로 생성한 함수에는 몇 가지 제약사항이 따른다. `bind`로 생성한 함수에는 이 메서드를 적용해도 아무런 효과가 없다. `bind`로 생성된 함수는 `call`, `apply` 메서드로 호출하더라도 `bind`로 생성될 당시 전달받은 `thisArg`를 `this`로 사용한다. (`call`, `apply`의 첫 번째 인수 `thisArg`는 무시된다.) MDN의 [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 문서의 ‘Description’ 문단에 그 원리가 잘 나와 있다.

```javascript
function func() {
  return this;
}
const obj1 = { x: 1 };
const boundFunc1 = func.bind(obj1);

const obj2 = { x: 2 };
const boundFunc2 = boundFunc1.bind(obj2);
console.log(boundFunc2()); // obj1

console.log(boundFunc1.call(obj2)); // obj1
```

-----

## 4. 화살표 함수(ES6) 호출

화살표 함수의 `this`는 호출한 상황에 따라 달라지지 않는다. 화살표 함수가 있는 스코프의 `this`가 사용된다.

```javascript
const obj = {
  arrow: () => this, // 이 스코프에서의 this는 전역 객체
  func: function () {
    return this;
  },
};

console.log(obj.arrow()); // 화살표 함수 호출, 결과는 전역 객체
console.log(obj.func()); // 메서드 호출, 결과는 obj
```

-----

## 5. 메서드 호출

객체의 메서드를 호출하면, `this`는 메서드를 포함하는 객체이다. 그러나 새 변수에 이 메서드를 할당하고 새 변수를 통해 함수를 호출하는 등, 호출 방법이 달라지면 `this`가 다른 값을 가질 수 있다.

```javascript
const obj = {
  func: function () {
    return this;
  },
};
console.log(obj.func()); // 메서드 호출, 결과는 obj

const extracted = obj.func;
console.log(extracted()); // 단순 호출, 결과는 전역 객체
```

메서드에서 내부 함수를 **단순 호출**했을 때, 그 내부 함수가 non-strict 모드라면 내부 함수에서의 `this`는 전역 객체로, strict 모드라면 `undefined`로 바인딩된다. 메서드 안에서라도, 내부 함수를 **단순 호출**했으므로 당연한 결과이다.

```javascript
const obj = {
  method: function () {
    function innerFunc() {
      return this;
    }
    return innerFunc(); // 단순 호출, 결과는 전역 객체
  },
};
console.log(obj.method()); // 전역 객체
```

-----

## 6. 생성자 호출

함수를 `new`와 함께 생성자로 사용하면 `this`는 새로 생성되는 객체이다.

```javascript
function Vector(x, y) {
  this.x = x;
  this.y = y;
  this.getMagnitude = function () {
    return (this.x ** 2 + this.y ** 2) ** 0.5;
  };
}

const v = new Vector(3, 4); // 생성자 호출,
// {
//   x: 3,
//   y: 4,
//   getMagnitude: [Function (anonymous)],
// }
console.log(v.getMagnitude()); // 메서드 호출, 결과는 5
```

-----

## 7. 웹 브라우저 이벤트 핸들러 호출

함수가 이벤트 핸들러로서 호출된 경우, `this`는 이벤트가 발생한 요소(element)이다.

### 7.1. DOM 이벤트 핸들러

```javascript
const button = document.createElement('button');
button.innerText = 'Button';
document.body.appendChild(button);
document.body.addEventListener('click', function (e) {
  console.log(this === e.currentTarget); // 버튼 클릭 시 false, body 직접 클릭 시 true
});
```

### 7.2. 인라인 이벤트 핸들러

```html
<button
  id="button"
  onClick="alert(this === document.querySelector('#button'));"
>
  Button(클릭하면 alert 창에 true 출력됨)
</button>
```

그러나 인라인 이벤트 핸들러 안에서 함수를 호출하는 경우 `this`가 다른 값일 수 있다. 아래 예제에서는 단순 호출이므로 `this`는 전역 객체인 `window`이다. (화살표 함수를 사용한다면 `this`는 이벤트가 발생한 요소이다.)

```html
<button
  id="button"
  onClick="alert((function () { return this === window; })());"
>
  Button(클릭하면 alert 창에 true 출력됨)
</button>
```
