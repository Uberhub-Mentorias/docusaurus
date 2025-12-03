---
id: microservicos
title: Microsserviços
sidebar_label: 🔧 Microsserviços
sidebar_position: 2
---

# 🔧 Microsserviços do Sistema

> Detalhamento de cada serviço da arquitetura

---

## 🔐 Auth Service (Identidade e Autenticação)

**Porta:** `8081` | **URL Base:** `http://localhost:8081/api/v1`

### Responsabilidades

- Registro e autenticação de usuários (mentores, mentorados, admins)
- Geração e renovação de tokens JWT (access + refresh tokens)
- Recuperação de senha por e-mail
- Gerenciamento de roles (`MENTOR`, `MENTEE`, `ADMIN`)
- Controle de status de usuários (`ACTIVE`, `SUSPENDED`)
- Gerenciamento de créditos de voucher (`voucherCreditBalance`)
- Gerenciamento de tokens FCM para notificações push

### Modelo de Dados

```javascript
// Coleção: users
{
  _id: ObjectId,
  name: String,
  email: String, // unique, indexed
  password: String, // BCrypt hashed
  role: "MENTOR" | "MENTEE" | "ADMIN",
  roles: ["ROLE_MENTEE", "ROLE_MENTOR", "ROLE_ADMIN"],
  status: "ACTIVE" | "SUSPENDED",
  voucherCreditBalance: Number, // default: 0
  createdAt: ISODate,
  updatedAt: ISODate
}

// Coleção: fcmTokens
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  token: String,
  deviceId: String,
  createdAt: ISODate
}
```

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/auth/register` | Registro de novos usuários | Pública |
| `POST` | `/auth/login` | Autenticação e emissão de JWT | Pública |
| `POST` | `/auth/refresh` | Renovação de access token | Refresh Token |
| `POST` | `/auth/recover-password` | Recuperação de senha | Pública |
| `GET` | `/users/me` | Dados do usuário autenticado | Bearer Token |
| `PUT` | `/users/me/fcm-token` | Atualização de token FCM | Bearer Token |

---

## 👤 Profile Service (Catálogo de Mentores)

**Porta:** `8082` | **URL Base:** `http://localhost:8082/api/v1`

### Responsabilidades

- Gestão de perfis de mentores (cadastro, atualização, listagem)
- Taxonomia de tags de especialização
- Workflow de aprovação de mentores (`PENDING`, `APPROVED`, `REJECTED`)
- Busca e filtragem de mentores
- CRUD completo de tags

### Modelo de Dados

```javascript
// Coleção: profiles
{
  _id: ObjectId,
  mentorId: ObjectId, // unique, indexed
  miniBio: String,
  areas: [String], // Lista de áreas de especialização
  schedulingLink: String, // URL do Calendly/Google Agenda
  status: "PENDING" | "APPROVED" | "REJECTED",
  createdAt: ISODate,
  updatedAt: ISODate,
  approvedAt: ISODate,
  approvedBy: ObjectId // Admin que aprovou
}

// Coleção: tags
{
  _id: ObjectId,
  name: String, // unique, indexed
  category: String,
  description: String,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/profiles/mentor` | Criação de perfil de mentor | Bearer Token |
| `PUT` | `/profiles/mentor` | Atualização de perfil | Bearer Token |
| `GET` | `/profiles/mentor/{mentorId}` | Detalhes de um mentor | Bearer Token |
| `GET` | `/profiles/mentors` | Listagem com filtros | Bearer Token |
| `GET` | `/tags` | Lista de tags | Bearer Token |

---

## 🎯 Matchmaking Service (Algoritmo de Compatibilidade)

**Porta:** `8083` | **URL Base:** `http://localhost:8083/api/v1` _(INTERNO)_

:::warning Serviço Interno
Este serviço **não é exposto** no API Gateway. É usado apenas internamente pelo Mentorship Service.
:::

### Responsabilidades

- Processamento de texto via LLM (extração de tags)
- Cálculo de score de compatibilidade mentor-mentorado
- Algoritmo de pontuação multi-critério

### Algoritmo de Scoring

```
Score Total = (
  expertise_match_weight * expertise_score +
  availability_match_weight * availability_score +
  language_match_weight * language_score +
  format_match_weight * format_score +
  experience_match_weight * experience_score
)

Pesos padrão:
- expertise: 0.40 (40%)
- availability: 0.25 (25%)
- language: 0.15 (15%)
- format: 0.10 (10%)
- experience: 0.10 (10%)
```

