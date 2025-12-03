# 📋 Backlog - GitHub Project

## 📑 Sumário

- [Dados Gerais do Backlog](#-dados-gerais-do-backlog)
  - [Visão Geral](#visão-geral)
  - [Estatísticas](#estatísticas)
  - [Estimativa Total](#estimativa-total)
  - [Convenções de Dependências](#convenções-de-dependências)
  - [Ordem Recomendada de Execução](#ordem-recomendada-de-execução)
- [Épico 1: Configuração e Setup](#-épico-1-configuração-e-setup)
  - [Card 1: Configuração Inicial do Projeto](#card-1-configuração-inicial-do-projeto)
  - [Card 2: Configuração do Firebase (Web e Mobile)](#card-2-configuração-do-firebase-web-e-mobile)
- [Épico 2: Implementação Core](#-épico-2-implementação-core)
  - [Card 3: Serviço de API e Interceptors](#card-3-serviço-de-api-e-interceptors)
  - [Card 4: Serviço de Autenticação](#card-4-serviço-de-autenticação)
  - [Card 5: AuthContext e Gerenciamento de Estado](#card-5-authcontext-e-gerenciamento-de-estado)
  - [Card 6: Interface do Usuário e Navegação](#card-6-interface-do-usuário-e-navegação)
- [Épico 3: Testes e Validação](#-épico-3-testes-e-validação)
  - [Card 7: Testes de Autenticação e Fluxos Principais](#card-7-testes-de-autenticação-e-fluxos-principais)
  - [Card 8: Testes de Tratamento de Erros e Edge Cases](#card-8-testes-de-tratamento-de-erros-e-edge-cases)
  - [Card 9: Melhorias e Otimizações](#card-9-melhorias-e-otimizações)
- [Resumo por Prioridade](#-resumo-por-prioridade)
- [Notas de Uso](#-notas-de-uso)

---

## 📊 Dados Gerais do Backlog

### Visão Geral

Este backlog contém **9 cards de atividades** organizados em **3 épicos**, cobrindo implementação para Web (React) e Mobile (React Native) de forma integrada.

### Estatísticas

- **Total de Cards**: 9 (reduzido de 46, mantendo 100% do conteúdo)
  - **Épico 1**: 2 cards
  - **Épico 2**: 4 cards
  - **Épico 3**: 3 cards
- **Por Prioridade**:
  - 🔴 **Alta**: 6 cards (67%)
  - 🟡 **Média**: 2 cards (22%)
  - 🟢 **Baixa**: 1 card (11%)
- **Cobertura**:
  - ✅ Web (React): Todas as funcionalidades
  - ✅ Mobile (React Native): Todas as funcionalidades
  - ✅ Testes: Todos os cenários
  - ✅ Melhorias: Todas as otimizações

### Estimativa Total

- **Web**: ~45 horas
- **Mobile**: ~50 horas
- **Total**: ~95 horas

_Nota: Estimativas incluem desenvolvimento, testes básicos e documentação. Não incluem code review, testes avançados e deploy._

### Convenções de Dependências

Cada card possui duas seções de dependências:

1. **Dependências**: Lista de cards que **devem ser concluídos ANTES** de iniciar este card
2. **Bloqueia**: Lista de cards que **ficam bloqueados** até este card ser concluído

**Notas importantes**:

- Cards sem dependências podem ser feitos em paralelo
- Cards de teste sempre dependem dos cards de implementação correspondentes
- Cards de melhoria dependem dos cards de teste para identificar problemas
- Use a funcionalidade "Blocked by" do GitHub Project para visualizar dependências

### Ordem Recomendada de Execução

1. **Fase 1 - Setup**: Configuração inicial e dependências

   - [Card 1: Configuração Inicial do Projeto](#card-1-configuração-inicial-do-projeto)
   - [Card 2: Configuração do Firebase (Web e Mobile)](#card-2-configuração-do-firebase-web-e-mobile)

2. **Fase 2 - Core**: Implementação das funcionalidades principais

   - [Card 3: Serviço de API e Interceptors](#card-3-serviço-de-api-e-interceptors)
   - [Card 4: Serviço de Autenticação](#card-4-serviço-de-autenticação)
   - [Card 5: AuthContext e Gerenciamento de Estado](#card-5-authcontext-e-gerenciamento-de-estado)
   - [Card 6: Interface do Usuário e Navegação](#card-6-interface-do-usuário-e-navegação)

3. **Fase 3 - Validação**: Testes e melhorias
   - [Card 7: Testes de Autenticação e Fluxos Principais](#card-7-testes-de-autenticação-e-fluxos-principais)
   - [Card 8: Testes de Tratamento de Erros e Edge Cases](#card-8-testes-de-tratamento-de-erros-e-edge-cases)
   - [Card 9: Melhorias e Otimizações](#card-9-melhorias-e-otimizações)

---

## 🎯 Épico 1: Configuração e Setup

### Card 1: Configuração Inicial do Projeto

**Título**: `[Setup] Configuração inicial dos projetos Web e Mobile`

**Descrição**:
Configurar projetos React (Web) e React Native (Mobile), incluindo instalação de dependências, estrutura de pastas e configurações básicas.

**Dependências**:

- Nenhuma (card inicial)

**Bloqueia**:

- Card 2 (Configuração do Firebase)
- Card 3 (Serviço de API e Interceptors)
- Card 5 (AuthContext e Gerenciamento de Estado)
- Card 6 (Interface do Usuário e Navegação)

**Checklist**:

#### Web (React):

- [ ] Criar projeto React (Vite ou Create React App)
- [ ] Instalar dependências: `firebase`, `axios`, `react-router-dom`
- [ ] Configurar estrutura de pastas (`src/config`, `src/services`, `src/context`, `src/pages`, `src/components`)
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Configurar ESLint/Prettier (opcional)
- [ ] Testar inicialização do projeto

#### Mobile (React Native):

- [ ] Criar projeto React Native (Expo ou CLI)
- [ ] Instalar dependências: `@react-native-firebase/app`, `@react-native-firebase/auth`, `@react-native-google-signin/google-signin`, `axios`, `@react-native-async-storage/async-storage`, `@react-navigation/native`, `react-native-paper`
- [ ] Configurar estrutura de pastas (`src/config`, `src/services`, `src/context`, `src/screens`, `src/components`)
- [ ] Configurar variáveis de ambiente (`.env` ou `app.json`)
- [ ] Configurar `babel.config.js` se necessário
- [ ] Configurar `app.json` (Expo) ou `android/app/build.gradle` (CLI)
- [ ] Testar inicialização do projeto

**Labels**: `setup`, `dependencies`, `config`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 3h (1.5h Web + 1.5h Mobile)

---

### Card 2: Configuração do Firebase (Web e Mobile)

**Título**: `[Setup] Configurar Firebase Authentication para Web e Mobile`

**Descrição**:
Configurar Firebase Authentication em ambos os projetos, incluindo credenciais, provedores de autenticação e configurações específicas de plataforma.

**Dependências**:

- Card 1 (Configuração Inicial do Projeto)

**Bloqueia**:

- Card 3 (Serviço de API e Interceptors)
- Card 5 (AuthContext e Gerenciamento de Estado)
- Card 6 (Interface do Usuário e Navegação)

**Checklist**:

#### Web (React):

- [ ] Criar projeto no Firebase Console
- [ ] Habilitar Google como provedor de autenticação
- [ ] Obter credenciais do Firebase (API Key, Auth Domain, Project ID, etc.)
- [ ] Criar arquivo `.env` com variáveis de ambiente (`VITE_FIREBASE_API_KEY`, etc.)
- [ ] Criar arquivo `src/config/firebase.js`
- [ ] Configurar `initializeApp()` com credenciais
- [ ] Configurar `initializeAuth()` com persistência
- [ ] Configurar `GoogleAuthProvider` com `prompt: 'select_account'`
- [ ] Exportar `auth`, `googleProvider`, `signInWithPopup`, `onIdTokenChanged`
- [ ] Testar inicialização do Firebase

#### Mobile (React Native):

- [ ] Configurar Firebase para Android:
  - [ ] Baixar `google-services.json` do Firebase Console
  - [ ] Colocar em `android/app/` (CLI) ou raiz do projeto (Expo)
  - [ ] Configurar `app.json` com `googleServicesFile: "./google-services.json"`
  - [ ] Configurar package name no Firebase Console
- [ ] Configurar Firebase para iOS (se aplicável):
  - [ ] Baixar `GoogleService-Info.plist`
  - [ ] Adicionar ao projeto iOS
- [ ] Criar arquivo `src/config/firebase.js`
- [ ] Configurar `initializeApp()` com credenciais
- [ ] Configurar `initializeAuth()` com `getReactNativePersistence`
- [ ] Configurar Google Sign-In:
  - [ ] Obter `webClientId` do Firebase Console
  - [ ] Configurar `GoogleSignin.configure()` com `webClientId`
  - [ ] Implementar função `signInWithGoogle()` usando `@react-native-google-signin/google-signin`
  - [ ] Implementar função `signInWithGoogleToken()` para autenticar no Firebase
- [ ] Exportar funções necessárias (`auth`, `signInWithGoogle`, `signOutUser`, `onIdTokenChanged`)
- [ ] Testar configuração no Android
- [ ] Testar configuração no iOS (se aplicável)

**Labels**: `setup`, `firebase`, `authentication`, `google-signin`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 4h (1.5h Web + 2.5h Mobile)

---

## 🎯 Épico 2: Implementação Core

### Card 3: Serviço de API e Interceptors

**Título**: `[Core] Implementar serviço de API com interceptors para Web e Mobile`

**Descrição**:
Criar serviço de API centralizado com Axios, incluindo interceptors de requisição e resposta para gerenciamento automático de tokens e tratamento de erros 401.

**Dependências**:

- Card 1 (Configuração Inicial do Projeto)
- Card 2 (Configuração do Firebase)

**Bloqueia**:

- Card 4 (Serviço de Autenticação)
- Card 5 (AuthContext e Gerenciamento de Estado)

**Checklist**:

#### Web (React):

- [ ] Criar arquivo `src/services/api.js`
- [ ] Configurar `axios.create()` com `baseURL` e headers padrão
- [ ] Adicionar variável de ambiente `VITE_API_BASE_URL`
- [ ] Implementar Request Interceptor:
  - [ ] Ler token do `localStorage`
  - [ ] Adicionar header `Authorization: Bearer {token}`
  - [ ] Tratar caso de token ausente
- [ ] Implementar Response Interceptor - Estratégia 1 (Refresh Token):
  - [ ] Detectar erro 401
  - [ ] Implementar flag `_retry` para evitar loops
  - [ ] Buscar `refreshToken` do localStorage
  - [ ] Fazer POST para `/auth/refresh`
  - [ ] Salvar novos tokens
  - [ ] Buscar dados atualizados do usuário
  - [ ] Repetir requisição original
- [ ] Implementar Response Interceptor - Estratégia 2 (Firebase Auth):
  - [ ] Aguardar Firebase Auth restaurar sessão (até 3s)
  - [ ] Verificar `auth.currentUser` a cada 100ms
  - [ ] Obter novo ID token com `getIdToken(true)`
  - [ ] Fazer POST para `/auth/login` com novo ID token
  - [ ] Salvar novos tokens
  - [ ] Repetir requisição original
- [ ] Implementar fallback: limpar tokens e redirecionar se tudo falhar
- [ ] Testar interceptors com requisições reais

#### Mobile (React Native):

- [ ] Criar arquivo `src/services/api.js`
- [ ] Configurar `axios.create()` com `baseURL` e headers padrão
- [ ] Configurar variável de ambiente `EXPO_PUBLIC_API_BASE_URL` ou similar
- [ ] Implementar Request Interceptor:
  - [ ] Ler token do `AsyncStorage` (async/await)
  - [ ] Adicionar header `Authorization: Bearer {token}`
  - [ ] Tratar caso de token ausente
- [ ] Implementar Response Interceptor - Estratégia 1 (Refresh Token):
  - [ ] Detectar erro 401
  - [ ] Implementar flag `_retry`
  - [ ] Buscar `refreshToken` do AsyncStorage (async/await)
  - [ ] Fazer POST para `/auth/refresh`
  - [ ] Salvar novos tokens no AsyncStorage
  - [ ] Buscar dados atualizados do usuário
  - [ ] Repetir requisição original
- [ ] Implementar Response Interceptor - Estratégia 2 (Firebase Auth):
  - [ ] Verificar `auth().currentUser`
  - [ ] Obter novo ID token com `getIdToken(true)`
  - [ ] Fazer POST para `/auth/login` com novo ID token
  - [ ] Salvar novos tokens no AsyncStorage
  - [ ] Repetir requisição original
- [ ] Implementar fallback: limpar tokens (navegação será tratada no componente)
- [ ] Testar interceptors

**Labels**: `api`, `axios`, `interceptor`, `authentication`, `error-handling`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 6h (3h Web + 3h Mobile)

---

### Card 4: Serviço de Autenticação

**Título**: `[Core] Implementar authService com métodos de autenticação`

**Descrição**:
Criar objeto `authService` com métodos para login, logout, verificação de autenticação e acesso a tokens/usuário, adaptado para Web (localStorage) e Mobile (AsyncStorage).

**Dependências**:

- Card 3 (Serviço de API e Interceptors)

**Bloqueia**:

- Card 5 (AuthContext e Gerenciamento de Estado)

**Checklist**:

#### Web (React):

- [ ] Implementar método `login(idToken)`:
  - [ ] Fazer POST para `/auth/login` com ID token
  - [ ] Salvar `accessToken` e `refreshToken` no localStorage
  - [ ] Buscar dados do usuário via `GET /users/me`
  - [ ] Salvar dados do usuário no localStorage
  - [ ] Retornar dados do usuário
- [ ] Implementar método `logout()`:
  - [ ] Remover tokens do localStorage
  - [ ] Remover dados do usuário do localStorage
  - [ ] Fazer logout do Firebase (`auth.signOut()`)
  - [ ] Adicionar delay de 100ms para garantir processamento
- [ ] Implementar método `isAuthenticated()`:
  - [ ] Verificar existência de token no localStorage
  - [ ] Retornar boolean
- [ ] Implementar método `getToken()`:
  - [ ] Retornar token do localStorage
- [ ] Implementar método `getUser()`:
  - [ ] Ler dados do usuário do localStorage
  - [ ] Fazer parse do JSON
  - [ ] Retornar objeto ou null
- [ ] Testar todos os métodos

#### Mobile (React Native):

- [ ] Implementar método `login(idToken)` (async):
  - [ ] Fazer POST para `/auth/login` com ID token
  - [ ] Salvar `accessToken` e `refreshToken` no AsyncStorage (async/await)
  - [ ] Buscar dados do usuário via `GET /users/me`
  - [ ] Salvar dados do usuário no AsyncStorage
  - [ ] Retornar dados do usuário
- [ ] Implementar método `logout()` (async):
  - [ ] Remover tokens do AsyncStorage usando `multiRemove`
  - [ ] Remover dados do usuário do AsyncStorage
  - [ ] Fazer logout do Firebase (`auth().signOut()`)
- [ ] Implementar método `isAuthenticated()` (async):
  - [ ] Verificar existência de token no AsyncStorage (async/await)
  - [ ] Retornar boolean
- [ ] Implementar método `getToken()` (async):
  - [ ] Retornar token do AsyncStorage (async/await)
- [ ] Implementar método `getUser()` (async):
  - [ ] Ler dados do usuário do AsyncStorage (async/await)
  - [ ] Fazer parse do JSON
  - [ ] Retornar objeto ou null
- [ ] Testar todos os métodos

**Labels**: `api`, `service`, `authentication`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 3h (1.5h Web + 1.5h Mobile)

---

### Card 5: AuthContext e Gerenciamento de Estado

**Título**: `[Core] Implementar AuthContext com gerenciamento de estado e observers`

**Descrição**:
Criar contexto de autenticação usando React Context API, incluindo observer do Firebase, restauração de estado e funções de login/logout, adaptado para Web e Mobile.

**Dependências**:

- Card 2 (Configuração do Firebase)
- Card 4 (Serviço de Autenticação)

**Bloqueia**:

- Card 6 (Interface do Usuário e Navegação)
- Card 7 (Testes de Autenticação e Fluxos Principais)

**Checklist**:

#### Web (React):

- [ ] Criar arquivo `src/context/AuthContext.js`
- [ ] Criar `AuthContext` com `createContext()`
- [ ] Implementar estados: `user`, `loading`, `firebaseUser`
- [ ] Implementar `AuthProvider` component
- [ ] Implementar hook `useAuth()` com validação
- [ ] Implementar restauração de estado do localStorage:
  - [ ] Restaurar `user` do localStorage no `useEffect`
  - [ ] Verificar existência de token antes de restaurar
- [ ] Implementar Observer do Firebase:
  - [ ] Importar `onIdTokenChanged` do Firebase
  - [ ] Registrar observer no `useEffect` com array de dependências vazio
  - [ ] Implementar callback assíncrono
  - [ ] Renovar tokens JWT automaticamente quando ID token muda
  - [ ] Atualizar estado do usuário após renovação
  - [ ] Implementar cleanup function
  - [ ] Tratar erros de renovação (401/403)
  - [ ] Implementar flag `isInitialLoad` para controlar loading
- [ ] Implementar função `login(idToken)`:
  - [ ] Chamar `authService.login()`
  - [ ] Validar role do usuário (deve ser ADMIN)
  - [ ] Atualizar estado `user`
  - [ ] Retornar objeto `{success, error}`
- [ ] Implementar função `logout()`:
  - [ ] Limpar estados React
  - [ ] Chamar `authService.logout()`
- [ ] Implementar função `isAuthenticated()`:
  - [ ] Verificar `user` e token
  - [ ] Retornar boolean
- [ ] Testar contexto básico

#### Mobile (React Native):

- [ ] Criar arquivo `src/context/AuthContext.js`
- [ ] Criar `AuthContext` com `createContext()`
- [ ] Implementar estados: `user`, `loading`, `firebaseUser`
- [ ] Implementar `AuthProvider` component
- [ ] Implementar hook `useAuth()` com validação
- [ ] Implementar restauração de estado do AsyncStorage:
  - [ ] Criar função `restoreState()` assíncrona
  - [ ] Restaurar `user` do AsyncStorage
  - [ ] Verificar existência de token antes de restaurar
- [ ] Implementar Observer do Firebase:
  - [ ] Importar `auth()` do `@react-native-firebase/auth`
  - [ ] Registrar observer com `auth().onIdTokenChanged()` no `useEffect`
  - [ ] Implementar callback assíncrono
  - [ ] Renovar tokens JWT automaticamente quando ID token muda
  - [ ] Atualizar estado do usuário após renovação
  - [ ] Implementar cleanup function
  - [ ] Tratar erros de renovação
  - [ ] Implementar flag `isInitialLoad`
- [ ] Implementar função `login(idToken)` (async):
  - [ ] Chamar `authService.login()`
  - [ ] Validar role do usuário (ADMIN)
  - [ ] Atualizar estado `user`
  - [ ] Retornar objeto `{success, error}`
- [ ] Implementar função `logout()` (async):
  - [ ] Limpar estados React
  - [ ] Chamar `authService.logout()`
- [ ] Implementar função `isAuthenticated()` (async):
  - [ ] Verificar `user` e token (async/await)
  - [ ] Retornar boolean
- [ ] Testar contexto básico

**Labels**: `context`, `state-management`, `firebase`, `observer`, `authentication`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 7h (3.5h Web + 3.5h Mobile)

---

### Card 6: Interface do Usuário e Navegação

**Título**: `[Core] Implementar interface de usuário e navegação para Web e Mobile`

**Descrição**:
Criar páginas/telas de login, rotas protegidas, navegação e componentes de UI, adaptados para Web (React Router) e Mobile (React Navigation).

**Dependências**:

- Card 2 (Configuração do Firebase)
- Card 5 (AuthContext e Gerenciamento de Estado)

**Bloqueia**:

- Card 7 (Testes de Autenticação e Fluxos Principais)

**Checklist**:

#### Web (React):

- [ ] Criar página de Login (`src/pages/Login.js`):
  - [ ] Implementar componente funcional
  - [ ] Adicionar botão "Entrar com Google"
  - [ ] Implementar `handleGoogleSignIn()`:
    - [ ] Garantir logout anterior (força seleção de conta)
    - [ ] Chamar `signInWithPopup()` do Firebase
    - [ ] Obter ID token após login
    - [ ] Chamar `login()` do AuthContext
  - [ ] Implementar estados de loading e error
  - [ ] Adicionar tratamento de erros
  - [ ] Adicionar estilização básica
- [ ] Criar componente ProtectedRoute (`src/components/ProtectedRoute.js`):
  - [ ] Verificar `isAuthenticated()`
  - [ ] Verificar estado `loading`
  - [ ] Verificar role ADMIN do usuário
  - [ ] Redirecionar para `/login` se não autenticado
  - [ ] Redirecionar para `/login?error=admin_required` se não for admin
  - [ ] Renderizar children se autenticado e admin
  - [ ] Mostrar loading durante verificação
- [ ] Configurar React Router (`App.js`):
  - [ ] Configurar `BrowserRouter`
  - [ ] Criar rota `/login`
  - [ ] Criar rota `/` protegida (Dashboard)
  - [ ] Configurar rota catch-all (`*`)
  - [ ] Envolver rotas com `AuthProvider`
- [ ] Criar componente de Loading (opcional):
  - [ ] Criar componente `LoadingSpinner`
  - [ ] Exibir durante `loading = true` no AuthContext
  - [ ] Adicionar estilização
- [ ] Testar navegação entre rotas

#### Mobile (React Native):

- [ ] Criar tela de Login (`src/screens/LoginScreen.js`):
  - [ ] Implementar componente funcional
  - [ ] Adicionar botão "Entrar com Google"
  - [ ] Implementar `handleGoogleSignIn()`:
    - [ ] Garantir logout anterior
    - [ ] Verificar Play Services (Android)
    - [ ] Fazer login com Google Sign-In
    - [ ] Obter ID token do Google
    - [ ] Criar credencial do Firebase
    - [ ] Fazer login no Firebase
    - [ ] Obter ID token do Firebase
    - [ ] Chamar `login()` do AuthContext
  - [ ] Implementar estados de loading e error
  - [ ] Adicionar estilização com StyleSheet
- [ ] Configurar React Navigation (`App.js` ou `AppNavigator.js`):
  - [ ] Configurar `NavigationContainer`
  - [ ] Criar `Stack.Navigator`
  - [ ] Configurar tela de Login
  - [ ] Configurar tela de Dashboard
  - [ ] Implementar navegação condicional baseada em autenticação
  - [ ] Configurar `headerShown: false`
  - [ ] Envolver com `PaperProvider` e `AuthProvider`
- [ ] Criar tela de Dashboard (`src/screens/DashboardScreen.js`):
  - [ ] Implementar componente básico
  - [ ] Exibir informações do usuário
  - [ ] Adicionar botão de logout
  - [ ] Adicionar estilização
- [ ] Adicionar indicador de Loading:
  - [ ] Adicionar `ActivityIndicator` durante `loading = true`
  - [ ] Centralizar na tela
  - [ ] Adicionar estilização
- [ ] Testar navegação entre telas

**Labels**: `ui`, `navigation`, `login`, `routing`, `web`, `mobile`
**Prioridade**: 🔴 Alta
**Estimativa**: 8h (3.5h Web + 4.5h Mobile)

---

## 🎯 Épico 3: Testes e Validação

### Card 7: Testes de Autenticação e Fluxos Principais

**Título**: `[Testes] Validar fluxos principais de autenticação em Web e Mobile`

**Descrição**:
Testar fluxos completos de login, logout, renovação automática de tokens e restauração de sessão em ambas as plataformas.

**Dependências**:

- Card 5 (AuthContext e Gerenciamento de Estado)
- Card 6 (Interface do Usuário e Navegação)

**Bloqueia**:

- Card 8 (Testes de Tratamento de Erros e Edge Cases)
- Card 9 (Melhorias e Otimizações)

**Checklist**:

#### Web (React):

- [ ] Testar fluxo completo de login:
  - [ ] Login com usuário válido (admin)
  - [ ] Login com usuário não-admin
  - [ ] Verificar redirecionamento após login
  - [ ] Verificar armazenamento de tokens no localStorage
  - [ ] Verificar estado do AuthContext
  - [ ] Testar em diferentes navegadores
- [ ] Testar renovação automática de tokens:
  - [ ] Fazer login
  - [ ] Aguardar renovação automática do Firebase (~55min ou forçar)
  - [ ] Verificar se tokens JWT foram renovados
  - [ ] Verificar se localStorage foi atualizado
  - [ ] Verificar se estado do usuário foi atualizado
- [ ] Testar restauração de sessão:
  - [ ] Fazer login
  - [ ] Fechar navegador completamente
  - [ ] Reabrir navegador
  - [ ] Verificar se usuário continua autenticado
  - [ ] Verificar se tokens foram renovados
  - [ ] Verificar se dashboard carrega corretamente
  - [ ] Testar com token expirado
- [ ] Testar logout:
  - [ ] Fazer login
  - [ ] Executar logout
  - [ ] Verificar se tokens foram removidos do localStorage
  - [ ] Verificar se Firebase fez logout
  - [ ] Verificar se estado foi limpo
  - [ ] Verificar redirecionamento para /login
  - [ ] Testar tentativa de acesso após logout

#### Mobile (React Native):

- [ ] Testar fluxo completo de login (Android):
  - [ ] Login com usuário válido (admin)
  - [ ] Login com usuário não-admin
  - [ ] Verificar navegação após login
  - [ ] Verificar armazenamento de tokens no AsyncStorage
  - [ ] Verificar estado do AuthContext
  - [ ] Testar em dispositivo físico
  - [ ] Testar em emulador
- [ ] Testar fluxo completo de login (iOS):
  - [ ] Login com usuário válido (admin)
  - [ ] Login com usuário não-admin
  - [ ] Verificar navegação após login
  - [ ] Verificar armazenamento de tokens no AsyncStorage
  - [ ] Verificar estado do AuthContext
  - [ ] Testar em dispositivo físico
  - [ ] Testar em simulador
- [ ] Testar renovação automática de tokens:
  - [ ] Fazer login
  - [ ] Aguardar renovação automática do Firebase
  - [ ] Verificar se tokens JWT foram renovados
  - [ ] Verificar se AsyncStorage foi atualizado
  - [ ] Verificar se estado do usuário foi atualizado
  - [ ] Testar em Android
  - [ ] Testar em iOS
- [ ] Testar restauração de sessão:
  - [ ] Fazer login
  - [ ] Fechar app completamente
  - [ ] Reabrir app
  - [ ] Verificar se usuário continua autenticado
  - [ ] Verificar se tokens foram renovados
  - [ ] Verificar se dashboard carrega corretamente
  - [ ] Testar com token expirado
  - [ ] Testar em Android
  - [ ] Testar em iOS
- [ ] Testar logout:
  - [ ] Fazer login
  - [ ] Executar logout
  - [ ] Verificar se tokens foram removidos do AsyncStorage
  - [ ] Verificar se Firebase fez logout
  - [ ] Verificar se estado foi limpo
  - [ ] Verificar navegação para Login
  - [ ] Testar tentativa de acesso após logout
  - [ ] Testar em Android
  - [ ] Testar em iOS
- [ ] Documentar problemas encontrados

**Labels**: `testing`, `qa`, `authentication`, `web`, `mobile`, `android`, `ios`
**Prioridade**: 🔴 Alta
**Estimativa**: 8h (3h Web + 5h Mobile)

---

### Card 8: Testes de Tratamento de Erros e Edge Cases

**Título**: `[Testes] Validar tratamento de erros e casos extremos`

**Descrição**:
Testar todas as estratégias de renovação quando token expira, tratamento de erros de rede, cenários offline e edge cases em ambas as plataformas.

**Dependências**:

- Card 3 (Serviço de API e Interceptors)
- Card 7 (Testes de Autenticação e Fluxos Principais)

**Bloqueia**:

- Card 9 (Melhorias e Otimizações)

**Checklist**:

#### Web (React):

- [ ] Testar tratamento de erro 401:
  - [ ] Testar renovação com refreshToken (estratégia 1)
  - [ ] Testar renovação com Firebase Auth (estratégia 2)
  - [ ] Testar cenário de todas estratégias falharem
  - [ ] Verificar redirecionamento para login quando necessário
  - [ ] Testar com navegador reaberto
  - [ ] Verificar logs de erro
- [ ] Testar erros de rede:
  - [ ] Simular falha de conexão
  - [ ] Verificar tratamento de timeout
  - [ ] Verificar mensagens de erro ao usuário
- [ ] Testar edge cases:
  - [ ] Token expirado no localStorage
  - [ ] RefreshToken inválido
  - [ ] Firebase Auth não disponível
  - [ ] Múltiplas requisições simultâneas com erro 401

#### Mobile (React Native):

- [ ] Testar tratamento de erro 401:
  - [ ] Testar renovação com refreshToken (estratégia 1)
  - [ ] Testar renovação com Firebase Auth (estratégia 2)
  - [ ] Testar cenário de todas estratégias falharem
  - [ ] Verificar navegação para login quando necessário
  - [ ] Testar com app reaberto
  - [ ] Testar em Android
  - [ ] Testar em iOS
- [ ] Testar erros de rede:
  - [ ] Simular falha de conexão
  - [ ] Verificar tratamento de timeout
  - [ ] Verificar mensagens de erro ao usuário
- [ ] Testar cenários offline:
  - [ ] Detectar estado de conexão
  - [ ] Mostrar mensagem quando offline
  - [ ] Implementar retry quando voltar online
  - [ ] Testar em Android
  - [ ] Testar em iOS
- [ ] Testar edge cases:
  - [ ] Token expirado no AsyncStorage
  - [ ] RefreshToken inválido
  - [ ] Firebase Auth não disponível
  - [ ] Múltiplas requisições simultâneas com erro 401
  - [ ] Play Services não disponível (Android)
- [ ] Documentar problemas encontrados

**Labels**: `testing`, `error-handling`, `qa`, `offline`, `web`, `mobile`
**Prioridade**: 🟡 Média
**Estimativa**: 6h (2.5h Web + 3.5h Mobile)

---

### Card 9: Melhorias e Otimizações

**Título**: `[Melhorias] Implementar melhorias, otimizações e monitoramento`

**Descrição**:
Implementar melhorias no tratamento de erros, otimizações de performance, logging e monitoramento para ambas as plataformas.

**Dependências**:

- Card 7 (Testes de Autenticação e Fluxos Principais)
- Card 8 (Testes de Tratamento de Erros e Edge Cases)

**Bloqueia**:

- Nenhum (card final)

**Checklist**:

#### Web (React):

- [ ] Melhorar tratamento de erros:
  - [ ] Adicionar mensagens de erro específicas e amigáveis
  - [ ] Melhorar tratamento de erros de rede
  - [ ] Adicionar retry automático para erros temporários
  - [ ] Melhorar UX durante erros
- [ ] Adicionar logging e monitoramento:
  - [ ] Adicionar logs de login/logout
  - [ ] Adicionar logs de renovação de tokens
  - [ ] Adicionar logs de erros 401
  - [ ] Configurar níveis de log (dev/prod)
  - [ ] Considerar integração com serviço de monitoramento

#### Mobile (React Native):

- [ ] Otimizar performance:
  - [ ] Analisar performance com React DevTools
  - [ ] Otimizar re-renders desnecessários
  - [ ] Implementar memoização onde necessário
  - [ ] Otimizar chamadas ao AsyncStorage
  - [ ] Reduzir bundle size se possível
  - [ ] Testar em dispositivos de baixa performance
- [ ] Melhorar tratamento de erros offline:
  - [ ] Detectar estado de conexão
  - [ ] Mostrar mensagem quando offline
  - [ ] Implementar retry quando voltar online
  - [ ] Cachear requisições quando possível
  - [ ] Testar cenários offline
- [ ] Adicionar logging e monitoramento:
  - [ ] Adicionar logs de login/logout
  - [ ] Adicionar logs de renovação de tokens
  - [ ] Adicionar logs de erros 401
  - [ ] Configurar níveis de log (dev/prod)
  - [ ] Considerar integração com serviço de monitoramento

**Labels**: `improvement`, `optimization`, `monitoring`, `logging`, `performance`, `ux`, `web`, `mobile`
**Prioridade**: 🟢 Baixa
**Estimativa**: 5h (2h Web + 3h Mobile)

---

## 📊 Resumo por Prioridade

### 🔴 Alta Prioridade

- **Card 1**: Configuração Inicial do Projeto
- **Card 2**: Configuração do Firebase (Web e Mobile)
- **Card 3**: Serviço de API e Interceptors
- **Card 4**: Serviço de Autenticação
- **Card 5**: AuthContext e Gerenciamento de Estado
- **Card 6**: Interface do Usuário e Navegação
- **Card 7**: Testes de Autenticação e Fluxos Principais

**Total**: 7 cards

### 🟡 Média Prioridade

- **Card 8**: Testes de Tratamento de Erros e Edge Cases

**Total**: 1 card

### 🟢 Baixa Prioridade

- **Card 9**: Melhorias e Otimizações

**Total**: 1 card

**Total Geral**: 9 cards

---

## 📝 Notas de Uso

### Como usar estes cards no GitHub Project

1. **Criar projeto no GitHub**:

   - Projeto "Autenticação Firebase - Web e Mobile"

2. **Criar colunas no projeto**:

   - 📋 Backlog
   - 🔄 Em Progresso
   - ✅ Concluído

3. **Adicionar labels**:

   - `setup`, `firebase`, `api`, `context`, `ui`, `testing`, `web`, `mobile`, `android`, `ios`, etc.

4. **Criar 3 Milestones para os épicos**:

   - `🎯 Épico 1: Configuração e Setup`
   - `🎯 Épico 2: Implementação Core`
   - `🎯 Épico 3: Testes e Validação`

5. **Copiar cards**:

   - Copiar título como título do card
   - Copiar descrição como descrição do card
   - Copiar checklist como checklist do GitHub
   - Adicionar labels sugeridas
   - Associar ao milestone correspondente
   - Definir prioridade baseada nos emojis

6. **Organizar por épicos**:
   - Agrupar cards relacionados no mesmo épico
   - Usar milestones para agrupar épicos
   - No GitHub Project, agrupar por "Milestone"

### Estimativas

- As estimativas são em horas e são aproximadas
- Ajuste conforme a experiência da equipe
- Considere tempo para code review e testes
- Estimativas incluem desenvolvimento, testes básicos e documentação

### Dependências

- **Todos os cards possuem dependências explícitas documentadas**
- Cada card inclui:
  - **Dependências**: Cards que devem ser concluídos antes
  - **Bloqueia**: Cards que ficam bloqueados até este ser concluído
- Organize o backlog considerando essas dependências
- Use a funcionalidade de "Blocked by" do GitHub se disponível
- **Card 1**: Não tem dependências, pode ser feito primeiro
- **Cards de teste (7-8)**: Dependem dos cards de implementação correspondentes
- **Card de melhoria (9)**: Depende dos cards de teste para identificar problemas

### Estrutura dos Cards

Cada card foi consolidado para incluir:

- **Seções separadas para Web e Mobile** quando aplicável
- **Todo o conteúdo original** das atividades
- **Checklists detalhados** para ambas as plataformas
- **Dependências claras** entre cards
- **Estimativas realistas** considerando ambas as plataformas

### Vantagens da Consolidação

- ✅ **Redução de 46 para 9 cards** (80% de redução)
- ✅ **Mantém 100% do conteúdo** de atividades
- ✅ **Elimina redundâncias** entre Web e Mobile
- ✅ **Simplifica gerenciamento** do backlog
- ✅ **Facilita visão geral** do projeto
- ✅ **Mantém sequência lógica** de execução
- ✅ **Preserva todas as funcionalidades** necessárias
