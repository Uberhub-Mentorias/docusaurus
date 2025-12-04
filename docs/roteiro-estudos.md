---
id: roteiro-estudos
title: Roteiro de Estudos
sidebar_label: 📖 Roteiro de Estudos
sidebar_position: 4
---

import Link from '@docusaurus/Link';

# 📖 Roteiro de Estudos

> O backlog do projeto transformado em uma trilha prática de aprendizado

---

## 🎯 Escolha sua Persona

Antes de começar, identifique seu objetivo principal:

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🌱 Iniciante</h3>
      </div>
      <div className="card__body">
        <p>Nunca trabalhei com essas tecnologias</p>
        <strong>Tempo: ~40h</strong>
      </div>
      <div className="card__footer">
        <Link to="#trilha-iniciante">Ver Trilha →</Link>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🚀 Intermediário</h3>
      </div>
      <div className="card__body">
        <p>Conheço React/React Native mas quero dominar auth</p>
        <strong>Tempo: ~25h</strong>
      </div>
      <div className="card__footer">
        <Link to="#trilha-intermediario">Ver Trilha →</Link>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>⚡ Avançado</h3>
      </div>
      <div className="card__body">
        <p>Quero apenas implementar rapidamente</p>
        <strong>Tempo: ~15h</strong>
      </div>
      <div className="card__footer">
        <Link to="#trilha-avancado">Ver Trilha →</Link>
      </div>
    </div>
  </div>
</div>

---

## 🌱 Trilha Iniciante {#trilha-iniciante}

> Para quem está começando do zero

### Semana 1: Fundamentos

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | O que é o projeto UberHub Mentorias | 1h | [Intro](/docs/) |
| 2 | Arquitetura de Microsserviços (conceito) | 2h | [Visão Geral](/docs/arquitetura/visao-geral) |
| 3 | Jornadas dos Usuários | 2h | [Fluxos](/docs/arquitetura/fluxos-jornadas) |
| 4 | Requisitos e Casos de Uso | 3h | [Especificação](/docs/requisitos/especificacao) |
| 5 | Revisão + Prática | 2h | Releia e faça anotações |

**📝 Exercício da Semana:**
> Desenhe em papel o fluxo completo de uma mentoria, desde o cadastro do mentorado até a avaliação final.

---

### Semana 2: Autenticação (Teoria)

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | O que é OAuth 2.0 e JWT | 1h | [Firebase Auth Flow](/docs/autenticacao/firebase-auth-flow) |
| 2 | Padrão Observer e Eventos | 1h | [Padrões de Código](/docs/devops/padroes-codigo) |
| 3 | Fluxo de Login (teoria) | 2h | [Aula Firebase Auth](/docs/autenticacao/aula-firebase-auth) |
| 4 | Refresh Tokens e Renovação | 2h | [Aula Firebase Auth](/docs/autenticacao/aula-firebase-auth) |
| 5 | Revisão + Exercício | 2h | — |

**📝 Exercício da Semana:**
> Explique com suas palavras: Por que usamos ID Token do Firebase E JWT próprio do backend?

---

### Semana 3: Configuração de Ambiente

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | Instalar Node.js e Git | 1h | [Guia Dev](/docs/guias-rapidos/desenvolvedor) |
| 2 | Clonar repositório e estrutura | 1h | [Guia Dev](/docs/guias-rapidos/desenvolvedor) |
| 3 | Configurar Firebase Console | 2h | [Configuração Completa](/docs/autenticacao/configuracao-completa) |
| 4 | Variáveis de ambiente | 1h | [Guia Dev](/docs/guias-rapidos/desenvolvedor) |
| 5 | Rodar projeto web local | 2h | Hands-on |

**📝 Exercício da Semana:**
> Consiga rodar o projeto web localmente com `npm run dev`

---

### Semana 4: Implementação Básica

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1-2 | Serviço de API (api.js) | 3h | [Épico 2: Core](/docs/backlog/epico-2-core) |
| 3-4 | AuthContext básico | 4h | [Épico 2: Core](/docs/backlog/epico-2-core) |
| 5 | Página de Login | 3h | [Épico 2: Core](/docs/backlog/epico-2-core) |

**📝 Exercício da Semana:**
> Faça login com Google e veja o token no console do navegador

---

## 🚀 Trilha Intermediário {#trilha-intermediario}

> Para quem já conhece React/React Native

### Semana 1: Arquitetura e Fluxos

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | Visão Geral + Microsserviços | 2h | [Arquitetura](/docs/arquitetura/visao-geral) |
| 2 | Endpoints da API | 3h | [Endpoints](/docs/arquitetura/endpoints) |
| 3 | Fluxos e Dependências | 2h | [Fluxos](/docs/arquitetura/fluxos-jornadas) |
| 4 | Configurar ambiente | 2h | [Guia Dev](/docs/guias-rapidos/desenvolvedor) |
| 5 | Rodar projeto local | 1h | Hands-on |

---

