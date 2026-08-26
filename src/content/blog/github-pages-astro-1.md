---
title: 'GitHub Pages + Astro로 무료 개발 블로그 만들기 (1) — 시작과 첫 배포'
description: 'GitHub Pages와 Astro를 이용해 무료 개발 블로그를 만들고 첫 배포까지 진행해보자'
pubDate: '2026-08-25'
---

안녕하세요 구씨입니다.

그동안 개발하면서 메모나 문서로만 남길 뿐, 지나고나면 기억하지 못하는게 많아서 정리해볼까 한다.

그래도 이왕이면 개발자인데 Git을 써보는게 어떠한가!! 하고! 진행해보고자 합니다.

별도의 서버를 띄워서 관리할 필요가 없고, 로컬에서 글이나 코드를 수정한 뒤 GitHub에 Push하면 배포까지 자동으로 이어지게 만들 수 있다는 방법이 있다고하니! 진행합니다~

이번 글에서는 아무것도 없는 상태에서 GitHub Pages 저장소를 만들고, Astro를 설치한 뒤 실제 인터넷 주소로 접속하는 것까지 진행한다.

최종 목표는 단순하게! git을 활용한 나만의 블로그를 만들어보자~

```text
https://<username>.github.io
````

---

## 1. GitHub Pages부터 시작하기

GitHub Pages는 GitHub 저장소에 있는 정적 사이트를 웹에 공개할 수 있게 해주는 기능이다.

개인 블로그처럼 사용자 사이트를 만들 때는 저장소 이름에도 규칙이 있다.

```text
<GitHub username>.github.io
```

예를 들어 GitHub 아이디가 다음과 같다면,

```text
goo-see
```

저장소 이름은:

```text
goo-see.github.io
```

가 되고, 최종 주소도 그대로:

```text
https://goo-see.github.io
```

가 된다.

처음에는 저장소 이름을 아무렇게나 만들어도 되는 줄 알았는데, `<username>.github.io` 형태로 바로 접근하고 싶다면 이 규칙을 맞춰주는 게 중요하다.

---

## 2. GitHub Pages 저장소 만들기

GitHub 우측 상단의 `+` 버튼을 누르고 New repository를 선택한다.

<!-- 이미지 1: GitHub 우측 상단 + → New repository 선택 화면 -->

Repository name에는 자신의 GitHub 아이디 뒤에 `.github.io`를 붙인다.

```text
<username>.github.io
```

설정은 다음과 같이 두었다.

```text
Visibility     Public
README         Off
.gitignore     None
License        None
```

<!-- 이미지 2: devlogu-test.github.io 저장소 생성 설정 화면 -->

이번에는 로컬에서 Astro 프로젝트를 직접 만들 예정이라 README나 `.gitignore` 같은 파일은 미리 생성하지 않았다.

설정을 확인하고 Create repository를 누른다.

여기까지 하면 일단 GitHub 쪽 빈 공간은 준비됐다.

---

## 3. 저장소를 로컬로 가져오기

이제 방금 만든 저장소를 내 컴퓨터로 가져온다.

나는 Desktop 아래에 프로젝트를 두기로 했다.

```bash
cd ~/Desktop
```

그리고 저장소를 Clone한다.

```bash
git clone https://github.com/<username>/<username>.github.io.git
```

테스트 계정이라면:

```bash
git clone https://github.com/devlogu-test/devlogu-test.github.io.git
```

Clone이 끝났으면 해당 폴더로 이동한다.

```bash
cd devlogu-test.github.io
```

빈 저장소를 Clone했기 때문에 다음과 같은 메시지가 나올 수도 있다.

```text
warning: You appear to have cloned an empty repository.
```

에러는 아니다.

정말 빈 저장소라서 나오는 메시지라 그냥 넘어가면 된다.

---

## 4. Astro Blog 설치하기

프레임워크는 Astro를 선택했다.

블로그 글을 Markdown으로 관리할 수 있고, GitHub Pages에 올릴 정적 사이트를 만들기에도 구조가 단순해 보여서 선택했다.

현재 `devlogu-test.github.io` 폴더 안에서 다음 명령어를 실행한다.

```bash
npm create astro@latest -- --template blog
```

처음 실행하면 `create-astro` 설치 여부를 물어볼 수 있다.

```text
Need to install the following packages:
create-astro@...

