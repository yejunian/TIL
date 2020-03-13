# 따라한 흔적: 문서 &gt; 설치 &gt; 웹사이트에 React 추가하기

이 디렉터리는 React 공식 문서 중 [「웹사이트에 React 추가하기」](https://ko.reactjs.org/docs/add-react-to-a-website.html)를 따라 진행한 결과물이다.

## 진행 순서

1. HTML 파일 뼈대 작성
2. HTML에 `id` 속성을 가진 `<div>` ~ `</div>` 추가
3. HTML에 스크립트 태그 추가
4. 문서에서 제공하는 스타터 코드 기반으로 React 컴포넌트 추가
5. 똑같은 컴포넌트 여러 번 붙여 보기
6. JSX로 코드 교체하고 Babel로 변환해 보기

## 메모

1. 역시 직접 해 봐야 조금씩 머리에 들어오기 시작한다.
2. 나는 [“팁: 컴포넌트 재사용”](https://ko.reactjs.org/docs/add-react-to-a-website.html#tip-reuse-a-component) 부분을 `id` 속성을 이용해서 만들었는데([`./src/like_button.js`](./src/like_button.js) 참고), 공식 문서 예제에서는 `class` 속성을 이용해서 만들었다. 똑같은 걸 반복적으로 하는 데는 `id`보다는 `class` 속성이 더 어울리는 것 같다.
3. JS와 JSX 중 JSX 쪽이 좀 더 직관적인 것 같다.
4. JSX 전처리기 관련
   - Babel을 실행하고 나서 아무 반응이 없는 것처럼 보여서 잠깐 당황했다. 문서에 나와 있듯이 JSX를 포함한 소스 파일을 수정하면 자동으로 전처리 과정이 진행된다.
   - `npx babel --watch src --out-dir . --presets react-app/prod`
     - `--watch src`: `src` 디렉터리 감시
     - `--out-dir .`: 현재 디렉터리(`.`)에 전처리 결과물 생성
     - `--presets react-app/prod`는 정확히는 잘 모르겠지만, `react-app/prod` 프리셋을 이용해서 코드를 변환하겠다는 옵션 같다.
