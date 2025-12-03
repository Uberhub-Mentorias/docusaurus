---
id: endpoints
title: Especificação de Endpoints
sidebar_label: 🔌 Endpoints
sidebar_position: 3
---

# 🔌 Especificação de Endpoints da API

> Documentação completa de todos os 55 endpoints do sistema

---

## 📊 Resumo Quantitativo

| Serviço | Endpoints Públicos | Endpoints Admin | Endpoints Internos | Total |
|---------|-------------------|-----------------|-------------------|-------|
| **Auth Service** | 4 | 2 | 3 | **10** |
| **Profile Service** | 4 | 5 | 0 | **9** |
| **Matchmaking Service** | 0 | 0 | 4 | **4** |
| **Mentorship Service** | 9 | 0 | 0 | **9** |
| **Admin Service** | 0 | 21 | 2 | **23** |
| **TOTAL** | **17** | **28** | **9** | **55** |

---

## 🔐 Auth Service

**URL Completa:** `http://localhost:8081/api/v1` | **Porta:** `8081`

### Autenticação Pública

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/auth/register` | Registra novo usuário (mentor/mentorado) | Pública |
| `POST` | `/auth/login` | Autentica usuário e retorna JWT | Pública |
| `POST` | `/auth/refresh` | Renova access token | Requer refresh token |
| `POST` | `/auth/recover-password` | Inicia fluxo de recuperação de senha | Pública |

### Gerenciamento de Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/users/me` | Retorna dados do usuário autenticado | Bearer Token |
| `PUT` | `/users/me/fcm-token` | Atualiza token FCM para notificações | Bearer Token |
| `GET` | `/users` | Lista todos os usuários | Admin |
| `PUT` | `/users/{id}/status` | Atualiza status do usuário (ACTIVE/SUSPENDED) | Admin |

### Endpoints Internos

| Método | Endpoint | Descrição | Uso |
|--------|----------|-----------|-----|
| `PUT` | `/users/{userId}/credit` | Adiciona ou debita crédito de voucher | Interno |
| `PUT` | `/users/{userId}/add-role` | Adiciona novo papel (ex: ROLE_MENTOR) | Interno |
| `GET` | `/users/{userId}/fcm-token` | Retorna token FCM do usuário | Interno |

---

## 👤 Profile Service

**URL Completa:** `http://localhost:8082/api/v1` | **Porta:** `8082`

### Perfis de Mentores

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/profiles/mentor` | Cria perfil de mentor | Bearer Token |
| `PUT` | `/profiles/mentor` | Atualiza perfil do mentor autenticado | Bearer Token |
| `GET` | `/profiles/mentor/{mentorId}` | Retorna perfil específico de mentor | Bearer Token |
| `GET` | `/profiles/mentors` | Lista mentores com filtros | Bearer Token |
| `GET` | `/profiles/mentors/pending` | Lista mentores pendentes de aprovação | Admin |
| `PUT` | `/profiles/mentor/{mentorId}/status` | Atualiza status do perfil | Admin |

### Tags de Especialização

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/tags` | Lista todas as tags | Bearer Token |
| `POST` | `/tags` | Cria nova tag | Admin |
| `PUT` | `/tags/{tagId}` | Atualiza tag existente | Admin |
| `DELETE` | `/tags/{tagId}` | Remove tag | Admin |

---

## 🎯 Matchmaking Service (Interno)

**URL:** `http://localhost:8083/api/v1` | **Porta:** `8083`

:::warning Serviço Interno
Não exposto no API Gateway. Chamado apenas pelo Mentorship Service.
:::

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/matchmaking` | Encontra mentor mais compatível |
| `POST` | `/matchmaking/batch` | Retorna lista ordenada de mentores |
| `POST` | `/matchmaking/score` | Calcula score de compatibilidade |
| `GET` | `/matchmaking/decisions/{menteeId}` | Histórico de decisões |

---

## 📋 Mentorship Service

**URL Completa:** `http://localhost:8084/api/v1` | **Porta:** `8084`

