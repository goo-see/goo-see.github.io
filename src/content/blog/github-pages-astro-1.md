---
title: 'GitHub Pages + Astro로 무료 개발 블로그 만들기 (1) — 시작과 첫 배포'
description: 'GitHub Pages와 Astro를 이용해 무료 개발 블로그를 만들고 첫 배포까지 진행합니다.'
pubDate: '2026-08-25'
---

# GitHub Pages + Astro로 무료 개발 블로그 만들기 (1) — 시작과 첫 배포

개발을 하다 보면 해결했던 문제나 새롭게 알게 된 내용을 어디엔가 정리하고 싶을 때가 있다.

나 역시 기술적인 내용을 기록할 공간이 필요했고, 이번 기회에 직접 개발 블로그를 만들어보기로 했다.

블로그를 만드는 방법은 다양하지만 이번에는 다음 조합을 사용한다.

- GitHub Pages
- Astro
- GitHub Actions
- Markdown

별도의 서버를 운영하지 않아도 되고, GitHub에 코드를 Push하면 블로그가 자동으로 배포되는 구조다.

이번 글에서는 가장 먼저 GitHub Pages 저장소를 만들고 Astro 블로그를 실제 인터넷에 배포하는 과정까지 진행한다.

최종적으로 아래와 같은 주소를 만드는 것이 목표다.

```text
https://<username>.github.io
```

---

## 1. GitHub Pages가 뭔가?

GitHub Pages는 GitHub 저장소에 있는 정적 웹사이트를 인터넷에 공개할 수 있도록 해주는 기능이다.

개인 사용자 사이트를 만들 경우 저장소 이름을 다음 규칙으로 생성한다.

```text
<GitHub username>.github.io
```

예를 들어 GitHub 아이디가 아래와 같다면,

```text
devlogu-test
```

저장소 이름은 다음과 같다.

```text
devlogu-test.github.io
```

그리고 최종 사이트 주소는:

```text
https://devlogu-test.github.io
```

가 된다.

GitHub Free 계정을 사용한다면 GitHub Pages를 사용할 저장소를 Public으로 생성하면 된다.

---

## 2. GitHub Pages 저장소 만들기

GitHub 우측 상단의 `+` 버튼을 누르고 **New repository**를 선택한다.

> [이미지 1 — GitHub의 New repository 메뉴를 선택하는 화면]

Repository name에는 자신의 GitHub 아이디 뒤에 `.github.io`를 붙인다.

```text
<username>.github.io
```

예:

```text
devlogu-test.github.io
```

이번에는 로컬에서 프로젝트를 생성할 예정이므로 아래 옵션은 추가하지 않는다.

```text
Visibility     Public
README         Off
.gitignore     None
License        None
```

> [이미지 2 — `<username>.github.io` 저장소 생성 설정 화면]

설정을 확인한 뒤 **Create repository**를 누른다.

저장소가 만들어졌다면 첫 번째 단계는 끝이다.

---

## 3. 저장소를 로컬로 Clone하기

이제 방금 만든 저장소를 내 컴퓨터로 가져온다.

터미널을 열고 프로젝트를 둘 위치로 이동한다.

나는 Desktop을 사용했다.

```bash
cd ~/Desktop
```

GitHub 저장소를 Clone한다.

```bash
git clone https://github.com/<username>/<username>.github.io.git
```

예를 들면:

```bash
git clone https://github.com/devlogu-test/devlogu-test.github.io.git
```

그리고 Clone된 폴더로 이동한다.

```bash
cd devlogu-test.github.io
```

빈 저장소를 Clone했기 때문에 다음과 같은 경고가 보일 수도 있다.

```text
warning: You appear to have cloned an empty repository.
```

문제가 발생한 것이 아니다.

아직 저장소에 아무 파일도 없기 때문에 나오는 정상적인 메시지다.

---

## 4. Astro Blog 프로젝트 설치하기

