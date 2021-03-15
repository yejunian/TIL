# Gatsby

# 공식 튜토리얼 구성

- 0: 개발 환경 구성
- 1-3: 페이지, 컴포넌트, 레이아웃
- 4-7: 데이터 레이어
- 8: 빌드, 배포 준비

# 0. Set Up Your Development Environment

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

- 레이아웃 컴포넌트: 여러 페이지에 공통적으로 들어가는, 사이트의 구역
  - 예: header, footer, 사이드바, 탐색 메뉴

## 패턴

```jsx
// src/components/layout.jsx
export default function Layout({ children }) {
  return (
    <div { ...someProps }>
      <ComponentsBeforeChildren />
      {children}
      <ComponentsAfterChildren />
    </div>
  );
};
```

```jsx
// src/pages/index.jsx
export default function Home() {
  return (
    <Layout>
      <h1>Lorem Ipsum</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Layout>
  );
};
```

레이아웃 컴포넌트를 다중으로 감쌀 수도 있을 듯. (전체 레이아웃, 게시물 레이아웃, 게시물)

---

# 4. Data in Gatsby

[https://www.gatsbyjs.com/docs/tutorial/part-four/](https://www.gatsbyjs.com/docs/tutorial/part-four/)

- Gatsby의 데이터 레이어는 GraphQL로 구동된다. [How to GraphQL](https://www.howtographql.com/)
- 비구조적 데이터 vs GraphQL: 꼭 GraphQL을 쓸 필요는 없고, 작은 규모에서는 비구조적 데이터를 써도 괜찮다.

## 데이터 입력

- `gatsby-config.js`의 `module.exports.siteMetadata`에 데이터를 입력한다.
  - 데이터로 뭐가 들어갈 수 있는지는 GraphiQL 참고

```jsx
module.exports = {
  siteMetadata: {
    title: 'Lorem Ipsum',
  },
};
```

## 데이터 쿼리 및 사용

- 페이지 컴포넌트에 쿼리를 추가하고, 컴포넌트의 `props.data.site.siteMetadata`를 활용할 수 있다.
  - 어떤 쿼리를 할 수 있는지는 GraphiQL 참고

```jsx
import { graphql } from 'gatsby';

export default function Component({ data }) {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>You can see the title you wrote on gatsby-config.js</p>
    </div>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
```

## StaticQuery 사용하기

- 페이지가 아닌 컴포넌트(예: `Layout`)에서 GraphQL 쿼리로 데이터를 가져오는 방법: StaticQuery
  - `useStaticQuery` hook 사용

```jsx
import { useStaticQuery, graphql } from 'gatsby';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
    </div>
  );
};
```

---

# 5. Source Plugins and Rendering Queried Data

[https://www.gatsbyjs.com/docs/tutorial/part-five/](https://www.gatsbyjs.com/docs/tutorial/part-five/)

## Source Plugins (`gatsby-source-filesystem` 예제)

- `gatsby-source-filesystem` 설치

```plaintext
$ yarn add gatsby-source-filesystem
```

- `gatsby-config.js`의 `module.exports.plugins`에 플러그인 추가

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
  ],
};
```

- Gatsby 개발 서버를 재실행하고 GraphiQL을 다시 열면 쿼리 목록에서 `addFile`과 `file`을 확인할 수 있다.
- 파일의 어떤 정보를 가져올 수 있는지는 GraphiQL 열어서 참고

### 모든 파일 정보 가져오기

- 아래의 쿼리로 모든 파일 정보를 가져올 수 있다.

```graphql
query {
  allFile {
    edges {
      node {
        (가져오려는 정보)
      }
    }
  }
}
```

---

# 6. Transformer Plugins

[https://www.gatsbyjs.com/docs/tutorial/part-six/](https://www.gatsbyjs.com/docs/tutorial/part-six/)

- Source plugin만으로는 데이터를 가져오는 데 한계가 있다.
  - 예: `gatsby-source-filesystem` 플러그인으로는 파일 목록은 가져올 수 있지만 내용을 가져오지는 못한다.
- Transformer plugin: Source plugin으로 가져온 내용을 변형하는 플러그인
  - Source plugin에서 가져온 데이터를 사용 가능하도록 가공한다.

## `gatsby-transformer-remark` 예제(Markdown)

- `gatsby-transformer-remark` 설치

```
$ yarn add gatsby-transformer-remark
```

- `gatsby-config.js`에 플러그인 추가

```jsx
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
```

- Markdown 문서 작성: `src/pages/lorem-ipsum.md`
- 이후 아래의 쿼리로 모든 Markdown 파일의 정보와 내용을 가져올 수 있다.
  - 배열을 정렬하려면 아래와 같이 `sort` 옵션을 준다.

```graphql
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        (가져오려는 정보)
      }
    }
  }
}
```

- 이를 이용하여 모든 글의 정보를 표시하는 메인 페이지 `src/pages/index.js` 예제(`siteMetadata`와 `frontmatter`의 구조는 앞서 진행한 내용과 동일하다고 가정한다.)

```jsx
import { graphql } from 'gatsby';

export default function Home({ data }) {
  return (
    <>
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
      </header>
      <main>
        <h2>{data.allMarkdownRemark.totalCount} Posts</h2>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>[{node.frontmatter.date}] {node.frontmatter.title}</h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          excerpt
        }
      }
    }
  }
`;
```

---

# 7. Programmatically Create Pages from Data

[https://www.gatsbyjs.com/docs/tutorial/part-seven/](https://www.gatsbyjs.com/docs/tutorial/part-seven/)

- 데이터로 페이지를 프로그래밍으로(programmatically) 생성하는 방법
- 쿼리 결과(데이터)를 페이지로 매핑한다. (“query your *data* and *map* the query results to *pages*”)

## 페이지의 Slug 만들기

- Slug: 웹 주소의 고유한 식별부. URL에서 호스트 이후의 부분. Path라고도 한다.
  - `https://www.gatsbyjs.com/docs/tutorial/part-seven/`의 `/docs/tutorial/part-seven`
- 새 페이지 만드는 방법 2단계
  1. 페이지의 slug 생성
  2. 페이지 생성
  - `onCreateNode`, `createPages` 사용: `gatsby-node.js`에서 함수를 작성하여 해당 이름으로 내보낸다. Gatsby는 노드가 추가·변경될 때 이 함수를 호출한다.

```jsx
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
```

## 페이지 만들기

직접 해 봐야 알 것 같음.

- `gatsby-node.js`에 아래 내용을 추가한다.
  - 페이지를 생성할 때 `context.slug`를 세팅하는 이유는, 페이지 쿼리에서 GraphQL 변수로 사용할 수 있게 하기 위해서다.

```jsx
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      },
    });
  });
}
```

---

# 추가 참고 자료

- [https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/#create-static-pages-using-gatsbys-nodejs-createpage-api](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/#create-static-pages-using-gatsbys-nodejs-createpage-api)

계속...
