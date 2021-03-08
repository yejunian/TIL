# Gatsby

# 0. 개발 환경 구성

[https://www.gatsbyjs.com/docs/tutorial/part-zero/](https://www.gatsbyjs.com/docs/tutorial/part-zero/)

## 설치

Global scpoe로 `gatsby-cli`를 설치하고, 도움말을 실행하여 잘 설치되었는지 확인한다.

```plaintext
$ yarn global add gatsby-cli
$ gatsby --help
```

### 패키지 매니저 설정(Yarn)

`~/.config/gatsby/config.json`의 `cli.packageManager`를 `"yarn"`으로 변경한다.

```json
{
  "cli": {
    "packageManager": "yarn"
  }
}
```

## 스타터를 이용한 Gatsby 사이트 생성

```plaintext
$ gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
$ cd hello-world
```

- `new`: 새 Gatsby 프로젝트를 생성하는 gatsby 명령어
- `hello-world`: 생성할 프로젝트 이름
- `https://github.com/gatsbyjs/gatsby-starter-hello-world`: 스타터 저장소

## 개발 모드 실행

```plaintext
$ gatsby develop
```

- `http://localhost:8000/`을 열어서 개발 중인 내용을 볼 수 있다.
- 내용이 변경되면 자동으로 반영된다.

---

# 1. Gatsby Building Block

[https://www.gatsbyjs.com/docs/tutorial/part-one/](https://www.gatsbyjs.com/docs/tutorial/part-one/)

## 페이지 컴포넌트

- `src/pages/{path}.js`는 `/{path}/`로 연결된다.
- 예를 들어서 `src/pages/hello/world.js`를 작성하고 개발 모드에서 `http://localhost:8000/hello/world/`를 열면 해당 내용을 볼 수 있다.

## 서브 컴포넌트

- 서브 컴포넌트는 `src/components/` 디렉터리 아래에 작성한다.

## 레이아웃 컴포넌트

- 복수의 페이지를 같은 레이아웃으로 만들기 위한 컴포넌트
- `src/components/` 디렉터리 아래에 작성한다.
- 반복되는 내용을 레이아웃 컴포넌트에 미리 작성해 두고, 바뀌는 내용을 `children`으로 넘긴다.
  - 반복되는 내용의 예: header, footer
  - 바뀌는 내용의 예: 블로그 게시물

## `<Link />` 컴포넌트

- `<a>` 엘리먼트와의 차이점: `<a>` 엘리먼트는 `href` attribute의 페이지를 새로 요청하여 렌더링하지만, `<Link />` 컴포넌트는 `to` prop의 페이지를 변경 사항만 교체하여 렌더링한다.

## Gatsby 사이트 배포

### 빌드

```plaintext
$ gatsby build
```

- 서버나 DB 없이 Gatsby의 `build` 명령어로, (정적 사이트 호스팅 서비스에 배포할 수 있는) 정적 HTML, JS 파일 등으로 구성된 디렉터리를 생성한다.
- 생성된 `public` 디렉터리를 열어 보니, 각 엔드포인트마다 `index.html` 파일이 있다. `<Link />` 컴포넌트로 만든 링크에는 클릭 이벤트 핸들러가 달려 있고, 클릭하면 JS 파일을 로드하는 것으로 보아 필요한 부분만 교체하는 것으로 보인다.

### 최근 빌드한 내용으로 서버 열기

```plaintext
$ gatsby serve
```

- `http://localhost:9000/`을 열어서 최근 빌드한 내용을 볼 수 있다.

### 배포

- 공식 문서에서는 빌드 후 Surge로 배포하는 예제가 나와 있다.
- GitHub Pages로 배포하려면 `[gh-pages](https://www.npmjs.com/package/gh-pages)`를 활용해서 배포하고, 저장소 설정에서 GitHub Pages 소스를 `gh-pages` 브랜치의 루트로 설정하면 될 듯.

---

# 2. Introduction to Styling in Gatsby

[https://www.gatsbyjs.com/docs/tutorial/part-two/](https://www.gatsbyjs.com/docs/tutorial/part-two/)

## 글로벌 스타일

- 글로벌 스타일은 `src/styles/global.css` 파일을 작성하고 프로젝트 루트의 `gatsby-browser.js`에 `./src/styles/global.css`를 임포트하여 반영할 수 있다.

```jsx
require('./src/styles/global.css');
```

## 컴포넌트 스코프 CSS

- [CSS 모듈](https://github.com/css-modules/css-modules)을 사용한다.
- CSS를 작성하려는 컴포넌트와 같은 디렉터리에 `{component-name}.module.css` 파일을 작성하고, 해당 컴포넌트(`{component-name}.jsx`)에 다음과 같이 CSS를 임포트한다.

```jsx
import * as styles from './{component-name}.module.css';
```

- 이후 `styles.{class-name}`으로 CSS에 정의된 클래스명을 가져올 수 있다.

---

# 3. Creating Nested Layout Components

[https://www.gatsbyjs.com/docs/tutorial/part-three/](https://www.gatsbyjs.com/docs/tutorial/part-three/)

계속...
