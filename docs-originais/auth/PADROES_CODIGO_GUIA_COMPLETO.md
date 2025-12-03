# 📐 Guia Completo: Padrões de Código e Padrões de Projeto

Este guia completo documenta os padrões de código React Native e os padrões de projeto utilizados no projeto, incluindo o padrão Observer e convenções de desenvolvimento.

## 📑 Sumário

- [Visão Geral](#visão-geral)
- [Padrões de Código React Native](#padrões-de-código-react-native)
  - [Componentes](#componentes)
  - [Hooks](#hooks)
  - [Nomenclatura](#nomenclatura)
  - [Imports](#imports)
  - [Estilos](#estilos)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Comentários](#comentários)
- [Performance](#performance)
- [Acessibilidade](#acessibilidade)
- [Segurança](#segurança)
- [Padrões de Projeto](#padrões-de-projeto)
  - [Padrão Observer](#padrão-observer)
  - [Implementação no Projeto](#implementação-no-projeto)
  - [Exemplos de Uso](#exemplos-de-uso)
  - [Vantagens e Desvantagens](#vantagens-e-desvantagens)
  - [Alternativas](#alternativas)
  - [Boas Práticas](#boas-práticas)
- [Referências](#referências)

---

## Visão Geral

Este guia estabelece os padrões e convenções de código para o projeto React Native, garantindo consistência, manutenibilidade e qualidade do código.

### Objetivos

- ✅ Consistência no código entre desenvolvedores
- ✅ Facilidade de manutenção
- ✅ Melhor legibilidade
- ✅ Redução de bugs
- ✅ Facilita code review

---

## Padrões de Código React Native

### Componentes

- Use componentes funcionais com hooks
- Evite componentes de classe
- Use `export default` para componentes de tela
- Use `export` nomeado para componentes reutilizáveis

```javascript
// ✅ Bom
export default function HomeScreen() {
	const [data, setData] = useState([]);
	// ...
}

// ❌ Evitar
class HomeScreen extends Component {
	// ...
}
```

### Hooks

- Use hooks no topo do componente
- Não use hooks condicionalmente
- Use `useEffect` com dependências corretas

```javascript
// ✅ Bom
useEffect(() => {
	loadData();
}, [mentorshipId]);

// ❌ Evitar
if (condition) {
	useEffect(() => {
		// ...
	});
}
```

### Nomenclatura

- **Componentes**: PascalCase (`HomeScreen.js`)
- **Funções/constantes**: camelCase (`loadData`, `apiBaseUrl`)
- **Constantes globais**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Arquivos**: camelCase para utilitários, PascalCase para componentes

### Imports

Ordem dos imports:

1. React e React Native
2. Bibliotecas de terceiros
3. Componentes locais
4. Serviços e utilitários
5. Tipos (se TypeScript)

```javascript
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import LoadingSpinner from "../components/LoadingSpinner";
import { authService } from "../services/api";
import { validateEmail } from "../utils/validators";
```

### Estilos

- Use `StyleSheet.create()` para estilos
- Mantenha estilos próximos ao componente
- Use tema do React Native Paper quando possível

```javascript
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
```

## Estrutura de Arquivos

### Organização

```
src/
├── components/     # Componentes reutilizáveis
├── screens/        # Telas do app
├── services/       # Serviços (API, etc)
├── utils/          # Utilitários
└── config/         # Configurações
```

### Nomes de Arquivos

- **Componentes**: PascalCase (`HomeScreen.js`)
- **Utilitários**: camelCase (`errorHandler.js`)
- **Serviços**: camelCase (`api.js`)
- **Config**: camelCase (`env.js`)

---

## Comentários

- Use comentários para explicar "por quê", não "o quê"
- Evite comentários óbvios
- Documente funções complexas

```javascript
// ✅ Bom
// Refresh token se expirou (401)
if (shouldRefreshToken(error)) {
	await refreshTokenIfNeeded();
}

// ❌ Evitar
// Incrementa o contador
counter++;
```

---

## Performance

- Use `React.memo()` para componentes pesados
- Evite re-renders desnecessários
- Use `useCallback` e `useMemo` quando apropriado

---

## Acessibilidade

- Use `accessibilityLabel` quando necessário
- Mantenha contraste adequado
- Teste com leitores de tela

---

## Segurança

- Nunca commite tokens ou senhas
- Use variáveis de ambiente
- Valide dados do usuário
- Sanitize inputs

---

## Padrões de Projeto

### Padrão Observer

#### O que é o Padrão Observer

O **Padrão Observer** é um padrão de projeto comportamental que define uma dependência um-para-muitos entre objetos. Quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente.

#### Componentes do Padrão

- **Subject (Sujeito)**: Objeto que mantém uma lista de observadores e notifica eles sobre mudanças
- **Observer (Observador)**: Interface para objetos que devem ser notificados sobre mudanças
- **ConcreteObserver**: Implementação concreta do Observer que reage às notificações

### Implementação no Projeto

No projeto, o padrão Observer é implementado usando o `DeviceEventEmitter` do React Native para gerenciar mudanças no estado de autenticação.

#### Estrutura do Padrão

```text
┌─────────────────────────────────────────┐
│         PADRÃO OBSERVER                 │
├─────────────────────────────────────────┤
│                                         │
│  Subject                                │
│  ┌─────────────────────┐                │
│  │ DeviceEventEmitter  │                │
│  │ - emit()            │                │
│  │ - LoginScreen       │                │
│  └─────────────────────┘                │
│            │                            │
│            │ notifica                   │
│  Observers ▼                            │
│  ┌─────────────────────┐                │
│  │ DeviceEventEmitter  │                │
│  │ - addListener()     |                |
│  │ - MainStack         │                │
│  └─────────────────────┘                │
│                                         │
└─────────────────────────────────────────┘
```

#### Mapeamento no Código

| Componente do Padrão   | Implementação no Código             | Arquivo           |
| ---------------------- | ----------------------------------- | ----------------- |
| **Subject**            | `DeviceEventEmitter`                | React Native      |
| **Event/State Change** | `"auth:changed"`                    | String do evento  |
| **Observer**           | `MainStack`, `RegisterScreen`, etc. | Componentes React |
| **Subscribe**          | `DeviceEventEmitter.addListener()`  | MainStack.js:42   |
| **Notify**             | `DeviceEventEmitter.emit()`         | LoginScreen.js:25 |
| **Unsubscribe**        | `authEventSub.remove()`             | MainStack.js:49   |

#### Fluxo Completo

1. **Login Bem-Sucedido**

```javascript
// LoginScreen.js:24
await authService.login({ email, password: senha });
// Token é salvo no AsyncStorage dentro do authService
```

2. **Emissão do Evento**

```javascript
// LoginScreen.js:25
DeviceEventEmitter.emit("auth:changed");
// Notifica todos os ouvintes que a autenticação mudou
```

3. **Observer Escuta o Evento**

```javascript
// MainStack.js:42-44
const authEventSub = DeviceEventEmitter.addListener("auth:changed", () => {
  syncUserFromStorage(); // Lê o token do AsyncStorage
});
```

4. **Atualização do Estado**

```javascript
// MainStack.js:25
setUser(token ? { token } : null);
// Atualiza o estado do usuário
```

5. **Re-renderização Automática**

```javascript
// MainStack.js:80-87
{
  user ? (
    <Stack.Screen name="MainTab" component={MainTab} />
  ) : (
    <Stack.Screen name="Login" component={LoginScreen} />
  );
}
// React re-renderiza e mostra a tela correta
```

### Exemplos de Uso

#### Exemplo 1: Login (Subject emite evento)

**Arquivo:** `mobile/app/src/screens/LoginScreen.js`

```javascript
async function handleLogin() {
  if (!email || !senha) return Alert.alert("Atenção", "Preencha e-mail e senha.");
  try {
    setLoading(true);
    await authService.login({ email, password: senha });
    DeviceEventEmitter.emit("auth:changed"); // ← Subject emite evento
  } catch (e) {
    console.error("Login error:", e);
    const errorMessage =
      e.response?.data?.error || e.message || "Erro ao entrar. Verifique suas credenciais.";
    Alert.alert("Erro ao entrar", errorMessage);
  } finally {
    setLoading(false);
  }
}
```

#### Exemplo 2: Registro (Subject emite evento)

**Arquivo:** `mobile/app/src/screens/RegisterScreen.js`

```javascript
async function handleRegister() {
  // ... validações ...
  try {
    setLoading(true);
    await authService.register({
      name: nome,
      email,
      password: senha,
      role: role.replace("ROLE_", ""),
    });
    DeviceEventEmitter.emit("auth:changed"); // ← Subject emite evento
    Alert.alert("Sucesso", "Usuário cadastrado!");
  } catch (e) {
    // ... tratamento de erro ...
  }
}
```

#### Exemplo 3: Logout (Subject emite evento)

**Arquivo:** `mobile/app/src/navigators/MainTab.js`

```javascript
async function handleLogout() {
  try {
    await AsyncStorage.removeItem("token");
    DeviceEventEmitter.emit("auth:changed"); // ← Subject emite evento
  } catch (e) {
    Alert.alert("Erro", "Não foi possível sair.");
  }
}
```

#### Exemplo 4: Observer escuta eventos

**Arquivo:** `mobile/app/src/navigators/MainStack.js`

```javascript
useEffect(() => {
  let isMounted = true;

  async function syncUserFromStorage() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!isMounted) return;
      setUser(token ? { token } : null);
    } finally {
      if (isMounted) setInitializing(false);
    }
  }

  // Initial load
  syncUserFromStorage();

  // Listen when app returns to foreground
  const appStateSub = AppState.addEventListener("change", state => {
    if (state === "active") {
      syncUserFromStorage();
    }
  });

  // Listen to explicit auth change events (e.g., login/logout)
  const authEventSub = DeviceEventEmitter.addListener("auth:changed", () => {
    syncUserFromStorage(); // ← Observer reage ao evento
  });

  return () => {
    isMounted = false;
    appStateSub?.remove?.();
    authEventSub?.remove?.(); // ← Cleanup: remove observer
  };
}, []);
```

### Vantagens e Desvantagens

#### ✅ Vantagens

1. **Desacoplamento**
   - O `LoginScreen` não precisa conhecer o `MainStack`
   - Componentes podem ser modificados independentemente
   - Facilita manutenção e testes

2. **Reatividade**
   - A UI atualiza automaticamente quando o estado muda
   - Não é necessário polling ou verificação manual
   - Resposta imediata às mudanças

3. **Escalabilidade**
   - Fácil adicionar novos listeners
   - Múltiplos componentes podem escutar o mesmo evento
   - Não há limite de observadores

4. **Padrão Conhecido**
   - Observer é amplamente usado e compreendido
   - Documentação e exemplos abundantes
   - Fácil para novos desenvolvedores entenderem

5. **Simplicidade**
   - API nativa do React Native
   - Não requer bibliotecas externas
   - Implementação direta e clara

#### ⚠️ Desvantagens

1. **Debugging**
   - Pode ser difícil rastrear a origem de eventos
   - Múltiplos listeners podem causar efeitos colaterais inesperados

2. **Memory Leaks**
   - Se não remover listeners, podem causar vazamentos de memória
   - Importante fazer cleanup no `useEffect`

3. **Ordem de Execução**
   - Não há garantia da ordem em que os listeners são executados
   - Pode causar problemas se a ordem importar

4. **Type Safety**
   - Eventos são strings, sem verificação de tipo
   - Erros de digitação podem passar despercebidos

### Alternativas

#### 1. React Context API

```javascript
// Mais integrado ao React, mas mais verboso
const AuthContext = createContext();
```

#### 2. Redux / Zustand

```javascript
// Gerenciamento de estado global mais robusto
// Mas adiciona complexidade e dependências
```

#### 3. Custom Hook

```javascript
// useAuth() que gerencia estado internamente
// Mas ainda precisa de algum mecanismo de notificação
```

#### 4. Callbacks Props

```javascript
// Passar callbacks entre componentes
// Mas cria acoplamento forte
```

### Boas Práticas

#### ✅ Fazer

1. **Sempre fazer cleanup dos listeners**

   ```javascript
   useEffect(() => {
     const sub = DeviceEventEmitter.addListener("auth:changed", handler);
     return () => sub.remove(); // ← Importante!
   }, []);
   ```

2. **Usar nomes de eventos descritivos**

   ```javascript
   DeviceEventEmitter.emit("auth:changed"); // ✅ Bom
   DeviceEventEmitter.emit("event1"); // ❌ Ruim
   ```

3. **Documentar eventos usados**
   - Criar uma lista de eventos disponíveis
   - Documentar quando cada evento é emitido

4. **Centralizar lógica de autenticação**
   - Usar `authService` para operações de auth
   - Emitir eventos apenas após operações bem-sucedidas

#### ❌ Evitar

1. **Não remover listeners**

   ```javascript
   // ❌ Memory leak!
   DeviceEventEmitter.addListener("auth:changed", handler);
   // Sem cleanup
   ```

2. **Emitir eventos desnecessários**

   ```javascript
   // ❌ Emite mesmo quando não há mudança
   DeviceEventEmitter.emit("auth:changed");
   ```

3. **Múltiplos eventos para a mesma coisa**

   ```javascript
   // ❌ Confuso
   DeviceEventEmitter.emit("login");
   DeviceEventEmitter.emit("auth");
   DeviceEventEmitter.emit("user-logged-in");
   ```

### Comparação com Outras Implementações

| Implementação               | Padrão Observer?  | Complexidade | Quando Usar             |
| --------------------------- | ----------------- | ------------ | ----------------------- |
| `DeviceEventEmitter`        | ✅ Sim            | Baixa        | Eventos globais simples |
| `EventEmitter` (Node.js)    | ✅ Sim            | Baixa        | Aplicações Node.js      |
| `addEventListener` (DOM)    | ✅ Sim            | Baixa        | Eventos do navegador    |
| React Context + `useEffect` | ✅ Sim (variação) | Média        | Estado compartilhado    |
| Redux (dispatch/subscribe)  | ✅ Sim            | Alta         | Aplicações complexas    |
| RxJS Observables            | ✅ Sim (avançado) | Alta         | Programação reativa     |

---

## Referências

- [React Native - DeviceEventEmitter](https://reactnative.dev/docs/deviceeventemitter)
- [Padrão Observer - Refactoring Guru](https://refactoring.guru/design-patterns/observer)
- [Design Patterns - Observer Pattern](https://www.dofactory.com/javascript/design-patterns/observer)
- [React Native Style Guide](https://github.com/airbnb/javascript/tree/master/react-native)

---

**Última atualização:** 30/11/2025
