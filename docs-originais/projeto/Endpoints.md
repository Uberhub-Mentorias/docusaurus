# Especificação de Endpoints

**Projeto:** Aplicativo de Mentorias UberHub  
**Data de Atualização:** 20 de Novembro de 2025  
**Versão:** 2.0 (Consolidado com Análise de Requisitos)

> **Nota:** Este documento consolida a especificação completa de endpoints, incorporando ajustes identificados na análise comparativa entre Requisitos Funcionais e Especificação de Endpoints.

---

## 🔌 Portas dos Serviços

| Serviço                 | Porta  | URL Completa                   | Tipo    |
| ----------------------- | ------ | ------------------------------ | ------- |
| **API Gateway**         | `8080` | `http://localhost:8080`        | Público |
| **Auth Service**        | `8081` | `http://localhost:8081/api/v1` | Público |
| **Profile Service**     | `8082` | `http://localhost:8082/api/v1` | Público |
| **Matchmaking Service** | `8083` | `http://localhost:8083/api/v1` | Interno |
| **Mentorship Service**  | `8084` | `http://localhost:8084/api/v1` | Público |
| **Admin Service**       | `8085` | `http://localhost:8085/api/v1` | Público |

---

## 📋 Tabela Consolidada de Endpoints

| Método                  | Endpoint                                          | Descrição                                                | Autenticação         | Papel (Role)  |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------------- | -------------------- | ------------- |
| **Auth Service**        |                                                   |                                                          |                      |               |
| `POST`                  | `/auth/register`                                  | Registra novo usuário (mentor/mentorado)                 | Pública              | -             |
| `POST`                  | `/auth/login`                                     | Autentica usuário e retorna JWT                          | Pública              | -             |
| `POST`                  | `/auth/refresh`                                   | Renova access token                                      | Requer refresh token | -             |
| `POST`                  | `/auth/recover-password`                          | Inicia fluxo de recuperação de senha por e-mail         | Pública              | -             |
| `GET`                   | `/users/me`                                       | Retorna dados do usuário autenticado                     | Bearer Token         | Qualquer      |
| `PUT`                   | `/users/me/fcm-token`                             | Atualiza token FCM para notificações                     | Bearer Token         | Qualquer      |
| `GET`                   | `/users`                                          | Lista todos os usuários                                  | Admin                | ADMIN         |
| `PUT`                   | `/users/{id}/status`                              | Atualiza status do usuário (ACTIVE/SUSPENDED)            | Admin                | ADMIN         |
| `PUT`                   | `/users/{userId}/credit`                          | Adiciona ou debita crédito de voucher do usuário         | Interno              | -             |
| `PUT`                   | `/users/{userId}/add-role`                        | Adiciona novo papel (ex: ROLE_MENTOR) ao usuário         | Interno              | -             |
| `GET`                   | `/users/{userId}/fcm-token`                       | Retorna token FCM do usuário para notificações           | Interno              | -             |
| **Profile Service**     |                                                   |                                                          |                      |               |
| `POST`                  | `/profiles/mentor`                                | Cria perfil de mentor                                    | Bearer Token         | MENTOR        |
| `PUT`                   | `/profiles/mentor`                                | Atualiza perfil do mentor autenticado                    | Bearer Token         | MENTOR        |
| `GET`                   | `/profiles/mentor/{mentorId}`                     | Retorna perfil específico de mentor                      | Bearer Token         | Qualquer      |
| `GET`                   | `/profiles/mentors`                               | Lista mentores com filtros (status, area, limit, offset) | Bearer Token         | Qualquer      |
| `GET`                   | `/profiles/mentors/pending`                       | Lista mentores pendentes de aprovação                    | Admin                | ADMIN         |
| `PUT`                   | `/profiles/mentor/{mentorId}/status`              | Atualiza status do perfil (PENDING/APPROVED)             | Admin                | ADMIN         |
| `GET`                   | `/tags`                                           | Lista todas as tags de especialização                    | Bearer Token         | Qualquer      |
| `POST`                  | `/tags`                                           | Cria nova tag                                            | Admin                | ADMIN         |
| `PUT`                   | `/tags/{tagId}`                                   | Atualiza tag existente                                   | Admin                | ADMIN         |
| `DELETE`                | `/tags/{tagId}`                                   | Remove tag                                               | Admin                | ADMIN         |
| **Matchmaking Service** |                                                   |                                                          |                      |               |
| `POST`                  | `/matchmaking`                                    | Encontra mentor mais compatível para mentorado           | Interno              | -             |
| `POST`                  | `/matchmaking/batch`                              | Retorna lista ordenada de mentores compatíveis           | Interno              | -             |
| `POST`                  | `/matchmaking/score`                              | Calcula score de compatibilidade específico              | Interno              | -             |
| `GET`                   | `/matchmaking/decisions/{menteeId}`               | Histórico de decisões de matching                        | Interno              | -             |
| **Mentorship Service**  |                                                   |                                                          |                      |               |
| `POST`                  | `/mentorships`                                    | Criar nova mentoria (com matchmaking)                    | Bearer Token         | MENTEE        |
| `GET`                   | `/mentorships/mentee`                             | Listar mentorias do mentorado                            | Bearer Token         | MENTEE        |
| `GET`                   | `/mentorships/mentor`                             | Listar mentorias do mentor                               | Bearer Token         | MENTOR        |
| `PUT`                   | `/mentorships/{id}/status`                        | Atualizar status da mentoria                             | Bearer Token         | MENTOR/MENTEE/ADMIN |
| `PUT`                   | `/mentorships/{id}/schedule`                      | Agendar sessão (apenas mentor)                           | Bearer Token         | MENTOR        |
| `POST`                  | `/mentorships/{id}/schedule/confirm`              | Confirmar/rejeitar agendamento (apenas mentorado)        | Bearer Token         | MENTEE        |
| `POST`                  | `/mentorships/{id}/feedback/mentor`               | Mentor registra feedback e presença                      | Bearer Token         | MENTOR        |
| `POST`                  | `/mentorships/{id}/feedback/mentee`               | Mentorado avalia sessão                                  | Bearer Token         | MENTEE        |
| `POST`                  | `/mentorships/{id}/request-change`                | Solicitar troca de mentor                                | Bearer Token         | MENTEE        |
| **Admin Service**       |                                                   |                                                          |                      |               |
| `GET`                   | `/admin/dashboard`                                | Dados agregados do painel administrativo                 | Admin                | ADMIN         |
| `GET`                   | `/admin/mentors/pending`                          | Buscar mentores pendentes de aprovação (delegado)        | Admin                | ADMIN         |
| `POST`                  | `/admin/mentors/{id}/approve`                     | Aprovar cadastro de mentor (delegado)                    | Admin                | ADMIN         |
| `GET`                   | `/admin/users`                                    | Listar usuários da plataforma (delegado)                 | Admin                | ADMIN         |
| `POST`                  | `/admin/users/{id}/suspend`                       | Suspender usuário (delegado)                             | Admin                | ADMIN         |
| `GET`                   | `/admin/vouchers`                                 | Listar todos os vouchers (com filtros)                   | Admin                | ADMIN         |
| `GET`                   | `/admin/vouchers/{id}`                            | Buscar voucher por ID                                    | Admin                | ADMIN         |
| `GET`                   | `/admin/vouchers/code/{code}`                     | Buscar voucher por código                                 | Admin                | ADMIN         |
| `POST`                  | `/admin/vouchers`                                 | Criar novo voucher individual                             | Admin                | ADMIN         |
| `POST`                  | `/admin/vouchers/generate`                        | Gerar múltiplos vouchers                                  | Admin                | ADMIN         |
| `PUT`                   | `/admin/vouchers/{id}`                            | Atualizar voucher existente                              | Admin                | ADMIN         |
| `DELETE`                | `/admin/vouchers/{id}`                            | Deletar voucher                                          | Admin                | ADMIN         |
| `GET`                   | `/admin/vouchers/validate/{code}`                 | Validar código de voucher                                | Admin                | ADMIN         |
| `POST`                  | `/admin/vouchers/redeem`                          | Resgatar voucher válido                                  | Admin                | ADMIN         |
| `GET`                   | `/admin/mentorships/change-requests`              | Listar solicitações de troca (delegado)                  | Admin                | ADMIN         |
| `POST`                  | `/admin/mentorships/change-requests/{id}/approve` | Aprovar solicitação de troca (delegado)                  | Admin                | ADMIN         |
| `GET`                   | `/admin/tags`                                     | Retornar todas as tags (delegado)                        | Admin                | ADMIN         |
| `POST`                  | `/admin/tags`                                     | Criar nova tag (delegado)                                | Admin                | ADMIN         |
| `PUT`                   | `/admin/tags/{tagId}`                             | Atualizar tag existente (delegado)                        | Admin                | ADMIN         |
| `DELETE`                | `/admin/tags/{tagId}`                             | Remover tag (delegado)                                   | Admin                | ADMIN         |
| `GET`                   | `/admin/logs`                                     | Retornar logs de ações administrativas                   | Admin                | ADMIN         |
| `POST`                  | `/analytics/record-event`                         | Registrar eventos de negócio                             | Interno              | -             |
| `POST`                  | `/notifications/send`                             | Enviar notificação push via FCM                          | Interno              | -             |

