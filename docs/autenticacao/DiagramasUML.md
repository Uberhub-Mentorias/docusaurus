## 📊 Diagramas UML

### Visão Geral dos Diagramas

Este documento apresenta dois tipos complementares de diagramas:

1. **Diagrama de Sequência UML (Mermaid)**: Visão de alto nível mostrando todas as interações entre componentes do sistema
2. **Diagramas de Fluxo Detalhados (ASCII)**: Visão detalhada com código específico para cada fluxo crítico

**Quando usar cada um:**

- **Diagrama UML**: Para entender o fluxo geral e as interações entre componentes
- **Diagramas ASCII**: Para implementação, debug e referência rápida ao código

| Aspecto       | Diagrama UML                 | Diagramas ASCII               |
| ------------- | ---------------------------- | ----------------------------- |
| **Propósito** | Visão arquitetural           | Detalhamento técnico          |
| **Audiência** | Arquitetos, novos devs       | Desenvolvedores implementando |
| **Nível**     | Alto nível                   | Baixo nível (código)          |
| **Foco**      | Interações entre componentes | Implementação específica      |
| **Uso**       | Entender o sistema           | Implementar/debugar           |

### Diagrama de Sequência UML - Fluxo Completo de Autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant FE as Frontend<br/>(React)
    participant FA as Firebase Auth
    participant BE as Backend<br/>(API)
    participant DB as MongoDB

    Note over U,DB: 1. Login Inicial
    U->>FE: Clica "Entrar com Google"
    FE->>FA: signInWithPopup(googleProvider)
    FA->>U: Exibe tela de seleção Google
    U->>FA: Seleciona conta e autoriza
    FA->>FE: Retorna idToken
    FE->>BE: POST /auth/login {idToken}
    BE->>FA: Verifica idToken (Admin SDK)
    FA->>BE: Validação OK + dados do usuário
    BE->>DB: Busca/Cria usuário
    DB->>BE: Retorna dados do usuário
    BE->>BE: Gera JWT tokens (access + refresh)
    BE->>FE: {accessToken, refreshToken}
    FE->>FE: localStorage.setItem("token", accessToken)
    FE->>FE: localStorage.setItem("refreshToken", refreshToken)
    FE->>BE: GET /users/me (com token)
    BE->>FE: Dados do usuário {id, name, email, role}
    FE->>FE: localStorage.setItem("user", userData)
    FE->>U: Redireciona para Dashboard

    Note over U,DB: 2. Renovação Automática de Tokens
    FA->>FA: Renova idToken automaticamente (~55min)
    FA->>FE: onIdTokenChanged dispara
    FE->>FA: getIdToken()
    FA->>FE: Novo idToken
    FE->>BE: POST /auth/login {idToken}
    BE->>FA: Verifica idToken
    FA->>BE: Validação OK
    BE->>BE: Gera novos JWT tokens
    BE->>FE: {accessToken, refreshToken}
    FE->>FE: Atualiza tokens no localStorage
    FE->>BE: GET /users/me
    BE->>FE: Dados atualizados do usuário

    Note over U,DB: 3. Requisição com Token Válido
    U->>FE: Interage com aplicação
    FE->>FE: Interceptor adiciona token
    FE->>BE: GET /admin/dashboard<br/>(Authorization: Bearer token)
    BE->>BE: Valida JWT token
    BE->>FE: Dados do dashboard
    FE->>U: Exibe dados

    Note over U,DB: 4. Tratamento de Erro 401 - Token Expirado<br/>(Ver diagrama detalhado abaixo)
    FE->>BE: GET /admin/dashboard<br/>(token expirado)
    BE->>FE: 401 Unauthorized
    FE->>FE: Interceptor detecta 401
    FE->>FE: Verifica flag _retry

    alt Estratégia 1: Refresh Token
        FE->>BE: POST /auth/refresh {refreshToken}
        BE->>FE: {accessToken, refreshToken}
        FE->>FE: Atualiza tokens no localStorage
        FE->>BE: GET /users/me
        BE->>FE: Dados atualizados
        FE->>BE: GET /admin/dashboard<br/>(com novo token)
        BE->>FE: Dados do dashboard
    else Estratégia 2: Firebase Auth
        FE->>FE: Aguarda Firebase Auth (até 3s)
        FA->>FE: Sessão restaurada
        FE->>FA: getIdToken(true) - forceRefresh
        FA->>FE: Novo idToken
        FE->>BE: POST /auth/login {idToken}
        BE->>FA: Verifica idToken
        FA->>BE: Validação OK
        BE->>FE: {accessToken, refreshToken}
        FE->>FE: Atualiza tokens no localStorage
        FE->>BE: GET /users/me
        BE->>FE: Dados atualizados
        FE->>BE: GET /admin/dashboard<br/>(com novo token)
        BE->>FE: Dados do dashboard
    else Todas as estratégias falharam
        FE->>FE: Limpa localStorage
        FE->>U: Redireciona para /login
    end

    Note over U,DB: 5. Restauração de Sessão ao Reabrir Navegador
    U->>FE: Fecha navegador
    U->>FE: Reabre navegador
    FE->>FE: Restaura estado do localStorage
    FE->>FE: loading = true
    FA->>FA: Restaura sessão automaticamente
    FA->>FE: onIdTokenChanged dispara
    FE->>FA: getIdToken()
    FA->>FE: idToken válido
    FE->>BE: POST /auth/login {idToken}
    BE->>FA: Verifica idToken
    FA->>BE: Validação OK
    BE->>FE: {accessToken, refreshToken}
    FE->>FE: Atualiza tokens no localStorage
    FE->>BE: GET /users/me
    BE->>FE: Dados do usuário
    FE->>FE: loading = false
    FE->>U: Dashboard carrega dados

    Note over U,DB: 6. Logout
    U->>FE: Clica em "Sair"
    FE->>FE: Limpa localStorage (tokens, user)
    FE->>FA: auth.signOut()
    FA->>FE: Logout confirmado
    FE->>U: Redireciona para /login
