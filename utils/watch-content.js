import chokidar from "chokidar";
import { exec } from "child_process";

function build() {
  console.log("Gerando artigos...");
  exec("node utils/build-articles.js && node utils/build-articles-index.js");
}

// BUILD INICIAL
build();

const watcher = chokidar.watch([
  "content/articles",
  "utils/build-articles.js",
  "utils/build-articles-index.js"
]);

console.log("Observando artigos...");

watcher.on("change", () => {
  build();
});
