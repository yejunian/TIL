# 상속(ES3)

책을 보면서 내용을 이해하기 위해 따라 쓰다 보니, TIL이라기보단 공부 노트나 연습장 같은 게 되어 버렸다.

더글라스 크락포드는 "JavaScript: The Good Parts"에서 상속 방법을 다음 네 가지로 설명한다.

1. Pseudoclassical
2. Object Specifiers (객체를 기술하는 객체)
3. 프로토타입 방식
4. 함수를 사용한 방식

## 1. Pseudoclassical

### 선행 지식(Pseudoclassical)

#### 함수 객체의 생성

함수 객체가 만들어질 때, 함수를 생성하는 Function 생성자는 `prototype`에 새로운 함수 객체를 값으로 갖는 `constructor` 프로퍼티를 추가한다.

무슨 말인지 잘 이해가 되지 않으면, 다음과 같이 아무 함수를 만들고, 그 함수의 `prototype`의 `constructor` 프로퍼티와 자기 자신을 비교해 보면 바로 알 수 있을 것이다.

```javascript
> var f = function() {}
undefined
> f.prototype.constructor === f
true
```

#### `new` 연산자

자바스크립트의 `new` 연산자는 함수 실행 방법을 변경한다.

1. 생성자 함수의 프로토타입을 상속받는 새 객체 생성
2. `this`를 새 객체에 바인딩하면서 생성자 함수 호출
3. 생성자 함수의 결과가 객체가 아니면 새 객체 반환

### 상속 방법(Pseudoclassical)

이 방법은 다음과 같은 순서로 진행된다.

1. Parent object 생성자 정의
2. Child object 생성자 정의 및 상속

#### (1) Parent object 생성자 정의

```javascript
var Parent = function(name) {
  this.name = name;
};

Parent.prototype.get_name = function() {
  return this.name;
};

Parent.prototype.greet = function() {
  if (typeof this.greeting !== 'string' || this.greeting === '') {
    return 'Hell, ' + this.name + '!';
  }
  return this.greeting + ', ' + this.name + '!';
};
```

인스턴스 생성 테스트

```javascript
> var myParent = new Parent('parent51456')
undefined
> myParent.get_name()
'parent51456'
> myParent.greet()
'Hell, leeye51456!'
```

#### (2) Child object 생성자 정의 및 상속

```javascript
// Child object의 생성자 정의
var Child = function(name) {
  this.name = name;
  this.greeting = 'Hello';
};

// Child.prototype을 Parent의 새 인스턴스로 대체하여 상속받기
Child.prototype = new Parent();

Child.prototype.sleep = function(n) {
  var i, s = '';
  if (n === Infinity) {
    return 'sleeping...';
  }
  for (i = 0; i < n; i += 1) {
    s += 'z';
  }
  return s + '...';
};

Child.prototype.get_name = function() {
  return this.name + ': ' + this.greet();
};
```

인스턴스 생성 테스트

```javascript
> var myChild = new Child('child51456')
undefined
> myChild.greet()
'Hello, child51456!'
> myChild.sleep(5)
'zzzzz...'
> myChild.get_name()
'child51456: Hello, child51456!'
```

### 문제점(Pseudoclassical)

- 다른 객체지향 언어와 비교하여 이상하다.
- 외부에서 모든 프로퍼티에 접근할 수 있다.
- 부모의 메서드에 접근할 수 없다.
- `new` 연산자를 빼먹으면 의도하지 않은 방식으로 작동할 수 있다.
  - 생성자 함수의 `this`가 전역 객체와 연결된다.
  - 어떠한 경고도 발생하지 않는다.

---

## 2. Object Specifiers (객체를 기술하는 객체)

함수가 지나치게 많은 매개변수를 갖는 경우, 인수의 순서를 일일이 맞추기 어렵다. 생성자가 여러 인수 대신에, **새 객체에 들어갈 정보를 담은 객체 하나**를 받게 하면 사용하기 좋다.

```javascript
var httpRequest = newHttpRequest({
  method: m,
  uri: u,
  headers: h,
  body: b
});
```

### 장점(Object Specifiers)

- 인수의 순서를 신경 쓰지 않아도 된다.
- 생성자가 기본값을 잘 만들어 준다면 일부 인수를 생략할 수도 있다.

### 질문(Object Specifiers)

주석이나 문서 등의 부가적인 설명 없이는 specifier에 어떤 프로퍼티를 포함해야 하는지를 곧바로 알기 어려울 것 같은데(less self-descriptive), 정말 더 편리한 방법인가? 이렇게 하면 오히려 인터페이스만 보고 함수를 정상적으로 호출하기 어려울 것 같다.

---

## 3. 프로토타입 방식

이 방법은 다음과 같은 순서로 진행된다.

1. 유용한 객체 생성
2. 이와 유사한 객체 생성

### (1) 유용한 객체 생성

```javascript
var myParent = {
  name: 'parent51456',
  get_name: function() {
    return this.name;
  },
  greet: function() {
    if (typeof this.greeting !== 'string' || this.greeting === '') {
      return 'Hell, ' + this.name + '!';
    }
    return this.greeting + ', ' + this.name + '!';
  }
};
```