Ok to proceed? (y)
```

이 경우 `y`를 입력한다.

### 프로젝트 위치는 `.`으로 지정하기

여기서 한 가지 주의할 부분이 있다.

설치 과정에서 다음과 같이 프로젝트를 어디에 만들지 물어본다.

```text
Where should we create your new project?
```

여기에는 새로운 폴더명을 입력하지 않고:

```text
.
```

을 입력한다.

`.`은 현재 폴더를 의미한다.

우리가 원하는 구조는 이렇다.

```text
devlogu-test.github.io/
├── package.json
├── astro.config.mjs
├── public/
├── src/
└── ...
```

<!-- 이미지 3: Astro 설치 과정에서 프로젝트 위치를 . 으로 입력한 화면 -->

여기서 별도의 프로젝트명을 입력하면:

```text
devlogu-test.github.io/
└── some-project/
    ├── package.json
    ├── src/
    └── ...
```

처럼 한 단계 아래에 프로젝트가 생길 수 있다.

그러면 나중에 상위 폴더에서 `npm run dev`를 실행했을 때 `package.json`을 찾지 못하는 상황이 생긴다.

처음 만들 때 은근히 헷갈릴 수 있는 부분이라 그냥 `.`을 기억해두는 게 편하다.

의존성 설치 여부는:

```text
Install dependencies?
```

`Yes`를 선택한다.

이미 GitHub 저장소를 Clone해둔 상태라 Git 초기화를 다시 물어본다면:

```text
Initialize a new git repository?
```

`No`를 선택하면 된다.

---

## 5. 프로젝트가 제대로 만들어졌는지 확인하기

설치가 끝났으면 현재 폴더를 확인해본다.

```bash
ls
```

대략 다음과 같은 파일들이 보여야 한다.

```text
README.md
astro.config.mjs
package.json
package-lock.json
public
src
tsconfig.json
```

여기서 가장 먼저 확인한 건 `package.json`이다.

정상이라면:

```text
devlogu-test.github.io/
├── .git/
├── package.json
├── src/
├── public/
└── astro.config.mjs
```

처럼 저장소 바로 아래에 있어야 한다.

이 구조만 맞으면 일단 다음 단계로 넘어가도 된다.

---

## 6. localhost에서 먼저 실행해보기

이제 블로그가 실제로 실행되는지 확인한다.

```bash
npm run dev
```

정상적으로 실행되면 터미널에 다음과 비슷하게 표시된다.

```text
Local    http://localhost:4321/
```

브라우저에서:

```text
http://localhost:4321/
```

로 접속한다.

<!-- 이미지 4: localhost:4321에서 Astro 기본 Blog Template이 열린 화면 -->

Astro 기본 블로그 화면이 보인다면 여기까지는 성공이다.

아직 인터넷에 공개된 건 아니다.

현재 상태는 딱:

```text
내 컴퓨터
    ↓
localhost:4321
```

까지만 접근할 수 있는 상태다.

이제 이걸 GitHub Pages까지 연결하면 된다.

---

## 7. Astro에 실제 사이트 주소 알려주기

프로젝트 루트에 있는:

```text
astro.config.mjs
```

파일을 연다.

그리고 `site`에 실제 GitHub Pages 주소를 넣는다.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://<username>.github.io',
});
```

테스트 계정 기준으로는:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://devlogu-test.github.io',
});
```

처럼 작성했다.

이번처럼 저장소 자체가 `<username>.github.io`인 사용자 사이트라면 별도의 `/blog` 같은 경로는 붙이지 않았다.

---

## 8. GitHub Actions로 자동 배포 준비하기

여기까지 만들었으면 직접 배포할 수도 있지만, 매번 수동으로 작업하고 싶지는 않았다.

앞으로는:

```bash
git push
```

만 하면 알아서 빌드하고 GitHub Pages까지 배포되도록 GitHub Actions를 붙인다.

먼저 Workflow 폴더를 만든다.

```bash
mkdir -p .github/workflows
```

배포 파일도 생성한다.

```bash
touch .github/workflows/deploy.yml
```

`deploy.yml`에는 다음 내용을 넣었다.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v7

      - name: Install, build, and upload your site output
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

처음 보면 조금 복잡해 보이는데, 지금 필요한 흐름만 보면 단순하다.

```text
main 브랜치에 Push
        ↓
Astro Build
        ↓
빌드 결과 업로드
        ↓
