# Git Flow Model

참고: [git flow model](https://youtu.be/EzcF6RX8RrQ)

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
