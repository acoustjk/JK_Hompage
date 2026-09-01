document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     MOBILE NAVIGATION MENU
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navItems = document.querySelectorAll('.nav-item');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
    });
  });

  /* ==========================================
     NAVBAR SCROLL STYLING
     ========================================== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ==========================================
     INTERSECTION OBSERVER - REVEAL ANIMATIONS
     ========================================== */
  const sectionsToReveal = document.querySelectorAll('section:not(#home), .stats-grid, .about-details, .portfolio-grid');
  sectionsToReveal.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  sectionsToReveal.forEach(section => {
    revealObserver.observe(section);
  });

  /* ==========================================
     SCROLLSPY (ACTIVE NAV LINK SYNC)
     ========================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-item');

  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-70px 0px -50% 0px'
  });

  sections.forEach(section => {
    scrollspyObserver.observe(section);
  });

  /* ==========================================
     STATS COUNTER ANIMATION
     ========================================== */
  const statsSection = document.querySelector('.stats-grid');
  const statNumbers = document.querySelectorAll('.stat-number');
  let countStarted = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = current;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countStarted) {
        statNumbers.forEach(num => countUp(num));
        countStarted = true;
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* ==========================================
     PORTFOLIO CATEGORY FILTERING
     ========================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.remove('show');
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================
     PORTFOLIO DETAIL DATA & MODAL CONTROL
     ========================================== */
  const projectsData = {
    1: {
      title: "AI고치 - 캐릭터 교감형 어린이 AI 일기장 앱",
      category: "App Development / AI",
      client: "제이케이 자체 서비스",
      date: "출시 완료 (프로모션 진행 중 🔥)",
      tags: ["Flutter", "FastAPI", "OpenAI LLM", "Firebase", "WebSockets"],
      imgSrc: "assets/gochi_greeting.png",
      bgGrad: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      description: "아이가 오늘 하루의 주요 미션 단어 3개를 사용해 일기를 작성하면, 귀여운 글쓰기 단짝 요정 캐릭터 '고치(Gochi)'가 실시간으로 맞춤법 힌트와 표현력 교정 피드백을 전달하는 게임화(Gamification) 기반 어린이 교육용 어플리케이션입니다. 아이들이 일기를 2단계에 걸쳐 스스로 다듬어 완성하며 올바른 글쓰기 습관과 인지 능력을 형성하도록 설계되었습니다.",
      features: [
        "오늘의 미션 단어 3개를 활용한 2단계 어린이 일기 작성 프로세스",
        "글쓰기 요정 캐릭터 '고치(Gochi)'의 실시간 맞춤법 및 표현력 교정 피드백",
        "아동 흥미 유발을 위한 게임화(Gamification) 기반 칭찬 및 리워드 시스템"
      ],
      downloadUrl: "https://ai-gochi.com",
      storeLabel: "AI고치 공식 사이트 / 서비스 바로가기",
      qrData: "https://ai-gochi.com"
    },
    2: {
      title: "AI고치 웹 - QR 연동 PC 글쓰기 플랫폼",
      category: "Web Platform",
      client: "제이케이 자체 서비스",
      date: "출시 완료",
      tags: ["Next.js", "Firebase Auth", "HTML5/CSS3", "QR Login Sync"],
      imgSrc: "assets/gochi_thinking.png",
      bgGrad: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      description: "스마트폰 모바일 화면에서 일기를 치기 어려운 아동들을 위해 물리적 키보드를 탑재한 데스크톱/노트북 PC에서 간편하게 글을 쓸 수 있게 돕는 웹 플랫폼입니다. 자녀용 스마트폰 앱 카메라로 PC 화면에 생성된 일회성 QR 코드를 간편하게 스캔하면, 비밀번호 입력 없이 3초 이내에 동기화 로그인이 완료되는 혁신적인 사용자 인증 및 작성 동기화 기능을 구현했습니다.",
      features: [
        "물리적 키보드 탑재 PC 환경을 위한 아동 전용 쾌적한 웹 인터페이스",
        "스마트폰 앱 카메라 스캔 기반 3초 일회성 QR 자동 승인 및 즉시 로그인",
        "모바일-PC 간 실시간 작성 일기 데이터 및 이미지 동기화 엔진"
      ],
      downloadUrl: "https://ai-gochi.com",
      storeLabel: "AI고치 PC 웹 바로가기",
      qrData: "https://ai-gochi.com"
    },
    3: {
      title: "AI고치 보호자용 - 자녀 학습 분석 성장 리포트",
      category: "UX/UI Design & Dashboard",
      client: "제이케이 자체 서비스",
      date: "출시 완료 (프로모션 진행 중 🔥)",
      tags: ["Figma", "UI/UX Design", "React Native", "Data Visualization"],
      imgSrc: "assets/gochi_success.png",
      bgGrad: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      description: "자녀가 일기를 최종 완성할 때마다 자동으로 전송되는 학부모용 AI 분석 대시보드 리포트 서비스입니다. 자녀의 맞춤법 점수 향상 추이, 표현력 스코어, 일기 연속 작성일 수 등을 한눈에 확인하고, 완성된 아이의 귀여운 그림/텍스트 일기를 이미지나 PDF 문서로 보존/인쇄할 수 있는 학부모 전용 연동 및 분석 대시보드 플랫폼입니다.",
      features: [
        "자녀의 맞춤법, 표현력 스코어 및 성장 그래프 대시보드 시각화",
        "일기 완성 시 학부모 실시간 푸시 알림 & 고화질 PDF 리포트 출력",
        "자녀 일기 디지털 보관함 및 AI 종합 학업 피드백 모니터링"
      ],
      downloadUrl: "https://ai-gochi.com",
      storeLabel: "학부모 대시보드 리포트 접속",
      qrData: "https://ai-gochi.com"
    },
    4: {
      title: "깜빡 - 유통기한 & 기프티콘 스마트 D-Day 리마인더 앱",
      category: "App Development / Utility",
      client: "제이케이 자체 서비스",
      date: "출시 완료 (Google Play)",
      tags: ["Kotlin", "Android SDK", "Room Database", "WorkManager", "AlarmManager"],
      imgSrc: "assets/kkambbak_icon.png",
      bgGrad: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      description: "일상 속 모든 유효기간과 유통기한을 한곳에서 쉽고 깔끔하게 관리하고, 약속된 시간에 확실한 D-Day 푸시 알림을 제공하는 스마트 리마인더 앱입니다. 선물받은 쿠폰, 영화 관람권 등 기프티콘부터 냉장고 속 우유, 통조림 등 식품의 유통기한까지 모든 종류의 기한을 직관적으로 등록하고 정확하게 계산된 D-Day 알림을 지원합니다.",
      features: [
        "기프티콘, 쿠폰 및 식품/약품 유통기한 D-Day 자동 정밀 계산",
        "Android WorkManager 기반 놓치지 않는 백그라운드 푸시 알림",
        "이미지 바코드 보관함 및 직관적인 D-Day 카테고리 필터링"
      ],
      downloadUrl: "https://play.google.com/store/apps/details?id=com.acoustjk.myapp",
      storeLabel: "Google Play 스토어 다운로드",
      qrData: "https://play.google.com/store/apps/details?id=com.acoustjk.myapp"
    },
    5: {
      title: "모두의 MBTI — 지인 성격 갭 분석 플랫폼",
      category: "Web & Android Native Service",
      client: "제이케이 자체 서비스",
      date: "서비스 운영 중 (Web & Android)",
      tags: ["React / Next.js", "Android Native", "Dynamic Quiz Engine", "Psychology Analytics", "Keyword Tagging"],
      imgSrc: "assets/mbti_icon.png",
      bgGrad: "linear-gradient(135deg, #f3e8ff 0%, #ddd6fe 100%)",
      description: "내가 아는 나 vs 친구들이 보는 나의 MBTI 인식 차이(Gap)를 10가지 동적 질문과 키워드 태그로 정밀 진단하는 차세대 심리 반응 분석 서비스입니다.",
      features: [
        "내가 아는 나 vs 타인이 보는 나 10가지 동적 갭 진단 질문엔진",
        "지인 공유용 고유 링크 생성 및 인상 태그 반응 채점 시스템",
        "MBTI 인식 차이 다이어그램 분석 결과 리포트 및 SNS 공유"
      ],
      downloadUrl: "https://company-jk.com/mbti/",
      storeLabel: "🚀 모두의 MBTI 서비스 보러가기",
      qrData: "https://company-jk.com/mbti/"
    },
    6: {
      title: "빵판 시뮬레이터 — 정보통신 & 전자회로 실시간 브레드보드 시뮬레이션",
      category: "Circuit Simulation & Signal Processing",
      client: "제이케이 자체 서비스",
      date: "서비스 운영 중 (Web Platform)",
      tags: ["JavaScript Engine", "Node Voltage Inspector", "Signal Modulation (DtoA / PAM / TDM)", "Web Canvas", "Interactive Circuit Emulation"],
      imgSrc: "assets/breadboard_icon.png",
      bgGrad: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      description: "웹 브라우저 상에서 가상의 빵판(Breadboard)에 회로 부품 및 노드를 배치하고 실시간 전압과 신호를 분석할 수 있는 차세대 인터랙티브 회로 시뮬레이터입니다. DtoA(디지털-아날로그 변환), PAM(펄스 진폭 변조), PNM, TDM(시분할 다중화) 등 정보통신 및 전자공학의 핵심 회로 모듈을 실시간으로 구성하고 전압/파형 노드를 정밀하게 검증할 수 있는 교육 및 실무 프로토타이핑 웹 엔진입니다.",
      features: [
        "🎛️ <b>인터랙티브 브레드보드 배선</b>: 가상의 빵판에 저항, LED, 스위치, IC 칩 부품 배치 및 노드 연결",
        "⚡ <b>신호 변조 & 복조 회로 분석</b>: DtoA (디지털-아날로그), PAM (펄스 진폭 변조), PNM, TDM (시분할 다중화) 완벽 지원",
        "🔬 <b>노드 전압 & 파형 인스펙터</b>: 각 핀 및 선로별 실시간 전압 측정과 신호 파형 검증",
        "📁 <b>완성형 회로 프리셋 제공</b>: DtoA_fixed, PAM_fixed, TDM_fixed 등 실무 회로 데이터 즉시 로드"
      ],
      downloadUrl: "https://breadboard.company-jk.com",
      storeLabel: "🔌 빵판 시뮬레이터 보러가기",
      qrData: "https://breadboard.company-jk.com"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  // Open Modal
  portfolioCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // direct-link (직접 이동 링크 뱃지/버튼) 클릭 시 모달 팝업 생략
      if (e.target.closest('.direct-link')) {
        return;
      }

      const projId = card.getAttribute('data-project-id');
      const data = projectsData[projId];

      if (data) {
        const tagsHtml = data.tags.map(tag => `<span class="badge">${tag}</span>`).join(' ');
        
        const featuresHtml = data.features ? data.features.map(item => `
          <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.95rem; color: #334155; line-height: 1.6;">
            <i class="fa-solid fa-check" style="color: #7c3aed; margin-top: 4px; font-size: 0.85rem;"></i>
            <span>${item}</span>
          </li>
        `).join('') : '';

        const featuresBlock = data.features ? `
          <div class="modal-features-box" style="margin-top: 24px; padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border: 1.5px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-wand-magic-sparkles" style="color: #7c3aed;"></i> 핵심 주요 기능 & 특징
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
              ${featuresHtml}
            </ul>
          </div>
        ` : '';

        modalBody.innerHTML = `
          <div class="modal-proj-header">
            <span class="modal-proj-tag">${data.category}</span>
            <h3 class="modal-proj-title">${data.title}</h3>
          </div>
          <div class="modal-proj-img-wrapper" style="width: 100%; height: 360px; display: flex; align-items: center; justify-content: center; background: ${data.bgGrad}; border-radius: 16px; margin-bottom: 32px; padding: 30px; box-sizing: border-box;">
            <img src="${data.imgSrc}" alt="${data.title}" style="height: 100%; width: auto; object-fit: contain; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.08));">
          </div>
          <div class="modal-proj-content">
            <div class="modal-proj-desc">
              <h4>프로젝트 개요</h4>
              <p>${data.description}</p>
              ${featuresBlock}
            </div>
            <div class="modal-proj-meta">
              <div class="meta-group">
                <span class="meta-lbl">클라이언트</span>
                <span class="meta-val">${data.client}</span>
              </div>
              <div class="meta-group">
                <span class="meta-lbl">서비스 상태</span>
                <span class="meta-val" style="color: #2563eb; font-weight: 700;">${data.date}</span>
              </div>
              <div class="meta-group">
                <span class="meta-lbl">사용 기술 스택</span>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                  ${tagsHtml}
                </div>
              </div>
            </div>
          </div>
          
          <!-- QR Code & Download Action Box -->
          <div class="modal-qr-box">
            <div class="modal-qr-img-wrapper">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(data.qrData)}" alt="${data.title} QR 코드">
            </div>
            <div class="modal-qr-info">
              <div class="modal-qr-title">
                <i class="fa-solid fa-qrcode" style="color: var(--color-primary);"></i> QR 코드로 바로 이동 & 다운로드
              </div>
              <div class="modal-qr-desc">
                스마트폰 카메라로 QR 코드를 스캔하시면 공식 서비스 주소로 바로 연결됩니다.
              </div>
              <a href="${data.downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-qr-download">
                ${data.storeLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        `;

        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  projectModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
      closeModal();
    }
  });

});
