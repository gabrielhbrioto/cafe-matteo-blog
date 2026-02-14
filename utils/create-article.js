import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function contentLoop(article) {
  while (true) {
    console.log("\nEscolha o tipo de bloco:");
    console.log("1 - paragraph");
    console.log("2 - image");
    console.log("3 - quote");
    console.log("4 - subtitle");
    console.log("5 - list");
    console.log("0 - finalizar");

    const option = await ask("> ");

    if (option === "0") break;

    if (option === "1") {
      const text = await ask("Parágrafo:\n");
      article.content.push({
        type: "paragraph",
        text
      });
    }

    if (option === "2") {
      const src = await ask("Caminho da imagem:\n");
      const alt = await ask("Texto alternativo:\n");
      article.content.push({
        type: "image",
        src,
        alt
      });
    }

    if (option === "3") {
      const text = await ask("Quote:\n");
      article.content.push({
        type: "quote",
        text
      });
    }

    if (option === "4") {
      const text = await ask("Subtitle:\n");
      article.content.push({
        type: "subtitle",
        text
      });
    }

    if (option === "5") {
      console.log("\nTipo de lista:");
      console.log("1 - numerada");
      console.log("2 - não numerada");

      const listType = await ask("> ");
      const ordered = listType === "1";

      const items = [];

      console.log("\nDigite os itens da lista.");
      console.log("Deixe vazio e pressione ENTER para finalizar.\n");

      while (true) {
        const item = await ask(`Item ${items.length + 1}: `);
        if (!item.trim()) break;
        items.push(item);
      }

      if (items.length > 0) {
        article.content.push({
          type: "list",
          ordered,
          items
        });

        console.log("Lista adicionada.");
      } else {
        console.log("Lista vazia ignorada.");
      }
    }

    console.log("Bloco adicionado.");
  }
}

(async () => {
  console.log("\n=== Novo Artigo ===\n");

  const title = await ask("Título: ");
  const author = await ask("Autor: ");
  const excerpt = await ask("Resumo curto: ");
  const coverImage = await ask("Imagem de capa: ");
  const tagsRaw = await ask("Tags (separadas por vírgula): ");

  const slug = slugify(title);

  const article = {
    id: slug,
    slug,
    title,
    author,
    excerpt,
    coverImage: `articles/${coverImage}`,
    publishedAt: new Date().toISOString().split("T")[0],
    tags: tagsRaw.split(",").map(t => t.trim()).filter(Boolean),
    content: []
  };

  await contentLoop(article);

  fs.writeFileSync(
    `content/articles/${slug}.json`,
    JSON.stringify(article, null, 2)
  );

  console.log(`\nArtigo salvo em content/articles/${slug}.json`);

  rl.close();
})();