---

## Auth Service

**URL Completa:** `http://localhost:8081/api/v1`  
**Porta:** `8081`  
**Base URL:** `/api/v1`  
**Banco de Dados:** MongoDB  
**Coleções:** `users`, `fcmTokens`

### 📦 Modelo de Dados

#### Coleção: `users`

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string (hashed BCrypt)",
  "role": "MENTOR | MENTEE | ADMIN",
  "roles": ["ROLE_MENTEE", "ROLE_MENTOR", "ROLE_ADMIN"],
  "status": "ACTIVE | SUSPENDED",
  "voucherCreditBalance": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Coleção: `fcmTokens`

```json
{
  "id": "string",
  "userId": "string",
  "token": "string",
  "deviceId": "string",
  "createdAt": "datetime"
}
```

### Autenticação Pública

| Método | Endpoint                | Descrição                                | Autenticação         |
| ------ | ----------------------- | ---------------------------------------- | -------------------- |
| `POST` | `/auth/register`        | Registra novo usuário (mentor/mentorado) | Pública              |
| `POST` | `/auth/login`           | Autentica usuário e retorna JWT          | Pública              |
| `POST` | `/auth/refresh`         | Renova access token                      | Requer refresh token |
| `POST` | `/auth/recover-password`| Inicia fluxo de recuperação de senha por e-mail | Pública |

