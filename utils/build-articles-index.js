import fs from "fs";
import path from "path";

const ARTICLES_DIR = "content/articles";
const OUTPUT_FILE =
  process.env.NODE_ENV === "production"
    ? "dist/artigos/index.html"
    : "src/pages/artigos/index.html";

const files = fs.readdirSync(ARTICLES_DIR);

const articles = files.map(file => {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file));
  return JSON.parse(raw);
});

// ordena por data (mais recente primeiro)
articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const itemsHtml = articles.map(article => {
  return `
<li class="artigos-item">
  <a href="/cafe-matteo-blog/artigos/${article.slug}">
    <h2>${article.title}</h2>
    <p>${article.excerpt}</p>
    <span>${article.publishedAt}</span>
  </a>
</li>
`;
}).join("\n");

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Artigos</title>

  <link rel="stylesheet" href="/cafe-matteo-blog/styles/main.css" />
  <link rel="stylesheet" href="/cafe-matteo-blog/styles/pages/artigos.css">

  <script src="/cafe-matteo-blog/scripts/layout.js" defer></script>
</head>

<body class="page page--internal">

<header id="navbar"></header>

<main class="page--artigos">
  <div class="page--artigos__container">

    <h1>Artigos</h1>

    <ul class="artigos-list">
      ${itemsHtml}
    </ul>

  </div>
</main>

<footer id="footer"></footer>

</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, html);

console.log("Página de listagem de artigos gerada.");
