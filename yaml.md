# YAML

- Yet Another Markup Language → YAML Ain't Markup Language
- 사람이 쉽게 읽을 수 있다.

-----

## 간단한 문법

### 문서의 시작과 끝

- 문서의 시작은 `---`으로 나타낸다.
- 문서의 끝은 `...`으로 나타낸다.
- 문서의 시작과 끝 표시는 선택사항이다.

```yaml
---
- Hello
- World
...
```

### Number, Boolean, Null

따옴표 없이 그냥 적는다. Boolean, null은 파서에 따라 대소문자를 구분하기도 하고 아니기도 한 것 같다. 어떤 버전에서는 `yes`, `no`를 각각 `true`, `false`로 해석하기도 하는 듯.

```yaml
- 123
- 3.141592
- true
- false
- null
```

### String

문자열을 표현할 때는 따옴표를 쓰지 않아도 된다. 다만, 다른 타입과 헷갈릴 수 있다면 따옴표를 쓰는 것이 좋다.

```yaml
- Lorem ipsum dolor sit amet,
- consectetur adipisicing elit,
- sed do eiusmod tempor incididunt
- ut labore et dolore magna aliqua.
```

#### `|`: 개행 유지 블록 리터럴

```yaml
|
  Lorem ipsum dolor sit amet,
  consectetur adipisicing elit,
  sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua.
```

위의 내용은 일반 텍스트로 다음과 같다.

```plaintext
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.

```

#### `>`: 개행 무시 블록 리터럴

```yaml
>
  Lorem ipsum dolor sit amet,
  consectetur adipisicing elit,
  sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua.

  사이에 빈 줄을 넣어서 개행을 적용할 수 있다.
```

위의 내용은 일반 텍스트로 다음과 같다.

```plaintext
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
사이에 빈 줄을 넣어서 개행을 적용할 수 있다.

```

-----

### List

#### 블록

```yaml
- Lorem
- Ipsum
- Dolor
```

#### 인라인

```yaml
[Lorem, Ipsum, Dolor]
```

### Key-Value Pair

#### 블록

```yaml
Lorem: ipsum dolor sit amet
consectetur: adipisicing elit
sed: do eiusmod tempor incididunt
ut: labore et dolore magna aliqua
```

#### 인라인

```yaml
{Lorem: ipsum dolor sit amet, consectetur: adipisicing elit, sed: do eiusmod tempor incididunt, ut: labore et dolore magna aliqua}
```

이걸 보고 조금 생각을 해 보면, JSON 데이터를 YAML 파서로 파싱해도 같은 결과가 나올 것임을 유추할 수 있다.

-----

## 참고 자료

- 위키백과, [YAML](https://ko.wikipedia.org/wiki/YAML)
- Wikipedia, [YAML](https://en.wikipedia.org/wiki/YAML)
- [yaml (yml) 문법 정리](https://lejewk.github.io/yaml-syntax/)
- 기계인간 John Grib, [YAML](https://johngrib.github.io/wiki/YAML/)
