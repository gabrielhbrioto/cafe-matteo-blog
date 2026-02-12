async function loadLayout(selector, url, callback) {
  const container = document.querySelector(selector);
  if (!container) return;

  const response = await fetch(url);
  container.innerHTML = await response.text();

  if (callback) callback();
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isHome = document.body.classList.contains('page--home');

  // Se NÃO for home, navbar sempre sólida
  if (!isHome) {
    navbar.classList.add('navbar--scrolled');
    navbar.classList.remove('navbar--transparent');
    return;
  }

  // Comportamento especial apenas na home
  const handleScroll = () => {
    if (window.scrollY === 0) {
      navbar.classList.add('navbar--transparent');
      navbar.classList.remove('navbar--scrolled');
    } else {
      navbar.classList.add('navbar--scrolled');
      navbar.classList.remove('navbar--transparent');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', () => {
  loadLayout('#navbar', '/navbar.html', initNavbarScroll);
  loadLayout('#footer', '/footer.html');
});

document.addEventListener("DOMContentLoaded", () => {

  const badges = document.querySelectorAll(".variety-badge");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, {
    threshold: 0.2
  });

  badges.forEach(badge => observer.observe(badge));

});