이번 블로그에는 Astro를 사용한다.

Astro는 정적 사이트와 블로그를 만들기에 적합한 웹 프레임워크이며 Markdown 기반 콘텐츠도 쉽게 관리할 수 있다.

현재 GitHub 저장소 폴더 안에서 다음 명령어를 실행한다.

```bash
npm create astro@latest -- --template blog
```

처음 실행한다면 `create-astro` 설치 여부를 물어볼 수 있다.

```text
Need to install the following packages:
create-astro@...

Ok to proceed? (y)
```

`y`를 입력한다.

---

### 프로젝트 위치는 반드시 `.`으로 지정한다

설치 과정에서 다음과 비슷한 질문이 나온다.

```text
Where should we create your new project?
```

여기서 새로운 폴더명을 입력하지 않고:

```text
.
```

을 입력한다.

`.`은 **현재 폴더**를 의미한다.

즉 다음 구조를 만들기 위한 것이다.

```text
<username>.github.io/
├── package.json
├── astro.config.mjs
├── public/
├── src/
└── ...
```

> [이미지 3 — Astro 설치 마법사에서 프로젝트 위치를 `.`으로 입력하는 화면]

의존성 설치 여부를 물어보면:

```text
Install dependencies?
```

`Yes`를 선택한다.

이미 GitHub 저장소를 Clone했기 때문에 Git 저장소 초기화를 묻는다면 새로 초기화할 필요가 없다.

```text
Initialize a new git repository?
```

`No`를 선택한다.

---

## 5. 프로젝트 구조 확인하기

Astro 설치가 끝났다면 현재 디렉터리를 확인해본다.

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

특히 중요한 것은:

```text
package.json
```

이 현재 `<username>.github.io` 폴더 바로 아래에 존재하는지 확인하는 것이다.

정상적인 구조:

```text
<username>.github.io/
├── .git/
├── package.json
├── src/
├── public/
└── astro.config.mjs
```

---

## 6. Astro 블로그를 로컬에서 실행해보기

이제 실제로 블로그가 동작하는지 확인한다.

```bash
npm run dev
```

정상적으로 실행되면 터미널에 다음과 비슷한 주소가 표시된다.

```text
http://localhost:4321/
```

브라우저에서 해당 주소로 접속한다.

> [이미지 4 — Astro 기본 Blog Template이 localhost:4321에서 실행된 화면]

Astro Blog 화면이 나타났다면 로컬 개발 환경 구축은 성공이다.

이 단계에서는 아직 인터넷에 블로그가 공개된 것이 아니다.

현재 구조는:

```text
내 컴퓨터
    ↓
localhost:4321
```

까지만 가능한 상태다.

이제 이것을 GitHub Pages에 배포한다.

---

## 7. Astro에 사이트 주소 설정하기

프로젝트 루트에 있는:

```text
astro.config.mjs
```

파일을 연다.

사이트 주소를 다음과 같이 설정한다.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://<username>.github.io',
});
```

예:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://devlogu-test.github.io',
});
```

이번처럼 `<username>.github.io` 사용자 사이트를 만드는 경우 별도의 프로젝트 경로를 붙일 필요가 없다.

---

## 8. GitHub Actions 배포 설정 만들기

우리는 앞으로 블로그 글이나 코드를 수정한 뒤:

```bash
git push
```

만 하면 자동으로 사이트가 배포되도록 만들 것이다.

먼저 GitHub Actions 설정 폴더를 만든다.

```bash
mkdir -p .github/workflows
```

그리고 배포 설정 파일을 생성한다.

```bash
touch .github/workflows/deploy.yml
```

`deploy.yml`에 다음 내용을 작성한다.

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

이 설정은 간단히 말하면:

```text
main 브랜치에 Push
        ↓
Astro 프로젝트 Build
        ↓
GitHub Pages에 결과 업로드
        ↓
사이트 배포
```