GitHub Pages 배포
```

GitHub Actions의 세부 구조는 다음 글에서 조금 더 자세히 볼 예정이다.

이번에는 일단 자동 배포가 되는 상태까지만 만든다.

---

## 9. Push하기 전에 로컬 Build 확인하기

바로 GitHub에 올리기 전에 한 번 확인해보는 게 좋다.

```bash
npm run build
```

정상적으로 끝나면 마지막 부분에:

```text
[build] Complete!
```

비슷한 메시지가 표시된다.

프로젝트에는:

```text
dist/
```

폴더도 생성된다.

`npm run dev`가 개발 중 화면을 확인하는 용도라면, `npm run build`는 실제 배포할 결과물이 정상적으로 만들어지는지 확인하는 과정이라고 보면 된다.

여기까지 문제없으면 이제 Push한다.

---

## 10. 첫 Commit과 Push

먼저 변경된 파일을 확인한다.

```bash
git status
```

파일을 Stage에 올리고:

```bash
git add .
```

첫 Commit을 만든다.

```bash
git commit -m "feat: initialize Astro blog"
```

이제 GitHub에 Push한다.

```bash
git push origin main
```

처음 직접 해보고 가장 신기했던 부분이 여기였다.

앞으로는 로컬에서 작업한 뒤 Push만 하면:

```text
Local 작업
    ↓
git commit
    ↓
git push
    ↓
GitHub Actions
    ↓
GitHub Pages 배포
```

까지 자동으로 이어지게 된다.

---

## 11. GitHub Pages 배포 방식을 Actions로 변경하기

GitHub 저장소로 돌아간다.

상단의:

```text
Settings
```

로 들어간 다음 왼쪽 메뉴에서:

```text
Pages
```

를 선택한다.

`Build and deployment`의 Source를:

```text
GitHub Actions
```

로 변경한다.

<!-- 이미지 5: Settings → Pages → Source를 GitHub Actions로 선택한 화면 -->

이제 우리가 만든 `deploy.yml`이 실제 GitHub Pages 배포를 담당한다.

---

## 12. Actions에서 배포 상태 확인하기

저장소 상단의:

```text
Actions
```

탭으로 이동한다.

정상이라면 우리가 만든:

```text
Deploy to GitHub Pages
```

Workflow가 실행되고 있다.

완료됐을 때:

```text
build   ✅
deploy  ✅
```

두 단계 모두 초록색이면 성공이다.

<!-- 이미지 6: GitHub Actions의 build / deploy가 모두 성공한 화면 -->

만약 여기서 빨간색으로 실패한다면 사이트에 접속하기 전에 먼저 Actions 로그를 확인해야 한다.

나도 실제로 블로그를 만들면서 이 부분에서 한 번 막혔는데, 그 내용은 다음 글에 따로 정리하려고 한다.

---

## 13. 실제 GitHub Pages 주소로 접속하기

이제 마지막이다.

브라우저에서:

```text
https://<username>.github.io
```

로 접속한다.

테스트 계정이라면:

```text
https://devlogu-test.github.io
```

다.

<!-- 이미지 7: 실제 devlogu-test.github.io에서 Astro Blog가 열린 화면 -->

localhost에서 봤던 Astro 기본 블로그가 실제 인터넷 주소에서도 뜬다면 첫 배포까지 완료된 것이다.

처음에는 GitHub Pages라고 해서 GitHub 안에서 뭔가 직접 글을 작성하는 방식인 줄 알았는데, 실제로 사용해보니 그냥 Git으로 사이트 전체를 관리하는 구조에 가까웠다.

앞으로 블로그를 수정하는 과정도:

```text
코드 또는 글 수정
        ↓
localhost에서 확인
        ↓
git commit
        ↓
git push
        ↓
실제 블로그 자동 반영
```

이 흐름으로 반복하게 된다.

생각보다 단순했다.

---

## 마무리

이번에는 아무것도 없는 상태에서:

```text
GitHub Pages 저장소 생성
        ↓
Astro 설치
        ↓
localhost 실행
        ↓
GitHub Actions 설정
        ↓
첫 Commit / Push
        ↓
실제 GitHub Pages 배포
```

까지 진행했다.

아직 사이트 자체는 Astro 기본 템플릿 그대로다.

그래도 일단 로컬에서 작업한 결과가 Push만으로 실제 사이트에 반영되는 환경은 만들어졌다.

다음 글에서는 이번 과정에서 조금 대충 넘어간 GitHub Actions를 다시 살펴보고, 실제로 배포가 실패했을 때 어디부터 확인하면 되는지도 같이 정리해보려고 한다.

### 다음 글

`GitHub Pages + Astro로 무료 개발 블로그 만들기 (2) — GitHub Actions 자동 배포`