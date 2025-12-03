---
id: especificacao
title: Especificação de Requisitos
sidebar_label: 📝 Especificação
sidebar_position: 1
---

# 📝 Especificação de Requisitos - UberHub Mentorias

> Documento completo de requisitos funcionais e não funcionais

---

## 🎯 Visão Geral do Sistema

### Nome do Produto
**UberHub Mentorias**

### Propósito
Facilitar a conexão entre profissionais experientes (Mentores) e pessoas que buscam orientação (Mentorados), criando um ecossistema de mentoria dentro do UberHub.

### Objetivos
- Democratizar o acesso à mentoria de qualidade
- Facilitar o encontro através de matchmaking inteligente
- Automatizar processos administrativos
- Fornecer analytics e métricas para gestão

---

## 👥 Lista de Atores

| Ator | Descrição |
|------|-----------|
| **Mentorado** | Usuário que busca orientação profissional |
| **Mentor** | Profissional experiente que oferece orientação |
| **Administrador** | Responsável pela gestão completa do sistema |

---

## 📋 Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Cadastro de novos usuários | Alta |
| RF02 | Autenticação via login | Alta |
| RF03 | Recuperação de senha | Alta |
| RF04 | Resgate de vouchers | Alta |
| RF05 | Solicitação de mentoria | Alta |
| RF06 | Criação/atualização de perfil de mentor | Alta |
| RF07 | Aprovação de mentores | Alta |
| RF08 | Registro de agendamentos | Alta |
| RF09 | Solicitação de troca de mentor | Média |
| RF10 | Feedback pós-mentoria | Alta |
| RF11 | Avaliação de mentores | Alta |
| RF12 | Histórico de mentorias | Alta |
| RF13 | Notificações push | Alta |
| RF14 | Geração de vouchers | Alta |
| RF15 | Dashboard com analytics | Alta |
| RF16 | Gestão de tags | Média |
| RF17 | Suspensão de usuários | Média |
| RF18 | Aprovação de trocas de mentor | Média |

---

## ⚙️ Requisitos Não Funcionais

| ID | Categoria | Descrição |
|----|-----------|-----------|
| RNF01 | Segurança | Autenticação JWT |
| RNF02 | Segurança | RBAC (controle baseado em roles) |
| RNF03 | Arquitetura | Microsserviços |
| RNF04 | Arquitetura | API Gateway único |
| RNF05 | Manutenibilidade | Padrões DAO/Repository |
| RNF06 | Portabilidade | Backend em Spring Boot |
| RNF07 | Portabilidade | Mobile em React Native |
| RNF08 | Usabilidade | Interface intuitiva |
| RNF09 | Integração | Firebase Cloud Messaging |
| RNF10 | Escalabilidade | Serviços escaláveis individualmente |

---

## 📚 Próximos Passos

- [Casos de Uso](/docs/requisitos/casos-uso)
- [Regras de Negócio](/docs/requisitos/regras-negocio)