```

### Legenda do Diagrama

- **Usuário**: Pessoa usando a aplicação
- **Frontend (React)**: Aplicação React com AuthContext e interceptors
- **Firebase Auth**: Serviço de autenticação do Firebase
- **Backend (API)**: API REST que valida tokens e gerencia usuários
- **MongoDB**: Banco de dados onde os usuários são armazenados

### Fluxos Representados

1. **[Login Inicial](#login-inicial-diagrama-uml-detalhado)**: Fluxo completo desde o clique até o armazenamento dos tokens
2. **[Renovação Automática](#renovação-automática-diagrama-uml-detalhado)**: Como os tokens são renovados automaticamente
3. **Requisição com Token Válido**: Fluxo normal de uma requisição autenticada
4. **[Tratamento de Erro 401](#tratamento-de-erro-401-diagrama-uml-detalhado)**: Estratégias de recuperação quando o token expira
5. **[Restauração de Sessão](#restauração-de-sessão-diagrama-uml-detalhado)**: Como a sessão é restaurada ao reabrir o navegador
6. **[Logout](#logout-diagrama-uml-detalhado)**: Processo completo de logout

---

## 📋 Diagramas UML Detalhados

### Login Inicial (Diagrama UML Detalhado)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LG as Login.js
    participant AC as AuthContext
    participant AS as AuthService
    participant FA as Firebase Auth
    participant BE as Backend<br/>(API)
    participant DB as MongoDB
    participant LS as localStorage

    Note over U,LS: Início do Login
    U->>LG: Clica "Entrar com Google"
    LG->>LG: setError("")<br/>setLoading(true)

    Note over LG,FA: Garante Logout Anterior
    LG->>FA: Verifica auth.currentUser
    alt Usuário já autenticado
        LG->>FA: auth.signOut()
        FA->>LG: Logout confirmado
        LG->>LG: await setTimeout(100ms)
    end

    Note over LG,FA: Autenticação com Google
    LG->>FA: signInWithPopup(auth, googleProvider)
    FA->>U: Exibe tela de seleção Google
    U->>FA: Seleciona conta e autoriza
    FA->>LG: Retorna UserCredential
    LG->>FA: result.user.getIdToken()
    FA->>LG: idToken

    Note over LG,BE: Envio para Backend
    LG->>AC: login(idToken)
    AC->>AS: authService.login(idToken)
    AS->>BE: POST /auth/login<br/>{idToken}

    Note over BE,DB: Validação e Criação de Usuário
    BE->>FA: Verifica idToken (Admin SDK)
    FA->>BE: Validação OK + dados do usuário
    BE->>DB: Busca/Cria usuário
    DB->>BE: Retorna dados do usuário
    BE->>BE: Gera JWT tokens<br/>(access + refresh)
    BE->>AS: {accessToken, refreshToken}

    Note over AS,LS: Armazenamento de Tokens
    AS->>LS: setItem("token", accessToken)
    AS->>LS: setItem("refreshToken", refreshToken)
    AS->>BE: GET /users/me<br/>(com token)
    BE->>AS: Dados do usuário<br/>{id, name, email, role}
    AS->>LS: setItem("user", userData)
    AS->>AC: Retorna dados

    Note over AC: Verificação de Role ADMIN
    AC->>AC: Verifica userData?.role
    alt Sem role ou não é ADMIN
        AC->>AC: logout()
        AC->>LG: {success: false, error: "..."}
        LG->>U: Exibe erro "Acesso Negado"
    else É ADMIN
        AC->>AC: setUser(userData)
        AC->>LG: {success: true}
        LG->>U: navigate("/") - Redireciona para Dashboard ✅
    end
```

