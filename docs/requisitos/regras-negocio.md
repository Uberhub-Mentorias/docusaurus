---
id: regras-negocio
title: Regras de Negócio
sidebar_label: 📜 Regras de Negócio
sidebar_position: 3
---

# 📜 Regras de Negócio

> Regras que governam o funcionamento do sistema

---

## 🎟️ Vouchers

| ID | Regra |
|----|-------|
| RN01 | Voucher só pode ser resgatado uma vez |
| RN02 | Voucher pode ter data de expiração |
| RN03 | Voucher pode ser restrito a trilhas específicas |
| RN04 | Resgate de voucher credita saldo do mentorado |

---

## 👨‍🏫 Mentores

| ID | Regra |
|----|-------|
| RN05 | Mentor precisa ser aprovado pelo Admin |
| RN06 | Apenas mentores aprovados são elegíveis para matchmaking |
| RN07 | Mentor pode ter seu status alterado para SUSPENDED |

---

## 📋 Mentorias

| ID | Regra |
|----|-------|
| RN08 | Solicitação de mentoria requer crédito de voucher |
| RN09 | Crédito é debitado no momento do matchmaking |
| RN10 | Mentoria expira após 7 dias sem agendamento |
| RN11 | Avaliação só é liberada após feedback do mentor |

---

## 🔄 Status de Mentoria

| ID | Regra |
|----|-------|
| RN12 | Status segue ciclo: pending_match → matched → scheduled → completed |
| RN13 | Mentorias não agendadas em 7 dias são marcadas como expired |
| RN14 | Solicitação de troca requer aprovação do Admin |

---

## 📚 Documentação Relacionada

- [Especificação](/docs/requisitos/especificacao)
- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
