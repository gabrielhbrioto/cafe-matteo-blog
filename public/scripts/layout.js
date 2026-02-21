/* =========================================================
   UTIL: Load HTML Components
========================================================= */

async function loadLayout(selector, url) {
  const container = document.querySelector(selector);
  if (!container) {
    return null;
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    container.innerHTML = html;
    return container;
  } catch (err) {
    return null;
  }
}

/* =========================================================
   NAVBAR
========================================================= */

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isHome = document.body.classList.contains('page--home');

  // Se não for home, navbar sempre sólida
  if (!isHome) {
    navbar.classList.add('navbar--scrolled');
    return;
  }

  // Scroll behavior na home
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });
}

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

/* =========================================================
   VARIETY BADGES ANIMATION
========================================================= */

function initVarietyBadges() {
  const badges = document.querySelectorAll(".variety-badge");
  if (!badges.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  badges.forEach(badge => observer.observe(badge));
}

/* =========================================================
   VARIETIES TOGGLE (Saiba mais)
========================================================= */

function initVarietiesToggle() {
  const buttons = document.querySelectorAll('.varieties__toggle');
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.varieties__item');
      if (!item) return;

      item.classList.toggle('is-open');

      const expanded = item.classList.contains('is-open');
      button.setAttribute('aria-expanded', expanded);
      button.textContent = expanded ? 'Ocultar' : 'Saiba mais';
    });
  });
}

/* =========================================================
   WHATSAPP vs FOOTER OBSERVER
========================================================= */

function initWhatsappFooterObserver() {
  const footer = document.querySelector('.footer');
  const whatsapp = document.querySelector('.whatsapp-float');

  if (!footer || !whatsapp) return;

  function updatePosition() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Quanto o footer entrou na tela
    const overlap = Math.max(0, windowHeight - footerRect.top);

    // Margem base
    const baseBottom = 24;
    whatsapp.style.bottom = `${baseBottom + overlap}px`;
  }

  window.addEventListener('scroll', updatePosition);
  window.addEventListener('resize', updatePosition);
  updatePosition();
}

/* =========================================================
   MAIN BOOTSTRAP
========================================================= */

document.addEventListener('DOMContentLoaded', async () => {

  // Load Navbar
  await loadLayout('#navbar', '/cafe-matteo-blog/navbar.html');
  initNavbarScroll();

  // Load WhatsApp FIRST
  await loadLayout('#whatsapp', '/cafe-matteo-blog/whatsapp.html');

  // Load Footer AFTER WhatsApp
  await loadLayout('#footer', '/cafe-matteo-blog/footer.html');
  initWhatsappFooterObserver();

  // UI Effects
  initReveal();
  initVarietyBadges();
  initVarietiesToggle();
});