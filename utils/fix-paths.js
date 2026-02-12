import fs from "fs";
import path from "path";

const STYLES_DIR = "public/styles";

function fixCss(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Remove qualquer ../../.. ou ../ antes de public/images
  content = content.replace(
    /url\((['"]?)(?:\.\.\/)+public\/images\//g,
    "url($1/images/"
  );

  // Caso raro: public/images sem ../
  content = content.replace(
    /url\((['"]?)\/?public\/images\//g,
    "url($1/images/"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("fixed:", filePath);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith(".css")) {
      fixCss(full);
    }
  }
}

walk(STYLES_DIR);

console.log("CSS paths normalized.");
