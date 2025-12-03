---
id: aula-firebase-auth
title: Aula Firebase Auth
sidebar_label: 🎓 Aula Completa
sidebar_position: 2
---

# 🎓 Aula: Arquitetura de Autenticação Dupla

> Tutorial completo de implementação do Firebase + Backend JWT

---

## 📚 Índice

1. [Fundamentos Teóricos](#fundamentos-teóricos)
2. [Implementação React Web](#implementação-react-web)
3. [Implementação React Native](#implementação-react-native)
4. [Interceptors do Axios](#interceptors-do-axios)
5. [AuthContext](#authcontext)
6. [Checklist de Implementação](#checklist-de-implementação)

---

## Fundamentos Teóricos

### O que é Autenticação vs Autorização?

| Conceito | Pergunta | Exemplo |
|----------|----------|---------|
| **Autenticação** | "Quem é você?" | Verificar identidade |
| **Autorização** | "O que você pode fazer?" | Verificar permissões |

### ID Token vs JWT Próprio

| Token | Emitido por | Validade | Uso |
|-------|-------------|----------|-----|
| **ID Token** | Firebase | ~1 hora | Provar identidade |
| **Access Token** | Nosso backend | 15min-1h | Acessar APIs |
| **Refresh Token** | Nosso backend | 7-30 dias | Renovar access token |

### Padrão Observer do Firebase

```javascript
// Registra um observer que dispara quando token muda
onIdTokenChanged(auth, async (user) => {
  if (user) {
    const idToken = await user.getIdToken();
    // Token renovado automaticamente!
  }
});
```

---

## Implementação React Web

### 1. Configuração do Firebase

```javascript
// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Força seleção de conta
});
```

### 2. Serviço de API com Interceptors

```javascript
// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR - Adiciona token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR - Trata erros 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Tenta renovar token...
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. AuthContext

```javascript
// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        // Renova tokens JWT...
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 4. Página de Login

```javascript
// src/pages/Login.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      // Envia para backend...
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Entrar com Google
    </button>
  );
}
```

---

## Implementação React Native

### Diferenças Importantes

| Aspecto | Web | Mobile |
|---------|-----|--------|
| **Google Sign-In** | `signInWithPopup` | `@react-native-google-signin` |
| **Storage** | `localStorage` | `AsyncStorage` |
| **Auth Persistence** | Automática | `getReactNativePersistence` |

### Configuração do Firebase (Mobile)

```javascript
// src/config/firebase.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = { /* ... */ };
const app = initializeApp(firebaseConfig);

// Persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Configura Google Sign-In
export const configureGoogleSignIn = (webClientId) => {
  GoogleSignin.configure({
    webClientId,
    offlineAccess: true,
  });
};

// Função de login
export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  const idToken = response?.data?.idToken || (await GoogleSignin.getTokens()).idToken;
  
  const credential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, credential);
};

export { auth };
```

---

## Interceptors do Axios

### Estratégia de Renovação em Cascata

```javascript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      // ESTRATÉGIA 1: Refresh Token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post("/auth/refresh", { refreshToken });
          // Salva novos tokens e repete requisição
        } catch (e) { /* Estratégia 2 */ }
      }

      // ESTRATÉGIA 2: Firebase Auth
      try {
        const idToken = await auth.currentUser?.getIdToken(true);
        // Faz login novamente e repete requisição
      } catch (e) { /* Estratégia 3 */ }

      // ESTRATÉGIA 3: Logout
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

## AuthContext

### Restauração de Sessão

O AuthContext precisa:

1. **Restaurar estado do localStorage/AsyncStorage** (imediato)
2. **Aguardar Firebase restaurar sessão** (pode demorar)
3. **Renovar tokens JWT quando ID Token muda** (automático)

```javascript
useEffect(() => {
  // 1. Restaura imediatamente do storage
  const storedUser = localStorage.getItem("user");
  if (storedUser) setUser(JSON.parse(storedUser));

  // 2. Observer do Firebase
  const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // 3. Renova tokens JWT
      const idToken = await firebaseUser.getIdToken();
      await authService.login(idToken);
      setUser(authService.getUser());
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
```

---

## Checklist de Implementação

### ✅ Configuração

- [ ] Criar projeto no Firebase Console
- [ ] Habilitar Google como provedor
- [ ] Configurar variáveis de ambiente
- [ ] Instalar dependências

### ✅ Web

- [ ] Configurar Firebase Client SDK
- [ ] Criar serviço de API com interceptors
- [ ] Criar AuthContext
- [ ] Criar página de Login
- [ ] Criar ProtectedRoute

### ✅ Mobile

- [ ] Configurar `google-services.json`
- [ ] Configurar SHA1 no Firebase
- [ ] Adaptar para AsyncStorage
- [ ] Testar no Android/iOS

### ✅ Testes

- [ ] Testar login/logout
- [ ] Testar renovação de token
- [ ] Testar restauração de sessão
- [ ] Testar tratamento de erro 401

---

## 📚 Próximos Passos

- [Configuração Completa do Firebase](/docs/autenticacao/configuracao-completa)
- [Configurar SHA1 no Android](/docs/autenticacao/sha1-android)
- [Backlog de Implementação](/docs/backlog/github-project)
