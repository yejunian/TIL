# JavaScript 함수 정의

## 자료

- https://github.com/airbnb/javascript#functions--declarations
- https://github.com/airbnb/javascript/issues/794
- https://ko.javascript.info/function-object

-----

Airbnb에서는 함수를 정의할 때 함수 선언문보다는 기명 함수를 이용한 함수 표현식을 쓰도록 [권고](https://github.com/airbnb/javascript#functions--declarations)한다.

그 이유는 함수 선언의 호이스팅이 (정의되기 전에 쉽게 참조할 수는 있지만) 가독성과 유지보수성을 해치기 때문이다([세 번째 자료](https://ko.javascript.info/function-object) 참고).

(기명 함수 표현식을 사용해서 얻는 기본적인 이득은 세 번째 자료 링크 참고)

두 번째 자료 링크(토론)에서는 함수를 위처럼 선언했을 때 디버깅 상황에서의 이점이 언급된다.

익명 함수나 함수 선언문을 사용하면 함수의 실제 이름과 호출할 때 사용하는 이름이 같으므로, 실제 정의부를 찾을 때 비용이 커질 수 있다. 함수의 정의가 파일의 다른 부분의 이해를 방해할 정도로 크거나 복잡하다면, 그 함수를 모듈로 뽑아 내야 한다. 이런 상황에서 뽑아 낸 함수가 함수 선언문이나 익명 함수를 이용한 함수 표현식으로 정의되어 있다면, 그 함수의 이름을 포함하는 파일을 찾을 때 정의하는 부분과 호출하는 부분이 결과에 모두 포함된다.

한편, 고유한 이름이 붙은 기명 함수 표현식을 사용하면 실제 정의부를 더 쉽게 찾을 수 있다.