### Gerenciamento de Usuários

| Método | Endpoint                     | Descrição                                     | Autenticação |
| ------ | ---------------------------- | --------------------------------------------- | ------------ |
| `GET`  | `/users/me`                  | Retorna dados do usuário autenticado          | Bearer Token |
| `PUT`  | `/users/me/fcm-token`        | Atualiza token FCM para notificações          | Bearer Token |
| `GET`  | `/users`                     | Lista todos os usuários                       | Admin        |
| `PUT`  | `/users/{id}/status`         | Atualiza status do usuário (ACTIVE/SUSPENDED) | Admin        |

### Endpoints Internos

| Método | Endpoint                     | Descrição                                     | Uso     |
| ------ | ---------------------------- | --------------------------------------------- | ------- |
| `PUT`  | `/users/{userId}/credit`      | Adiciona ou debita crédito de voucher         | Interno |
| `PUT`  | `/users/{userId}/add-role`    | Adiciona novo papel (ex: ROLE_MENTOR)         | Interno |
| `GET`  | `/users/{userId}/fcm-token`   | Retorna token FCM do usuário                  | Interno |

**Nota sobre FCM Token:** O endpoint interno usa singular (`/fcm-token`) para consistência com a especificação original. O endpoint público usa `/users/me/fcm-token` (singular).

---

## Profile Service

**URL Completa:** `http://localhost:8082/api/v1`  
**Porta:** `8082`  
**Base URL:** `/api/v1`  
**Banco de Dados:** MongoDB  
**Coleções:** `profiles`, `tags`

### 📦 Modelo de Dados

#### Coleção: `profiles`

```json
{
  "id": "string",
  "mentorId": "string",
  "miniBio": "string",
  "areas": ["string"],
  "schedulingLink": "string (URL)",
  "status": "PENDING | APPROVED | REJECTED",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "approvedAt": "datetime",
  "approvedBy": "string"
}
```

