// ============================================================
//  CAMPUS CONNECT — MAIN JS
// ============================================================

// ---- Mobile nav toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ---- Scroll-aware nav ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(10,10,18,0.98)'
      : 'rgba(10,10,18,0.85)';
  });
}

// ---- Toast helper ----
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3000);
}
window.showToast = showToast;

// ---- Filter buttons ----
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- QR Modal ----
const qrModal = document.getElementById('qrModal');
if (qrModal) {
  document.querySelectorAll('.reg-qr').forEach(btn => {
    btn.addEventListener('click', () => qrModal.classList.add('open'));
  });
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('open');
  });
  const qrClose = document.getElementById('qrClose');
  if (qrClose) qrClose.addEventListener('click', () => qrModal.classList.remove('open'));
}

// ---- Registration handler ----
document.querySelectorAll('.event-reg').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const original = btn.textContent;
    btn.textContent = 'Registered ✓';
    btn.style.color = 'var(--green)';
    showToast('Registered! Your QR pass is ready in your dashboard.');
    setTimeout(() => {
      btn.textContent = original;
      btn.style.color = '';
    }, 3000);
  });
});

// ---- Auth forms ----
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome back! Redirecting to dashboard…');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Account created! Check your email to verify.');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1800);
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent! We\'ll be in touch within 24 hours.');
    contactForm.reset();
  });
}

// ---- Club follow buttons ----
document.querySelectorAll('.club-follow-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const following = btn.dataset.following === 'true';
    if (following) {
      btn.textContent = 'Follow';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-ghost');
      btn.dataset.following = 'false';
      showToast('Unfollowed club.');
    } else {
      btn.textContent = 'Following ✓';
      btn.classList.remove('btn-ghost');
      btn.classList.add('btn-primary');
      btn.dataset.following = 'true';
      showToast('Following! You\'ll get updates from this club.');
    }
  });
});
