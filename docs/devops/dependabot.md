---
id: dependabot
title: Dependabot
sidebar_label: 🤖 Dependabot
sidebar_position: 3
---

# 🤖 Dependabot

> Atualização automática de dependências

O Dependabot é um serviço do GitHub que verifica suas dependências e cria PRs automaticamente quando há atualizações disponíveis.

---

## 📋 Configuração

Arquivo: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/web"
    schedule:
      interval: "weekly"
```

---

## 📚 Próximos Passos

- [Branch Protection](/docs/devops/branch-protection)
