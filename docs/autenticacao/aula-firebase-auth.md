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

### Padrão Observer

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

### 1.Instalação de Dependências

```bash
# No diretório do projeto React
npm install firebase axios
# ou
yarn add firebase axios
```

### 2. Configuração do Firebase

#### Obter Credenciais do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um projeto ou selecione existente
3. Vá em **Authentication** → **Sign-in method**
4. Habilite **Google** como provedor
5. Vá em **Project Settings** → **General**
6. Copie as credenciais do app web

#### Criar Arquivo `.env`

Crie `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

#### Criar Arquivo de Configuração

Crie `src/config/firebase.js`:

<details>
<summary>📄 Ver código completo: firebase.js</summary>

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

</details>

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

### 5. Criar Rota Protegida

Crie `src/components/ProtectedRoute.js`:

<details>
<summary>📄 Ver código completo: ProtectedRoute.js</summary>

```javascript
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

 if (loading) {
   return <div>Carregando...</div>;
 }

 if (!isAuthenticated()) {
   return <Navigate to="/login" replace />;
 }

 // Verifica se é admin
 const roles = Array.isArray(user?.role) ? user.role : [user?.role];
 const isAdmin = roles.includes("ADMIN");

 if (!isAdmin) {
   return <Navigate to="/login?error=admin_required" replace />;
 }

 return children;
}
```

</details>

### 6. Configurar App.js

Atualize `src/App.js`:

<details>
<summary>📄 Ver código completo: App.js</summary>

```javascript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
 return (
   <BrowserRouter>
    <Routes>
     <Route path="/login" element={<Login />} />
     <Route
      path="/"
      element={
       <ProtectedRoute>
        <Dashboard />
       </ProtectedRoute>
      }
     />
     <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
   </BrowserRouter>
 );
}

export default App;
```

</details>

### 7. Testar Implementação

1. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

2. **Teste o fluxo**:

   - Acesse `/login`
   - Clique em "Entrar com Google"
   - Selecione uma conta
   - Deve redirecionar para dashboard

3. **Teste renovação de tokens**:

   - Faça login
   - Aguarde alguns minutos
   - Tokens devem ser renovados automaticamente

4. **Teste restauração de sessão**:
   - Faça login
   - Feche o navegador
   - Reabra o navegador
   - Deve continuar autenticado

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