를 자동으로 수행한다.

---

## 9. 배포 전에 로컬 Build 확인하기

바로 Push하기 전에 Production Build가 정상적으로 만들어지는지 확인한다.

```bash
npm run build
```

정상적으로 완료되면 마지막 부분에 다음과 비슷한 메시지가 나타난다.

```text
[build] Complete!
```

그리고 프로젝트 내부에:

```text
dist/
```

폴더가 생성된다.

이 폴더 안의 결과물이 실제 GitHub Pages에 배포된다.

---

## 10. 첫 Commit과 Push

이제 현재 프로젝트를 GitHub에 올린다.

먼저 변경된 파일을 확인한다.

```bash
git status
```

전체 파일을 Stage에 추가한다.

```bash
git add .
```

첫 Commit을 만든다.

```bash
git commit -m "feat: initialize Astro blog"
```

그리고 GitHub에 Push한다.

```bash
git push origin main
```

이 순간부터 앞으로 꽤 자주 보게 될 흐름이 시작된다.

```text
Local 작업
    ↓
git commit
    ↓
git push
    ↓
GitHub Actions
    ↓
GitHub Pages 자동 배포
```

---

## 11. GitHub Pages의 Source를 GitHub Actions로 설정하기

GitHub에서 방금 만든 저장소로 이동한다.

상단 메뉴에서:

```text
Settings
```

로 이동하고 왼쪽 메뉴에서:

```text
Pages
```

를 선택한다.

`Build and deployment` 항목의 Source를:

```text
GitHub Actions
```

로 설정한다.

> [이미지 5 — Settings → Pages → Source를 GitHub Actions로 선택한 화면]

이제 GitHub가 우리가 만든 `deploy.yml`을 통해 사이트를 배포할 수 있다.

---

## 12. GitHub Actions 확인하기

Repository 상단의:

```text
Actions
```

탭으로 이동한다.

우리가 만든:

```text
Deploy to GitHub Pages
```

Workflow가 실행되고 있을 것이다.

정상적으로 완료되면:

```text
build   ✅
deploy  ✅
```

두 작업 모두 초록색 체크가 나타난다.

> [이미지 6 — GitHub Actions에서 build와 deploy가 성공한 화면]

---

## 13. 드디어 블로그 접속하기

이제 브라우저에서:

```text
https://<username>.github.io
```

로 접속한다.

예:

```text
https://devlogu-test.github.io
```

Astro 기본 블로그 화면이 나타난다면 첫 배포에 성공한 것이다.

> [이미지 7 — 실제 `<username>.github.io` 주소에서 Astro Blog가 열린 화면]

여기서 개인적으로 가장 신기했던 부분은 이것이었다.

로컬에서 수정하고:

```bash
git add .
git commit
git push
```

하면 GitHub Actions가 자동으로 사이트를 다시 Build하고 배포한다.

별도의 서버에 접속해서 파일을 복사하거나 직접 배포 명령을 실행하지 않아도 된다.

앞으로 블로그를 수정하는 기본 작업 방식은 결국:

```text
코드 수정
   ↓
localhost에서 확인
   ↓
git push
   ↓
실제 블로그 자동 반영
```

이 된다.

---

## 마무리

이번 글에서는 아무것도 없는 상태에서:

```text
GitHub Pages 저장소 생성
        ↓
Astro Blog 설치
        ↓
localhost 실행
        ↓
GitHub Actions 설정
        ↓
첫 Commit / Push
        ↓
GitHub Pages 첫 배포
```

까지 진행했다.

아직 화면은 Astro 기본 Blog Template 그대로다.

다음 글에서는 GitHub Actions의 자동 배포 구조와 배포 과정에서 발생할 수 있는 문제를 조금 더 자세히 살펴본다.

**다음 글**

`GitHub Pages + Astro로 무료 개발 블로그 만들기 (2) — GitHub Actions 자동 배포`