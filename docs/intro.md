---
id: intro
title: Bem-vindo ao UberHub Mentorias
sidebar_label: 🏠 Início
slug: /
sidebar_position: 1
---

# 🎯 Portal de Documentação - UberHub Mentorias

> **Sistema de Mentorias que conecta profissionais experientes (Mentores) a pessoas que buscam orientação e desenvolvimento (Mentorados).**

---

## 🗺️ Escolha seu Caminho

:::tip Novo por aqui?
Comece pelos **[Guias Rápidos](/docs/guias-rapidos/inicio)** - escolha seu perfil e siga o passo a passo!
:::

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>🎓 Sou Mentorado</h3>
      </div>
      <div className="card__body">
        <p>Busco orientação profissional através de mentorias.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/guias-rapidos/mentorado">Começar como Mentorado</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>👨‍🏫 Sou Mentor</h3>
      </div>
      <div className="card__body">
        <p>Quero compartilhar minha experiência ajudando outros profissionais.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/guias-rapidos/mentor">Começar como Mentor</a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>⚙️ Sou Administrador</h3>
      </div>
      <div className="card__body">
        <p>Gerencio o programa de mentorias, vouchers e usuários.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/docs/guias-rapidos/admin">Guia do Admin</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>💻 Sou Desenvolvedor</h3>
      </div>
      <div className="card__body">
        <p>Quero entender a arquitetura e contribuir com o código.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/docs/guias-rapidos/desenvolvedor">Guia do Dev</a>
      </div>
    </div>
  </div>
</div>

---

## 📚 Navegação Rápida

| Área | Descrição | Link |
|------|-----------|------|
| 🚀 **Quick Start** | Guias de início rápido por perfil | [Ir →](/docs/guias-rapidos/inicio) |
| 🗺️ **Mapa do Conhecimento** | Visualização estilo "metrô" dos conteúdos | [Ir →](/docs/mapa-conhecimento) |
| 📖 **Roteiro de Estudos** | Backlog transformado em trilha de aprendizado | [Ir →](/docs/roteiro-estudos) |
| 🏗️ **Arquitetura** | Microsserviços, endpoints e fluxos | [Ir →](/docs/arquitetura/visao-geral) |
| 🔐 **Autenticação** | Firebase Auth, OAuth, JWT | [Ir →](/docs/autenticacao/firebase-auth-flow) |
| ⚙️ **DevOps** | CI/CD, GitHub Actions, padrões | [Ir →](/docs/devops/ci-cd-guia) |

---

## 🎬 O que você vai encontrar aqui

### 📋 Documentação Completa
- **Requisitos Funcionais** e Casos de Uso detalhados
- **Especificação de Endpoints** da API
- **Fluxos e Jornadas** dos usuários

### 🎓 Material de Aprendizado
- **Aulas** sobre Firebase Authentication
- **Guias** de configuração passo a passo
- **Padrões de código** e boas práticas

### 🛠️ Recursos Práticos
- **Backlog** organizado em épicos e sprints
- **Checklists** de implementação
- **Troubleshooting** comum

---

## 📊 Status do Projeto

| Componente | Status |
|------------|--------|
| 📱 App Mentorado | Em desenvolvimento |
| 📱 App Mentor | Em desenvolvimento |
| 🖥️ Painel Admin (Web) | Em desenvolvimento |
| 🔧 Backend (Microsserviços) | Em desenvolvimento |
| 📚 Documentação | ✅ Atualizada |

---

## 🏛️ Sobre o Projeto

**UberHub Mentorias** é um projeto desenvolvido pelo **IFTM - Instituto Federal do Triângulo Mineiro**, Campus Uberlândia Centro, para a disciplina de Projeto de Aplicação para Dispositivos Móveis.

### Tecnologias Utilizadas

| Frontend | Backend | Infraestrutura |
|----------|---------|----------------|
| React (Web) | Spring Boot | MongoDB Atlas |
| React Native (Mobile) | Java 17+ | Firebase Auth |
| Expo | Microsserviços | Docker |

---

<details>
<summary>💡 <strong>Decisão de Arquitetura (ADR-001)</strong>: Por que Docusaurus?</summary>

### Contexto
Precisávamos de uma solução para organizar e apresentar toda a documentação do projeto de forma profissional e navegável.

### Decisão
Escolhemos **Docusaurus** pelos seguintes motivos:
- ✅ Suporte nativo a Markdown
- ✅ Navegação automática com sidebars
- ✅ Busca integrada
- ✅ Suporte a versionamento de docs
- ✅ Deploy fácil no GitHub Pages
- ✅ Temas dark/light

### Consequências
- Positivas: Documentação profissional, fácil manutenção
- Negativas: Dependência de Node.js para build

</details>

---

## 🤝 Contribuindo

Encontrou um erro ou quer sugerir melhorias? 
- [Abra uma Issue no GitHub](https://github.com/angoti/mentorias-frontend/issues)
- [Consulte o guia de contribuição](/docs/devops/padroes-codigo)
