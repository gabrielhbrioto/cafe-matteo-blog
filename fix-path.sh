#!/usr/bin/env bash

echo "== Corrigindo HTML =="
find src public -type f -name "*.html" -exec sed -i \
  -e 's|href="/|href="|g' \
  -e 's|src="/|src="|g' {} +

echo "== Corrigindo CSS =="
find src public -type f -name "*.css" -exec sed -i \
  -e 's|url(/|url(|g' {} +

echo "== Corrigindo JS fetch =="
find src public -type f -name "*.js" -exec sed -i \
  -e 's|fetch("/|fetch("|g' {} +

echo "DONE."
