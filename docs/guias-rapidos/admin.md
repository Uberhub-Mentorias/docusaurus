---
id: admin
title: Guia do Administrador
sidebar_label: ⚙️ Admin
sidebar_position: 4
---

# ⚙️ Guia Rápido do Administrador

> Como gerenciar o programa de mentorias pelo painel web

---

## 🖥️ Acesso ao Painel

1. Acesse o **Painel Admin Web** (URL a definir)
2. Faça login com suas credenciais de administrador
3. Use **"Entrar com Google"** (autenticação Firebase)

:::warning Acesso Restrito
Apenas usuários com role `ADMIN` podem acessar o painel. Se você não consegue acessar, verifique suas permissões.
:::

---

## 📊 Dashboard

A tela inicial mostra métricas em tempo real:

| Métrica | Descrição |
|---------|-----------|
| **Novos Cadastros** | Usuários que se registraram recentemente |
| **Mentorias Pendentes** | Solicitações aguardando ação |
| **Mentorias Realizadas** | Total de mentorias completadas no mês |
| **Mentores Pendentes** | Perfis aguardando aprovação |
| **Vouchers Ativos** | Códigos válidos ainda não resgatados |

---

## 👥 Gerenciamento de Mentores

### Aprovar/Reprovar Mentores

1. Vá em **"Mentores"** → **"Pendentes"**
2. Clique no mentor para ver o perfil completo
3. Analise:
   - Minibio
   - Áreas de especialidade
   - Link de agendamento
4. Clique em **"Aprovar"** ou **"Reprovar"**

```
Status: Pendente → Aprovado | Reprovado
```

:::tip Boas Práticas
Verifique se o link de agendamento está funcionando antes de aprovar!
:::

---

## 🎟️ Gerenciamento de Vouchers

### Gerar Novos Vouchers

1. Vá em **"Vouchers"** → **"Gerar Novos"**
2. Configure:
   - **Tipo**: Aberto ou Restrito (por trilha/área)
   - **Quantidade**: Número de vouchers a gerar
   - **Validade**: Data de expiração (opcional)
3. Clique em **"Gerar"**

O sistema criará códigos únicos automaticamente:

```
UBER-2024-ABCD-1234
UBER-2024-EFGH-5678
UBER-2024-IJKL-9012
...
```

### Gerenciar Vouchers Existentes

| Ação | Descrição |
|------|-----------|
| **Listar** | Ver todos os vouchers com filtros |
| **Validar** | Verificar se um código é válido |
| **Desativar** | Invalidar um voucher específico |
| **Exportar** | Baixar lista de códigos (CSV/Excel) |

---

## 🔄 Gerenciamento de Solicitações

### Solicitações de Troca de Mentor

Quando um mentorado solicita trocar de mentor:

1. Vá em **"Mentorias"** → **"Solicitações de Troca"**
2. Analise a justificativa do mentorado
3. Clique em **"Aprovar"** ou **"Reprovar"**

Se aprovado, o sistema executará um novo matchmaking.

### Mentorias Expiradas

Mentorias que passaram de 7 dias sem agendamento são listadas em:
- **"Mentorias"** → **"Expiradas"**

---

## 👤 Gerenciamento de Usuários

### Suspender Usuário

Para casos de no-show repetido ou violação de regras:

1. Vá em **"Usuários"** → **"Listar"**
2. Busque o usuário
3. Clique em **"Suspender"**
4. Confirme a ação

```
Status: ACTIVE → SUSPENDED
```

### Reativar Usuário

1. Vá em **"Usuários"** → **"Suspensos"**
2. Selecione o usuário
3. Clique em **"Reativar"**

---

## 🏷️ Gerenciamento de Tags

Tags são categorias de conhecimento usadas no matchmaking:

### Criar Nova Tag

1. Vá em **"Tags"** → **"Nova Tag"**
2. Preencha:
   - Nome (ex: "Marketing Digital")
   - Categoria (ex: "Marketing")
   - Descrição (opcional)
3. Clique em **"Salvar"**

### Editar/Remover Tags

- **Editar**: Mude nome, categoria ou descrição
- **Remover**: Cuidado! Afeta mentores que usam essa tag

---

## 📈 Analytics

Acompanhe o desempenho do programa:

| Métrica | O que mostra |
|---------|--------------|
| **Taxa de Conclusão** | % de mentorias finalizadas com sucesso |
| **NPS de Mentores** | Satisfação média dos mentorados |
| **Tempo Médio de Match** | Tempo entre solicitação e matchmaking |
| **Taxa de No-Show** | % de sessões com ausência |

---

## 🔔 Notificações

O sistema envia notificações automáticas para:

| Evento | Quem recebe |
|--------|-------------|
| Mentor aprovado | Mentor |
| Nova mentoria atribuída | Mentor |
| Lembrete de sessão (24h) | Mentorado |
| Lembrete de sessão (1h) | Mentorado |
| Mentoria expirada | Mentorado |
| Feedback disponível | Mentorado |

---

## 🔄 Fluxo Visual do Admin

```
┌─────────────────────────────────────────────────────────────────┐
│                    PAINEL ADMINISTRATIVO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ Dashboard  │  │  Mentores  │  │  Vouchers  │  │  Usuários  │ │
│  │            │  │  Pendentes │  │   Ativos   │  │  Suspensos │ │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘ │
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ Mentorias  │  │    Tags    │  │  Analytics │  │    Logs    │ │
│  │  Expiradas │  │            │  │            │  │            │ │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📚 Próximos Passos

- [Endpoints da API Admin](/docs/arquitetura/endpoints#admin-service)
- [Regras de Negócio](/docs/requisitos/regras-negocio)
- [Guia de CI/CD](/docs/devops/ci-cd-guia)