### Semana 2: Autenticação Completa

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | Firebase Auth Flow | 2h | [Firebase Auth](/docs/autenticacao/firebase-auth-flow) |
| 2 | Interceptors do Axios | 2h | [Aula Firebase](/docs/autenticacao/aula-firebase-auth) |
| 3 | Estratégias de Renovação | 2h | [Aula Firebase](/docs/autenticacao/aula-firebase-auth) |
| 4 | AuthContext avançado | 3h | [Épico 2: Core](/docs/backlog/epico-2-core) |
| 5 | Testes de fluxo | 2h | [Épico 3: Testes](/docs/backlog/epico-3-testes) |

---

### Semana 3: Mobile

| Dia | Tópico | Duração | Recurso |
|-----|--------|---------|---------|
| 1 | Diferenças Web vs Mobile | 1h | [Aula Firebase](/docs/autenticacao/aula-firebase-auth) |
| 2 | Configurar Google Sign-In | 2h | [SHA1 Android](/docs/autenticacao/sha1-android) |
| 3 | AsyncStorage vs localStorage | 1h | — |
| 4 | Implementar login mobile | 3h | Hands-on |
| 5 | Testes no Android | 3h | [Épico 3: Testes](/docs/backlog/epico-3-testes) |

---

## ⚡ Trilha Avançado {#trilha-avancado}

> Para quem quer implementar rapidamente

### Checklist de Implementação

Use este checklist como guia rápido:

#### 📋 Setup (2h)
- [ ] Clonar repositório
- [ ] Criar projeto Firebase
- [ ] Configurar variáveis de ambiente
- [ ] Rodar `npm install` nos projetos

#### 🔐 Autenticação Web (4h)
- [ ] Criar `src/config/firebase.js`
- [ ] Criar `src/services/api.js` com interceptors
- [ ] Criar `src/context/AuthContext.js`
- [ ] Criar página de Login
- [ ] Criar ProtectedRoute

#### 📱 Autenticação Mobile (6h)
- [ ] Configurar `google-services.json`
- [ ] Configurar SHA1 no Firebase
- [ ] Adaptar `firebase.js` para React Native
- [ ] Adaptar `api.js` para AsyncStorage
- [ ] Adaptar `AuthContext.js`
- [ ] Criar tela de Login
- [ ] Testar no Android

#### ✅ Testes (3h)
- [ ] Testar login/logout
- [ ] Testar renovação de token
- [ ] Testar restauração de sessão
- [ ] Testar tratamento de erro 401

---

## 🏆 Badges de Progresso

Acompanhe seu progresso marcando os badges:

### 🥉 Bronze - Fundamentos
- [ ] Li toda a documentação de introdução
- [ ] Entendi a arquitetura de microsserviços
- [ ] Conheço os fluxos dos usuários

### 🥈 Prata - Implementação
- [ ] Configurei o ambiente de desenvolvimento
- [ ] Implementei autenticação web
- [ ] Fiz login com Google funcionando

### 🥇 Ouro - Domínio
- [ ] Implementei autenticação mobile
- [ ] Entendi e implementei renovação de tokens
- [ ] Todos os testes passando

### 💎 Diamante - Expert
- [ ] Contribuí com código para o projeto
- [ ] Documentei algo novo
- [ ] Ajudei outros desenvolvedores

---

## 📚 Recursos Complementares

### Documentação Oficial
- [React Documentation](https://react.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Documentation](https://docs.expo.dev/)

### Cursos Gratuitos
- [React - Rocketseat](https://www.rocketseat.com.br/discover)
- Firebase - Google Codelabs
  - [Começar a usar o Firebase Studio](https://firebase.google.com/codelabs/firebase-studio-intro?hl=pt-br#0) 
  - [Codelab do Cloud Firestore para Android](https://firebase.google.com/codelabs/firestore-android?hl=pt-br#0)
  - [Codelab do Firebase para Android:crie o Friendly Chat](https://firebase.google.com/codelabs/firebase-android?hl=pt-br#0)
  - [Codelab da Web do Cloud Firestore](https://firebase.google.com/codelabs/firestore-web?hl=pt-br#0)
  - [Introdução ao Firebase para Web](https://firebase.google.com/codelabs/firebase-get-to-know-web?hl=pt-br#0)
  - [Usar o FCM e as Mensagens no app para enviar mensagens aos usuários](https://firebase.google.com/codelabs/fcm-and-fiam?hl=pt-br#0)
  - [Codelabs do FCM](https://firebase.google.com/docs/cloud-messaging/codelab?hl=pt-br)
  
### Comunidade
- [GitHub Issues do Projeto](https://github.com/uberhub-mentorias/docusaurus/issues)
- Discord do IFTM (se disponível)

---

## 🤔 Dúvidas?

Se você travou em algum ponto:

1. **Releia** a documentação relacionada
2. **Pesquise** no Google/Stack Overflow
3. **Abra uma issue** no GitHub descrevendo o problema
4. **Peça ajuda** aos colegas ou professor

Boa jornada de aprendizado! 🚀
