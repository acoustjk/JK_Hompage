---
name: project-context
description: 제이케이 (JK) 공식 홈페이지 (company-jk.com) 프로젝트 컨텍스트, 구조 및 유지보수 규칙
---

# 제이케이 (JK) 홈페이지 프로젝트 가이드 (Antigravity Rules)

이 프로젝트는 **제이케이 (JK)**의 공식 포트폴리오 웹사이트이며, 다른 PC나 새로운 Antigravity 세션에서 작업을 이어갈 때 아래 규칙과 컨텍스트를 반드시 준수해야 합니다.

## 1. 기업 및 브랜드 기본 정보
- **회사명**: **제이케이 (JK)**
  - ⚠️ 주의: 법인(`(주)`)이 아니므로 어떠한 경우에도 `(주)제이케이` 형태로 표기하지 않습니다.
- **이메일**: `company.jk0000@gmail.com`
- **주소**: `경기도 양주시 옥정동로7다길 74, 6층 B64호`
- **기타**: 대표전화 번호 및 소셜 미디어 아이콘은 푸터/연락처에 표기하지 않습니다.

## 2. 호스팅 및 도메인 환경
- **GitHub 저장소**: `https://github.com/acoustjk/JK_Hompage.git` (기본 브랜치: `main`)
- **호스팅**: GitHub Pages (루트 디렉토리의 `CNAME` 파일을 통해 커스텀 도메인 유지)
- **메인 도메인**: `https://company-jk.com` (Cloudflare DNS 연동)
- **서브 도메인 / 경로 서비스**:
  - 모두의 MBTI: `https://company-jk.com/mbti/`
  - 빵판 시뮬레이터: `https://breadboard.company-jk.com` (별도 저장소 `acoustjk/breadboard` 연동)
- **구글 검색 콘솔 인증**: 루트의 `google3785ab88a6e8edff.html` 및 `index.html` 내 `google-site-verification` 메타 태그를 절대 삭제하지 마세요.

## 3. 프로젝트 파일 구조
- `index.html`: 메인 랜딩 페이지 (Hero, About, Services, Portfolio Grid, Contact, Footer, Detail Modal)
- `css/styles.css`: 전체 스타일시트 (반응형 레이아웃, `.status-badge`, `.direct-link`, 모달 및 QR 박스 스타일)
- `js/main.js`:
  - 포트폴리오 필터링 및 모달 팝업 렌더링 (`projectsData` 객체에서 각 프로젝트의 상세 정보, 기술 스택 `tags`, 핵심 주요 기능 `features`, `downloadUrl`, `qrData` 관리)
  - `.direct-link` 클래스를 가진 뱃지(`<a>`) 클릭 시 모달 팝업이 뜨지 않고 즉시 해당 서비스 URL로 새 탭 이동하도록 이벤트 예외 처리되어 있음 (`e.target.closest('.direct-link')`)
- `assets/`: 로고(`logo-jk.png`) 및 각 포트폴리오 3D/공식 아이콘 이미지

## 4. 현재 등록된 포트폴리오 목록 (`data-project-id`)
1. **ID 1 (`ai`)**: `AI고치 - 캐릭터 교감형 어린이 AI 일기장 앱` (`https://ai-gochi.com`) - 프로모션 진행 중 / 출시 완료
2. **ID 2 (`dev`)**: `AI고치 웹 - QR 연동 PC 글쓰기 플랫폼` (`https://ai-gochi.com`) - 출시 완료
3. **ID 3 (`design`)**: `AI고치 보호자용 - 자녀 학습 분석 성장 리포트` (`https://ai-gochi.com`) - 프로모션 진행 중 / 출시 완료
4. **ID 4 (`dev`)**: `깜빡 - 유통기한 & 기프티콘 스마트 D-Day 리마인더 앱` (`https://play.google.com/store/apps/details?id=com.acoustjk.myapp`) - 출시 완료 (Google Play)
5. **ID 5 (`dev`)**: `모두의 MBTI — 지인 성격 갭 분석 플랫폼` (`https://company-jk.com/mbti/`) - 신규 서비스
6. **ID 6 (`dev`)**: `빵판 시뮬레이터 — 정보통신 & 전자회로 브레드보드 시뮬레이션` (`https://breadboard.company-jk.com`) - 신규 웹 플랫폼

## 5. 신규 포트폴리오 추가 및 배포 가이드
1. **이미지 에셋 추가**: `assets/` 폴더에 아이콘/썸네일 이미지를 저장합니다.
2. **`index.html` 카드 추가**: `.portfolio-grid` 내부에 `.portfolio-card` 블록을 추가하고 `data-category`와 고유 `data-project-id`를 부여합니다. 바로가기 버튼에는 `status-badge live direct-link` 클래스를 적용합니다.
3. **`js/main.js` 데이터 등록**: `projectsData` 객체에 동일한 ID 키로 `title`, `category`, `client`, `date`, `tags`, `imgSrc`, `bgGrad`, `description`, `features`(배열), `downloadUrl`, `storeLabel`, `qrData`를 등록합니다.
4. **배포**: 작업 완료 후 `git add`, `git commit`, `git push origin main`을 실행하면 GitHub Pages를 통해 약 1분 내 `company-jk.com`에 자동 반영됩니다.
