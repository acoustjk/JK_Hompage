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
      date: "론칭 준비중",
      tags: ["Flutter", "FastAPI", "OpenAI LLM", "Firebase", "WebSockets"],
      imgSrc: "assets/gochi_greeting.png",
      bgGrad: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      description: "아이가 오늘 하루의 주요 미션 단어 3개를 사용해 일기를 작성하면, 귀여운 글쓰기 단짝 요정 캐릭터 '고치(Gochi)'가 실시간으로 맞춤법 힌트와 표현력 교정 피드백을 전달하는 게임화(Gamification) 기반 어린이 교육용 어플리케이션입니다. 아이들이 일기를 2단계에 걸쳐 스스로 다듬어 완성하며 올바른 글쓰기 습관과 인지 능력을 형성하도록 설계되었습니다."
    },
    2: {
      title: "AI고치 웹 - QR 연동 PC 글쓰기 플랫폼",
      category: "Web Platform",
      client: "제이케이 자체 서비스",
      date: "론칭 준비중",
      tags: ["Next.js", "Firebase Auth", "HTML5/CSS3", "QR Login Sync"],
      imgSrc: "assets/gochi_thinking.png",
      bgGrad: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      description: "스마트폰 모바일 화면에서 일기를 치기 어려운 아동들을 위해 물리적 키보드를 탑재한 데스크톱/노트북 PC에서 간편하게 글을 쓸 수 있게 돕는 웹 플랫폼입니다. 자녀용 스마트폰 앱 카메라로 PC 화면에 생성된 일회성 QR 코드를 간편하게 스캔하면, 비밀번호 입력 없이 3초 이내에 동기화 로그인이 완료되는 혁신적인 사용자 인증 및 작성 동기화 기능을 구현했습니다."
    },
    3: {
      title: "AI고치 보호자용 - 자녀 학습 분석 성장 리포트",
      category: "UX/UI Design & Dashboard",
      client: "제이케이 자체 서비스",
      date: "론칭 준비중",
      tags: ["Figma", "UI/UX Design", "React Native", "Data Visualization"],
      imgSrc: "assets/gochi_success.png",
      bgGrad: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      description: "자녀가 일기를 최종 완성할 때마다 자동으로 전송되는 학부모용 AI 분석 대시보드 리포트 서비스입니다. 자녀의 맞춤법 점수 향상 추이, 표현력 스코어, 일기 연속 작성일 수 등을 한눈에 확인하고, 완성된 아이의 귀여운 그림/텍스트 일기를 이미지나 PDF 문서로 보존/인쇄할 수 있는 학부모 전용 연동 및 분석 대시보드 플랫폼입니다."
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  // Open Modal
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      const data = projectsData[projId];

      if (data) {
        const tagsHtml = data.tags.map(tag => `<span class="badge">${tag}</span>`).join(' ');

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
            </div>
            <div class="modal-proj-meta">
              <div class="meta-group">
                <span class="meta-lbl">클라이언트</span>
                <span class="meta-val">${data.client}</span>
              </div>
              <div class="meta-group">
                <span class="meta-lbl">완료일</span>
                <span class="meta-val">${data.date}</span>
              </div>
              <div class="meta-group">
                <span class="meta-lbl">사용 기술 스택</span>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                  ${tagsHtml}
                </div>
              </div>
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