### Mentorias - Ciclo de Vida

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/mentorships` | Criar nova mentoria (com matchmaking) | MENTEE |
| `GET` | `/mentorships/mentee` | Listar mentorias do mentorado | MENTEE |
| `GET` | `/mentorships/mentor` | Listar mentorias do mentor | MENTOR |
| `PUT` | `/mentorships/{id}/status` | Atualizar status da mentoria | Bearer Token |

### Agendamento de Sessões

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `PUT` | `/mentorships/{id}/schedule` | Agendar sessão (apenas mentor) | MENTOR |
| `POST` | `/mentorships/{id}/schedule/confirm` | Confirmar agendamento (apenas mentorado) | MENTEE |

### Feedback e Avaliação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/mentorships/{id}/feedback/mentor` | Mentor registra feedback | MENTOR |
| `POST` | `/mentorships/{id}/feedback/mentee` | Mentorado avalia sessão | MENTEE |
| `POST` | `/mentorships/{id}/request-change` | Solicitar troca de mentor | MENTEE |

---

## ⚙️ Admin Service

**URL Completa:** `http://localhost:8085/api/v1` | **Porta:** `8085`

### Dashboard e Analytics

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/dashboard` | Dados agregados do painel |

### Gerenciamento de Mentores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/mentors/pending` | Buscar mentores pendentes |
| `POST` | `/admin/mentors/{id}/approve` | Aprovar cadastro de mentor |

### Gerenciamento de Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/users` | Listar usuários da plataforma |
| `POST` | `/admin/users/{id}/suspend` | Suspender usuário |

### Gerenciamento de Vouchers

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/vouchers` | Listar todos os vouchers |
| `GET` | `/admin/vouchers/{id}` | Buscar voucher por ID |
| `GET` | `/admin/vouchers/code/{code}` | Buscar voucher por código |
| `POST` | `/admin/vouchers` | Criar novo voucher individual |
| `POST` | `/admin/vouchers/generate` | Gerar múltiplos vouchers |
| `PUT` | `/admin/vouchers/{id}` | Atualizar voucher |
| `DELETE` | `/admin/vouchers/{id}` | Deletar voucher |
| `GET` | `/admin/vouchers/validate/{code}` | Validar código |
| `POST` | `/admin/vouchers/redeem` | Resgatar voucher |

### Solicitações de Troca

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/mentorships/change-requests` | Listar solicitações de troca |
| `POST` | `/admin/mentorships/change-requests/{id}/approve` | Aprovar solicitação |

### Gerenciamento de Tags

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/tags` | Retornar todas as tags |
| `POST` | `/admin/tags` | Criar nova tag |
| `PUT` | `/admin/tags/{tagId}` | Atualizar tag |
| `DELETE` | `/admin/tags/{tagId}` | Remover tag |

### Logs e Endpoints Internos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/admin/logs` | Retornar logs administrativos |
| `POST` | `/analytics/record-event` | Registrar eventos de negócio (Interno) |
| `POST` | `/notifications/send` | Enviar notificação push (Interno) |

---

## 🔑 Tipos de Autenticação

| Tipo | Descrição |
|------|-----------|
| **Pública** | Sem autenticação necessária |
| **Bearer Token** | Requer JWT no header `Authorization: Bearer {token}` |
| **Admin** | Requer JWT com role `ADMIN` |
| **Mentor** | Requer JWT com role `MENTOR` |
| **Mentee** | Requer JWT com role `MENTEE` |
| **Interno** | Chamadas entre microsserviços (não expostas no Gateway) |

---

## 📚 Documentação Relacionada

- [Arquitetura de Microsserviços](/docs/arquitetura/microservicos)
- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
- [Autenticação Firebase](/docs/autenticacao/firebase-auth-flow)