유용한 객체를 생성한 뒤, `Object.create` 메서드를 이용하여 이 객체의 다른 인스턴스를 만들 수 있다.

### (2) 유사한 객체 생성

유용한 객체를 생성하고 `Object.create` 메서드로 인스턴스를 새로 생성한 뒤, 새 인스턴스를 원하는 대로 변경할 수 있다.

```javascript
var myChild = Object.create(myParent);
myChild.name = 'child51456';
myChild.greeting = 'Hello';
myChild.sleep = function(n) {
  var i, s = '';
  if (n === Infinity) {
    return 'sleeping...';
  }
  for (i = 0; i < n; i += 1) {
    s += 'z';
  }
  return s + '...';
};
```

### 문제점(프로토타입 방식)

- private 프로퍼티를 가질 수 없다. 이 문제는 바로 다음에 설명할 '함수를 사용한 방식'으로 해결할 수 있다.

---

## 4. 함수를 사용한 방식

### 템플릿(함수를 사용한 방식)

```javascript
var /* (소문자로 시작하는)생성자 함수 이름 */ = function(spec, my) {
  var that, /* private 변수 */;
  my = my || {};

  // 상속 연결상에서 생성자와 공유할 변수와 함수를 my에 추가
  // my.member = value;

  that = /* 새로운 객체 생성 */;

  // 앞서 정의한 변수들에 접근할 권한이 있는 메서드를 that에 추가
  // var method = function() {
  //   // ...
  // };
  // that.method = method; // 이렇게 하면 that.method가 변경되어도 method는 유지되므로, 다른 메서드에서 method를 호출해도 변경이 없음

  return that;
};
```

- 생성자 함수 이름은 소문자로 시작하도록 작성한다.
  - 꼭 그렇게 하지 않아도 동작에는 문제가 없지만, 함수 이름을 보고 실수로 `new` 연산자와 함께 호출할 위험이 있다.
- `spec` 객체에는 새로운 객체에 담을 내용이 들어간다.
  - '2. Object Specifiers' 부분에서 본 내용인 듯.
- [선택사항] `my` 객체는 상속 연결상에서 생성자와 공유하게 되는 내용을 담는다. (?)
  - 이 부분은 책에 예제가 안 나와 있다. 상속되는 부분의 코드를 보고 이해해야 할 듯.
- 새로운 객체를 원하는 방법으로 만든다.
  - 객체 리터럴
  - `new` 연산자와 함께 생성자 함수 호출
  - `Object.create` 메서드 사용
  - 객체를 반환하는 함수 호출
- private 변수에 접근할 수 있는 메서드를 `that`에 추가한다.

### 예제(함수를 사용한 방식)

#### 1. 부모 객체

```javascript
var parent = function(spec) {
  var that = {};

  that.get_name = function() {
    return spec.name;
  };

  that.greet = function() {
    if (typeof spec.greeting !== 'string' || spec.greeting === '') {
      return 'Hell, ' + spec.name + '!';
    }
    return spec.greeting + ', ' + spec.name + '!';
  };

  return that;
};

var myParent = parent({name: 'parent51456'});
```

- 질문: 여기서 `spec`에 이미 만들어 둔 (mutable한)객체를 주면?

```javascript
> var mySpec = {name: 'mutable51456'};
undefined
> var myParent2 = parent(mySpec);
undefined
> myParent2.get_name()
'mutable51456'
> mySpec.name = 'what??'
'what??'
> myParent2.get_name()
'what??'
```

#### 2. 자식 객체

```javascript
var child = function(spec) {
  if (typeof spec.greeting !== 'string' || spec.greeting === '') {
    spec.greeting = 'Hello';
  }

  var that = parent(spec);

  that.sleep = function(n) {
    var i, s = '';
    if (n === Infinity) {
      return 'sleeping...';
    }
    for (i = 0; i < n; i += 1) {
      s += 'z';
    }
    return s + '...';
  };
  that.get_name = function() {
    return spec.name + ': ' + that.greet();
  };

  return that;
};
```

### 부모의 메서드에 접근하기(Super)

먼저, 메서드의 이름을 받아서 그 메서드를 실행하는 함수를 돌려주는 `superior` 함수를 만든다.

```javascript
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

Object.method('superior', function(name) {
  var that = this,
    method = that[name];
  return function() {
    return method.apply(that, arguments);
  };
});
```

[super (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super): 찾아보니까, 이런 게 있다. 물론 class와 함께 ES6부터 생겼다.

#### 예제(부모의 메서드에 접근하기)

```javascript
var advancedChild = function(spec) {
  var that = child(spec),
    super_get_name = that.superior('get_name');

  that.get_name = function() {
    return spec.name + ' (' + super_get_name() + ')';
  };

  return that;
};
```

테스트

```javascript
> var myAdvancedChild = advancedChild({name: 'advanced51456'})
undefined
> myAdvancedChild.get_name()
'advanced51456 (advanced51456: Hello, advanced51456!)'
```

### 장점

- 상속받는 쪽에서는 자신에게 추가되는 것만 신경 쓰면 된다.
- Pseudoclass 패턴에 비해 작업량이 적다. (이건 어느 정도 써 봐야 알 것 같다.)
- 캡슐화, 정보 은닉 가능성
- 상위 객체의 메서드에 접근할 수 있다.
