async function loadLayout(selector, url) {
  const container = document.querySelector(selector);
  if (!container) return;

  const response = await fetch(url);
  container.innerHTML = await response.text();
}

document.addEventListener('DOMContentLoaded', () => {
  loadLayout('#navbar', '../layouts/navbar.html');
  loadLayout('#footer', '../layouts/footer.html');
});
