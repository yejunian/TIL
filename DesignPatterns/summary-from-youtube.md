# 객체지향 디자인 패턴 질문·메모

- **세부 내용을 공부하면서 각 패턴에 대한 내용을 각 파일로 기록하고, 여기에도 내용을 업데이트할 것.**
- 뒤로 갈수록 메모에 성의가 없어지는 것 같은 느낌...

## 참고 영상

- [얄팍한 코딩사전, 객체지향 디자인패턴 1](https://www.youtube.com/watch?v=lJES5TQTTWE)
  - Singleton
  - Strategy
  - State
  - Command
  - Adapter
  - Proxy
- [얄팍한 코딩사전, 객체지향 디자인패턴 2](https://www.youtube.com/watch?v=q3_WXP9pPUQ)
  - Facade
  - Template-Method
  - Decorator
  - Factory-Method
  - Abstract-Factory
  - Mediator
  - Composite

## Singleton

- Singleton 인스턴스를 가져오는 메서드(생성한 적이 없으면 생성하고, 생성한 적이 있으면 가져오는 메서드)에서 race condition이 발생할 수 있지 않나?

```java
class Singleton {
    private static Singleton instance = null;
    private Singleton() {}
    public Singleton getInstance() {
        if (instance == null) { //////////// (1)
            instance = new Singleton(); //// (2)
        }
        return instance; /////////////////// (3)
    }
}
```

| Singleton Instance | Thraed 1                | Thread 2                |
| ------------------ | ----------------------- | ----------------------- |
| null               | (1) null check          |                         |
| null               |                         | (1) null check          |
| Singleton (A)      | (2) make a new instance |                         |
| Singleton (A)      | (3) return the instance |                         |
| Singleton (B)      |                         | (2) make a new instance |
| Singleton (B)      |                         | (3) return the instance |

- 그렇다면 thread-safe한 singleton을 구현하는 방법은?
  - 단순히 getInstance 메서드에 synchronized 키워드를 붙이면 해결은 되는데 오버헤드 발생.
  - 처음부터 singleton 인스턴스를 생성해 두면 해결은 되는데 리소스를 불필요하게 낭비할 수 있다.
  - 영상에서 언급하기를, 검색해 봐라...

-----

## Strategy

- 함수를 일급객체로 다루는 언어(예: JavaScript)에서는 객체를 갈아 끼우는 대신 함수를 갈아 끼울 수 있을 것 같다. 근데 함수를 갈아 끼우려면 결국 if-else-if 체인이 생겨야 하지 않을까?
  - 그럼 함수를 갈아 끼우지 말고, 함수가 담긴 객체를 갈아 끼우면 되지 않을까?
  - { func: () => ... }

-----

## State, Command

- 이 둘은 strategy 패턴과 비슷한데 목적이 다름. 이름 그대로.
  - Strategy: 객체를 갈아 끼워서 다른 동작을 하게 함. (얘는 정확히 뭐라고 해야 하나... 세부 내용을 공부하면서 내용 보충해야 할 듯.)
  - State: ‘상태’에 따라 다른 동작을 하게 함.
  - Command: ‘명령’의 종류에 따라 다른 동작을 하게 함.

-----

## Adapter

- 인터페이스를 맞춰 주는 역할. 특히 프로젝트의 인터페이스와 가져온 모듈의 인터페이스가 맞지 않을 때...
- C/C++에서 매크로로 만든 비슷한 패턴을 본 적이 있음.

-----

## Proxy

- 무거운 데이터를 가지고 있거나 무거운 작업을 하는 객체의 lazy loading(?) 목적으로 사용.
- 초기에는 proxy 객체의 데이터를 사용하다가, 무거운 데이터를 로드하는 요청이 들어와야 본체(?) 객체 생성.
- 필요할 때에만 무거운 데이터 로드할 수 있음.

----

## Facade

- 일련의 행동을 모아 놓기.
- 긴 코드에서 메서드를 분리해 내면서 많이 적용해 봤을 것.

-----

## Template-Method

- 세부 작업 갈아 끼우기. Strategy 패턴과 비슷해 보이는데, 좀 다름.
  - Strategy 패턴에서는 인터페이스를 상속해서 메서드를 구현하는 방식으로 해당 동작 전체를 바꾸고,
  - Template-method 패턴에서는 추상 클래스를 상속하고 추상 메서드를 오버라이딩하는 방식으로 전반 과정 중 일부 동작을 바꿈.
- 메인 메서드: 세부 메서드를 호출하면서 전반 과정 수행(부모 클래스에서 구현)
- 세부 메서드: 자식 클래스에서 오버라이딩하여 내용 작성(부모 클래스에서는 추상 메서드)

-----

## Decorator

- 객체를 생성자 인수로 다른 객체 안에 넣어서, 메서드의 행동 추가.

-----

## Factory-Method

- 사용 시 이점
  - 클래스 생성자 매개 변수를 변경했을 때 일일이 호출한 곳을 찾아서 변경할 필요 없이 팩토리 메서드 내용만 변경하면 된다.
  - 조건에 따라 객체를 가져오는 일을 팩토리 클래스에 위임.

-----

## Abstract-Factory

- 팩토리 메서드 패턴을 한 단계 더 추상화.
- 예: 컴포넌트 팩토리를 추상화하여, 테마마다 팩토리 클래스를 만들 수 있게 함.

-----

## Mediator

- Mediator에는 listener를 등록하고, mediator를 관리하는 클래스에서는 관련 이벤트가 발생할 때 mediator의 메서드 호출.
- 여러 클래스의 관계가 특정 이벤트를 중심으로 복잡하게 얽혀 있는 경우 유용.

-----

## Composite

- 포함하는 것과 포함되는 것을 같은 방식으로 다룰 수 있을 때 사용.
- 예: 파일과 폴더
