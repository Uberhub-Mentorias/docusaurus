---
id: ci-cd-guia
title: Guia de CI/CD
sidebar_label: ⚙️ CI/CD Guia
sidebar_position: 1
---

# ⚙️ Guia Completo de CI/CD

> Integração e Entrega Contínua com GitHub Actions

---

## 🎯 O que é CI/CD?

| Termo | Significado | Objetivo |
|-------|-------------|----------|
| **CI** | Continuous Integration | Integrar código frequentemente, rodar testes automáticos |
| **CD** | Continuous Delivery/Deployment | Entregar/deployar código automaticamente |

---

## 🔄 Pipeline de CI/CD

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Push   │ ─► │  Build  │ ─► │  Test   │ ─► │ Deploy  │
│         │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

---

## 📋 O que Automatizamos

1. **Lint** - Verificar padrões de código
2. **Build** - Compilar o projeto
3. **Test** - Rodar testes automatizados
4. **Deploy** - Publicar em produção

---

## 🛠️ Ferramentas Utilizadas

| Ferramenta | Propósito |
|------------|-----------|
| **GitHub Actions** | Pipeline de CI/CD |
| **ESLint** | Linting de código |
| **Vite** | Build do projeto web |
| **Expo EAS** | Build dos apps mobile |
| **GitHub Pages** | Hosting de documentação |

---

## 📚 Próximos Passos

- [GitHub Actions](/docs/devops/github-actions)
- [Dependabot](/docs/devops/dependabot)
- [Branch Protection](/docs/devops/branch-protection)
