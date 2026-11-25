# 제이케이 (JK) 공식 홈페이지 (`company-jk.com`)

신뢰와 기술로 새로운 성공을 디자인하는 비즈니스 파트너, **제이케이 (JK)**의 공식 포트폴리오 웹사이트 저장소입니다.

## 🌐 배포 주소
- **공식 홈페이지**: [https://company-jk.com](https://company-jk.com)
- **GitHub 저장소**: `https://github.com/acoustjk/JK_Hompage.git`

---

## 💻 다른 PC (Antigravity)에서 바로 이어서 작업하는 방법

새로운 PC의 Antigravity 환경에서 아래 절차만 진행하시면, 기존 작업 내역과 AI 컨텍스트(회사 규칙, 포트폴리오 구조 등)를 100% 동일하게 이어받아 바로 작업하실 수 있습니다.

### 1단계: 프로젝트 클론 (터미널 또는 Antigravity에게 요청)
새 PC의 Antigravity 채팅창에 아래와 같이 입력하거나 터미널에서 클론합니다:
```bash
git clone https://github.com/acoustjk/JK_Hompage.git
```
> 💡 **팁**: 새 PC의 Antigravity 채팅창에 **"https://github.com/acoustjk/JK_Hompage.git 클론해서 워크스페이스로 열어줘"** 라고만 말씀하셔도 AI가 알아서 세팅합니다.

### 2단계: Antigravity 워크스페이스 열기
- 클론한 `JK_Hompage` 폴더를 Antigravity의 **Active Workspace (작업 폴더)**로 엽니다.
- 저장소 내 `.agents/rules/project-context.md` 파일에 **제이케이(JK) 홈페이지 전용 AI 규칙 및 히스토리**가 내장되어 있어, 새 PC의 Antigravity가 별도의 설명 없이도 프로젝트의 모든 맥락을 자동으로 인식합니다.

---

## 📂 주요 파일 구조
- `index.html`: 메인 홈페이지 마크업 및 포트폴리오 카드 그리드
- `css/styles.css`: 반응형 스타일시트 및 뱃지/모달 디자인
- `js/main.js`: 포트폴리오 상세 모달 데이터(`projectsData`), QR 코드 자동 생성 및 필터링 로직
- `assets/`: 브랜드 로고 및 각 서비스 3D 아이콘 에셋
- `CNAME`: GitHub Pages 커스텀 도메인(`company-jk.com`) 설정 파일
- `.agents/rules/project-context.md`: Antigravity AI 에이전트 자동 컨텍스트 규칙 파일
