---
id: github-actions
title: GitHub Actions
sidebar_label: 🔄 GitHub Actions
sidebar_position: 2
---

# 🔄 GitHub Actions

> Workflows automatizados para CI/CD

---

## 📋 Workflows Disponíveis

Os workflows estão definidos em `.github/workflows/`.

---

## 🔧 Exemplo de Workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 📚 Próximos Passos

- [Dependabot](/docs/devops/dependabot)
- [Branch Protection](/docs/devops/branch-protection)
