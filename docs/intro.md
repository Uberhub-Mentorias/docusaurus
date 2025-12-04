---
id: intro
title: Bem-vindo ao UberHub Mentorias
sidebar_label: 🏠 Início
slug: /
sidebar_position: 1
---

import Link from '@docusaurus/Link';

# Portal de Documentação - UberHub Mentorias

Sistema de Mentorias que conecta profissionais experientes (Mentores) a pessoas que buscam orientação e desenvolvimento (Mentorados).

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

| Componente                  | Status             |
| --------------------------- | ------------------ |
| 📱 App Mentorado            | Em desenvolvimento |
| 📱 App Mentor               | Em desenvolvimento |
| 🖥️ Painel Admin (Web)       | Em desenvolvimento |
| 🔧 Backend (Microsserviços) | Em desenvolvimento |
| 📚 Documentação             | ✅ Atualizada      |

---

## 🏛️ Sobre o Projeto

**UberHub Mentorias** é um projeto desenvolvido pelo **IFTM - Instituto Federal do Triângulo Mineiro**, Campus Uberlândia Centro, para a disciplina de Projeto de Aplicação para Dispositivos Móveis.

### Tecnologias Utilizadas

| Frontend              | Backend        | Infraestrutura |
| --------------------- | -------------- | -------------- |
| React (Web)           | Spring Boot    | MongoDB Atlas  |
| React Native (Mobile) | Java 17+       | Firebase Auth  |
| Expo                  | Microsserviços | Docker         |

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


<details>
<summary>**ADR (Architecture Decision Record)**</summary>

é um documento que registra uma decisão arquitetônica significativa em um projeto de software, detalhando o contexto, as opções consideradas, a decisão tomada e suas consequências. Ele serve como um histórico para que a equipe entenda o porquê de certas escolhas, facilitando a comunicação, a integração de novos membros e a manutenção da arquitetura ao longo do tempo.
</details>

---

## 🤝 Contribuindo

Encontrou um erro ou quer sugerir melhorias?

- [Abra uma Issue no GitHub](https://github.com/uberhub-mentorias/docusaurus/issues)
- [Consulte o guia de contribuição](/docs/devops/padroes-codigo)
