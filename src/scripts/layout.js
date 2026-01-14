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

document.addEventListener('DOMContentLoaded', () => {
  loadLayout('#navbar', '../layouts/navbar.html', initNavbarScroll);
  loadLayout('#footer', '../layouts/footer.html');
});
