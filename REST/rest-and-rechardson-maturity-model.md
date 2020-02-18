# REST와 Richardson 성숙도 모델(Richardson Maturity Model)

## REST

- **Re**presentational **S**tate **T**ransfer
- 자원을 이름으로 구분하여 그 자원의 상태를 주고받는 것.
- 자원(resource)과 행위(verb)와 표현(representation)으로 구성된다.
- HTTP 기반 RESTful API에서는 HTTP URI를 통해 자원을 나타내고, HTTP 메서드를 통해 그 자원에 대한 행위를 나타내어 자원의 표현을 주고받는다.

### REST의 특징

- Client-Server
- Stateless
- Cache
- Uniform Interface
  - Identification of Resources
  - Manipulation of Resources through Representation
  - Self-Descriptive Message
  - Hypermedia as the Engine of Application State
- Layered System

----

## 리처드슨 성숙도 모델(Richardson Maturity Model)

리처드슨 성숙도 모델은 REST의 주요 요소를 세 단계로 나타낸 모델이다.

### Level 0: The Swamp of POX (Plain Object XML)

HTTP를 원격 상호작용을 위한 전송 시스템으로 사용한다. 서비스를 제공하는 쪽에서는 리소스 구분 없이 약속된 URI로 하나의 엔드포인트를 제공하고, 사용자는 그 엔드포인트로 요청에 대한 내용을 담아 보내는 식으로 상호작용이 이루어진다.

### Level 1: Resources

각 리소스마다 URI를 부여한다. 이 단계에서 사용자는 모든 요청을 하나의 엔드포인트로 보내는 게 아니라, 각 리소스로 보낸다.

### Level 2: HTTP Verbs

HTTP의 설계에 맞게 HTTP 메서드를 사용한다. 자원에 대한 CRUD(Create/Read/Update/Delete) operation을 위해서 각각 POST, GET, PUT, DELETE 메서드를 사용한다.

### Level 3: Hypermedia Controls

Hypermedia as the Engine of Application State(HATEOAS)를 도입한다. 클라이언트 쪽에서 응답을 받은 뒤 어떤 행동을 해야 할지 알 수 있게 해 준다.

REST를 제안한 Roy Fielding은 이 단계가 REST의 선행조건이라고 했다고 한다. 그렇다면... 내가 지금까지 만든 REST는 2단계까지만 구현했기 때문에 완벽한 REST는 아니다!

구글 검색을 통해 자료를 찾아보니, 3단계까지 구현한 경우는 그렇게 많지 않다고 하는 것 같다. HATEOAS의 장단점을 분석한 글을 보니, REST에서의 HATEOAS의 단점이 장점을 가려 버리는 상황에서는 2단계까지만 구현하는 것이 좋을 것 같다.

----

## 참고한 자료

- [REST API 제대로 알고 사용하기](https://meetup.toast.com/posts/92)
- [REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
- [바쁜 개발자들을 위한 REST 논문 요약](https://blog.npcode.com/2017/03/02/%EB%B0%94%EC%81%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-rest-%EB%85%BC%EB%AC%B8-%EC%9A%94%EC%95%BD/)
- [Richardson 성숙도 모델](https://brunch.co.kr/@pubjinson/12)
- [HATEOAS - The Good, the Bad and the Ugly](https://pulsejet.github.io/blog/posts/hateoas/)

## 더 읽어 보면 좋을 것 같은 자료

- [GraphQL과 RESTful API](https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/)
  - [GraphQL](https://graphql.org/)은 [단일 엔드포인트를 권장하고, 리소스는 URI가 아니라 쿼리를 통해 나타낸다.](https://medium.com/@FourwingsY/graphql%EC%9D%84-%EC%98%A4%ED%95%B4%ED%95%98%EB%8B%A4-3216f404134)
