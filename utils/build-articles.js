import fs from "fs";
import path from "path";

const ARTICLES_DIR = "content/articles";
const OUTPUT_DIR = "dist/artigos";

if (!fs.existsSync("dist")) fs.mkdirSync("dist");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function formatInline(text) {
  return text
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<u>$1</u>")
    .replace(/~(.*?)~/g, "<em>$1</em>");
}

function renderBlock(block) {
  switch (block.type) {
    case "paragraph":
      return `<p>${formatInline(block.text)}</p>`;

    case "subtitle":
      return `<h2>${formatInline(block.text)}</h2>`;

    case "quote":
      return `<blockquote>${formatInline(block.text)}</blockquote>`;

    case "image":
      return `<img src="${block.src}" alt="${block.alt || ""}" />`;

    case "list":
      const tag = block.ordered ? "ol" : "ul";
      return `
        <${tag}>
          ${block.items.map(i => `<li>${formatInline(i)}</li>`).join("")}
        </${tag}>
      `;

    default:
      return "";
  }
}

function buildArticle(article) {
  const contentHtml = article.content.map(renderBlock).join("\n");

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${article.title}</title>

  <link rel="stylesheet" href="/cafe-matteo-blog/styles/main.css" />
  <link rel="stylesheet" href="/cafe-matteo-blog/styles/pages/artigo.css">

  <script src="/cafe-matteo-blog/scripts/layout.js" defer></script>
</head>

<body class="page page--internal">

<header id="navbar"></header>

<main class="artigo">
  <div class="artigo__container">

    <header class="artigo__header">
      <h1>${article.title}</h1>
      <p>${article.author} — ${article.publishedAt}</p>
      <img src="/cafe-matteo-blog/images/${article.coverImage}">
    </header>

    <section class="content">
      ${contentHtml}
    </section>

  </div>
</main>

<footer id="footer"></footer>

</body>
</html>
`;
}

const files = fs.readdirSync(ARTICLES_DIR);

for (const file of files) {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file));
  const article = JSON.parse(raw);

  const html = buildArticle(article);

  const outputPath = path.join(OUTPUT_DIR, `${article.slug}.html`);
  fs.writeFileSync(outputPath, html);

  console.log(`Gerado: ${outputPath}`);
}

console.log("\nTodos os artigos foram gerados.");
