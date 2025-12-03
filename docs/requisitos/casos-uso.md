---
id: casos-uso
title: Casos de Uso
sidebar_label: 📊 Casos de Uso
sidebar_position: 2
---

# 📊 Casos de Uso

> Detalhamento dos principais casos de uso do sistema

---

## UC01: Cadastrar Usuário

**Ator:** Mentorado/Mentor

**Fluxo Principal:**
1. Usuário acessa tela de cadastro
2. Preenche dados (nome, email, senha)
3. Sistema valida dados
4. Sistema cria conta
5. Sistema envia email de confirmação

---

## UC02: Fazer Login

**Ator:** Mentorado/Mentor/Admin

**Fluxo Principal:**
1. Usuário acessa tela de login
2. Clica em "Entrar com Google"
3. Sistema redireciona para OAuth
4. Usuário autoriza
5. Sistema cria sessão e retorna tokens

---

## UC03: Resgatar Voucher

**Ator:** Mentorado

**Pré-condição:** Usuário logado

**Fluxo Principal:**
1. Mentorado acessa área de vouchers
2. Insere código do voucher
3. Sistema valida código
4. Sistema credita saldo
5. Sistema libera funcionalidades

---

## UC04: Solicitar Mentoria

**Ator:** Mentorado

**Pré-condição:** Possui crédito de voucher

**Fluxo Principal:**
1. Mentorado acessa "Nova Mentoria"
2. Seleciona tags de interesse
3. Sistema executa matchmaking
4. Sistema debita crédito
5. Sistema apresenta mentor compatível

---

## UC05: Aprovar Mentor

**Ator:** Administrador

**Fluxo Principal:**
1. Admin acessa lista de pendentes
2. Visualiza perfil do mentor
3. Clica em "Aprovar"
4. Sistema atualiza status
5. Sistema notifica mentor

---

## 📚 Próximos Passos

- [Regras de Negócio](/docs/requisitos/regras-negocio)
- [Fluxos e Jornadas](/docs/arquitetura/fluxos-jornadas)
