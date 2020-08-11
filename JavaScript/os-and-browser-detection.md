# OS 및 브라우저 감지

웹 브라우저 JavaScript에는 user agent의 상태와 identity를 나타내는 `Navigator` 인터페이스가 있다. 이 `Navigator` 인터페이스는 `window.navigator`로 접근할 수 있다. 여기에는 사용 중인 운영체제나 웹 브라우저 등의 정보가 들어 있다. `Navigator` 인터페이스를 활용하면 사용자의 환경에 따라 웹 페이지가 다르게 작동하게 할 수 있다. 예를 들어, 다운로드 페이지에서 운영체제에 따라 적당한 파일을 받게 할 수 있다.

-----

## 필드별 상세 내용

브라우저나 설정 등에 따라 내용이 달라질 수 있으므로 신뢰할 수 있는 결과를 얻으려면 **한 필드에 의존해서는 안 된다**.

출력 예시는 macOS용 Chrome 84 버전의 것을 기록했다.

### `window.navigator.platform`

- [MDN 문서 링크](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/platform)
- 브라우저가 돌아가고 있는 플랫폼(예: "`MacIntel`", "`Win32`")이나 빈 문자열을 반환한다.
- 64비트 Windows에서는 브라우저 종류·버전에 따라 반환하는 값이 "`Win32`", "`Win64`"로 다를 수 있다.
- 스펙에서는 브라우저가 빈 문자열을 반환하는 것을 허용하므로 이 필드에 의존해서는 안 된다.
- 출력 예시: "`MacIntel`"

### `window.navigator.appVersion`

- [MDN 문서 링크](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/appVersion)
- "`4.0`"이나 브라우저의 버전 정보를 나타내는 문자열을 반환한다.
- 이 필드도 브라우저나 플랫폼 등을 속이기 위해 변경될 수 있다는 것 같다.
- MDN 문서의 사이드바에는 depreciated 표시가 있는데, 본문에는 그런 얘기가 없다.
- 출력 예시: "`5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`"

### `window.navigator.userAgent`

- [MDN 문서 링크](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent)
- 기본 `User-Agent` 값을 반환한다.
- 브라우저나 운영체제 설정에 따라 내용이 달라질 수 있기 때문에 이 필드에 의존해서는 안 된다.
- 출력 예시: "`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`"

### `window.navigator.oscpu`

- [MDN 문서 링크](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/oscpu)
- 운영체제 정보만 알 수 있다.
- Firefox에서만 지원한다.
- 출력 예시: `undefined`
