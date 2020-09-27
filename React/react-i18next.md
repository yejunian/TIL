# React 프로젝트에 i18next 적용하기(react-i18next)

## 배경

React에 좀 더 익숙해지기 위해 [multi-counter](https://github.com/leeye51456/multi-counter)를 만들던 중, 아래 두 가지를 해 보고 싶었다.

1. String이 각 컴포넌트 파일에 흩어져 있는 것을 한 곳에 모으고 싶었다.
2. 모든 string을 영어로 작성했는데, 한국어 string도 추가해 보고 싶었다.

이 두 가지를 한번에 해결할 방법을 고민했다. 1번은 단순히 string을 한 곳에 모으는 방식으로 해결할 수 있을 거라고 생각했다. 2번은 언어별로 따로 빌드한다든지, `navigator`를 이용하여 언어를 감지하여 표시한다든지 하는 방식을 생각해 봤다. 그리고 어디서 “i18n (internationalization)”이라고 들어 본 건 있어서 “React i18n” 같은 검색 키워드로 검색을 하다가 [`react-i18next`](https://react.i18next.com/)를 이용하는 방법 쪽으로 생각이 기울었다.

-----

## 초기 적용

먼저, `react-i18next`를 프로젝트에 추가했다.

```shell
$ yarn add react-i18next i18next
```

`src/i18n.js`, [`src/locales/en.json`](https://github.com/leeye51456/multi-counter/blob/1.2.1/src/locales/en.json)을 작성했다. (아래는 `src/i18n.js`의 초기 내용이고, `src/locales/en.json`의 내용은 [실제 파일](https://github.com/leeye51456/multi-counter/blob/1.2.1/src/locales/en.json) 참고)

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';

const resources = {
  en: {
    translation: translationEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: "en",

    interpolation: {
      escapeValue: false, // https://react.i18next.com/guides/quick-start#configure-i-18-next
    },
  });

export default i18n;
```

`src/index.js`에 `src/i18n.js`를 import했다.

```js
// ...
import './i18n';
// ...
```

그리고 string이 들어갈 각 컴포넌트에 translation을 적용했다. [multi-counter](https://github.com/leeye51456/multi-counter)에서는 컴포넌트를 class로 작성했기 때문에 [`withTranslation`](https://react.i18next.com/latest/using-with-hooks#using-the-withtranslation-hoc)을 이용했다. [`src/shortcut-capture-form.jsx`](https://github.com/leeye51456/multi-counter/blob/1.2.1/src/shortcut-capture-form.jsx)에 기본적인 형태가 나타나 있다.

- 2행의 `import { withTranslation } from 'react-i18next';`와 91행의 `export default withTranslation()(ShortcutCaptureForm);`
- 30행, 52행의 `const { t } = this.props;`와 32, 34, 36행, 66, 72행의 `t(key)`

한편, ref를 사용한 경우 이대로만 변경하면 제대로 작동하지 않는다. [`withTranslation`을 적용할 때 옵션 인수를 주어서 ref가 제대로 작동하게 조치했다.](https://github.com/leeye51456/multi-counter/blob/1.2.1/src/number-input.jsx#L98)

-----

## 한국어 및 언어 자동 감지 추가

이어서 [`src/locales/ko.json`](https://github.com/leeye51456/multi-counter/blob/1.2.1/src/locales/ko.json)을 추가로 작성하고, `src/i18n.js`를 다음과 같이 수정했다.

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';
import translationKo from './locales/ko.json';

const resources = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

하지만 이렇게만 작성하면 영어로만 나온다. `navigator`를 이용하여 자동으로 지정할 수도 있지만, 언어 변경 기능을 추가할 것을 대비하여 `react-i18next` 공식 문서 중 [Step by step guide](https://react.i18next.com/latest/using-with-hooks)에 나온 `i18next` 언어 감지 플러그인인 [`i18next-browser-languagedetector`](https://www.npmjs.com/package/i18next-browser-languagedetector)를 써 보기로 했다.

```shell
$ yarn add i18next-browser-languagedetector
```

`src/i18n.js`를 다음과 같이 수정했다.

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from './locales/en.json';
import translationKo from './locales/ko.json';

const languageDetectorOptions = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lang',
};

// ...

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: 'en',
    detection: languageDetectorOptions,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

이 상태로 실행하면 querystring → navigator 우선순위로 언어를 감지한다. querystring을 따르도록 설정하면 기본적으로는 `lng` attribute를 찾아 감지하지만, 여기서는 `lang` attribute를 감지하도록 변경했다(`lookupQuerystring`).

- [https://leeye51456.github.io/multi-counter/](https://leeye51456.github.io/multi-counter/): querystring이 없으므로 navigator의 언어 우선순위를 따른다.
- [https://leeye51456.github.io/multi-counter/?lang=en](https://leeye51456.github.io/multi-counter/?lang=en): querystring을 navigator보다 먼저 판별한다. `lang` attribute가 `en`이므로 영어로 표시된다. `en`이 아니라 `ko`를 넘겼다면 한국어로 표시된다. 지원하지 않는 언어를 넘기면 `fallbackLng`으로 지정한 언어로 표시된다.

-----

## 참고한 자료

- [국제화 라이브러리 사용하기](https://velog.io/@sss5793/%EA%B5%AD%EC%A0%9C%ED%99%94-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [react-i18next documentation](https://react.i18next.com/)
  - [Quick start](https://react.i18next.com/guides/quick-start)
  - [Step by step guide](https://react.i18next.com/latest/using-with-hooks)
  - [withTranslation (HOC)](https://react.i18next.com/latest/withtranslation-hoc)
- [i18next-browser-languagedetector](https://www.npmjs.com/package/i18next-browser-languagedetector)
