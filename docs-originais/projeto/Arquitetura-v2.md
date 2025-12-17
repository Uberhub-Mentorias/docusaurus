# Arquitetura do Sistema 

**Projeto:** Aplicativo de Mentorias UberHub  
**Instituição:** IFTM Campus Uberlândia Centro  
**Disciplina:** Projeto Aplicação para Dispositivos Móveis  
**Data:** 20 de Novembro de 2025  
**Versão:** 2.0 (Consolidado com Análise de Requisitos)

> **Nota:** Este documento consolida a arquitetura do sistema, incorporando ajustes identificados na análise comparativa entre Requisitos Funcionais e Especificação de Endpoints.

---

## 📋 Índice

1.  [Visão Geral](#vis%C3%A3o-geral)
2.  [Arquitetura de Microsserviços](#arquitetura-de-microsservi%C3%A7os)
3.  [Serviços do Sistema](#servi%C3%A7os-do-sistema)
4.  [Componentes de Infraestrutura](#componentes-de-infraestrutura)
5.  [Fluxos de Comunicação](#fluxos-de-comunica%C3%A7%C3%A3o)
6.  [Banco de Dados](#banco-de-dados)
7.  [Segurança e Autenticação](#seguran%C3%A7a-e-autentica%C3%A7%C3%A3o)
8.  [Integrações Externas](#integra%C3%A7%C3%B5es-externas)
9.  [Padrões e Boas Práticas](#padr%C3%B5es-e-boas-pr%C3%A1ticas)
10.  [Processos Internos e Jobs](#processos-internos-e-jobs)

---

## Visão Geral

### 1.1 Propósito do Sistema

O **UberHub Mentorias** é uma plataforma mobile que conecta profissionais experientes (Mentores) a pessoas que buscam orientação e desenvolvimento em áreas específicas (Mentorados), dentro do ecossistema do UberHub.

### 1.2 Objetivos Arquiteturais

*   **Escalabilidade:** Arquitetura de microsserviços permite escalar serviços individualmente
*   **Resiliência:** Isolamento de falhas entre serviços independentes
*   **Manutenibilidade:** Serviços desacoplados com responsabilidades bem definidas
*   **Segurança:** Autenticação JWT centralizada e controle de acesso baseado em roles
*   **Observabilidade:** Logs, métricas e analytics integrados

### 1.3 Stack Tecnológica

| Componente | Tecnologia |
| --- | --- |
| **Framework Backend** | Spring Boot 3.x |
| **Linguagem** | Java 17+ |
| **Banco de Dados** | MongoDB 6.x |
| **API Gateway** | Spring Cloud Gateway |
| **Segurança** | Spring Security + JWT |
| **Documentação API** | OpenAPI 3.0 / Springdoc |
| **Notificações Push** | Firebase Cloud Messaging |
| **Matchmaking** | Algoritmo próprio + IA (LLM) |
| **Controle de Versão** | Git |

---

## Arquitetura de Microsserviços

### 2.1 Diagrama de Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                      CAMADA DE CLIENTE                       │
│                    (Aplicativo Mobile)                       │
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
│              │ │              │ │              │ │              │
│  Auth        │ │  Profile     │ │  Mentorship  │ │  Admin       │
│  Service     │ │  Service     │ │  Service     │ │  Service     │
│              │ │              │ │              │ │              │
│  :8081       │ │  :8082       │ │  :8084       │ │  :8085       │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       │                │                │                │
       │                └────────┬───────┘                │
       │                         │                        │
       │                         ▼                        │
       │                ┌──────────────────┐              │
       │                │                  │              │
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
│  │           │  │           │  │ - change  │  │ - audits  │  │
│  │           │  │           │  │   requests│  │           │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  INTEGRAÇÕES EXTERNAS                        │
│                                                              │
│  ┌─────────────────┐       ┌──────────────────┐              │
│  │ Firebase Cloud  │       │ Ferramentas de   │              │
│  │ Messaging (FCM) │       │ Agendamento      │              │
│  │ - Push Notifs   │       │ - Calendly       │              │
│  └─────────────────┘       │ - Google Agenda  │              │
│                            └──────────────────┘              │
│  ┌─────────────────┐                                         │
│  │ LLM API         │                                         │
│  │ (Gemini/OpenAI) │                                         │
│  │ - NLP Matching  │                                         │
│  └─────────────────┘                                         │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Princípios Arquiteturais

#### **Database per Service**

Cada microsserviço possui seu próprio banco de dados MongoDB, garantindo isolamento de dados e autonomia dos serviços.

#### **API Gateway Pattern**

Ponto único de entrada para todas as requisições do cliente, responsável por:

*   Validação de JWT antes do roteamento
*   Roteamento para serviços apropriados
*   Rate limiting e throttling
*   Configuração CORS
*   Agregação de respostas (quando necessário)

#### **Service-to-Service Communication**

*   **Síncrona:** REST/HTTP para comunicação direta entre serviços
*   **Interna:** Matchmaking Service não é exposto no Gateway, apenas chamado internamente

#### **Separation of Concerns**

Cada serviço tem uma responsabilidade claramente definida:

*   **Auth:** Identidade e autenticação
*   **Profile:** Catálogo de mentores
*   **Matchmaking:** Algoritmo de compatibilidade
*   **Mentorship:** Orquestração do ciclo de vida de mentorias
*   **Admin:** Operações administrativas e analytics

---

## Serviços do Sistema

### 3.1 Auth Service (Identidade e Autenticação)

**Porta:** `8081`  
**URL Base:** `http://localhost:8081/api/v1`  
**Banco de Dados:** `auth_db` (MongoDB)

#### **Responsabilidades:**

*   Registro e autenticação de usuários (mentores, mentorados, admins)
*   Geração e renovação de tokens JWT (access + refresh tokens)
*   Recuperação de senha por e-mail
*   Gerenciamento de roles (`MENTOR`, `MENTEE`, `ADMIN`)
*   Controle de status de usuários (`ACTIVE`, `SUSPENDED`)
*   Gerenciamento de créditos de voucher (`voucherCreditBalance`)
*   Gerenciamento de tokens FCM para notificações push
*   Criptografia de senhas com BCrypt

#### **Coleções MongoDB:**

*   `users`: Dados de usuários e credenciais
*   `fcmTokens`: Tokens FCM por dispositivo

#### **Integrações:**

*   **Admin Service:** Consultas sobre usuários e tokens FCM
*   **Mentorship Service:** Validação de créditos e débito de vouchers
*   **Profile Service:** Adição de role MENTOR quando perfil é aprovado
*   **Firebase Cloud Messaging:** Envio de notificações push

#### **Endpoints Principais:**

**Públicos:**

*   `POST /auth/register` - Registro de novos usuários
*   `POST /auth/login` - Autenticação e emissão de JWT
*   `POST /auth/refresh` - Renovação de access token
*   `POST /auth/recover-password` - Inicia fluxo de recuperação de senha
*   `GET /users/me` - Dados do usuário autenticado (inclui `voucherCreditBalance`)
*   `PUT /users/me/fcm-token` - Atualização de token FCM

**Admin:**

*   `GET /users` - Lista todos os usuários
*   `PUT /users/{id}/status` - Atualiza status do usuário

**Internos:**

*   `PUT /users/{userId}/credit` - Adiciona ou debita crédito de voucher
*   `PUT /users/{userId}/add-role` - Adiciona novo papel (ex: ROLE\_MENTOR)
*   `GET /users/{userId}/fcm-token` - Retorna token FCM do usuário

---

### 3.2 Profile Service (Catálogo de Mentores)

**Porta:** `8082`  
**URL Base:** `http://localhost:8082/api/v1`  
**Banco de Dados:** `profile_db` (MongoDB)

#### **Responsabilidades:**

*   Gestão de perfis de mentores (cadastro, atualização, listagem)
*   Taxonomia de tags de especialização (áreas de expertise)
*   Workflow de aprovação de mentores (`PENDING`, `APPROVED`, `REJECTED`)
*   Busca e filtragem de mentores por área, status, e outros critérios
*   Provisionamento de dados para o algoritmo de matchmaking
*   **CRUD completo de tags** (dono da lógica de negócio)

#### **Coleções MongoDB:**

*   `profiles`: Perfis completos de mentores
*   `tags`: Taxonomia de especialidades e áreas de conhecimento

#### **Integrações:**

*   **Matchmaking Service:** Fornece lista de mentores aprovados
*   **Admin Service:** Aprovação de perfis pendentes, orquestração de gestão de tags
*   **Auth Service:** Adiciona role MENTOR ao usuário quando perfil é aprovado

#### **Endpoints Principais:**

**Públicos:**

*   `POST /profiles/mentor` - Criação de perfil de mentor (status PENDING)
*   `PUT /profiles/mentor` - Atualização de perfil do mentor autenticado
*   `GET /profiles/mentor/{mentorId}` - Detalhes de um mentor
*   `GET /profiles/mentors` - Listagem com filtros (área, status, limite)
*   `GET /tags` - Lista de tags de especialização

**Admin:**

*   `GET /profiles/mentors/pending` - Lista mentores pendentes de aprovação
*   `PUT /profiles/mentor/{mentorId}/status` - Atualização de status (Admin)
*   `POST /tags` - Cria nova tag
*   `PUT /tags/{tagId}` - Atualiza tag existente
*   `DELETE /tags/{tagId}` - Remove tag

**Internos:**

*   `GET /profiles/mentors` - Busca mentores aprovados para matchmaking

---

### 3.3 Matchmaking Service (Algoritmo de Compatibilidade)

**Porta:** `8083`  
**URL Base:** `http://localhost:8083/api/v1` _(INTERNO - não exposto no Gateway)_  
**Banco de Dados:** `matchmaking_db` (MongoDB - opcional para histórico)

#### **Responsabilidades:**

*   Processamento de texto em linguagem natural do mentorado via LLM
*   Extração de entidades e tópicos relevantes
*   Cálculo de score de compatibilidade mentor-mentorado
*   Algoritmo de pontuação multi-critério:
    *   Expertise match (áreas de especialização)
    *   Disponibilidade (horários compatíveis)
    *   Idioma preferido
    *   Formato de sessão (vídeo, áudio, chat, presencial)
    *   Nível de experiência
*   Registro de decisões de matching para analytics (opcional)

#### **Coleções MongoDB:**

*   `matchingDecisions`: Histórico de decisões de matching (analytics)

#### **Integrações:**

*   **Mentorship Service:** Único cliente, chamadas internas
*   **Profile Service:** Consulta mentores aprovados e suas tags
*   **LLM API (Gemini/OpenAI):** Processamento de linguagem natural

#### **Endpoints Principais (Internos):**

*   `POST /matchmaking` - Encontrar melhor mentor para um mentorado
*   `POST /matchmaking/batch` - Lista ordenada de mentores compatíveis
*   `POST /matchmaking/score` - Calcular score de compatibilidade específico
*   `GET /matchmaking/decisions/{menteeId}` - Histórico de decisões de matching

#### **Algoritmo de Scoring:**

```
Score Total = (
  expertise_match_weight * expertise_score +
  availability_match_weight * availability_score +
  language_match_weight * language_score +
  format_match_weight * format_score +
  experience_match_weight * experience_score
)

Weights padrão:
- expertise: 0.40 (40%)
- availability: 0.25 (25%)
- language: 0.15 (15%)
- format: 0.10 (10%)
- experience: 0.10 (10%)
```

---

### 3.4 Mentorship Service (Orquestração de Mentorias)

**Porta:** `8084`  
**URL Base:** `http://localhost:8084/api/v1`  
**Banco de Dados:** `mentorship_db` (MongoDB)

#### **Responsabilidades:**

*   Orquestração da criação de mentorias (integra com matchmaking)
*   Gerenciamento do ciclo de vida completo das mentorias:
    *   `pending_match` → `matched` → `scheduled` → `in_progress` → `completed`/`cancelled`/`expired`
*   Agendamento de sessões (mentor agenda, mentorado confirma)
*   Coleta de feedback pós-mentoria (mentor e mentorado)
*   Sistema de solicitação de troca de mentor
*   **Rotina interna de expiração automática** (RF-MDO-13)
*   **Nota:** Endpoints de vouchers estão no Admin Service

#### **Coleções MongoDB:**

*   `mentorships`: Registros completos de mentorias
*   `feedbacks`: Avaliações mútuas mentor-mentorado
*   `changeRequests`: Solicitações de troca de mentor

#### **Integrações:**

*   **Matchmaking Service:** Solicita sugestão de mentor
*   **Profile Service:** Valida existência de mentores
*   **Admin Service:** Notificações e analytics
*   **Auth Service:** Validação de créditos e débito de vouchers

#### **Endpoints Principais:**

*   `POST /mentorships` - Criar mentoria com matchmaking
*   `GET /mentorships/mentee` - Mentorias do mentorado
*   `GET /mentorships/mentor` - Mentorias do mentor
*   `PUT /mentorships/{id}/status` - Atualizar status da mentoria (MENTOR/MENTEE/ADMIN)
*   `PUT /mentorships/{id}/schedule` - Agendar sessão (mentor)
*   `POST /mentorships/{id}/schedule/confirm` - Confirmar agendamento (mentorado)
*   `POST /mentorships/{id}/feedback/mentor` - Feedback do mentor
*   `POST /mentorships/{id}/feedback/mentee` - Avaliação do mentorado
*   `POST /mentorships/{id}/request-change` - Solicitar troca de mentor

#### **Processos Internos:**

**RF-MDO-13 - Rotina de Expiração Automática:**

*   **Tipo:** Job/Scheduler interno (Spring @Scheduled ou Quartz)
*   **Descrição:** Verifica mentorias com status `pending_match` ou `matched` que foram criadas há mais de 7 dias e não foram agendadas. Essas mentorias são automaticamente marcadas como `expired`.
*   **Frequência:** Executada periodicamente (ex: diariamente às 00:00)
*   **Implementação:** Deve ser documentada como processo interno do mentorship-service, mesmo que não seja exposta como endpoint.

---

### 3.5 Admin Service (Administração e Analytics)

**Porta:** `8085`  
**URL Base:** `http://localhost:8085/api/v1`  
**Banco de Dados:** `admin_db` (MongoDB)

#### **Responsabilidades:**

*   BFF (Backend For Frontend) administrativo
*   Dashboard com métricas agregadas
*   Aprovação de cadastros de mentores
*   Gestão de usuários (suspensão, monitoramento)
*   **Gerenciamento completo de vouchers** (CRUD, validação, resgate, geração em lote)
*   Moderação de solicitações de troca de mentor
*   **Orquestração de gestão de tags** (chama Profile Service)
*   Analytics e registro de eventos de negócio
*   Envio de notificações push via FCM
*   Auditoria de ações administrativas
*   **Logs administrativos** (RF-ADM-07)

#### **Coleções MongoDB:**

*   `vouchers`: Códigos de acesso para mentorias
*   `analytics`: Eventos de negócio (mentorias criadas, concluídas, etc.)
*   `notifications`: Histórico de notificações enviadas
*   `auditLogs`: Log de ações administrativas

#### **Integrações:**

*   **Profile Service:** Aprovação de mentores, gestão de tags (orquestração)
*   **Auth Service:** Suspensão de usuários, consulta de tokens FCM, gerenciamento de créditos
*   **Mentorship Service:** Aprovação de trocas de mentor
*   **Firebase Cloud Messaging:** Envio de notificações push

#### **Endpoints Principais:**

**Dashboard e Analytics:**

*   `GET /admin/dashboard` - Dados agregados do painel

**Gerenciamento de Mentores:**

*   `GET /admin/mentors/pending` - Mentores aguardando aprovação (delegado)
*   `POST /admin/mentors/{id}/approve` - Aprovar mentor (delegado)

**Gerenciamento de Usuários:**

*   `GET /admin/users` - Listar usuários (delegado)
*   `POST /admin/users/{id}/suspend` - Suspender usuário (delegado)

**Gerenciamento de Vouchers:**

*   `GET /admin/vouchers` - Listar todos os vouchers (com filtros)
*   `GET /admin/vouchers/{id}` - Buscar voucher por ID
*   `GET /admin/vouchers/code/{code}` - Buscar voucher por código
*   `POST /admin/vouchers` - Criar novo voucher individual
*   `POST /admin/vouchers/generate` - Gerar múltiplos vouchers
*   `PUT /admin/vouchers/{id}` - Atualizar voucher existente
*   `DELETE /admin/vouchers/{id}` - Deletar voucher
*   `GET /admin/vouchers/validate/{code}` - Validar código de voucher
*   `POST /admin/vouchers/redeem` - Resgatar voucher válido

**Solicitações de Troca:**

*   `GET /admin/mentorships/change-requests` - Solicitações de troca (delegado)
*   `POST /admin/mentorships/change-requests/{id}/approve` - Aprovar troca (delegado)

**Gerenciamento de Tags:**

*   `GET /admin/tags` - Retornar todas as tags (delegado - orquestra Profile Service)
*   `POST /admin/tags` - Criar nova tag (delegado - orquestra Profile Service)
*   `PUT /admin/tags/{tagId}` - Atualizar tag existente (delegado - orquestra Profile Service)
*   `DELETE /admin/tags/{tagId}` - Remover tag (delegado - orquestra Profile Service)

**Logs Administrativos:**

*   `GET /admin/logs` - Retornar logs de ações administrativas

#### **Endpoints Internos:**

*   `POST /analytics/record-event` - Registrar evento de negócio
*   `POST /notifications/send` - Enviar notificação push via FCM

---

## Componentes de Infraestrutura

### 4.1 API Gateway (Spring Cloud Gateway)

**Porta:** `8080`  
**URL Base:** `http://localhost:8080`

#### **Responsabilidades:**

*   Ponto único de entrada para todas as requisições externas
*   Validação de JWT antes do roteamento
*   Roteamento dinâmico para serviços de backend
*   Rate limiting e throttling
*   Configuração CORS
*   Load balancing (em produção)
*   Timeout management

#### **Rotas Configuradas:**

```
/api/v1/auth/**        → auth-service:8081
/api/v1/users/**       → auth-service:8081
/api/v1/profiles/**    → profile-service:8082
/api/v1/tags/**        → profile-service:8082
/api/v1/mentorships/** → mentorship-service:8084
/api/v1/admin/**       → admin-service:8085
```

**Nota:** `matchmaking-service` não é exposto no Gateway (uso exclusivamente interno).

#### **Filtros Aplicados:**

*   **JWTAuthenticationFilter:** Valida tokens JWT em requisições autenticadas
*   **LoggingFilter:** Registra todas as requisições e respostas
*   **CorsFilter:** Configura políticas CORS para o aplicativo mobile

---

### 4.2 MongoDB (Banco de Dados NoSQL)

**Versão:** `6.x`  
**Padrão:** Database per Service (banco isolado por serviço)

#### **Bancos de Dados:**

| Banco de Dados | Serviço | Coleções Principais |
| --- | --- | --- |
| `auth_db` | Auth Service | `users`, `fcmTokens` |
| `profile_db` | Profile Service | `profiles`, `tags` |
| `matchmaking_db` | Matchmaking Svc | `matchingDecisions` (opcional) |
| `mentorship_db` | Mentorship Svc | `mentorships`, `feedbacks`, `changeRequests` |
| `admin_db` | Admin Service | `vouchers`, `analytics`, `notifications`, `auditLogs` |

#### **Considerações:**

*   **Indexação:** Índices criados em campos frequentemente consultados (userId, mentorId, status, etc.)
*   **Replicação:** Configurar replica sets em produção para alta disponibilidade
*   **Backup:** Estratégia de backup automatizado com retenção de 30 dias
*   **Sharding:** Considerar sharding por `userId` em escala futura

---

## Fluxos de Comunicação

### 5.1 Fluxo de Autenticação

```
┌────────┐                 ┌─────────────┐               ┌──────────────┐
│ Client │                 │ API Gateway │               │ Auth Service │
└───┬────┘                 └──────┬──────┘               └──────┬───────┘
    │                             │                             │
    │ POST /auth/register         │                             │
    ├────────────────────────────►│                             │
    │                             │ Forward request             │
    │                             ├────────────────────────────►│
    │                             │                             │
    │                             │                             │ Create user
    │                             │                             │ Hash password
    │                             │                             │ Store in MongoDB
    │                             │                             │
    │                             │         User created        │
    │      201 Created            │◄────────────────────────────┤
    │◄────────────────────────────┤                             │
    │                             │                             │
    │ POST /auth/login            │                             │
    ├────────────────────────────►│                             │
    │                             │ Forward credentials         │
    │                             ├────────────────────────────►│
    │                             │                             │
    │                             │                             │ Validate credentials
    │                             │                             │ Generate JWT (access + refresh)
    │                             │                             │
    │                             │    JWT tokens               │
    │   200 OK + JWT tokens       │◄────────────────────────────┤
    │◄────────────────────────────┤                             │
    │                             │                             │
    │ POST /auth/refresh          │                             │
    ├────────────────────────────►│                             │
    │                             │                             │
    │                             ├────────────────────────────►│
    │                             │                             │ Validate refresh token
    │                             │                             │ Generate new access token
    │                             │                             │
    │                             │    New access token         │
    │   200 OK + new access token │◄────────────────────────────┤
    │◄────────────────────────────┤                             │
```

### 5.2 Fluxo de Criação de Mentoria com Matchmaking

```
┌─────────┐        ┌─────────────┐     ┌────────────────┐    ┌───────────────┐     ┌──────────────┐
│ Mentee  │        │ API Gateway │     │  Mentorship    │    │  Matchmaking  │     │   Profile    │
│ (App)   │        │             │     │    Service     │    │    Service    │     │   Service    │
└────┬────┘        └──────┬──────┘     └───────┬────────┘    └───────┬───────┘     └──────┬───────┘
     │                    │                    │                     │                    │
     │ POST /mentorships  |                    │                     │                    │
     │ + JWT + preferences|                    │                     │                    │
     ├───────────────────►│                    │                     │                    │
     │                    │ Validate JWT       │                     │                    │
     │                    │                    │                     │                    │
     │                    │ Forward request    │                     │                    │
     │                    ├───────────────────►│                     │                    │
     │                    │                    │                     │                    │
     │                    │                    │ GET /users/me       │                    │
     │                    │                    │ (check voucher)     │                    │
     │                    │                    ├────────────────────►│                    │
     │                    │                    │                     │                    │
     │                    │                    │ User with credit    │                    │
     │                    │                    │◄────────────────────┤                    │
     │                    │                    │                     │                    │
     │                    │                    │ PUT /users/{id}/credit (debit)           │
     │                    │                    ├────────────────────►│                    │
     │                    │                    │                     │                    │
     │                    │                    │ POST /matchmaking   │                    │
     │                    │                    │ + mentee preferences│                    │
     │                    │                    ├────────────────────►│                    │
     │                    │                    │                     │                    │
     │                    │                    │                     │ GET /profiles/mentors
     │                    │                    │                     │ ?status=APPROVED   │
     │                    │                    │                     ├───────────────────►│
     │                    │                    │                     │                    │
     │                    │                    │                     │ List of mentors    │
     │                    │                    │                     │◄───────────────────┤
     │                    │                    │                     │                    │
     │                    │                    │                     │ Calculate scores   │
     │                    │                    │                     │ via algorithm + LLM│
     │                    │                    │                     │                    │
     │                    │                    │ Best mentor match   │                    │
     │                    │                    │ + score + confidence│                    │
     │                    │                    │◄────────────────────┤                    │
     │                    │                    │                     │                    │
     │                    │                    │ Create mentorship   │                    │
     │                    │                    │ with matched mentor │                    │
     │                    │                    │ status: matched     │                    │
     │                    │                    │                     │                    │
     │                    │ 201 Created        │                     │                    │
     │                    │ + mentor details   │                     │                    │
     │◄───────────────────┤◄───────────────────┤                     │                    │
     │                    │                    │                     │                    │
```

### 5.3 Fluxo de Aprovação de Mentor

```
┌────────┐    ┌─────────────┐     ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Admin  │    │ API Gateway │     │    Admin     │    │   Profile    │    │    Auth     │
│ (Web)  │    │             │     │   Service    │    │   Service    │    │   Service   │
└───┬────┘    └──────┬──────┘     └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
    │                │                   │                   │                   │
    │ GET /admin/mentors/pending         │                   │                   │
    ├───────────────►│                   │                   │                   │
    │                │ Validate Admin JWT│                   │                   │
    │                ├──────────────────►│                   │                   │
    │                │                   │                   │                   │
    │                │                   │ GET /profiles/mentors
    │                │                   │ ?status=PENDING   │
    │                │                   ├──────────────────►│
    │                │                   │                   │
    │                │                   │ List of pending   │
    │                │                   │◄──────────────────┤
    │                │                   │                   │
    │   200 OK       │                   │                   │
    │   + pending list                   │                   │
    │◄───────────────┤◄──────────────────┤                   │
    │                │                   │                   │
    │ POST /admin/mentors/{id}/approve   │                   │
    ├───────────────►│                   │                   │
    │                │                   │                   │
    │                ├──────────────────►│                   │
    │                │                   │                   │
    │                │                   │ PUT /profiles/mentor/{id}/status
    │                │                   │ status: APPROVED  │
    │                │                   ├──────────────────►│
    │                │                   │                   │
    │                │                   │                   │ Update profile
    │                │                   │                   │ Set approvedAt
    │                │                   │                   │ Set approvedBy
    │                │                   │                   │
    │                │                   │ 200 OK            │
    │                │                   │◄──────────────────┤
    │                │                   │                   │
    │                │                   │ PUT /users/{userId}/add-role
    │                │                   │ role: ROLE_MENTOR │
    │                │                   ├───────────────────►│
    │                │                   │                   │
    │                │                   │                   │ Add role to user
    │                │                   │                   │
    │                │                   │ 200 OK            │
    │                │                   │◄───────────────────┤
    │                │                   │                   │
    │                │                   │ POST /notifications/send
    │                │                   │ (notify mentor)   │
    │                │                   │                   │
    │   200 OK       │                   │                   │
    │◄───────────────┤◄──────────────────┤                   │
    │                │                   │                   │
```

---

## Banco de Dados

### 6.1 Modelo de Dados Consolidado

#### **auth\_db.users**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (BCrypt hashed),
  role: Enum["MENTOR", "MENTEE", "ADMIN"],
  roles: [String], // ["ROLE_MENTEE", "ROLE_MENTOR", "ROLE_ADMIN"]
  status: Enum["ACTIVE", "SUSPENDED"],
  voucherCreditBalance: Number (default: 0),
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### **auth\_db.fcmTokens**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  token: String,
  deviceId: String,
  createdAt: ISODate
}
```

#### **profile\_db.profiles**

```javascript
{
  _id: ObjectId,
  mentorId: ObjectId (unique, indexed),
  miniBio: String,
  areas: [String], // Lista de áreas de especialização
  schedulingLink: String, // URL do Calendly/Google Agenda
  status: Enum["PENDING", "APPROVED", "REJECTED"],
  createdAt: ISODate,
  updatedAt: ISODate,
  approvedAt: ISODate,
  approvedBy: ObjectId // Admin que aprovou
}
```

#### **profile\_db.tags**

```javascript
{
  _id: ObjectId,
  name: String (unique, indexed),
  category: String,
  description: String,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### **mentorship\_db.mentorships**

```javascript
{
  _id: ObjectId,
  menteeId: ObjectId (indexed),
  mentorId: ObjectId (indexed),
  voucherId: ObjectId,
  status: Enum["pending_match", "matched", "scheduled", "in_progress", "completed", "cancelled", "change_requested", "expired"],
  matchingScore: Number,
  preferences: {
    expertise: [String],
    availableTimes: [{
      dayOfWeek: Number (0-6),
      startTime: String (HH:mm),
      endTime: String (HH:mm)
    }],
    preferredLanguage: String,
    sessionFormat: Enum["video", "audio", "chat", "in-person"]
  },
  scheduledSession: {
    scheduledAt: ISODate,
    duration: Number, // minutos
    format: String,
    meetingLink: String,
    location: String,
    timezone: String,
    confirmationStatus: Enum["pending", "confirmed", "rejected", "cancelled"]
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### **mentorship\_db.feedbacks**

```javascript
{
  _id: ObjectId,
  mentorshipId: ObjectId (indexed),
  type: Enum["mentor", "mentee"],
  rating: Number (1-5),
  feedback: String,
  mentorHelpfulness: Number (1-5),
  sessionCompleted: Boolean,
  goalAchievement: Number (1-5),
  createdAt: ISODate,
  voucherGranted: {
    granted: Boolean,
    voucherId: ObjectId,
    code: String
  }
}
```

#### **mentorship\_db.changeRequests**

```javascript
{
  _id: ObjectId,
  mentorshipId: ObjectId (indexed),
  changeType: Enum["mentor_change", "reschedule", "format_change", "cancellation"],
  reason: String,
  status: Enum["pending", "approved", "rejected", "resolved"],
  requestedBy: ObjectId,
  requestedAt: ISODate,
  resolvedAt: ISODate,
  resolvedBy: ObjectId
}
```

#### **admin\_db.vouchers**

```javascript
{
  _id: ObjectId,
  code: String (unique, indexed),
  menteeId: ObjectId (indexed),
  value: Number,
  redeemedAt: ISODate,
  expiresAt: ISODate,
  mentorshipEligible: Boolean,
  status: Enum["active", "redeemed", "expired"],
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### **admin\_db.analytics**

```javascript
{
  _id: ObjectId,
  eventType: Enum["MENTORSHIP_CREATED", "MENTORSHIP_COMPLETED", "MENTOR_APPROVED", "VOUCHER_REDEEMED"],
  userId: ObjectId,
  timestamp: ISODate (indexed),
  metadata: Object // Dados adicionais do evento
}
```

#### **admin\_db.notifications**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  message: String,
  type: Enum["push", "email", "in-app"],
  status: Enum["pending", "sent", "failed"],
  sentAt: ISODate,
  fcmToken: String,
  metadata: Object
}
```

#### **admin\_db.auditLogs**

```javascript
{
  _id: ObjectId,
  action: String,
  performedBy: ObjectId (indexed),
  targetId: ObjectId,
  targetType: Enum["user", "mentor", "tag", "voucher", "mentorship"],
  timestamp: ISODate (indexed),
  changes: Object,
  ipAddress: String
}
```

---

## Segurança e Autenticação

### 7.1 Fluxo de Autenticação JWT

#### **Registro e Login:**

1.  Usuário registra-se via `POST /auth/register`
2.  Senha é criptografada com BCrypt (cost factor: 12)
3.  Usuário autentica-se via `POST /auth/login`
4.  Auth Service valida credenciais e gera:
    *   **Access Token:** JWT válido por 15 minutos
    *   **Refresh Token:** JWT válido por 7 dias

#### **Estrutura do JWT (Access Token):**

```
{
    "sub": "joao.silva@email.com",
    "userId": "507f1f77bcf86cd799439011",
    "roles": "ROLE_MENTOR",
    "iat": 1698765432,
    "exp": 1698766332
}
```

**Nota de Implementação:**

*   O campo `sub` (subject) contém o **email** do usuário para compatibilidade
*   O campo `userId` contém o **ID único** do usuário (ObjectId do MongoDB)
*   O campo `roles` contém as roles do usuário separadas por vírgula (ex: "ROLE\_MENTOR,ROLE\_USER")
*   O `userId` é incluído em todos os tokens gerados (registro, login e refresh) para permitir identificação direta do usuário sem necessidade de consulta ao banco de dados
*   Esta implementação é segura pois o JWT é assinado e qualquer alteração invalida o token

#### **Renovação de Token:**

1.  Quando o access token expira, o cliente envia o refresh token
2.  `POST /auth/refresh` valida o refresh token
3.  Novo access token é emitido (refresh token permanece válido)

#### **Uso do userId nos Serviços:**

Os serviços extraem o `userId` do token JWT para identificar o usuário autenticado:

*   **Admin Service:** No endpoint `POST /admin/vouchers/redeem`, o `userId` é extraído do token JWT e usado para associar o voucher ao usuário (`menteeId`)
*   O método `getUserIdFromToken()` no `AdminController` extrai o `userId` do claim do token
*   Se o `userId` não estiver disponível no token (tokens antigos), usa-se o email como fallback
*   Esta abordagem evita consultas desnecessárias ao banco de dados para obter o ID do usuário

#### **Recuperação de Senha:**

1.  Usuário solicita recuperação via `POST /auth/recover-password`
2.  Auth Service gera token temporário e envia por e-mail
3.  Usuário acessa link com token e redefine senha

### 7.2 Validação no API Gateway

```
┌────────┐                  ┌─────────────┐               ┌──────────────┐
│ Client │                  │ API Gateway │               │   Service    │
└───┬────┘                  └──────┬──────┘               └──────┬───────┘
    │                              │                             │
    │ GET /profiles/mentor/{id}    │                             │
    │ Authorization: Bearer {JWT}  │                             │
    ├─────────────────────────────►│                             │
    │                              │                             │
    │                              │ 1. Extract JWT from header  │
    │                              │ 2. Validate signature       │
    │                              │ 3. Check expiration         │
    │                              │ 4. Extract user info        │
    │                              │                             │
    │                              │ Forward request + user info │
    │                              │├────────────────────────────►│
    │                              │                             │
    │                              │         Response            │
    │         Response             │◄────────────────────────────┤
    │◄─────────────────────────────┤                             │
    │                              │                             │
```

### 7.3 Controle de Acesso Baseado em Roles (RBAC)

| Role | Permissões |
| --- | --- |
| **ADMIN** | Acesso completo a endpoints `/admin/*`, aprovação de mentores, gestão de usuários |
| **MENTOR** | Criar perfil, agendar sessões, fornecer feedback, visualizar suas mentorias |
| **MENTEE** | Criar mentoria, confirmar agendamento, avaliar mentor, solicitar troca |

**Implementação:** Anotação `@PreAuthorize("hasRole('ADMIN')")` em controllers Spring Security.

### 7.4 Segurança de Senhas

*   **Hashing:** BCrypt com salt automático (cost factor: 12)
*   **Política de Senhas:** Mínimo 8 caracteres, recomendado uso de letras, números e símbolos
*   **Armazenamento:** Senhas nunca armazenadas em texto plano

### 7.5 CORS (Cross-Origin Resource Sharing)

**Configuração no API Gateway:**

```
allowedOrigins:
  - http://localhost:3000 (dev)
  - https://app.uberhub.com (prod)
allowedMethods:
  - GET
  - POST
  - PUT
  - DELETE
allowedHeaders:
  - Authorization
  - Content-Type
allowCredentials: true
```

---

## Integrações Externas

### 8.1 Firebase Cloud Messaging (FCM)

#### **Propósito:**

Envio de notificações push para o aplicativo mobile.

#### **Fluxo de Integração:**

**Registro de Token:**

*   Aplicativo mobile obtém FCM token no primeiro login
*   Token é enviado via `PUT /users/me/fcm-token` ao Auth Service
*   Armazenado na coleção `fcmTokens`

**Envio de Notificação:**

*   Admin Service ou Mentorship Service solicita envio via `POST /notifications/send` (interno)
*   Admin Service busca tokens FCM do usuário via `GET /users/{userId}/fcm-token` (interno)
*   Chamada à API do FCM com payload:

#### **Tipos de Notificações:**

*   Lembrete de sessão agendada (24h antes, 1h antes)
*   Mentor aprovado
*   Sessão confirmada/rejeitada
*   Feedback disponível para avaliação
*   Voucher concedido

### 8.2 Ferramentas de Agendamento Externas

#### **Calendly / Google Agenda:**

*   Mentores cadastram link de agendamento no perfil
*   Mentorados clicam em "Agendar Mentoria" e são redirecionados
*   Agendamento é feito externamente
*   **Integração de Retorno:** Mentor cadastra manualmente a sessão no app via `PUT /mentorships/{id}/schedule`

**Nota:** Futura automação via webhooks do Calendly/Google Agenda.

### 8.3 LLM API (Gemini / OpenAI)

#### **Propósito:**

Processamento de linguagem natural para extração de tópicos e áreas de expertise.

#### **Fluxo:**

**Entrada do Mentorado:**

**Prompt Enviado ao LLM:**

**Resposta do LLM:**

**Uso no Matchmaking:**

*   Tags são usadas no algoritmo de pontuação
*   Match é feito com mentores que possuem essas tags em seus perfis

---

## Processos Internos e Jobs

### 10.1 Rotina de Expiração Automática de Mentorias (RF-MDO-13)

#### **Localização:** Mentorship Service

#### **Descrição:**

Job/scheduler interno que verifica mentorias com status `pending_match` ou `matched` que foram criadas há mais de 7 dias e não foram agendadas. Essas mentorias são automaticamente marcadas como `expired`.

#### **Implementação:**

```java
@Scheduled(cron = "0 0 0 * * ?") // Executa diariamente às 00:00
public void expirePendingMentorships() {
    LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
    
    List<Mentorship> expiredMentorships = mentorshipRepository
        .findByStatusInAndCreatedAtBefore(
            Arrays.asList("pending_match", "matched"),
            sevenDaysAgo
        );
    
    expiredMentorships.forEach(mentorship -> {
        mentorship.setStatus("expired");
        mentorship.setUpdatedAt(LocalDateTime.now());
        mentorshipRepository.save(mentorship);
        
        // Registrar evento de analytics
        analyticsService.recordEvent("MENTORSHIP_EXPIRED", mentorship.getMenteeId(), 
            Map.of("mentorshipId", mentorship.getId()));
    });
}
```

#### **Frequência:**

*   Executada diariamente às 00:00 (meia-noite)
*   Pode ser configurada via `application.yml`

#### **Nota:**

Este processo não é exposto como endpoint, mas deve ser documentado como parte da arquitetura do sistema.

---

## Padrões e Boas Práticas

### 9.1 Padrões de Design Implementados

#### **API Gateway Pattern**

Centralização de roteamento, autenticação e rate limiting.

#### **Database per Service**

Isolamento de dados para garantir autonomia dos serviços.

#### **Circuit Breaker**

(Futuro) Implementação com Resilience4j para resiliência em chamadas entre serviços.

#### **Saga Pattern**

(Futuro) Orquestração de transações distribuídas na criação de mentorias.

### 9.2 Boas Práticas de API

#### **Versionamento:**

Todas as APIs usam `/api/v1` no path, permitindo versionamento futuro (`/api/v2`).

#### **HTTP Status Codes:**

*   `200 OK`: Sucesso em GET/PUT
*   `201 Created`: Sucesso em POST com criação de recurso
*   `204 No Content`: Sucesso em DELETE
*   `400 Bad Request`: Erro de validação
*   `401 Unauthorized`: Token inválido ou ausente
*   `403 Forbidden`: Sem permissão para acessar recurso
*   `404 Not Found`: Recurso não encontrado
*   `409 Conflict`: Conflito de estado (ex: voucher já resgatado)
*   `500 Internal Server Error`: Erro no servidor

#### **Paginação:**

Endpoints de listagem usam query params:

```
GET /profiles/mentors?limit=20&offset=0&status=APPROVED
```

#### **Filtros:**

Query params descritivos:

```
GET /mentorships/mentee?status=completed&sort=createdAt:desc
```

### 9.3 Documentação de APIs

#### **OpenAPI 3.0 / Springdoc:**

*   Todos os serviços expõem documentação em `/swagger-ui.html`
*   Schemas JSON disponíveis em `/api-docs` (configurado em `application.yml`)
*   Anotações `@Operation`, `@ApiResponse`, `@Schema` em controllers

#### **URLs de Documentação (Swagger UI):**

```
Auth Service:      http://localhost:8081/swagger-ui.html
Profile Service:   http://localhost:8082/swagger-ui.html
Mentorship Service: http://localhost:8084/swagger-ui.html
Admin Service:     http://localhost:8085/swagger-ui.html
```

#### **URLs dos Schemas JSON (OpenAPI):**

```
Auth Service:      http://localhost:8081/api-docs
Profile Service:   http://localhost:8082/api-docs
Mentorship Service: http://localhost:8084/api-docs
Admin Service:     http://localhost:8085/api-docs
```

**Nota:** Configuração em `application.yml` de cada serviço:

```
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
```

### 9.4 Logging e Monitoramento

#### **Níveis de Log:**

*   `INFO`: Operações normais (login, criação de mentoria)
*   `WARN`: Situações anômalas (tentativa de login com senha incorreta)
*   `ERROR`: Erros de sistema (falha na conexão com MongoDB)
*   `DEBUG`: Informações detalhadas para desenvolvimento

#### **Estrutura de Log:**

```
{
    "timestamp": "2025-11-20T10:30:00Z",
    "level": "INFO",
    "service": "auth-service",
    "traceId": "a1b2c3d4",
    "userId": "507f...",
    "message": "User logged in successfully",
    "metadata": { "email": "joao@email.com" }
}
```

#### **Ferramentas (Futuro):**

*   **ELK Stack:** Elasticsearch, Logstash, Kibana para agregação de logs
*   **Prometheus + Grafana:** Métricas de performance
*   **Jaeger:** Distributed tracing

### 9.5 Testes

#### **Estratégia de Testes:**

*   **Unitários:** JUnit 5 + Mockito para lógica de negócio
*   **Integração:** TestContainers com MongoDB para testes de repositórios
*   **End-to-End:** Postman/Newman para testes de APIs
*   **Carga:** JMeter para testes de performance

#### **Cobertura de Código:**

Alvo: Mínimo 80% de cobertura em lógica de negócio.

---

## 📊 Resumo da Arquitetura

### Métricas do Sistema

| Métrica | Valor |
| --- | --- |
| **Total de Serviços** | 5 |
| **Total de Endpoints Públicos** | 17 |
| **Total de Endpoints Admin** | 28 |
| **Total de Endpoints Internos** | 9 |
| **Total de Endpoints** | **55** |
| **Bancos de Dados MongoDB** | 5 |
| **Coleções MongoDB** | 13 |
| **Portas Utilizadas** | 6 (8080-8085) |

### Tecnologias e Padrões

*   ✅ Arquitetura de Microsserviços
*   ✅ Database per Service
*   ✅ API Gateway Pattern
*   ✅ JWT Authentication (Access + Refresh Tokens)
*   ✅ RBAC (Role-Based Access Control)
*   ✅ RESTful API Design
*   ✅ OpenAPI 3.0 Documentation
*   ✅ NoSQL (MongoDB)
*   ✅ Push Notifications (FCM)
*   ✅ AI-Powered Matchmaking
*   ✅ Scheduled Jobs (Spring @Scheduled)
*   ✅ Asynchronous Communication (futuro)
*   ✅ Circuit Breaker Pattern (futuro)

### Ajustes Incorporados na Versão 2.0

Este documento incorpora os seguintes ajustes identificados na análise comparativa:

✅ **Auth Service:**

*   Adicionado endpoint `/auth/recover-password` (lacuna corrigida)
*   Adicionados endpoints internos `/users/{userId}/credit` e `/users/{userId}/add-role` (lacunas corrigidas)
*   Endpoint FCM mantido como `/users/{userId}/fcm-token` (singular) para consistência
*   Modelo de dados atualizado com `voucherCreditBalance` e `roles` (array)

✅ **Profile Service:**

*   Gestão de tags centralizada no Profile Service, com orquestração via Admin Service
*   Documentação de que Profile Service é o dono da lógica de negócio de tags

✅ **Matchmaking Service:**

*   Endpoints adicionais (`/batch`, `/score`, `/decisions`) documentados como expansões do RF-MDO-05

✅ **Mentorship Service:**

*   Endpoint `/schedule/confirm` documentado
*   Endpoint `/status` documentado como acessível por MENTOR, MENTEE ou ADMIN conforme contexto
*   RF-MDO-13 (rotina de expiração) documentado como processo interno com exemplo de implementação
*   Status `expired` adicionado ao modelo de dados

✅ **Admin Service:**

*   Endpoint `/admin/logs` adicionado (lacuna corrigida)
*   CRUD expandido de vouchers documentado
*   Documentação de orquestração de gestão de tags

✅ **Geral:**

*   Contagem de endpoints atualizada (55 ao invés de 51)
*   Modelos de dados atualizados conforme Endpoints.md
*   Fluxos de comunicação atualizados com novos endpoints
*   Seção dedicada a processos internos e jobs

---

## 📚 Referências

*   [Spring Boot Documentation](https://spring.io/projects/spring-boot)
*   [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
*   [MongoDB Documentation](https://docs.mongodb.com/)
*   [JWT.io](https://jwt.io/)
*   [OpenAPI Specification](https://swagger.io/specification/)
*   [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
*   [Microservices Patterns (Chris Richardson)](https://microservices.io/)

---

## 📚 Documentos Relacionados

*   [Endpoints.md](./Endpoints.md) - Especificação completa de endpoints
*   Requisitos Funcionais do Backend (Por Equipe e Serviço).md
*   Especificação de Endpoints da API (Por Equipe e Serviço).md
*   Análise docs lucas - Requisitos Funcionais vs Especificação dos Endpoints.md

---

**Documento gerado em:** 20 de Novembro de 2025  
**Responsável:** Equipes A, B e C - UberHub Mentorias  
**Versão:** 2.0 - Consolidado com Análise de Requisitos  
**Status:** Documentação Oficial da Arquitetura

```
["Vendas B2B", "SaaS", "Funil de Vendas", "Métricas e KPIs"]
```

```
Você é um especialista em análise de negócios. Analise o texto a seguir
e extraia os principais tópicos e áreas de conhecimento em formato de tags.
As áreas possíveis são: [lista de tags cadastradas]. Retorne apenas as tags.

Texto: "{input do mentorado}"
```

```
"Estou com dificuldade em estruturar o funil de vendas do meu SaaS B2B
e preciso de ajuda para definir os KPIs corretos."
```

```
{
    "to": "{fcm_token}",
    "notification": {
        "title": "Lembrete de Mentoria",
        "body": "Sua mentoria com João Silva é amanhã às 14h"
    },
    "data": {
        "mentorshipId": "507f...",
        "type": "reminder"
    }
}
```