**Referências:**

- Ver também: [Diagrama ASCII do Login Inicial](#login-inicial-diagrama-ascii)
- Código fonte: `Login.js:25-59`, `AuthContext.js:92-137`, `api.js:147-162`

### Renovação Automática (Diagrama UML Detalhado)

```mermaid
sequenceDiagram
    participant FA as Firebase Auth
    participant AC as AuthContext<br/>(onIdTokenChanged)
    participant AS as AuthService
    participant BE as Backend<br/>(API)
    participant LS as localStorage

    Note over FA,LS: Renovação Automática do idToken
    FA->>FA: Renova idToken automaticamente<br/>(antes de expirar, ~55min)
    FA->>AC: onIdTokenChanged dispara<br/>(firebaseUser)

    Note over AC: Processamento do Novo Token
    AC->>AC: setFirebaseUser(firebaseUser)
    AC->>FA: firebaseUser.getIdToken()
    FA->>AC: Novo idToken válido

    Note over AC,BE: Renovação do JWT
    AC->>AS: authService.login(idToken)
    AS->>BE: POST /auth/login<br/>{idToken}
    BE->>FA: Verifica idToken (Admin SDK)
    FA->>BE: Validação OK
    BE->>BE: Gera novos JWT tokens
    BE->>AS: {accessToken, refreshToken}

    Note over AS,LS: Atualização de Tokens
    AS->>LS: setItem("token", accessToken)
    AS->>LS: setItem("refreshToken", refreshToken)
    AS->>BE: GET /users/me<br/>(com novo token)
    BE->>AS: Dados atualizados do usuário
    AS->>LS: setItem("user", userData)
    AS->>AC: Retorna dados atualizados
    AC->>AC: setUser(updatedUser)

    Note over AC: Tratamento de Erros
    alt Erro ao renovar (401/403)
        AC->>AS: authService.logout()
        AC->>AC: setUser(null)
    end
```

**Referências:**

- Ver também: [Diagrama ASCII da Renovação Automática](#renovação-automática-onidtokenchanged)
- Código fonte: `AuthContext.js:43-72`, `api.js:147-162`

### Restauração de Sessão (Diagrama UML Detalhado)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant AC as AuthContext
    participant LS as localStorage
    participant FA as Firebase Auth
    participant AS as AuthService
    participant BE as Backend<br/>(API)

    Note over U,BE: Navegador Reaberto
    U->>U: Fecha navegador
    U->>U: Reabre navegador

    Note over AC,LS: Restauração do Estado
    AC->>AC: useEffect executa
    AC->>LS: getUser() - getItem("user")
    LS->>AC: storedUser
    AC->>LS: isAuthenticated() - getItem("token")
    LS->>AC: hasToken
    alt storedUser && hasToken
        AC->>AC: setUser(storedUser)
        Note over AC: loading permanece true
    end

    Note over FA: Firebase Auth Restaura Sessão
    FA->>FA: Restaura sessão automaticamente<br/>(em background)

    Note over FA,AC: Listener Detecta Restauração
    FA->>AC: onIdTokenChanged dispara<br/>(firebaseUser)
    AC->>AC: setFirebaseUser(firebaseUser)

    alt firebaseUser existe
        Note over AC,BE: Renovação de Token
        AC->>FA: firebaseUser.getIdToken()
        FA->>AC: idToken válido
        AC->>AS: authService.login(idToken)
        AS->>BE: POST /auth/login<br/>{idToken}
        BE->>FA: Verifica idToken (Admin SDK)
        FA->>BE: Validação OK
        BE->>AS: {accessToken, refreshToken}
        AS->>LS: setItem("token", accessToken)
        AS->>LS: setItem("refreshToken", refreshToken)
        AS->>BE: GET /users/me
        BE->>AS: Dados do usuário
        AS->>LS: setItem("user", userData)
        AS->>AC: Retorna dados
        AC->>AC: setUser(updatedUser)

        Note over AC: Finaliza Loading
        AC->>AC: isInitialLoad = false
        AC->>AC: setLoading(false)
        AC->>U: Dashboard pode carregar dados ✅
    else firebaseUser é null
        AC->>AS: authService.logout()
        AC->>AC: setUser(null)
        AC->>AC: setLoading(false)
        AC->>U: Redireciona para /login
    end
```

**Referências:**

- Ver também: [Diagrama ASCII da Restauração de Sessão](#restauração-de-sessão-ao-reabrir-navegador)
- Código fonte: `AuthContext.js:27-84`

### Tratamento de Erro 401 (Diagrama UML Detalhado)

```mermaid
sequenceDiagram
    participant FE as Frontend<br/>(Interceptor)
    participant BE as Backend<br/>(API)
    participant FA as Firebase Auth
    participant LS as localStorage
    participant U as Usuário

    Note over FE,U: Requisição com Token Expirado
    FE->>BE: GET /admin/dashboard<br/>(token expirado)
    BE->>FE: 401 Unauthorized

    Note over FE: Interceptor Detecta Erro
    FE->>FE: Verifica error.response?.status === 401
    FE->>FE: Verifica !originalRequest._retry
    FE->>FE: originalRequest._retry = true

    alt Estratégia 1: Refresh Token
        Note over FE,LS: Tentativa com Refresh Token
        FE->>LS: getItem("refreshToken")
        LS->>FE: refreshToken

        FE->>BE: POST /auth/refresh<br/>{refreshToken}

        alt Refresh Token Válido
            BE->>FE: {accessToken, refreshToken}
            FE->>LS: setItem("token", accessToken)
            FE->>LS: setItem("refreshToken", refreshToken)
            FE->>BE: GET /users/me
            BE->>FE: Dados atualizados do usuário
            FE->>LS: setItem("user", userData)
            FE->>BE: GET /admin/dashboard<br/>(com novo token)
            BE->>FE: Dados do dashboard ✅
        else Refresh Token Inválido
            BE->>FE: 401/403 Error
            Note over FE: Vai para Estratégia 2
        end
    end

    alt Estratégia 2: Firebase Auth
        Note over FE,FA: Aguarda Firebase Auth Restaurar Sessão
        FE->>FE: Importa auth do Firebase
        FE->>FA: Verifica auth.currentUser

        alt Sessão Não Restaurada
            loop Polling (até 3s, a cada 100ms)
                FE->>FE: await setTimeout(100ms)
                FE->>FA: Verifica auth.currentUser
            end
        end

        alt Sessão Restaurada
            FE->>FA: getIdToken(true) - forceRefresh
            FA->>FE: Novo idToken válido
            FE->>BE: POST /auth/login<br/>{idToken}
            BE->>FA: Verifica idToken (Admin SDK)
            FA->>BE: Validação OK
            BE->>FE: {accessToken, refreshToken}
            FE->>LS: setItem("token", accessToken)
            FE->>LS: setItem("refreshToken", refreshToken)
            FE->>BE: GET /users/me
            BE->>FE: Dados atualizados do usuário
            FE->>LS: setItem("user", userData)
            FE->>BE: GET /admin/dashboard<br/>(com novo token)
            BE->>FE: Dados do dashboard ✅
        else Sessão Não Restaurada Após 3s
            Note over FE: Todas as estratégias falharam
            FE->>LS: removeItem("token")
            FE->>LS: removeItem("refreshToken")
            FE->>LS: removeItem("user")
            FE->>U: window.location.href = "/login" ❌
        end
    end
```

**Referências:**

- Ver também: [Diagrama ASCII detalhado do Tratamento de Erro 401](#tratamento-de-erro-401-interceptor-de-resposta)
- Código fonte: `api.js:27-120`

### Logout (Diagrama UML Detalhado)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant AC as AuthContext
    participant AS as AuthService
    participant FA as Firebase Auth
    participant LS as localStorage

    Note over U,LS: Início do Logout
    U->>AC: Clica em "Sair" / logout()

    Note over AC: Limpeza de Estado
    AC->>AC: setUser(null)
    AC->>AC: setFirebaseUser(null)

    Note over AS,LS: Limpeza de Tokens
    AC->>AS: authService.logout()
    AS->>LS: removeItem("token")
    AS->>LS: removeItem("refreshToken")
    AS->>LS: removeItem("user")

    Note over AS,FA: Logout do Firebase
    AS->>FA: auth.signOut()
    FA->>AS: Logout confirmado
    AS->>AS: await setTimeout(100ms)<br/>(garante processamento)

    Note over AC,U: Redirecionamento
    AC->>U: Redireciona para /login ✅
```

**Referências:**

- Código fonte: `AuthContext.js:139-145`, `api.js:166-182`

---

## 📝 Diagramas ASCII Detalhados

### Login Inicial (Diagrama ASCII)

```
┌─────────────────────────────────────────────────────────┐
│  Usuário clica "Entrar com Google"                     │
│                                                          │
│  Código: Login.js:25-27                                  │
│  const handleGoogleSignIn = async () => {               │
│    setError("");                                        │
│    setLoading(true);                                     │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Garante logout anterior (força seleção de conta)       │
│                                                          │
│  Código: Login.js:32-36                                  │
│  if (auth.currentUser) {                                │
│    await auth.signOut();                                │
│    await new Promise(resolve =>                         │
│      setTimeout(resolve, 100));                          │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Faz login com Google via Firebase                      │
│                                                          │
│  Código: Login.js:40-41                                  │
│  const result = await signInWithPopup(                   │
│    auth, googleProvider);                                │
│  const idToken = await result.user.getIdToken();        │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Envia idToken para AuthContext                         │
│                                                          │
│  Código: Login.js:44                                     │
│  const loginResult = await login(idToken);              │
│                                                          │
│  AuthContext.js:92-94                                    │
│  const login = async idToken => {                        │
│    const data = await authService.login(idToken);      │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  AuthService envia para backend                         │
│                                                          │
│  Código: api.js:148                                      │
│  const response = await axios.post(                      │
│    `${API_BASE_URL}/auth/login`,                        │
│    { idToken }                                           │
│  );                                                      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Backend valida idToken e retorna JWT tokens            │
│  (Backend: AuthController.java)                          │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend armazena tokens no localStorage                │
│                                                          │
│  Código: api.js:154-156                                  │
│  localStorage.setItem("token",                            │
│    response.data.accessToken);                           │
│  localStorage.setItem("refreshToken",                     │
│    response.data.refreshToken);                          │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Busca dados do usuário                                 │
│                                                          │
│  Código: api.js:161-162                                  │
│  const userResponse = await api.get(                     │
│    `${API_BASE_URL}/users/me`);                          │
│  localStorage.setItem("user",                             │
│    JSON.stringify(userResponse.data));                    │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  AuthContext verifica role ADMIN                        │
│                                                          │
│  Código: AuthContext.js:100-126                          │
│  if (!userData?.role) {                                  │
│    await logout();                                       │
│    return { success: false, error: "..." };              │
│  }                                                       │
│  const isAdmin = roles.includes("ADMIN");                │
│  if (!isAdmin) {                                         │
│    await logout();                                       │
│    return { success: false, error: "..." };              │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ├─ Não é ADMIN ──► Logout e erro
                    │
                    └─ É ADMIN
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Redireciona para Dashboard                             │
│                                                          │
│  Código: Login.js:47-49                                  │
│  if (loginResult.success) {                             │
│    navigate("/");                                       │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
```

**Referências:**

- Ver também: [Diagrama UML Detalhado do Login Inicial](#login-inicial-diagrama-uml-detalhado)
- Código fonte: `Login.js:25-59`, `AuthContext.js:92-137`, `api.js:147-162`

### Renovação Automática (onIdTokenChanged)

**Referências:**

- Ver também: [Diagrama UML Detalhado da Renovação Automática](#renovação-automática-diagrama-uml-detalhado)
- Código fonte: `AuthContext.js:43-72`

```
┌─────────────────────────────────────────────────────────┐
│  Firebase renova idToken automaticamente                │
│  (antes de expirar, ~55 minutos)                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  onIdTokenChanged dispara automaticamente                │
│                                                          │
│  Código: AuthContext.js:43                              │
│  const unsubscribe = onIdTokenChanged(auth, async      │
│    firebaseUser => { ... })                             │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend obtém novo idToken                            │
│                                                          │
│  Código: AuthContext.js:52                              │
│  const idToken = await firebaseUser.getIdToken();      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Envia para /auth/login                                 │
│                                                          │
│  Código: AuthContext.js:53                               │
│  await authService.login(idToken);                      │
│                                                          │
│  api.js:134                                             │
│  const response = await axios.post(                     │
│    `${API_BASE_URL}/auth/login`,                        │
│    { idToken }                                          │
│  );                                                      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Backend valida e retorna novos JWT tokens             │
│  (Backend: AuthController.java)                         │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend armazena novos tokens                         │
│                                                          │
│  Código: api.js:140-142                                 │
│  localStorage.setItem("token",                          │
│    response.data.accessToken);                          │
│  localStorage.setItem("refreshToken",                   │
│    response.data.refreshToken);                          │
│                                                          │
│  api.js:147-150                                         │
│  const userResponse = await api.get(                     │
│    `${API_BASE_URL}/users/me`);                         │
│  localStorage.setItem("user",                           │
│    JSON.stringify(userResponse.data));                    │
└─────────────────────────────────────────────────────────┘
```

### Restauração de Sessão ao Reabrir Navegador

**Referências:**

- Ver também: [Diagrama UML Detalhado da Restauração de Sessão](#restauração-de-sessão-diagrama-uml-detalhado)
- Código fonte: `AuthContext.js:27-84`

```
┌─────────────────────────────────────────────────────────┐
│  Navegador é reaberto                                   │
│  (Evento do navegador)                                  │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  AuthContext restaura estado do localStorage            │
│  (mantém loading = true)                                │
│                                                          │
│  Código: AuthContext.js:32-38                           │
│  const storedUser = authService.getUser();              │
│  const hasToken = authService.isAuthenticated();       │
│  if (storedUser && hasToken) {                          │
│    setUser(storedUser);                                 │
│    // Não define loading = false ainda                  │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Firebase Auth restaura sessão                          │
│  (Automático do Firebase)                               │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  onIdTokenChanged dispara com firebaseUser              │
│                                                          │
│  Código: AuthContext.js:43-44                           │
│  const unsubscribe = onIdTokenChanged(auth,             │
│    async firebaseUser => {                              │
│      setFirebaseUser(firebaseUser);                     │
│      if (firebaseUser) { ... }                          │
│    });                                                  │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Renova token JWT usando novo idToken                   │
│                                                          │
│  Código: AuthContext.js:51-57                           │
│  const idToken = await firebaseUser.getIdToken();      │
│  await authService.login(idToken);                      │
│  const updatedUser = authService.getUser();             │
│  if (updatedUser) {                                      │
│    setUser(updatedUser);                                │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  loading = false (Dashboard pode carregar dados)       │
│                                                          │
│  Código: AuthContext.js:68-72                           │
│  if (isInitialLoad) {                                   │
│    isInitialLoad = false;                               │
│    setLoading(false);                                    │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
```

### Tratamento de Erro 401 (Interceptor de Resposta)

**Referências:**

- Ver também: [Diagrama UML Detalhado do Tratamento de Erro 401](#tratamento-de-erro-401-diagrama-uml-detalhado)
- Código fonte: `api.js:27-120`

```
┌─────────────────────────────────────────────────────────┐
│  Requisição recebe 401 (token expirado)                 │
│  (Resposta do servidor)                                 │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Interceptor de resposta detecta erro 401               │
│  (api.interceptors.response.use)                       │
│                                                          │
│  Código: api.js:27-29                                    │
│  api.interceptors.response.use(                         │
│    response => response,                                │
│    async error => { ... }                               │
│  );                                                      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Verifica flag _retry (evita loops)                     │
│                                                          │
│  Código: api.js:33-34                                    │
│  if (error.response?.status === 401 &&                 │
│      !originalRequest._retry) {                         │
│    originalRequest._retry = true;                       │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Estratégia 1: Tenta renovar com refreshToken            │
│  POST /auth/refresh                                      │
│                                                          │
│  Código: api.js:37-42                                    │
│  const refreshToken = localStorage.getItem(              │
│    "refreshToken");                                      │
│  if (refreshToken) {                                     │
│    const response = await axios.post(                   │
│      `${API_BASE_URL}/auth/refresh`,                    │
│      { refreshToken }                                    │
│    );                                                    │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ├─ Sucesso
                    │       │
                    │       ▼
                    │  Salva novos tokens no localStorage
                    │
                    │  Código: api.js:46-47                │
                    │  localStorage.setItem("token",       │
                    │    response.data.accessToken);       │
                    │  localStorage.setItem("refreshToken",│
                    │    response.data.refreshToken);      │
                    │       │
                    │       ▼
                    │  Busca dados atualizados (/users/me)
                    │
                    │  Código: api.js:50-54                │
                    │  const userResponse = await api.get( │
                    │    `${API_BASE_URL}/users/me`);      │
                    │  localStorage.setItem("user",        │
                    │    JSON.stringify(userResponse.data));│
                    │       │
                    │       ▼
                    │  Repete requisição original
                    │
                    │  Código: api.js:60-61                │
                    │  originalRequest.headers.Authorization│
                    │    = `Bearer ${response.data.accessToken}`;│
                    │  return api(originalRequest);        │
                    │       │
                    │       └─► Retorna dados normalmente
                    │
                    └─ Falha
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Estratégia 2: Aguarda Firebase Auth (até 3s)           │
│  Polling a cada 100ms                                   │
│                                                          │
│  Código: api.js:65-79                                    │
│  const { auth } = await import(                         │
│    "../config/firebase.js");                            │
│  let currentUser = auth.currentUser;                    │
│  if (!currentUser) {                                     │
│    const maxWait = 3000; // 3 segundos                  │
│    const checkInterval = 100; // 100ms                  │
│    let waited = 0;                                       │
│    while (!currentUser && waited < maxWait) {           │
│      await new Promise(resolve =>                       │
│        setTimeout(resolve, checkInterval));              │
│      currentUser = auth.currentUser;                     │
│      waited += checkInterval;                            │
│    }                                                     │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ├─ Sessão restaurada (auth.currentUser)
                    │       │
                    │       ▼
                    │  Obtém novo idToken (forceRefresh)
                    │
                    │  Código: api.js:84                    │
                    │  const newIdToken = await            │
                    │    currentUser.getIdToken(true);     │
                    │       │
                    │       ▼
                    │  POST /auth/login com novo idToken
                    │
                    │  Código: api.js:85-87                │
                    │  const loginResponse = await         │
                    │    axios.post(`${API_BASE_URL}/auth/login`,│
                    │      { idToken: newIdToken });       │
                    │       │
                    │       ▼
                    │  Salva novos tokens no localStorage
                    │
                    │  Código: api.js:91-92                │
                    │  localStorage.setItem("token",       │
                    │    loginResponse.data.accessToken);  │
                    │  localStorage.setItem("refreshToken",│
                    │    loginResponse.data.refreshToken); │
                    │       │
                    │       ▼
                    │  Busca dados atualizados (/users/me)
                    │
                    │  Código: api.js:96-99                │
                    │  const userResponse = await api.get( │
                    │    `${API_BASE_URL}/users/me`);      │
                    │  localStorage.setItem("user",        │
                    │    JSON.stringify(userResponse.data));│
                    │       │
                    │       ▼
                    │  Repete requisição original
                    │
                    │  Código: api.js:104-105               │
                    │  originalRequest.headers.Authorization│
                    │    = `Bearer ${loginResponse.data.accessToken}`;│
                    │  return api(originalRequest);        │
                    │       │
                    │       └─► Retorna dados normalmente
                    │
                    └─ Sem sessão após 3s
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Limpa tokens do localStorage                            │
│  (token, refreshToken, user)                            │
│                                                          │
│  Código: api.js:109-111 ou 116-118                       │
│  localStorage.removeItem("token");                      │
│  localStorage.removeItem("refreshToken");               │
│  localStorage.removeItem("user");                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Redireciona para /login                                 │
│                                                          │
│  Código: api.js:112 ou 119                               │
│  window.location.href = "/login";                        │
└─────────────────────────────────────────────────────────┘
```
