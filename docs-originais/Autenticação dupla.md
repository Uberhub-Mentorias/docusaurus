# Autenticação Dupla | Firebase + Backend Microserviços
<a id="topo"></a>

---

## 📚 Índice

1. [Fundamentos Teóricos](#1-fundamentos-teóricos)
2. [Arquitetura do Sistema](#2-arquitetura-do-sistema)
3. [Fluxo de Autenticação Explicado](#3-fluxo-de-autenticação-explicado)

---

## 1. Fundamentos Teóricos

### 1.1 O que é Autenticação?

**Autenticação** é o processo de verificar a identidade de um usuário. É diferente de **autorização**, que verifica o que o usuário pode fazer.

**Analogia simples**:

- **Autenticação**: "Quem é você?" → Verifica identidade
- **Autorização**: "O que você pode fazer?" → Verifica permissões

### 1.2 OAuth 2.0 e Firebase Authentication

**OAuth 2.0** é um protocolo de autorização que permite que aplicações acessem recursos de um usuário sem expor suas senhas.

**Firebase Authentication** implementa OAuth 2.0 e oferece:

- Autenticação com Google, Facebook, GitHub, etc.
- Gerenciamento de sessões
- Renovação automática de tokens
- Segurança gerenciada pelo Google

### 1.3 Tokens: ID Token vs JWT

#### ID Token do Firebase

- **O que é**: Token emitido pelo Firebase após autenticação bem-sucedida
- **Conteúdo**: Informações do usuário (email, nome, foto)
- **Validade**: ~1 hora (renovado automaticamente)
- **Uso**: Validar identidade no backend

#### JWT (JSON Web Token) Próprio

- **O que é**: Token gerado pelo seu backend após validar o ID token
- **Conteúdo**: Claims customizados (roles, permissões, etc.)
- **Validade**: Configurável (geralmente 15min-1h)
- **Uso**: Controlar acesso às APIs

**Por que usar ambos?**

- **ID Token**: Valida identidade (Firebase cuida disso)
- **JWT Próprio**: Controla autorização (você controla isso)

### 1.4 Refresh Tokens

**Refresh Token** é um token de longa duração usado para obter novos access tokens sem reautenticação.

**Fluxo**:

```text
Access Token expira → Usa Refresh Token → Obtém novo Access Token
```

**Vantagens**:

- Usuário não precisa fazer login novamente
- Access tokens podem ter vida curta (mais seguro)
- Refresh tokens podem ser revogados se necessário

### 1.5 Padrão Observer

O **Observer Pattern** permite que objetos observem mudanças em outro objeto.

**No Firebase**:

```javascript
// Registra um observer
const unsubscribe = onIdTokenChanged(auth, user => {
  // Este callback é executado sempre que o token muda
  console.log("Token mudou!", user);
});

// Remove o observer
unsubscribe();
```

**Vantagens**:

- Reativo: reage automaticamente a mudanças
- Eficiente: não precisa verificar periodicamente
- Simples: menos código, menos bugs

### 1.6 Interceptors (Axios)

**Interceptors** são funções que interceptam requisições ou respostas antes que sejam processadas.

**Request Interceptor**: Modifica requisições antes de enviar

```javascript
api.interceptors.request.use(config => {
  // Adiciona token em todas as requisições
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**Response Interceptor**: Trata respostas (especialmente erros)

```javascript
api.interceptors.response.use(
  response => response,
  error => {
    // Trata erros 401 automaticamente
    if (error.response?.status === 401) {
      // Renova token
    }
  }
);
```

## 2. Arquitetura do Sistema
[⬆️](#topo)

### 2.1 Visão Geral da Arquitetura

```text
┌─────────────┐
│   Usuário   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│      Frontend (React)           │
│  ┌──────────────────────────┐   │
│  │  Firebase Auth Client    │   │
│  │  (Autenticação OAuth)    │   │
│  └──────────┬───────────────┘   │
│             │                   │
│  ┌──────────▼───────────────┐   │
│  │  AuthContext (Estado)    │   │
│  └──────────┬───────────────┘   │
│             │                   │
│  ┌──────────▼───────────────┐   │
│  │  Axios Interceptors      │   │
│  └──────────┬───────────────┘   │
└─────────────┼───────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│      Backend (API)              │
│  ┌──────────────────────────┐   │
│  │  Firebase Admin SDK      │   │
│  │  (Valida ID Token)       │   │
│  └──────────┬───────────────┘   │
│             │                   │
│  ┌──────────▼───────────────┐   │
│  │  Gera JWT Tokens         │   │
│  └──────────┬───────────────┘   │
│             │                   │
│  ┌──────────▼───────────────┐   │
│  │  MongoDB (Usuários)      │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

### 2.2 Separação de Responsabilidades

| Componente        | Responsabilidade                                |
| ----------------- | ----------------------------------------------- |
| **Firebase Auth** | Autenticação OAuth (Google)                     |
| **Backend**       | Validação de tokens e gerenciamento de usuários |
| **JWT Próprio**   | Controle de acesso às APIs                      |
| **Frontend**      | Gerenciamento de estado e renovação de tokens   |

### 2.3 Camadas de Segurança

1. **Camada 1 - Identidade**: ID Token do Firebase valida quem é o usuário
2. **Camada 2 - Autorização**: JWT próprio controla o que o usuário pode fazer
3. **Camada 3 - Renovação**: Refresh tokens permitem renovação sem reautenticação

## 3. Fluxo de Autenticação Explicado
[⬆️](#topo)

```mermaid
graph TB
    %% Organização por camadas usando ranks
    subgraph Frontend["📱 Frontend"]
        direction TB
        A[React/React Native App]
        B[Firebase Auth Client]
        C[AuthContext/State]
        D[Axios Interceptors]
    end

    subgraph Firebase["🔥 Firebase Services"]
        direction TB
        E[Google OAuth]
        F[Firebase Authentication]
        G[ID Token]
    end

    subgraph Backend["⚙️ Backend Microserviços"]
        direction TB
        H[API Gateway]
        I[Auth Service]
        J[Firebase Admin SDK]
        K[JWT Generator]
        L[User Service]
        M[(Database)]
    end

    %% Fluxo de Login Inicial (organizado sequencialmente)
    A -->|1. Login com Google| B
    B -->|2. OAuth Flow| E
    E -->|3. Autentica| F
    F -->|4. Retorna| G
    G -->|5. Envia ID Token| H
    H -->|6. POST /auth/login| I
    I -->|7. Valida com| J
    J -->|8. Verifica ID Token| I
    I -->|9. Cria/Atualiza Usuário| L
    L -->|10. Salva no BD| M
    I -->|11. Gera Tokens JWT| K
    K -->|12. Tokens| H
    H -->|13. Retorna Tokens| A
    A -->|14. Armazena em| C

    %% Estilização usando classes CSS (mais organizado e reutilizável)
    classDef frontend fill:#e1f5ff,stroke:#1565c0,stroke-width:3px
    classDef firebase fill:#ffebee,stroke:#c62828,stroke-width:3px
    classDef backend fill:#e8f5e9,stroke:#fe7d32,stroke-width:3px
    classDef database fill:#e0f2f1,stroke:#00695c,stroke-width:3px

    class A,B,C,D frontend
    class E,F,G firebase
    class H,I,J,L,K backend
    class M database
```

### 3.1 Fluxo Completo (Passo a Passo)

#### Passo 1: Usuário Clica em "Entrar com Google"

```text
Usuário → Clica no botão → Frontend inicia processo
```

**O que acontece**:

- Frontend chama `signInWithPopup(auth, googleProvider)`
- Firebase abre popup do Google
- Usuário seleciona conta e autoriza

#### Passo 2: Firebase Retorna ID Token

```text
Firebase → Valida com Google → Retorna ID Token
```

**O que acontece**:

- Google valida credenciais
- Firebase gera ID token
- Frontend recebe o token

#### Passo 3: Frontend Envia ID Token para Backend

```text
Frontend → POST /auth/login {idToken} → Backend
```

**O que acontece**:

- Frontend envia ID token para seu backend
- Backend precisa validar esse token

#### Passo 4: Backend Valida ID Token

```text
Backend → Firebase Admin SDK → Valida ID Token
```

**O que acontece**:

- Backend usa Firebase Admin SDK
- Verifica se o token é válido
- Obtém dados do usuário (email, nome, etc.)

#### Passo 5: Backend Cria/Atualiza Usuário

```text
Backend → MongoDB → Salva/Atualiza usuário
```

**O que acontece**:

- Backend verifica se usuário existe
- Se não existe, cria novo usuário
- Se existe, atualiza dados

#### Passo 6: Backend Gera Tokens JWT

```text
Backend → Gera accessToken + refreshToken → Retorna ao Frontend
```

**O que acontece**:

- Backend gera dois tokens JWT:
  - **accessToken**: Token de curta duração (15min-1h)
  - **refreshToken**: Token de longa duração (7-30 dias)
- Envia ambos ao frontend

#### Passo 7: Frontend Armazena Tokens

```text
Frontend → localStorage → Salva tokens
```

**O que acontece**:

- Frontend salva tokens no `localStorage`
- Salva também dados do usuário
- Estado de autenticação é atualizado

#### Passo 8: Frontend Usa Tokens em Requisições

```text
Frontend → Adiciona token no header → Backend valida → Retorna dados
```

**O que acontece**:

- Interceptor do Axios adiciona token automaticamente
- Backend valida token JWT
- Se válido, retorna dados solicitados

### 3.2 Renovação Automática de Tokens

**Problema**: Tokens expiram. O que fazer?

**Solução 1: Listener `onIdTokenChanged`**

```javascript
// Quando Firebase renova ID token automaticamente
onIdTokenChanged(auth, async user => {
  if (user) {
    const idToken = await user.getIdToken();
    // Renova JWT usando novo ID token
    await authService.login(idToken);
  }
});
```

**Solução 2: Interceptor de Resposta (Erro 401)**

```javascript
// Quando recebe erro 401
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Tenta renovar com refreshToken
      // Se falhar, tenta com Firebase Auth
    }
  }
);
```

### 3.3 Tratamento de Erros 401

**Cenário**: Token expirou durante uso

**Estratégia em Cascata**:

1. **Tenta Refresh Token** (mais rápido)

   ```text
   Token expirado → Usa refreshToken → Obtém novos tokens
   ```

2. **Se falhar, aguarda Firebase Auth** (para navegador reaberto)

   ```text
   Aguarda até 3s → Firebase restaura sessão → Obtém novo ID token
   ```

3. **Se tudo falhar, redireciona para login**

   ```text
   Todas estratégias falharam → Limpa tokens → Redireciona para /login
   ```

### 3.4 Restauração de Sessão

**Cenário**: Usuário fecha e reabre navegador

**O que acontece**:

1. **Frontend restaura estado do localStorage**

   ```javascript
   const storedUser = localStorage.getItem("user");
   if (storedUser) {
     setUser(JSON.parse(storedUser));
   }
   ```

2. **Firebase Auth restaura sessão automaticamente**

   - Firebase mantém sessão em cookies/localStorage
   - Restaura automaticamente quando navegador reabre

3. **`onIdTokenChanged` dispara**

   ```javascript
   onIdTokenChanged(auth, async user => {
     // Dispara quando sessão é restaurada
     // Renova tokens JWT automaticamente
   });
   ```

4. **Frontend renova tokens JWT**
   - Usa novo ID token para obter novos JWT
   - Atualiza localStorage
   - Usuário continua autenticado

</details>


## 🎯 Conclusão

Esta aula apresentou:

1. **Fundamentos teóricos** necessários para entender autenticação
2. **Arquitetura do sistema** e separação de responsabilidades
3. **Fluxo completo** explicado passo a passo

**Próximos passos**:

- Implementar seguindo os planos apresentados
- Testar cada funcionalidade
- Ajustar conforme necessário
- Documentar decisões específicas do seu projeto

**Dúvidas comuns**:

- **Por que usar JWT próprio se já temos ID token?** → Controle de autorização e roles
- **Por que renovar tokens automaticamente?** → Melhor experiência do usuário
- **Por que múltiplas estratégias de renovação?** → Maior resiliência e confiabilidade

Boa implementação! 🚀

## 📋 Visão Geral

Este documento descreve a implementação completa do sistema de autenticação usando Firebase Authentication e tokens JWT próprios.

### Fluxo Completo

1. **Usuário clica em "Entrar com Google"** no frontend
2. **Firebase autentica com Google** e retorna `idToken`
3. **Frontend envia `idToken`** para `/api/v1/auth/login`
4. **Backend valida o token** com Firebase Admin SDK
5. **Backend cria/atualiza usuário** no MongoDB
6. **Backend gera tokens JWT** (accessToken e refreshToken) e retorna ao frontend
7. **Frontend armazena os tokens** e usa para requisições autenticadas
8. **Renovação automática** de tokens quando necessário
9. **Tratamento inteligente** de erros 401 com retry automático
10. **Logout completo** do Firebase e limpeza de tokens

## 🎯 Arquitetura

### Separação de Responsabilidades

1. **Firebase Authentication**: Responsável pela autenticação OAuth com Google
2. **Backend**: Valida tokens e gerencia usuários no banco de dados
3. **Tokens JWT próprios**: Controlam o acesso às APIs

### Segurança em Camadas

- **ID token do Firebase**: Valida a identidade do usuário
- **Tokens JWT próprios**: Controlam o acesso às APIs
- **Refresh tokens**: Permitem renovação sem reautenticação

### Flexibilidade

- Backend não depende apenas do Firebase
- Pode adicionar outros provedores (Facebook, GitHub, etc.)
- Controle total sobre roles e permissões

### Experiência do Usuário

- Login rápido com Google
- Renovação automática de tokens
- Sessão persistente e transparente

## 🔄 Funcionalidades Implementadas

### 1. Renovação Automática de Tokens

O sistema implementa renovação automática de tokens por meio de múltiplas estratégias:

- **Listener `onIdTokenChanged`**: Detecta mudanças no ID token do Firebase (incluindo renovações automáticas)
- **Renovação automática dos tokens JWT**: Sempre que o Firebase renova o ID token, os tokens JWT são renovados automaticamente
- **Interceptor do Axios**: Tenta renovar os tokens JWT quando recebe erro 401

**Vantagens**:

- Mais eficiente que polling periódico, pois dispara automaticamente quando o token é renovado
- Sincronização perfeita entre Firebase Authentication e tokens JWT
- Transparente para o código da aplicação

### 2. Tratamento Inteligente de Erros 401

#### O que são Erros 401?

**HTTP 401 Unauthorized** é um código de status HTTP que indica que a requisição não foi autorizada. No contexto de autenticação, isso geralmente significa:

- **Token ausente**: A requisição não inclui um token de autenticação
- **Token inválido**: O token fornecido não é válido ou está malformado
- **Token expirado**: O token JWT expirou e precisa ser renovado
- **Token revogado**: O token foi invalidado (ex: após logout ou mudança de senha)
- **Credenciais insuficientes**: O token não possui as permissões necessárias para acessar o recurso

#### Por que Erros 401 Ocorrem?

No sistema implementado, erros 401 podem ocorrer em várias situações:

1. **Token JWT expirado**: Os tokens JWT têm um tempo de expiração (geralmente 15 minutos a 1 hora). Quando expiram, o backend rejeita as requisições com 401.

2. **Navegador reaberto**: Quando o usuário fecha e reabre o navegador, o token JWT pode ter expirado enquanto o navegador estava fechado.

3. **Sessão do Firebase expirada**: Se a sessão do Firebase Auth expirar, o `idToken` não pode ser renovado, e consequentemente o JWT também não pode ser renovado.

4. **Token inválido ou corrompido**: Se o token no `localStorage` estiver corrompido ou inválido, o backend rejeitará com 401.

5. **Logout em outra aba**: Se o usuário fizer logout em outra aba do navegador, o token pode ser invalidado.

#### Como o Sistema Trata Erros 401

O sistema trata erros 401 de forma inteligente, tentando múltiplas estratégias antes de falhar:

- Tenta renovar usando o `refreshToken` primeiro
- Se falhar, aguarda até 3 segundos para o Firebase Auth restaurar a sessão
- Tenta renovar o ID token do Firebase se a sessão for restaurada
- Redireciona para login apenas se todas as estratégias falharem

**Implementação**: Interceptor de resposta do Axios (`api.interceptors.response.use`) que intercepta todas as respostas de erro e trata especificamente erros 401. Veja detalhes na seção [Interceptors do Axios](#interceptors-do-axios).

**Vantagens**:

- Evita redirecionamento prematuro quando o navegador é reaberto
- Transparente para o código que faz requisições
- Resiliente a falhas temporárias

### 3. Logout Completo

O sistema implementa logout completo que:

- Faz logout do Firebase (`auth.signOut()`)
- Remove todos os tokens do localStorage
- Limpa estado do usuário

### 4. Sincronização de Estado

O sistema mantém sincronização automática entre Firebase Authentication e tokens JWT:

- `onIdTokenChanged` dispara sempre que o token muda, garantindo sincronização perfeita
- Se o Firebase faz logout mas os tokens JWT existem, limpa tudo
- Se o Firebase faz login mas não há tokens JWT, renova os tokens automaticamente

### 5. Restauração de Sessão ao Reabrir Navegador

O sistema restaura sessões de forma transparente quando o navegador é reaberto:

- `AuthContext` restaura o estado do `localStorage` imediatamente (para hot reload)
- Mantém `loading = true` até o Firebase Auth restaurar a sessão
- Quando o Firebase Auth restaura a sessão, `onIdTokenChanged` dispara automaticamente
- Renova os tokens JWT automaticamente usando o novo ID token
- O dashboard só carrega dados após `loading = false` (tokens já renovados)

**Vantagens**:

- Sessão é restaurada de forma transparente, sem erros para o usuário
- Não requer reautenticação ao reabrir o navegador
- Mantém estado durante hot reload em desenvolvimento

## 🔒 Considerações de Segurança

### Boas Práticas Implementadas

1. **Validação no backend**: Sempre valida o ID token no servidor
2. **Tokens JWT próprios**: Controle total sobre expiração e claims
3. **HTTPS obrigatório**: Tokens nunca trafegam em texto plano
4. **Refresh tokens**: Renovação sem expor credenciais
5. **Logout completo**: Limpa todas as sessões

### Pontos de Atenção

1. **Credenciais do Firebase**: Armazenar em variáveis de ambiente
2. **CORS**: Configurar corretamente no backend
3. **Rate limiting**: Implementar para prevenir abuso
4. **Validação de email**: Verificar se email está verificado no Firebase

## 🛠️ Configuração Necessária

### Backend

```bash
export FIREBASE_CREDENTIALS_JSON='{"type":"service_account",...}'
```

### Frontend

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 🔧 Detalhes Técnicos

### Entendendo Erros 401 em Detalhes

#### Cenários Comuns de Erro 401

**Cenário 1: Token Expirado Durante Uso Normal**

```
Usuário está usando a aplicação
    │
    ▼
Token JWT expira (após 15min-1h)
    │
    ▼
Próxima requisição recebe 401
    │
    ▼
Interceptor detecta 401
    │
    ▼
Renova token com refreshToken
    │
    ▼
Repete requisição com novo token
    │
    ▼
Requisição bem-sucedida (usuário não percebe)
```

**Cenário 2: Navegador Reaberto**

```
Usuário fecha navegador
    │
    ▼
Token JWT expira enquanto navegador está fechado
    │
    ▼
Usuário reabre navegador
    │
    ▼
Dashboard tenta carregar dados
    │
    ▼
Requisição recebe 401 (token expirado)
    │
    ▼
Interceptor aguarda Firebase Auth restaurar sessão (até 3s)
    │
    ▼
Firebase Auth restaura sessão
    │
    ▼
Obtém novo idToken e renova JWT
    │
    ▼
Repete requisição com novo token
    │
    ▼
Requisição bem-sucedida
```

**Cenário 3: Sessão do Firebase Expirada**

```
Token JWT expira
    │
    ▼
Interceptor tenta renovar com refreshToken
    │
    ▼
RefreshToken também expirado ou inválido
    │
    ▼
Tenta renovar com Firebase Auth
    │
    ▼
Firebase Auth não consegue restaurar sessão
    │
    ▼
Todas as estratégias falharam
    │
    ▼
Limpa tokens e redireciona para login
```

#### Estratégias de Recuperação

O sistema implementa uma hierarquia de estratégias para recuperar de erros 401:

1. **Estratégia 1: Refresh Token** (Mais rápida e eficiente)

   - Usa o `refreshToken` armazenado para obter novos tokens
   - Não requer interação do usuário
   - Funciona mesmo se o navegador foi fechado (se o refreshToken ainda for válido)

2. **Estratégia 2: Firebase Auth** (Fallback inteligente)

   - Aguarda o Firebase Auth restaurar a sessão automaticamente
   - Útil quando o navegador é reaberto
   - Obtém novo `idToken` e faz login novamente

3. **Estratégia 3: Redirecionamento** (Último recurso)
   - Apenas quando todas as estratégias falharam
   - Limpa todos os tokens
   - Redireciona para página de login

#### Prevenção de Loops Infinitos

O sistema usa uma flag `_retry` para prevenir tentativas infinitas de renovação:

```javascript
if (error.response?.status === 401 && !originalRequest._retry) {
 originalRequest._retry = true; // Marca que já tentou renovar
 // ... tenta renovar token
}
```

Isso garante que:

- Cada requisição que recebe 401 só tenta renovar uma vez
- Se a renovação falhar, a requisição é rejeitada normalmente
- Evita loops infinitos de tentativas de renovação

### Interceptors do Axios

O sistema utiliza dois interceptors do Axios para gerenciar automaticamente a autenticação em todas as requisições HTTP:

#### 1. Interceptor de Requisição (Request Interceptor)

**Localização**: `frontend/admin-dashboard/src/services/api.js:12`

**Função**: Adiciona automaticamente o token JWT no header `Authorization` de todas as requisições HTTP.

**Implementação**:

```javascript
api.interceptors.request.use(
 config => {
  const token = localStorage.getItem("token");
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 error => {
  return Promise.reject(error);
 }
);
```

**Como funciona**:

1. **Intercepta todas as requisições** antes de serem enviadas ao servidor
2. **Lê o token JWT** do `localStorage` (chave `"token"`)
3. **Adiciona o header `Authorization`** com o formato `Bearer {token}` se o token existir
4. **Retorna a configuração modificada** para que a requisição seja enviada com o token

**Vantagens**:

- ✅ **Automático**: Não é necessário adicionar o token manualmente em cada requisição
- ✅ **Centralizado**: Toda a lógica de autenticação fica em um único lugar
- ✅ **Transparente**: Os serviços não precisam se preocupar com tokens
- ✅ **Consistente**: Garante que todas as requisições autenticadas incluam o token

**Exemplo de uso**:

```javascript
// Sem o interceptor, seria necessário:
const response = await axios.get("/api/users/me", {
 headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
 },
});

// Com o interceptor, basta:
const response = await api.get("/api/users/me");
// O token é adicionado automaticamente!
```

#### 2. Interceptor de Resposta (Response Interceptor)

**Localização**: `frontend/admin-dashboard/src/services/api.js:26`

**Função**: Intercepta erros de resposta (especialmente 401) e tenta renovar tokens automaticamente antes de falhar.

**Implementação**:

```javascript
api.interceptors.response.use(
 response => response,
 async error => {
  const originalRequest = error.config;

  // Se receber 401 e não for uma tentativa de refresh
  if (error.response?.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true;

   // Estratégia 1: Tenta renovar com refreshToken
   const refreshToken = localStorage.getItem("refreshToken");
   if (refreshToken) {
    try {
     const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
     });

     if (response.data.accessToken) {
      // Salva novos tokens e repete a requisição original
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(originalRequest);
     }
    } catch (refreshError) {
     // Estratégia 2: Se refreshToken falhar, tenta com Firebase
     // ... (aguarda Firebase Auth restaurar sessão)
    }
   }
  }

  return Promise.reject(error);
 }
);
```

**Fluxo de tratamento de erro 401**:

1. **Detecta erro 401**: Intercepta qualquer resposta com status 401 (Unauthorized)
2. **Verifica se já tentou renovar**: Usa a flag `_retry` para evitar loops infinitos
3. **Estratégia 1 - Refresh Token**:
   - Tenta renovar usando o `refreshToken` armazenado
   - Se bem-sucedido, salva novos tokens e repete a requisição original
   - Se falhar, vai para a Estratégia 2
4. **Estratégia 2 - Firebase Auth**:
   - Aguarda até 3 segundos para o Firebase Auth restaurar a sessão
   - Verifica a cada 100ms se `auth.currentUser` está disponível
   - Se a sessão for restaurada, obtém novo ID token e faz login novamente
   - Se bem-sucedido, salva novos tokens e repete a requisição original
5. **Último recurso**: Se todas as estratégias falharem, limpa os tokens e redireciona para login

**Detalhes da implementação**:

- **Flag `_retry`**: Previne tentativas múltiplas de renovação na mesma requisição
- **Aguarda Firebase Auth**: Implementa um polling de até 3 segundos (verifica a cada 100ms) para aguardar o Firebase Auth restaurar a sessão quando o navegador é reaberto
- **Atualização de dados do usuário**: Após renovar os tokens, busca dados atualizados do usuário via `/users/me`
- **Repetição transparente**: Repete a requisição original automaticamente com o novo token, sem que o código que fez a requisição perceba

**Vantagens**:

- ✅ **Transparente**: O código que faz requisições não precisa tratar erros 401
- ✅ **Resiliente**: Tenta múltiplas estratégias antes de falhar
- ✅ **Inteligente**: Aguarda Firebase Auth restaurar sessão ao invés de redirecionar imediatamente
- ✅ **Atualiza dados**: Busca dados atualizados do usuário após renovar tokens
- ✅ **Previne loops**: Usa flag `_retry` para evitar tentativas infinitas

**Exemplo de uso**:

```javascript
// O código simplesmente faz a requisição:
try {
 const data = await api.get("/api/admin/dashboard");
 // Se o token expirou, o interceptor:
 // 1. Detecta o 401
 // 2. Renova o token automaticamente
 // 3. Repete a requisição
 // 4. Retorna os dados normalmente
 console.log(data);
} catch (error) {
 // Só chega aqui se todas as estratégias de renovação falharem
 console.error("Erro ao carregar dashboard:", error);
}
```

**Casos de uso**:

1. **Token expirado durante uso normal**: Refresh token renova automaticamente
2. **Navegador reaberto**: Aguarda Firebase Auth restaurar sessão antes de renovar
3. **Sessão do Firebase expirada**: Redireciona para login apenas como último recurso

### Uso de `onIdTokenChanged`

O sistema utiliza `onIdTokenChanged` para detectar mudanças no ID token do Firebase:

- **`onAuthStateChanged`**: Dispara apenas quando o usuário faz login ou logout (mudança de estado)
- **`onIdTokenChanged`**: Dispara sempre que o ID token muda, incluindo renovações automáticas do Firebase

**Vantagens de `onIdTokenChanged`**:

- ✅ Mais eficiente: não precisa de `setInterval` para verificar periodicamente
- ✅ Mais preciso: dispara exatamente quando o token é renovado
- ✅ Mais simples: menos código, menos pontos de falha
- ✅ Segue práticas recomendadas do Firebase

### Variáveis Compartilhadas via Context API

O `AuthContext` gerencia três estados principais:

1. **`user`**: Dados do usuário do backend (armazenado no `localStorage`)
2. **`firebaseUser`**: Objeto do Firebase Auth (apenas em memória)
3. **`loading`**: Estado de carregamento inicial

**Fluxo de inicialização**:

1. Restaura `user` do `localStorage` imediatamente (para hot reload)
2. Mantém `loading = true` até o Firebase Auth restaurar a sessão
3. Quando `onIdTokenChanged` dispara, renova os tokens JWT
4. Define `loading = false` apenas após renovação bem-sucedida

### Integração entre Interceptors e AuthContext

Os interceptors do Axios trabalham em conjunto com o `AuthContext` para fornecer uma experiência de autenticação transparente:

**Request Interceptor**:

- Lê o token do `localStorage` (que é atualizado pelo `AuthContext`)
- Adiciona automaticamente em todas as requisições

**Response Interceptor**:

- Detecta quando tokens expiram (erro 401)
- Renova tokens usando as mesmas estratégias do `AuthContext`
- Atualiza `localStorage` (que é lido pelo `AuthContext`)

**AuthContext**:

- Gerencia o estado de autenticação da aplicação
- Renova os tokens proativamente via `onIdTokenChanged`
- Sincroniza o estado do Firebase com os tokens JWT

**Fluxo colaborativo**:

```
AuthContext (onIdTokenChanged)
    │
    ├─► Renova token JWT proativamente
    │   └─► Atualiza localStorage
    │
    └─► Request Interceptor
            │
            └─► Lê token do localStorage
                └─► Adiciona em requisições

Requisição HTTP
    │
    ├─► Sucesso ──► Retorna dados
    │
    └─► Erro 401 ──► Response Interceptor
                        │
                        ├─► Renova token
                        │   └─► Atualiza localStorage
                        │
                        └─► Repete requisição
                            └─► Retorna dados
```

Esta arquitetura garante que:

- Os tokens são renovados proativamente (via `AuthContext`)
- Os tokens são renovados reativamente quando necessário (via `Response Interceptor`)
- Tudo funciona de forma transparente para o código da aplicação

---

## 💻 Detalhes de Implementação

Esta seção descreve os detalhes técnicos da implementação, incluindo variáveis de estado, funções do Firebase, bibliotecas utilizadas, hooks do React e padrões de projeto aplicados.

### Variáveis de Estado

O sistema utiliza múltiplas variáveis de estado gerenciadas em diferentes camadas:

#### AuthContext (`AuthContext.js`)

```javascript
const [user, setUser] = useState(null); // Dados do usuário do backend
const [loading, setLoading] = useState(true); // Estado de carregamento inicial
const [firebaseUser, setFirebaseUser] = useState(null); // Objeto Firebase Auth
```

**Descrição das variáveis:**

1. **`user`** (tipo: `Object | null`)

   - **Armazenamento**: `localStorage` (chave: `"user"`)
   - **Conteúdo**: Dados do usuário do backend `{id, name, email, role, status}`
   - **Atualização**: Atualizado após login, renovação de token e busca de dados
   - **Uso**: Verificação de autenticação, exibição de informações do usuário, verificação de roles

2. **`loading`** (tipo: `boolean`)

   - **Armazenamento**: Apenas em memória (React state)
   - **Inicial**: `true` (aguarda Firebase Auth restaurar sessão)
   - **Final**: `false` (após Firebase Auth restaurar sessão e renovar token)
   - **Uso**: Controla exibição de loading spinner, previne requisições antes da autenticação estar pronta

3. **`firebaseUser`** (tipo: `User | null`)
   - **Armazenamento**: Apenas em memória (React state)
   - **Conteúdo**: Objeto `User` do Firebase Auth
   - **Atualização**: Atualizado pelo listener `onIdTokenChanged`
   - **Uso**: Obter `idToken`, verificar estado de autenticação do Firebase

#### localStorage (Persistência)

```javascript
localStorage.getItem("token"); // JWT accessToken
localStorage.getItem("refreshToken"); // JWT refreshToken
localStorage.getItem("user"); // Dados do usuário (JSON string)
```

**Estrutura de dados:**

- **`token`**: String JWT para autenticação nas requisições
- **`refreshToken`**: String JWT para renovar o accessToken
- **`user`**: JSON string contendo `{id, name, email, role, status}`

### Funções do Firebase

O sistema utiliza as seguintes funções e APIs do Firebase Authentication:

#### 1. `onIdTokenChanged(auth, callback)`

**Localização**: `AuthContext.js:43`

```javascript
const unsubscribe = onIdTokenChanged(auth, async firebaseUser => {
 // Callback executado sempre que o ID token muda
});
```

**Comportamento:**

- **Observer Pattern**: Implementa o padrão Observer do Firebase
- **Dispara quando**: O ID token é renovado, o usuário faz login ou logout, ou a sessão é restaurada
- **Retorna**: Função `unsubscribe` para cancelar o listener
- **Vantagem**: Mais eficiente que `onAuthStateChanged` + `setInterval`, pois dispara automaticamente

**Uso no código:**

- Renovação automática dos tokens JWT
- Detecção de logout do Firebase
- Restauração de sessão ao reabrir o navegador

#### 2. `signInWithPopup(auth, provider)`

**Localização**: `Login.js:40`

```javascript
const result = await signInWithPopup(auth, googleProvider);
```

**Comportamento:**

- Abre popup do Google para autenticação
- Retorna `UserCredential` com objeto `user`
- Configurado com `prompt: 'select_account'` para forçar seleção de conta

**Retorno:**

- `result.user`: Objeto `User` do Firebase
- `result.user.getIdToken()`: Método para obter o ID token

#### 3. `getIdToken(forceRefresh?)`

**Localização**: `AuthContext.js:52`, `api.js:84`

```javascript
const idToken = await firebaseUser.getIdToken(); // Obtém token atual
const idToken = await firebaseUser.getIdToken(true); // Força renovação
```

**Comportamento:**

- **Sem parâmetro**: Retorna token em cache se válido, ou renova automaticamente se expirado
- **Com `true`**: Força renovação do token mesmo se ainda válido
- **Retorno**: Promise que resolve com string do ID token

**Uso:**

- Login inicial: `getIdToken()` após `signInWithPopup`
- Renovação automática: `getIdToken()` quando `onIdTokenChanged` dispara
- Recuperação de erro 401: `getIdToken(true)` para forçar a renovação

#### 4. `auth.signOut()`

**Localização**: `api.js:176`, `Login.js:33`

```javascript
await auth.signOut();
```

**Comportamento:**

- Faz logout do usuário no Firebase
- Remove sessão do Firebase Auth
- Retorna Promise que resolve quando logout é completo

**Uso:**

- Logout completo do sistema
- Limpeza antes de um novo login (para forçar seleção de conta)

#### 5. `auth.currentUser`

**Localização**: `api.js:68`, `Login.js:32`

```javascript
const currentUser = auth.currentUser; // User | null
```

**Comportamento:**

- Propriedade síncrona que retorna o usuário atual ou `null`
- Atualizado automaticamente pelo Firebase Auth
- Pode ser `null` temporariamente durante restauração de sessão

**Uso:**

- Verificar se há sessão ativa antes de fazer login
- Aguardar a restauração de sessão no interceptor de erro 401

### Bibliotecas Importadas

#### React e Hooks

```javascript
import { createContext, useContext, useEffect, useState } from "react";
```

- **`createContext`**: Cria o contexto de autenticação
- **`useContext`**: Hook para acessar o contexto em componentes
- **`useEffect`**: Hook para efeitos colaterais (listeners, cleanup)
- **`useState`**: Hook para gerenciar estado local

#### Firebase Authentication

```javascript
import { onIdTokenChanged } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
```

- **`onIdTokenChanged`**: Observer para mudanças no ID token
- **`signInWithPopup`**: Autenticação via popup (Google OAuth)
- **`getAuth`**: Obtém instância do Auth do Firebase
- **`GoogleAuthProvider`**: Provedor de autenticação do Google

#### Axios

```javascript
import axios from "axios";
```

- **HTTP Client**: Para requisições HTTP ao backend
- **Interceptors**: Para adicionar tokens e tratar erros automaticamente
- **Instância customizada**: `api` criada com `axios.create()` para configurações específicas

### Uso do useEffect e Callbacks

#### useEffect Principal (`AuthContext.js:27`)

```javascript
useEffect(() => {
 let isInitialLoad = true;

 // Restaura estado do localStorage
 const storedUser = authService.getUser();
 const hasToken = authService.isAuthenticated();

 if (storedUser && hasToken) {
  setUser(storedUser);
 }

 // Observer do Firebase
 const unsubscribe = onIdTokenChanged(auth, async firebaseUser => {
  // Callback assíncrono
 });

 // Cleanup function
 return () => {
  unsubscribe();
 };
}, []); // Array de dependências vazio = executa apenas no mount
```

**Características:**

1. **Array de dependências vazio `[]`**:

   - Executa apenas uma vez quando o componente é montado
   - Garante que o listener seja registrado apenas uma vez
   - Evita múltiplos listeners concorrentes

2. **Cleanup function**:

   - Retorna função que cancela o listener quando o componente desmonta
   - Previne memory leaks
   - Garante que apenas um listener esteja ativo

3. **Variável `isInitialLoad`**:
   - Controla quando definir `loading = false`
   - Garante que loading só seja finalizado após primeira execução do callback
   - Previne race conditions

#### Callback Assíncrono do Observer

```javascript
const unsubscribe = onIdTokenChanged(auth, async firebaseUser => {
 // Callback pode ser assíncrono
 setFirebaseUser(firebaseUser);

 if (firebaseUser) {
  try {
   const idToken = await firebaseUser.getIdToken();
   await authService.login(idToken);
   // ...
  } catch (error) {
   // Tratamento de erro
  }
 }
});
```

**Características:**

- **Assíncrono**: Permite operações `await` dentro do callback
- **Reativo**: Dispara automaticamente quando o token muda
- **Idempotente**: Pode ser executado múltiplas vezes sem problemas

### Padrão Observer

O sistema implementa o **Observer Pattern** através do Firebase:

#### Estrutura do Observer

```javascript
// Subject: Firebase Auth
const auth = getAuth(app);

// Observer: Callback function
const observer = async firebaseUser => {
 // Reage a mudanças no estado
};

// Subscribe: Registra o observer
const unsubscribe = onIdTokenChanged(auth, observer);

// Unsubscribe: Remove o observer
unsubscribe();
```

#### Vantagens do Observer Pattern

1. **Desacoplamento**: O código não precisa verificar periodicamente o estado
2. **Eficiência**: Dispara apenas quando há mudanças reais
3. **Reatividade**: Sistema reage automaticamente a mudanças
4. **Cleanup**: Fácil remover observers quando não são mais necessários

#### Implementação no Código

```javascript
// Observer registrado no useEffect
useEffect(() => {
 const unsubscribe = onIdTokenChanged(auth, async firebaseUser => {
  // Observer reage a mudanças
  if (firebaseUser) {
   // Renova token JWT
  } else {
   // Limpa estado
  }
 });

 // Cleanup: remove observer
 return () => unsubscribe();
}, []);
```

### Padrões de Projeto Utilizados

#### 1. Context API Pattern (React)

**Implementação**: `AuthContext.js`

```javascript
// Criação do contexto
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
 // Estado e lógica
 const value = { user, login, logout, isAuthenticated, loading };
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
 return context;
};
```

**Vantagens:**

- **Prop drilling evitado**: Estado disponível em toda a árvore de componentes
- **Encapsulamento**: Lógica de autenticação centralizada
- **Reutilização**: Hook `useAuth()` pode ser usado em qualquer componente

#### 2. Interceptor Pattern (Axios)

**Implementação**: `api.js:13-24, 27-130`

```javascript
// Request Interceptor
api.interceptors.request.use(config => {
 // Adiciona token antes de enviar
 const token = localStorage.getItem("token");
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

// Response Interceptor
api.interceptors.response.use(
 response => response,
 async error => {
  // Trata erros 401 automaticamente
  if (error.response?.status === 401) {
   // Tenta renovar token
  }
 }
);
```

**Vantagens:**

- **Separação de concerns**: Lógica de autenticação separada da lógica de negócio
- **Transparente**: Código que faz requisições não precisa se preocupar com tokens
- **Centralizado**: Toda lógica de autenticação em um único lugar

#### 3. Service Layer Pattern

**Implementação**: `api.js:127-210`

```javascript
export const authService = {
 login: async idToken => {
  /* ... */
 },
 logout: async () => {
  /* ... */
 },
 getToken: () => {
  /* ... */
 },
 getUser: () => {
  /* ... */
 },
 isAuthenticated: () => {
  /* ... */
 },
};
```

**Vantagens:**

- **Abstração**: Esconde detalhes de implementação (localStorage, axios)
- **Testabilidade**: Fácil mockar serviços em testes
- **Reutilização**: Pode ser usado em diferentes contextos

### Gerenciamento de Estado na Implementação

> Estado Local (React State)

```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [firebaseUser, setFirebaseUser] = useState(null);
```

**Uso:**

- Estado reativo que causa re-render quando muda
- Sincronizado com `localStorage` mas não substituído por ele
- Usado para UI e lógica de componentes

> Estado Persistente (localStorage)

```javascript
localStorage.setItem("token", token);
localStorage.getItem("token");
localStorage.removeItem("token");
```

**Uso:**

- Persiste entre sessões do navegador
- Sobrevive a hot reload
- Não causa re-render (não é reativo)

#### Sincronização Estado + Persistência

```javascript
// Ao fazer login
await authService.login(idToken); // Salva no localStorage
const userData = authService.getUser(); // Lê do localStorage
setUser(userData); // Atualiza estado React

// Ao restaurar
const storedUser = authService.getUser(); // Lê do localStorage
if (storedUser) {
 setUser(storedUser); // Atualiza estado React
}
```

### Tratamento de Erros

#### Try-Catch em Callbacks Assíncronos

```javascript
try {
 const idToken = await firebaseUser.getIdToken();
 await authService.login(idToken);
} catch (error) {
 console.error("Erro ao renovar token:", error);
 if (error.response?.status === 401 || error.response?.status === 403) {
  authService.logout();
  setUser(null);
 }
}
```

**Estratégias:**

- **Erros de autenticação (401/403)**: Faz logout e limpa estado
- **Outros erros**: Apenas loga, não interrompe o fluxo
- **Erros silenciosos**: Alguns erros são tratados sem notificar o usuário

#### Error Boundaries (Futuro)

Para produção, considere implementar Error Boundaries do React para capturar erros em componentes filhos.

### Performance e Otimizações

#### Lazy Loading de Módulos

```javascript
// Importação dinâmica no interceptor
const { auth } = await import("../config/firebase.js");
```

**Vantagem**: Reduz bundle inicial, carrega Firebase apenas quando necessário.

#### Cleanup de Listeners

```javascript
useEffect(() => {
 const unsubscribe = onIdTokenChanged(auth, callback);
 return () => unsubscribe(); // Cleanup
}, []);
```

**Vantagem**: Previne memory leaks e múltiplos listeners.

#### Flag de Retry

```javascript
if (!originalRequest._retry) {
 originalRequest._retry = true;
 // Tenta renovar token
}
```

**Vantagem**: Previne loops infinitos de tentativas de renovação.

### Considerações de Implementação

#### Assíncronismo

- **Callbacks assíncronos**: `onIdTokenChanged` aceita callback `async`
- **Await em cadeia**: Múltiplos `await` para garantir ordem de execução
- **Error handling**: Try-catch em todas as operações assíncronas críticas

#### Race Conditions

- **Flag `isInitialLoad`**: Previne múltiplas definições de `loading = false`
- **Flag `_retry`**: Previne múltiplas tentativas de renovação
- **Cleanup adequado**: Remove listeners antes de criar novos

#### Hot Reload

- **Restauração imediata**: Estado do `localStorage` restaurado antes de aguardar Firebase
- **Listener reativo**: `onIdTokenChanged` detecta mudanças mesmo após hot reload
- **Estado sincronizado**: Estado React sincronizado com `localStorage` e Firebase

### Estrutura de Arquivos

```
frontend/admin-dashboard/src/
├── config/
│   ├── firebase.js      # Configuração do Firebase
│   └── api.js           # URL base da API
├── context/
│   └── AuthContext.js    # Context API para autenticação
├── services/
│   └── api.js           # Serviços HTTP e interceptors
└── pages/
    └── Login.js         # Página de login
```

**Organização:**

- **Separação de concerns**: Configuração, contexto, serviços e páginas separados
- **Reutilização**: Serviços podem ser usados em múltiplos componentes
- **Manutenibilidade**: Fácil localizar e modificar código específico

### 🎓 Conclusão

A implementação segue **boas práticas** de autenticação moderna:

✅ **Segurança**: Validação em múltiplas camadas  
✅ **UX**: Renovação automática, sessão persistente e transparente  
✅ **Eficiência**: Uso de `onIdTokenChanged` em vez de polling  
✅ **Confiabilidade**: Tratamento robusto de erros e restauração de sessão  
✅ **Manutenibilidade**: Código organizado e testável  
✅ **Escalabilidade**: Fácil adicionar novos provedores

A implementação está **pronta para produção**! 🚀

