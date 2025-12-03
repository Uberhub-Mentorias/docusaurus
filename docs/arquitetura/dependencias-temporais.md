---
id: dependencias-temporais
title: Dependências Temporais
sidebar_label: ⏰ Dependências Temporais
sidebar_position: 5
---

# ⏰ Dependências Temporais e Junções de Fluxos

> O que precisa acontecer antes de quê no sistema

---

## 📊 Diagrama de Dependências

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO INICIAL (Setup)                        │
│  Admin: Geração de Vouchers                                     │
│  Mentor: Cadastro → Admin: Aprovação → Mentor: Aprovado         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              FLUXO PRINCIPAL (Mentoria)                         │
│                                                                 │
│  MENTORADO:                                                     │
│  Cadastro → Voucher → Detalhamento → Matchmaking                │
│                                                                 │
│  JUNÇÃO 1: Matchmaking (Mentorado + Mentor Aprovado)            │
│                                                                 │
│  MENTORADO:                                                     │
│  Visualização → Agendamento (externo)                           │
│                                                                 │
│  JUNÇÃO 2: Agendamento Externo                                  │
│                                                                 │
│  MENTOR:                                                        │
│  Cadastro da Mentoria no App                                    │
│                                                                 │
│  JUNÇÃO 3: Notificações (Mentor cadastra → Mentorado recebe)    │
│                                                                 │
│  JUNÇÃO 4: Feedback/Avaliação (Mentor → Mentorado)              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Dependências Identificadas

### Dependências de Setup (Pré-requisitos)

| Fluxo Dependente | Pré-requisito | Tipo | Obrigatório |
|------------------|---------------|------|-------------|
| Mentorado: Inserção do Voucher | Admin: Geração de Vouchers | Pré-requisito | ✅ Sim |
| Mentorado: Matchmaking | Mentor: Aprovação | Pré-requisito | ✅ Sim |
| Mentorado: Matchmaking | Admin: Aprovação de Mentores | Pré-requisito | ✅ Sim |
| Mentor: Aprovação | Admin: Aprovação de Mentores | Pré-requisito | ✅ Sim |

### Dependências do Fluxo Principal

| Fluxo Dependente | Pré-requisito | Tipo | Obrigatório |
|------------------|---------------|------|-------------|
| Mentor: Recebimento de Agendamento | Mentorado: Agendamento | Evento Externo | ✅ Sim |
| Mentor: Cadastro da Mentoria | Mentor: Recebimento de Agendamento | Sequencial | ✅ Sim |
| Mentorado: Notificações | Mentor: Cadastro da Mentoria | Trigger | ✅ Sim |
| Mentor: Feedback Pós-Mentoria | Mentor: Realização da Mentoria | Temporal | ✅ Sim |
| Mentorado: Avaliação | Mentor: Feedback Pós-Mentoria | Sequencial | ✅ Sim |

---

## 🔄 Pontos de Junção

### Junção 1: Matchmaking

**Participantes:** Mentorado + Mentor Aprovado + Sistema de Matchmaking

**Momento:** Quando mentorado submete solicitação com tags selecionadas

**Resultado:**
- Mentor mais compatível é apresentado
- Crédito de voucher é debitado
- Mentoria criada com status `matched`

**Dependências:**
- Mentor deve estar aprovado
- Mentorado deve ter voucher válido e crédito disponível
- Deve existir pelo menos um mentor aprovado com tags compatíveis

### Junção 2: Agendamento Externo

**Participantes:** Mentorado + Mentor

**Momento:** Quando mentorado agenda na ferramenta externa

**Resultado:**
- Ambos recebem notificação da ferramenta externa

**Dependências:**
- Matchmaking deve ter ocorrido
- Mentorado deve ter visualizado o mentor

### Junção 3: Cadastro e Notificações

**Participantes:** Mentor + Mentorado

**Momento:** Quando mentor cadastra a mentoria no app

**Resultado:**
- Sistema ativa notificações para o mentorado

**Dependências:**
- Agendamento externo deve ter ocorrido

### Junção 4: Feedback e Avaliação

**Participantes:** Mentor + Mentorado

**Momento:** Após a data/hora da mentoria

**Resultado:**
- Ambos avaliam a experiência

**Dependências:**
- Mentoria deve ter sido realizada
- Mentor deve ter preenchido feedback primeiro

---

## 📋 Transições de Status

```
pending_match → matched        (matchmaking bem-sucedido)
matched → scheduled            (mentor registra agendamento)
pending_match/matched → expired (timeout de 7 dias)
scheduled → in_progress        (data/hora da sessão)
in_progress → completed        (feedback + avaliação)
matched → change_requested     (mentorado solicita troca)
```

---

## ⚠️ Pontos de Atenção

### Dependências Críticas

- **Matchmaking não funciona sem mentores aprovados:** Sistema deve validar antes
- **Notificações dependem do cadastro do mentor:** Se não cadastrar, mentorado não recebe lembretes
- **Avaliação depende do feedback do mentor:** Sistema deve garantir ordem correta

### Fluxos Paralelos Possíveis

- Admin pode gerar vouchers a qualquer momento
- Múltiplos mentorados podem usar vouchers simultaneamente
- Múltiplos mentores podem ser aprovados simultaneamente

### Fluxos que Bloqueiam Outros

- **Sem vouchers gerados:** Mentorado não pode prosseguir
- **Sem crédito de voucher:** Matchmaking bloqueado
- **Sem mentores aprovados:** Matchmaking não retorna resultados
- **Sem agendamento externo:** Mentor não pode cadastrar no app
- **Sem feedback do mentor:** Mentorado não pode avaliar

---

## 🕐 Expiração Automática

:::info Processo Automático
Mentorias com status `pending_match` ou `matched` por mais de 7 dias são automaticamente marcadas como `expired`.
:::

**Ações quando expira:**
- Sistema atualiza status para `expired`
- Sistema notifica mentorado sobre expiração
- Sistema registra evento de analytics
- Mentorado pode solicitar nova mentoria

---

## 📚 Documentação Relacionada

- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
- [Especificação de Requisitos](/docs/requisitos/especificacao)
