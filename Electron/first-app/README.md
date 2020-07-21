# First App

[첫 번째 Electron 앱 만들기](https://www.electronjs.org/docs/tutorial/first-app) 튜토리얼을 참고하여 진행했습니다.

## 초기 세팅

### init

엔트리 포인트만 `main.js`로 지정했다.

```shell
$ mkdir first-app
$ cd first-app
$ yarn init
yarn init v1.21.1
question name (first-app):
question version (1.0.0):
question description: My first Electron application
question entry point (index.js): main.js
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
✨  Done in 29.69s.
$ code .
```

### Electron 설치

```shell
$ yarn add --dev electron
```

## 앱 내용 작성

- `main.js`의 역할
  - 창 생성
  - 애플리케이션에서 발생한 시스템 이벤트 처리

예제는 `main.js`, `index.html` 참고.

## 앱 실행

```shell
$ yarn start
```

앱이 실행되면 `main.js`에서 작성한 대로 창이 하나 생기고 `index.html`이 표시된다.

## 다음에 해 볼 것들

- 빌드해서 바이너리(?) 뽑아 보기
- React 붙이기
