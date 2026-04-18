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
});

/* ===========================
   MOBILE NAV TOGGLE
=========================== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

// Create overlay element
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
  if (nav.classList.contains('open')) {
    closeNav();
  } else {
    openNav();
  }
});

overlay.addEventListener('click', closeNav);

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

/* ===========================
   SMOOTH SCROLL FOR ANCHOR LINKS
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

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

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

    // Simulate async submission (replace with actual endpoint if needed)
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = '상담 신청하기';
      btn.disabled = false;
      formSuccess.classList.add('show');

      // Hide success message after 6 seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 6000);
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