#### Coleção: `tags`

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "description": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Perfis de Mentores

| Método | Endpoint                             | Descrição                                                | Autenticação |
| ------ | ------------------------------------ | -------------------------------------------------------- | ------------ |
| `POST` | `/profiles/mentor`                   | Cria perfil de mentor                                    | Bearer Token |
| `PUT`  | `/profiles/mentor`                   | Atualiza perfil do mentor autenticado                    | Bearer Token |
| `GET`  | `/profiles/mentor/{mentorId}`        | Retorna perfil específico de mentor                      | Bearer Token |
| `GET`  | `/profiles/mentors`                  | Lista mentores com filtros (status, area, limit, offset) | Bearer Token |
| `GET`  | `/profiles/mentors/pending`          | Lista mentores pendentes de aprovação                    | Admin        |
| `PUT`  | `/profiles/mentor/{mentorId}/status` | Atualiza status do perfil (PENDING/APPROVED)             | Admin        |

### Tags de Especialização

| Método   | Endpoint        | Descrição                             | Autenticação |
| -------- | --------------- | ------------------------------------- | ------------ |
| `GET`    | `/tags`         | Lista todas as tags de especialização | Bearer Token |
| `POST`   | `/tags`         | Cria nova tag                         | Admin        |
| `PUT`    | `/tags/{tagId}` | Atualiza tag existente                | Admin        |
| `DELETE` | `/tags/{tagId}` | Remove tag                            | Admin        |

**Nota:** A gestão de tags está centralizada no Profile Service. O Admin Service orquestra as chamadas através de `/admin/tags`, que internamente chama os endpoints do Profile Service.

---

## Matchmaking Service

**URL Completa:** `http://localhost:8083/api/v1` (interno)  
**Porta:** `8083`  
**Base URL:** `/api/v1`  
**Banco de Dados:** MongoDB (opcional para histórico)  
**Coleções:** `matchingDecisions` (opcional)  
**Nota:** Serviço interno, não exposto no API Gateway. Chamado apenas pelo mentorship-service.

### 📦 Modelo de Dados

#### Coleção: `matchingDecisions` (opcional para analytics)

```json
{
  "matchId": "string",
  "menteeId": "string",
  "mentorId": "string",
  "matchScore": "number (0-1)",
  "confidence": "string (low|medium|high)",
  "requiredExpertise": ["string"],
  "matchedCriteria": {
    "expertiseMatch": "number",
    "availabilityMatch": "number",
    "languageMatch": "number",
    "formatMatch": "number",
    "experienceMatch": "number"
  },
  "timestamp": "datetime",
  "outcome": "string (pending|accepted|rejected)"
}
```

### Algoritmo de Compatibilidade

| Método | Endpoint                            | Descrição                                      | Uso     |
| ------ | ----------------------------------- | ---------------------------------------------- | ------- |
| `POST` | `/matchmaking`                      | Encontra mentor mais compatível para mentorado | Interno |
| `POST` | `/matchmaking/batch`                | Retorna lista ordenada de mentores compatíveis | Interno |
| `POST` | `/matchmaking/score`                | Calcula score de compatibilidade específico    | Interno |
| `GET`  | `/matchmaking/decisions/{menteeId}` | Histórico de decisões de matching              | Interno |

**Nota:** Os endpoints `/matchmaking/batch`, `/matchmaking/score` e `/matchmaking/decisions/{menteeId}` são expansões adicionais que complementam o requisito RF-MDO-05.

---

## Mentorship Service

**URL Completa:** `http://localhost:8084/api/v1`  
**Porta:** `8084`  
**Base URL:** `/api/v1`  
**Banco de Dados:** MongoDB  
**Coleções:** `mentorships`, `feedbacks`, `changeRequests`  
**Nota:** Endpoints de vouchers estão no Admin Service

### 📦 Modelo de Dados

#### Coleção: `mentorships`

