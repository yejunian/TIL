# Git 클라이언트의 기본 브랜치 변경하기

## 자료

- [Git의 기본 브랜치를 master에서 main으로 변경하기](https://blog.outsider.ne.kr/1503)

-----

## GitHub와 Git 사이의 간극

GitHub에서는 10월부터 기본 브랜치를 `master`에서 `main`으로 변경했다. 저장소를 생성할 때 초기화 옵션을 주면 기본 브랜치가 `main`인 저장소가 생성된다.

그러나 Git 클라이언트에서는 기본 브랜치가 `master`이기 때문에, 별도 옵션 없이 빈 저장소를 생성하고 클론해서 `git status`를 실행해 보면 현재 브랜치가 `master`인 것으로 나온다.

```shell
$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

이 상태에서 파일을 추가하고 커밋을 하면 `master` 브랜치에 커밋이 된다.

```shell
$ touch file.txt
$ git add file.txt
$ git commit -m "Add file.txt"
[master (root-commit) 2dd6ccf] Add file.txt
 1 file changed, 1 insertion(+)
 create mode 100644 file.txt
$ git branch
* master
```

이대로 푸시하면, **처음 푸시한** `master` 브랜치가 원격 저장소의 기본 브랜치로 지정되어 버린다.

GitHub에서는 브랜치 이름을 `main`으로 변경하도록 안내하고 있다. 기본 브랜치 이름으로 `master` 대신 `main`을 사용하려면 푸시하기 전에 다음과 같이 브랜치의 이름을 `main`으로 변경해야 한다.

```shell
$ git branch -M main
```

-----

## Git 클라이언트의 기본 브랜치 변경

그렇다면, Git 클라이언트의 기본 브랜치 이름을 바꿀 수는 없을까 하는 생각을 할 수 있다. Git 2.28부터 가능하다고 한다.

Git 버전을 체크해 보니 이미 2.28.0이다. 버전이 낮다면 올려야 한다.

```shell
$ git --version
git version 2.28.0
```

다음과 같이 저장소 초기화 시 기본 브랜치를 `main`으로 설정한다. 이 설정은 `~/.gitconfig`에 저장된다.

```shell
$ git config --global init.defaultBranch main
```

이제 새 로컬 저장소의 기본 브랜치는 `main`이다. 이후로 Create React App으로 새로 생성하는 앱에도 적용된다.

```shell
$ yarn create react-app lorem-ipsum
(출력 생략)
$ cd lorem-ipsum
$ git log --oneline
b581e2d (HEAD -> main) Initialize project using Create React App
```