### Endpoints Internos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/matchmaking` | Encontrar melhor mentor |
| `POST` | `/matchmaking/batch` | Lista ordenada de mentores |
| `POST` | `/matchmaking/score` | Calcular score específico |
| `GET` | `/matchmaking/decisions/{menteeId}` | Histórico de decisões |

---

## 📋 Mentorship Service (Orquestração de Mentorias)

**Porta:** `8084` | **URL Base:** `http://localhost:8084/api/v1`

### Responsabilidades

- Orquestração da criação de mentorias
- Gerenciamento do ciclo de vida completo
- Agendamento de sessões
- Coleta de feedback pós-mentoria
- Sistema de solicitação de troca de mentor
- **Rotina de expiração automática** (mentorias não agendadas em 7 dias)

### Ciclo de Vida da Mentoria

```
pending_match → matched → scheduled → in_progress → completed
      ↓              ↓                                     ↓
   expired       expired / change_requested           cancelled
```

### Modelo de Dados

```javascript
// Coleção: mentorships
{
  _id: ObjectId,
  menteeId: ObjectId, // indexed
  mentorId: ObjectId, // indexed
  voucherId: ObjectId,
  status: "pending_match" | "matched" | "scheduled" | 
          "in_progress" | "completed" | "cancelled" | 
          "change_requested" | "expired",
  matchingScore: Number,
  preferences: {
    expertise: [String],
    availableTimes: [{ dayOfWeek, startTime, endTime }],
    preferredLanguage: String,
    sessionFormat: "video" | "audio" | "chat" | "in-person"
  },
  scheduledSession: {
    scheduledAt: ISODate,
    duration: Number, // minutos
    format: String,
    meetingLink: String,
    confirmationStatus: "pending" | "confirmed" | "rejected"
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/mentorships` | Criar mentoria com matchmaking | MENTEE |
| `GET` | `/mentorships/mentee` | Mentorias do mentorado | MENTEE |
| `GET` | `/mentorships/mentor` | Mentorias do mentor | MENTOR |
| `PUT` | `/mentorships/{id}/status` | Atualizar status | Bearer Token |
| `PUT` | `/mentorships/{id}/schedule` | Agendar sessão | MENTOR |
| `POST` | `/mentorships/{id}/feedback/mentor` | Feedback do mentor | MENTOR |
| `POST` | `/mentorships/{id}/feedback/mentee` | Avaliação do mentorado | MENTEE |

---

## ⚙️ Admin Service (Administração e Analytics)

**Porta:** `8085` | **URL Base:** `http://localhost:8085/api/v1`

### Responsabilidades

- BFF (Backend For Frontend) administrativo
- Dashboard com métricas agregadas
- Aprovação de cadastros de mentores
- Gestão de usuários (suspensão, monitoramento)
- **Gerenciamento completo de vouchers** (CRUD, validação, resgate)
- Moderação de solicitações de troca de mentor
- Analytics e registro de eventos de negócio
- Envio de notificações push via FCM

### Modelo de Dados

```javascript
// Coleção: vouchers
{
  _id: ObjectId,
  code: String, // unique, indexed
  menteeId: ObjectId, // indexed
  value: Number,
  redeemedAt: ISODate,
  expiresAt: ISODate,
  status: "active" | "redeemed" | "expired",
  createdAt: ISODate,
  updatedAt: ISODate
}

// Coleção: analytics
{
  _id: ObjectId,
  eventType: "MENTORSHIP_CREATED" | "MENTORSHIP_COMPLETED" | 
             "MENTOR_APPROVED" | "VOUCHER_REDEEMED",
  userId: ObjectId,
  timestamp: ISODate, // indexed
  metadata: Object
}
```

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/admin/dashboard` | Dados agregados | ADMIN |
| `GET` | `/admin/mentors/pending` | Mentores pendentes | ADMIN |
| `POST` | `/admin/mentors/{id}/approve` | Aprovar mentor | ADMIN |
| `GET` | `/admin/vouchers` | Listar vouchers | ADMIN |
| `POST` | `/admin/vouchers/generate` | Gerar múltiplos vouchers | ADMIN |
| `POST` | `/admin/vouchers/redeem` | Resgatar voucher | ADMIN |

---

## 📚 Próximos Passos

- [Especificação Completa de Endpoints](/docs/arquitetura/endpoints)
- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
- [Dependências Temporais](/docs/arquitetura/dependencias-temporais)
