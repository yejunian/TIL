# Git Flow Model

참고 자료: [생활코딩](https://www.youtube.com/user/egoing2), [git flow model](https://youtu.be/EzcF6RX8RrQ)

-----

Git Flow 모델에서는 저장소를 개발 단계에 따라 `feature`, `develop`, `release`, `hotfixes`, `master` branch로 나누어 관리한다. 각 branch의 역할은 다음과 같다.

## `feature` Branches

`feature` branch에서는 새로 추가할 기능을 작업한다. 각 기능을 위한 branch 이름으로는 `feature/기능명`을 사용하며, 각 기능마다 branch를 만들어 작업한다. 작업을 완료하면 `develop` branch에 병합하고, 해당 `feature` branch를 삭제한다.

-----

## `develop` Branch

`develop` branch는 개발 단계의 branch이다. 실행 가능한 상태를 만들어 가는 작업을 진행한다. 이 작업이 끝나면 출시 준비 작업을 위해 새 버전을 위한 `release` branch를 생성한다.

-----

## `release` Branches

`release` branch에서는 출시 준비 작업을 진행한다. 이 branch에서는 버그 수정 작업만 진행한다. `develop` branch와의 충돌을 최소화하기 위해서, 버그 수정 후에는 수정 내용을 `develop` branch에도 적용(병합)해 주어야 한다. 출시 준비 작업이 끝나면 `master` branch에 병합하고, 해당 `release` branch를 삭제한다.

-----

## `hotfixes` Branch

`hotfixes` branch에서는 출시 이후 발생한, 긴급히 수정해야 하는 작업을 진행한다. 작업이 끝나면 `master` branch와 `develop` branch에 병합하고, `hotfixes` branch를 삭제한다.

-----

## `master` Branch

`master` branch는 언제나 실행 가능한 상태를 유지해야 한다. 이러한 실행 가능한 상태에 태그를 붙여 관리한다.

-----

## 활용 예제 시나리오

이 예제에서는 `Hello, world!`라는 텍스트를 출력하는 Python 프로그램을 작성하고(1.0.0), 인자를 하나 받아서 `world` 대신에 그 내용을 출력하도록 변경한다(1.1.0).

- 셸 입출력 예제에서,
  - 일부 출력은 생략했다.
  - <kbd>Ctrl</kbd>+<kbd>D</kbd>와 같은 입력은 \[Ctrl+D\]와 같이 표시했다.
- 예제에서 원격 저장소로 push하는 부분은 제외하였다.

### 초기 세팅

Git 저장소를 초기화하고, `README.md` 파일을 생성하여 commit한 뒤, `develop` branch를 생성한다.

```shell
$ git init
(master) $ cat > README.md
('README.md'에 들어갈 내용 입력)
[Ctrl+D]
(master) $ git add README.md
(master) $ git commit -m "Add README.md"
(master) $ git checkout -b develop
Switched to a new branch 'develop'
(develop) $ 
```

### 1.0.0 버전 개발 진행 단계

`develop` branch에서 다음과 같은 Python 프로그램을 작성하여 `hello.py`로 저장한 뒤 commit한다. (아래의 Python 프로그램이 출력하는 메시지는 원래 목적과는 달라서 잘못되었지만, 출시 준비 단계로 넘어가기 전까지 발견하지 못한다고 가정한다.)

```python
print('Hell, world!')
```

```shell
(develop) $ git add hello.py
(develop) $ git commit -m "Add hello.py"
```

### 1.0.0 버전 출시 준비 단계

1.0.0 버전 출시 준비를 위해, `develop` branch에서 `release/1.0.0` branch를 생성한다.

```shell
(develop) $ git checkout -b release/1.0.0
Switched to a new branch 'release/1.0.0'
(release/1.0.0) $ 
```

(앞 단계에서의 가정에 따라) `hello.py`가 `Hello, world!` 대신 `Hell, world!`라는 잘못된 텍스트를 출력하는 것을 이제야 발견했다.

```shell
$ python3 hello.py
Hell, world!
```

원래 목적은 `Hello, world!`라는 텍스트를 출력하는 것이었으므로, `hello.py`를 다음과 같이 수정하여 commit한다.

```python
print('Hello, world!')
```

```shell
(release/1.0.0) $ git add hello.py
(release/1.0.0) $ git commit "Modify hello.py to print correct text"
```

`develop` branch와의 충돌을 최소화하기 위해 변경 내용을 `develop` branch에도 병합한다. 병합할 때, 단순히 fast forward만 하지 않고 병합했다는 commit log를 남기기 위해 `--no-ff` 옵션을 준다. `--no-ff` 옵션을 주면 `git commit -v`처럼 commit message를 작성하는 파일이 열린다.

```shell
(release/1.0.0) $ git checkout develop
(develop) $ git merge --no-ff release/1.0.0
(develop) $ git checkout release/1.0.0
(release/1.0.0) $ 
```

### 1.0.0 버전 출시 단계

1.0.0 버전을 출시할 준비가 끝나면, `release/1.0.0` branch를 `master` branch로 병합하고 `release/1.0.0` branch를 삭제한다. (주의: `release/1.0.0` branch를 삭제하기 전에 이 branch에서의 모든 변경 내용이 `develop` branch에도 병합되어 있어야 한다.)

```shell
(release/1.0.0) $ git checkout master
(master) $ git merge --no-ff release/1.0.0
(master) $ git branch -d release/1.0.0
```

이제 여기에 `1.0.0`이라는 태그를 붙인다.

```shell
(master) $ git tag 1.0.0
```

### 1.1.0 버전 개발 진행 단계

이 버전에서는 인자를 받아서 `world`라는 문구 대신 출력하는 기능을 추가할 것이다. 예를 들면, 다음과 같은 방식이다.

```shell
$ python3 hello.py example
Hello, example!
```

`develop` branch에서 `feature/argument` branch를 생성한다.

```shell
(develop) $ git checkout -b feature/argument
(feature/argument) $ 
```

그리고 `hello.py`를 다음과 같이 수정한다. (이 프로그램을 추가 인자 없이 실행하면 에러가 발생하지만, 아직 그 문제를 발견하지 못했고 출시 이후 발견한다고 가정한다.)

```python
import sys

name = sys.argv[1]
print(f'Hello, {name}!')
```

`hello.py`에 `example`이라는 인자를 주어 실행한 결과는 다음과 같다.

```shell
$ python3 hello.py example
Hello, example!
```

변경 내용을 commit하고 `develop` branch로 병합한 뒤 `feature/argument` branch를 삭제한다.

```shell
(feature/argument) $ git add hello.py
(feature/argument) $ git commit -m "Implement feature to print argument"
(feature/argument) $ git checkout develop
(develop) $ git merge --no-ff feature/argument
(develop) $ git branch -d feature/argument
```

### 1.1.0 버전 출시 준비 및 출시 단계

1.1.0 버전 출시 준비를 위해, `develop` branch에서 `release/1.1.0` branch를 생성한다.

```shell
(develop) $ git checkout -b release/1.1.0
Switched to a new branch 'release/1.1.0'
(release/1.1.0) $ 
```

(앞서 언급한 문제를 제외하고) 몇 가지 문제가 있었으나 수정했다고 가정하고 출시 단계로 넘어간다. `release/1.1.0` branch를 `master` branch로 병합하고 `release/1.1.0` branch를 삭제하고 `1.1.0`이라는 태그를 붙인다.

```shell
(release/1.1.0) $ git checkout master
(master) $ git merge --no-ff release/1.1.0
(master) $ git branch -d release/1.1.0
(master) $ git tag 1.1.0
```

### 1.1.0 버전의 버그 긴급 수정

(1.1.0 버전의 코드의 특정 문제를 출시 이후에 발견한다는 가정에 따라서) 1.1.0 버전 출시 이후 치명적인 문제를 발견했다. `master` branch에서 `hotfixes` branch를 생성한다.

```shell
(master) $ git checkout -b hotfixes/1.1.1
(hotfixes/1.1.1) $ 
```

인자 없이 실행하면 아무 메시지도 출력하지 않거나 사용법을 출력할 수도 있지만, 1.0.0 버전과의 호환성을 위해 기본 이름으로 `world`를 사용하기로 했다. 따라서 `hello.py`를 다음과 같이 수정한다.

```python
import sys

name = 'world' if len(sys.argv) < 2 else sys.argv[1]
print(f'Hello, {name}!')
```

`hello.py`의 실행 결과는 다음과 같다.

```shell
$ python3 hello.py
Hello, world!
$ python3 hello.py example
Hello, example!
```

변경 사항을 적용하고, `develop` branch와 `master` branch에 병합한 뒤, `1.1.1` 태그를 붙이고, `hotfixes/1.1.1` branch를 삭제한다.

```shell
(hotfixes/1.1.1) $ git add hello.py
(hotfixes/1.1.1) $ git commit -m "Fix IndexError when running without argument"
(hotfixes/1.1.1) $ git checkout develop
(develop) $ git merge --no-ff hotfixes/1.1.1
(develop) $ git checkout master
(master) $ git merge --no-ff hotfixes/1.1.1
(master) $ git tag 1.1.1
(master) $ git branch -d hotfixes/1.1.1
```
