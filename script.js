/* ===========================
   HEADER SCROLL EFFECT
=========================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ===========================
   MOBILE NAV TOGGLE
=========================== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openNav() {
  nav.classList.add('open');
  hamburger.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  nav.classList.contains('open') ? closeNav() : openNav();
});

overlay.addEventListener('click', closeNav);
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ===========================
   SCROLL ANIMATION (AOS-like)
=========================== */
const animatedElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      aosObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -48px 0px'
});

animatedElements.forEach(el => aosObserver.observe(el));

/* ===========================
   SECTION HEADER UNDERLINE
=========================== */
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

sectionHeaders.forEach(el => headerObserver.observe(el));

/* ===========================
   COUNTER ANIMATION
=========================== */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

const counterElements = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      // 섹션 등장 딜레이와 맞추기 위해 약간 지연
      const delay = parseInt(entry.target.closest('[data-aos-delay]')?.dataset.aosDelay || 0, 10);
      setTimeout(() => animateCounter(entry.target), delay);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

/* ===========================
   CARD HOVER TILT (subtle)
=========================== */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===========================
   NAV LINK ACTIVE STATE
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ===========================
   CONTACT FORM SUBMIT
=========================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = '상담 신청하기';
      btn.disabled = false;
      formSuccess.classList.add('show');

      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    }, 1000);
  });
}

/* ===========================
   PHONE NUMBER FORMATTING
=========================== */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 3) {
      this.value = value;
    } else if (value.length <= 7) {
      this.value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length <= 11) {
      this.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
    } else {
      this.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
  });
}