```json
{
  "id": "string",
  "menteeId": "string",
  "mentorId": "string",
  "voucherId": "string",
  "status": "pending_match | matched | scheduled | in_progress | completed | cancelled | change_requested | expired",
  "matchingScore": "number",
  "preferences": {
    "expertise": ["string"],
    "availableTimes": [{ "dayOfWeek": "number", "startTime": "string", "endTime": "string" }],
    "preferredLanguage": "string",
    "sessionFormat": "video | audio | chat | in-person"
  },
  "scheduledSession": {
    "scheduledAt": "datetime",
    "duration": "number (minutes)",
    "format": "string",
    "meetingLink": "string",
    "location": "string",
    "timezone": "string",
    "confirmationStatus": "pending | confirmed | rejected | cancelled"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Coleção: `feedbacks`

```json
{
  "id": "string",
  "mentorshipId": "string",
  "type": "mentor | mentee",
  "rating": "number (1-5)",
  "feedback": "string",
  "mentorHelpfulness": "number (1-5)",
  "sessionCompleted": "boolean",
  "goalAchievement": "number (1-5)",
  "createdAt": "datetime",
  "voucherGranted": {
    "granted": "boolean",
    "voucherId": "string",
    "code": "string"
  }
}
```

#### Coleção: `changeRequests`

```json
{
  "id": "string",
  "mentorshipId": "string",
  "changeType": "mentor_change | reschedule | format_change | cancellation",
  "reason": "string",
  "status": "pending | approved | rejected | resolved",
  "requestedBy": "string",
  "requestedAt": "datetime",
  "resolvedAt": "datetime",
  "resolvedBy": "string"
}
```

### Mentorias - Ciclo de Vida

| Método | Endpoint                   | Descrição                             | Autenticação |
| ------ | -------------------------- | ------------------------------------- | ------------ |
| `POST` | `/mentorships`             | Criar nova mentoria (com matchmaking) | Bearer Token |
| `GET`  | `/mentorships/mentee`      | Listar mentorias do mentorado         | Bearer Token |
| `GET`  | `/mentorships/mentor`      | Listar mentorias do mentor            | Bearer Token |
| `PUT`  | `/mentorships/{id}/status` | Atualizar status da mentoria          | Bearer Token |

**Nota sobre `/mentorships/{id}/status`:** Este endpoint pode ser usado por MENTOR, MENTEE ou ADMIN, dependendo do contexto. Para aprovação de trocas de mentor, o admin-service pode chamá-lo internamente ou através do gateway com role ADMIN.

### Agendamento de Sessões

| Método | Endpoint                             | Descrição                                         | Autenticação          |
| ------ | ------------------------------------ | ------------------------------------------------- | --------------------- |
| `PUT`  | `/mentorships/{id}/schedule`         | Agendar sessão (apenas mentor)                    | Bearer Token (Mentor) |
| `POST` | `/mentorships/{id}/schedule/confirm` | Confirmar/rejeitar agendamento (apenas mentorado) | Bearer Token (Mentee) |

### Feedback e Avaliação

| Método | Endpoint                            | Descrição                           | Autenticação          |
| ------ | ----------------------------------- | ----------------------------------- | --------------------- |
| `POST` | `/mentorships/{id}/feedback/mentor` | Mentor registra feedback e presença | Bearer Token (Mentor) |
| `POST` | `/mentorships/{id}/feedback/mentee` | Mentorado avalia sessão             | Bearer Token (Mentee) |

### Solicitações de Troca

| Método | Endpoint                           | Descrição                 | Autenticação          |
| ------ | ---------------------------------- | ------------------------- | --------------------- |
| `POST` | `/mentorships/{id}/request-change` | Solicitar troca de mentor | Bearer Token (Mentee) |

### Processos Internos

**RF-MDO-13 - Rotina de Expiração Automática:**

- **Tipo:** Job/Scheduler interno (não é endpoint)
- **Descrição:** Rotina que verifica mentorias com status `pending_match` ou `matched` que foram criadas há mais de 7 dias e não foram agendadas. Essas mentorias são automaticamente marcadas como `expired`.
- **Frequência:** Executada periodicamente (ex: diariamente)
- **Implementação:** Deve ser documentada como processo interno do mentorship-service, mesmo que não seja exposta como endpoint.

---

## Admin Service

**URL Completa:** `http://localhost:8085/api/v1`  
**Porta:** `8085`  
**Base URL:** `/api/v1`  
**Banco de Dados:** MongoDB  
**Coleções:** `vouchers`, `analytics`, `notifications`, `auditLogs`

