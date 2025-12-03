---
id: visao-geral
title: Visão Geral da Arquitetura
sidebar_label: 📋 Visão Geral
sidebar_position: 1
---

# 🏗️ Visão Geral da Arquitetura

> Arquitetura de microsserviços do sistema UberHub Mentorias

---

## 📋 Propósito do Sistema

O **UberHub Mentorias** é uma plataforma mobile que conecta profissionais experientes (Mentores) a pessoas que buscam orientação e desenvolvimento em áreas específicas (Mentorados), dentro do ecossistema do UberHub.

---

## 🎯 Objetivos Arquiteturais

| Objetivo | Descrição |
|----------|-----------|
| **Escalabilidade** | Arquitetura de microsserviços permite escalar serviços individualmente |
| **Resiliência** | Isolamento de falhas entre serviços independentes |
| **Manutenibilidade** | Serviços desacoplados com responsabilidades bem definidas |
| **Segurança** | Autenticação JWT centralizada e controle de acesso baseado em roles |
| **Observabilidade** | Logs, métricas e analytics integrados |

---

## 🛠️ Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| **Framework Backend** | Spring Boot 3.x |
| **Linguagem** | Java 17+ |
| **Banco de Dados** | MongoDB 6.x |
| **API Gateway** | Spring Cloud Gateway |
| **Segurança** | Spring Security + JWT |
| **Documentação API** | OpenAPI 3.0 / Springdoc |
| **Notificações Push** | Firebase Cloud Messaging |
| **Matchmaking** | Algoritmo próprio + IA (LLM) |
| **Frontend Web** | React + Vite |
| **Frontend Mobile** | React Native + Expo |

---

## 📊 Diagrama de Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                      CAMADA DE CLIENTE                       │
│              (Aplicativo Mobile / Painel Web)                │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                       API GATEWAY                            │
│                   (Spring Cloud Gateway)                     │
│                  - Validação JWT                             │
│                  - Roteamento                                │
│                  - Rate Limiting                             │
│                  - CORS                                      │
└───────┬────────────┬──────────────┬───────────────┬──────────┘
        │            │              │               │
        ▼            ▼              ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Auth        │ │  Profile     │ │  Mentorship  │ │  Admin       │
│  Service     │ │  Service     │ │  Service     │ │  Service     │
│  :8081       │ │  :8082       │ │  :8084       │ │  :8085       │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       │                └────────┬───────┘                │
       │                         │                        │
       │                         ▼                        │
       │                ┌──────────────────┐              │
       │                │  Matchmaking     │◄─────────────┘
       │                │  Service         │
       │                │  (Interno)       │
       │                │  :8083           │
       │                └─────────┬────────┘
       │                          │
       ▼                          ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAMADA DE PERSISTÊNCIA                    │
│                        MongoDB 6.x                           │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │ auth_db   │  │profile_db │  │mentorship │  │ admin_db  │  │
│  │           │  │           │  │   _db     │  │           │  │
│  │ - users   │  │ - profiles│  │ - mentor  │  │ - vouchers│  │
│  │ - fcm     │  │ - tags    │  │   ships   │  │ -analytics│  │
│  │   Tokens  │  │           │  │ - feedback│  │ - notifs  │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Princípios Arquiteturais

### Database per Service
Cada microsserviço possui seu próprio banco de dados MongoDB, garantindo isolamento de dados e autonomia dos serviços.

### API Gateway Pattern
Ponto único de entrada para todas as requisições do cliente, responsável por:
- Validação de JWT antes do roteamento
- Roteamento para serviços apropriados
- Rate limiting e throttling
- Configuração CORS

### Service-to-Service Communication
- **Síncrona:** REST/HTTP para comunicação direta entre serviços
- **Interna:** Matchmaking Service não é exposto no Gateway, apenas chamado internamente

### Separation of Concerns
Cada serviço tem uma responsabilidade claramente definida:
- **Auth:** Identidade e autenticação
- **Profile:** Catálogo de mentores
- **Matchmaking:** Algoritmo de compatibilidade
- **Mentorship:** Orquestração do ciclo de vida de mentorias
- **Admin:** Operações administrativas e analytics

---

## 📊 Métricas do Sistema

| Métrica | Valor |
|---------|-------|
| **Total de Serviços** | 5 |
| **Total de Endpoints Públicos** | 17 |
| **Total de Endpoints Admin** | 28 |
| **Total de Endpoints Internos** | 9 |
| **Total de Endpoints** | **55** |
| **Bancos de Dados MongoDB** | 5 |
| **Portas Utilizadas** | 6 (8080-8085) |

---

## 🔌 Portas dos Serviços

| Serviço | Porta | URL | Tipo |
|---------|-------|-----|------|
| **API Gateway** | `8080` | `http://localhost:8080` | Público |
| **Auth Service** | `8081` | `http://localhost:8081/api/v1` | Público |
| **Profile Service** | `8082` | `http://localhost:8082/api/v1` | Público |
| **Matchmaking Service** | `8083` | `http://localhost:8083/api/v1` | Interno |
| **Mentorship Service** | `8084` | `http://localhost:8084/api/v1` | Público |
| **Admin Service** | `8085` | `http://localhost:8085/api/v1` | Público |

---

<details>
<summary>💡 <strong>Decisão de Arquitetura (ADR-003)</strong>: Por que Microsserviços?</summary>

### Contexto
Precisávamos decidir entre uma arquitetura monolítica ou de microsserviços.

### Decisão
Escolhemos **microsserviços** pelos seguintes motivos:
- ✅ Escalabilidade independente de cada serviço
- ✅ Equipes podem trabalhar em paralelo
- ✅ Isolamento de falhas
- ✅ Facilidade de manutenção a longo prazo
- ✅ Aprendizado valioso para os alunos

### Consequências
- **Positivas:** Flexibilidade, escalabilidade, independência de deploy
- **Negativas:** Maior complexidade inicial, necessidade de orquestração

</details>

---

## 📚 Próximos Passos

- [Detalhes dos Microsserviços](/docs/arquitetura/microservicos)
- [Especificação de Endpoints](/docs/arquitetura/endpoints)
- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
