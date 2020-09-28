# `git rebase` 예제

Rebase: 현재 브랜치의 base를 다시(re) 지정하는 것.

## 예제

아래는 초기 상태이다. 커밋 메시지를 `develop` 브랜치에서는 "`Add develop N`", `feature/hello` 브랜치에서는 "`Add hello N`"이라고 작성했다. `3d8b4d1`(Add develop 3)에서 `feature/hello` 브랜치를 만들고, 두 브랜치에 번갈아 커밋했다.

```plaintext
  * c85c9cc (feature/hello) Add hello 3
* | 2c38a17 (develop) Add develop 5
| * 48f4708 Add hello 2
* | dd40f0e Add develop 4
| * 6417ffc Add hello 1
|/
* 3d8b4d1 Add develop 3
* 5bcf33f Add develop 2
* d7cf15d Add develop 1
```

### 그냥 merge하는 경우

이 상태로 `feature/hello` 브랜치를 `develop` 브랜치로 merge하면 두 브랜치의 커밋 기록이 뒤섞인다. 여기서는 merge했다는 커밋을 남기기 위해 `--no-ff` 옵션을 주었다.

```shell
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff feature/hello
Merge made by the 'recursive' strategy.
 hello.txt | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 hello.txt
```

Merge 결과로 아래와 같은 상태가 되었다. 단순히 merge만 했기 때문에 커밋 ID는 그대로 유지된 것을 볼 수 있다. 그러나 `feature/hello` 브랜치에서 진행한 커밋과 `develop` 브랜치에서 진행한 커밋이 섞였다.

```plaintext
b785c07 (develop) Merge branch 'feature/hello' into develop
c85c9cc (feature/hello) Add hello 3
2c38a17 Add develop 5
48f4708 Add hello 2
dd40f0e Add develop 4
6417ffc Add hello 1
3d8b4d1 Add develop 3
5bcf33f Add develop 2
d7cf15d Add develop 1
```

### Merge 전에 rebase하는 경우

Merge 전에 rebase를 이용하여 커밋 기록을 기능(브랜치)별로 묶을 수 있다. 먼저, `feature/hello` 브랜치의 base를 `develop` 브랜치로 변경한다.

```shell
$ git checkout feature/hello
Already on 'feature/hello'
$ git rebase develop
First, rewinding head to replay your work on top of it...
Applying: Add hello 1
Applying: Add hello 2
Applying: Add hello 3
```

Rebase 결과로 아래와 같은 상태가 되었다. `feature/hello` 브랜치에서 남긴 커밋이 `develop` 브랜치 뒤로 이동하고, 이동한 커밋의 **커밋 ID가 변경**된 것을 볼 수 있다.

```plaintext
b91064d (feature/hello) Add hello 3
c3b193c Add hello 2
e192fb2 Add hello 1
2c38a17 (develop) Add develop 5
dd40f0e Add develop 4
3d8b4d1 Add develop 3
5bcf33f Add develop 2
d7cf15d Add develop 1
```

이대로 `feature/hello` 브랜치를 `develop` 브랜치로 merge하면 아래와 같다. 여기서도 merge했다는 커밋을 남기기 위해 `--no-ff` 옵션을 주었다.

```shell
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff feature/hello
Merge made by the 'recursive' strategy.
 hello.txt | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 hello.txt
```

```plaintext
61168ca (develop) Merge branch 'feature/hello' into develop
b91064d (feature/hello) Add hello 3
c3b193c Add hello 2
e192fb2 Add hello 1
2c38a17 Add develop 5
dd40f0e Add develop 4
3d8b4d1 Add develop 3
5bcf33f Add develop 2
d7cf15d Add develop 1
```

-----

## 더 공부해 보기

- `git rebase -i`
- `git cherry-pick`
