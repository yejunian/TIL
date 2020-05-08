# Tailwind CSS (작성 중)

## 설치

```shell
$ npm install tailwindcss
$ yarn add tailwindcss
```

## CSS에 Tailwind 추가

css 파일에서

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

## Tailwind 설정 파일 만들기

```shell
$ npx tailwindcss init
```

프로젝트 루트에 `tailwind.config.js` 파일이 initial structure로 생성됨(세팅 내용 비어 있음).

## Tailwind CLI를 이용한 빌드

```shell
$ npx tailwindcss build style.css -o output.css
```

style.css를 빌드한 결과물을 output.css라는 이름으로 생성.

```shell
$ npx tailwindcss help build
```

다른 빌드 옵션 보기.

## 기본적인 적용

`class` attribute에 정해진 클래스 이름을 나열하여 스타일 적용.

너무 길거나 중복이 많다면(예: 동일한 여러 컴포넌트에 적용) `@apply`로 묶을 수 있음. css 파일에서

```css
.component-name {
  @apply class-name-a class-name-b;
}
```

## 반응형 디자인

- 아래 순서로 정의되어 있음.
  - `sm`: Small, 너비 640px 이상
  - `md`: Medium, 너비 768px 이상
  - `lg`: Large, 너비 1024px 이상
  - `xl`: Extra Large, 너비 1280px 이상
- 그러니까, 작은 기기 먼저 클래스를 먹여야 제대로 들어감(all → sm → md → lg → xl 순서).
  - 아래 예제에서는 너비가 768px 미만이면 `w-16`, 768px 이상 1024px 미만이면 `w-32`, 1024px 이상이면 `w-48` 클래스 적용.

```html
<img class="w-16 md:w-32 lg:w-48" src="...">
```

- 중간 크기에만 적용하고 싶다면, 거기서 적용한 내용을 바로 다음 breakpoint에서 취소.
  - 아래 예제에서는 너비가 768px 이상 1024px 미만일 때만 빨간색.

```html
<div class="bg-teal-500 md:bg-red-500 lg:bg-teal-500"></div>
```

- Breakpoint 커스터마이징
  - `tailwind.config.js`에서 `theme`에 `screens: {'name': 'min-width value', ...}` 형태로 작성

```js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px', // @media (min-width: 640px) {...}
      'laptop': '1024px', // @media (min-width: 1024px) {...}
      'desktop': '1280px', // @media (min-width: 1280px) {...}
    },
  },
};
```

## Extracting Components

- 버튼 등 여러 번 쓰이는 작은 요소에 일일이 클래스를 적용하면 중복이 많아짐.
- 복잡한 컴포넌트를 뽑아내기 위해 CSS 클래스에 의존하지 말 것. Tailwind CSS를 쓰는 의미가 퇴색됨.

### 컴포넌트 뽑아내는 방법

- 템플릿을 부분적으로 만들거나 JavaScript 컴포넌트로 만들기(예: React 컴포넌트).
- `@apply` 디렉티브를 활용하여 CSS 컴포넌트 뽑아내기.
  - 공통 유틸리티 패턴을 CSS 컴포넌트 클래스로 추출.

```css
.btn {
  @apply font-bold py-2 px-4 rounded;
}
```

- 커스텀 컴포넌트 클래스를 유틸리티보다 먼저 작성.
  - 임의로 정의한 컴포넌트 클래스는 `@tailwind utilities;`보다 앞에 와야 함.

```css
@tailwind base;

@tailwind components;

.btn {
  @apply font-bold py-2 px-4 rounded;
}

@tailwind utilities;
```