### 📦 Modelo de Dados

#### Coleção: `vouchers`

```json
{
  "id": "string",
  "code": "string (único)",
  "menteeId": "string",
  "value": "number",
  "redeemedAt": "datetime",
  "expiresAt": "datetime",
  "mentorshipEligible": "boolean",
  "status": "active | redeemed | expired",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Coleção: `analytics` (eventos de negócio)

```json
{
  "id": "string",
  "eventType": "MENTORSHIP_CREATED | MENTORSHIP_COMPLETED | MENTOR_APPROVED | VOUCHER_REDEEMED",
  "userId": "string",
  "timestamp": "datetime",
  "metadata": {
    "mentorId": "string",
    "mentorshipId": "string",
    "additional": "object"
  }
}
```

#### Coleção: `notifications`

```json
{
  "id": "string",
  "userId": "string",
  "message": "string",
  "type": "push | email | in-app",
  "status": "pending | sent | failed",
  "sentAt": "datetime",
  "fcmToken": "string",
  "metadata": "object"
}
```

#### Coleção: `auditLogs`

```json
{
  "id": "string",
  "action": "MENTOR_APPROVED | USER_SUSPENDED | TAG_CREATED | VOUCHER_GENERATED",
  "performedBy": "string (admin userId)",
  "targetId": "string",
  "targetType": "user | mentor | tag | voucher | mentorship",
  "timestamp": "datetime",
  "changes": "object",
  "ipAddress": "string"
}
```

### Dashboard e Analytics

| Método | Endpoint           | Descrição                                | Autenticação |
| ------ | ------------------ | ---------------------------------------- | ------------ |
| `GET`  | `/admin/dashboard` | Dados agregados do painel administrativo | Admin        |

### Gerenciamento de Mentores

| Método | Endpoint                      | Descrição                              | Autenticação |
| ------ | ----------------------------- | -------------------------------------- | ------------ |
| `GET`  | `/admin/mentors/pending`      | Buscar mentores pendentes de aprovação | Admin        |
| `POST` | `/admin/mentors/{id}/approve` | Aprovar cadastro de mentor             | Admin        |

### Gerenciamento de Usuários

| Método | Endpoint                    | Descrição                     | Autenticação |
| ------ | --------------------------- | ----------------------------- | ------------ |
| `GET`  | `/admin/users`              | Listar usuários da plataforma | Admin        |
| `POST` | `/admin/users/{id}/suspend` | Suspender usuário             | Admin        |

### Gerenciamento de Vouchers

| Método   | Endpoint                          | Descrição                              | Autenticação |
| -------- | --------------------------------- | -------------------------------------- | ------------ |
| `GET`    | `/admin/vouchers`                 | Listar todos os vouchers (com filtros) | Admin        |
| `GET`    | `/admin/vouchers/{id}`            | Buscar voucher por ID                  | Admin        |
| `GET`    | `/admin/vouchers/code/{code}`    | Buscar voucher por código              | Admin        |
| `POST`   | `/admin/vouchers`                 | Criar novo voucher individual          | Admin        |
| `POST`   | `/admin/vouchers/generate`        | Gerar múltiplos vouchers                | Admin        |
| `PUT`    | `/admin/vouchers/{id}`            | Atualizar voucher existente            | Admin        |
| `DELETE` | `/admin/vouchers/{id}`            | Deletar voucher                        | Admin        |
| `GET`    | `/admin/vouchers/validate/{code}` | Validar código de voucher              | Admin        |
| `POST`   | `/admin/vouchers/redeem`          | Resgatar voucher válido                | Admin        |

### Solicitações de Troca

| Método | Endpoint                                          | Descrição                                | Autenticação |
| ------ | ------------------------------------------------- | ---------------------------------------- | ------------ |
| `GET`  | `/admin/mentorships/change-requests`              | Listar solicitações de troca de mentoria | Admin        |
| `POST` | `/admin/mentorships/change-requests/{id}/approve` | Aprovar solicitação de troca             | Admin        |

### Gerenciamento de Tags

| Método   | Endpoint              | Descrição                               | Autenticação |
| -------- | --------------------- | --------------------------------------- | ------------ |
| `GET`    | `/admin/tags`         | Retornar todas as tags de especialidade | Admin        |
| `POST`   | `/admin/tags`         | Criar nova tag                          | Admin        |
| `PUT`    | `/admin/tags/{tagId}` | Atualizar tag existente                 | Admin        |
| `DELETE` | `/admin/tags/{tagId}` | Remover tag                             | Admin        |

**Nota:** Estes endpoints orquestram chamadas ao Profile Service, que é o dono da lógica de negócio e dados das tags.

### Logs Administrativos

| Método | Endpoint       | Descrição                                | Autenticação |
| ------ | -------------- | ---------------------------------------- | ------------ |
| `GET`  | `/admin/logs`  | Retornar logs de ações administrativas   | Admin        |

### Endpoints Internos (Não expostos no Gateway)

| Método | Endpoint                  | Descrição                       | Uso     |
| ------ | ------------------------- | ------------------------------- | ------- |
| `POST` | `/analytics/record-event` | Registrar eventos de negócio    | Interno |
| `POST` | `/notifications/send`     | Enviar notificação push via FCM | Interno |

---

## 📊 Resumo Quantitativo

| Serviço                 | Endpoints Públicos | Endpoints Admin | Endpoints Internos | Total  |
| ----------------------- | ------------------ | --------------- | ------------------ | ------ |
| **Auth Service**        | 4                  | 2               | 3                  | **10** |
| **Profile Service**     | 4                  | 5               | 0                  | **9**  |
| **Matchmaking Service** | 0                  | 0               | 4                  | **4**  |
| **Mentorship Service**  | 9                  | 0               | 0                  | **9**  |
| **Admin Service**       | 0                  | 21              | 2                  | **23** |
| **TOTAL**               | **17**             | **28**          | **9**              | **55** |

---

## 🔑 Tipos de Autenticação

- **Pública:** Sem autenticação necessária
- **Bearer Token:** Requer JWT no header `Authorization: Bearer {token}`
- **Admin:** Requer JWT com role `ADMIN`
- **Mentor:** Requer JWT com role `MENTOR`
- **Mentee:** Requer JWT com role `MENTEE`
- **Interno:** Chamadas entre microsserviços (não expostas no Gateway)

---

## 📝 Observações Importantes

1. **Arquitetura de Microsserviços:** Cada serviço tem seu próprio banco de dados MongoDB
2. **API Gateway:** Valida JWT antes de rotear requisições
3. **Comunicação:** Síncrona via REST/HTTP entre serviços
4. **Documentação:** OpenAPI 3.0 / Springdoc
5. **Framework:** Spring Boot 3.x com Spring Security
6. **Notificações:** Firebase Cloud Messaging (FCM) para push notifications

### Ajustes Incorporados

Este documento incorpora os seguintes ajustes identificados na análise comparativa:

1. ✅ **Auth Service:**
   - Adicionado `/auth/recover-password` (lacuna corrigida)
   - Adicionados endpoints internos `/users/{userId}/credit` e `/users/{userId}/add-role` (lacunas corrigidas)
   - Endpoint FCM mantido como `/users/{userId}/fcm-token` (singular) para consistência

2. ✅ **Profile Service:**
   - Gestão de tags centralizada no Profile Service, com orquestração via Admin Service

3. ✅ **Matchmaking Service:**
   - Endpoints adicionais (`/batch`, `/score`, `/decisions`) documentados como expansões do RF-MDO-05

4. ✅ **Mentorship Service:**
   - Endpoint `/schedule/confirm` documentado
   - Endpoint `/status` documentado como acessível por MENTOR, MENTEE ou ADMIN conforme contexto
   - RF-MDO-13 (rotina de expiração) documentado como processo interno

5. ✅ **Admin Service:**
   - Endpoint `/admin/logs` adicionado (lacuna corrigida)
   - CRUD expandido de vouchers documentado

---

**Projeto:** UberHub Mentorias - IFTM Campus Uberlândia Centro  
**Versão:** 1.1 - Atualização de endpoints
