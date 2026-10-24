---
id: aula-firebase-auth
title: Aula Firebase Auth
sidebar_label: Codificação login Google
sidebar_position: 2
---

# Autenticação Google

---

## Implementação React Native

### 1. Instalação de Dependências

> Após instalar as dependências, execute o comando: `npx expo-doctor` para verificar se todas as dependências estão instaladas corretamente.

```bash
# Storage assíncrono
npm install @react-native-async-storage/async-storage

# Navegação (opcional, para quando integrar navegação)
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# HTTP Client (opcional, para quando integrar com backend)
npm install axios

# Dependências do Firebase
npm install firebase

# Google Sign In
npm install @react-native-google-signin/google-signin

# babel
npm install babel-preset-expo

# Paper UI
npm install react-native-paper
npm install react-native-safe-area-context

```

### 2. Configuração do Firebase

> **Nota**: Para configuração detalhada do Firebase no React Native, consulte o [Codelab: Autenticação Firebase - email e senha](https://angoti.github.io/expo-firebase-login/#1)
>
> **Atenção**: Habilitar o provedor de login do Google no Firebase Console, embora este codelab habilite o provedor de login e-mail e senha.

#### 3.1 google-services.json

Após criar o projeto no Firebase Console, faça o download do arquivo `google-services.json` e coloque na raiz do projeto react-mobile.
<!-- como refere ciar a imagem em /static/img -->
![Arquivo google-services.json na raiz do projeto](/img/google-services.json.png)

### 3. Configurar Babel e app.json

Crie ou atualize `/app.json`:

```json
{
  "expo": {
    "plugins": ["@react-native-google-signin/google-signin"],
    "name": "seu-app",
    "slug": "seu-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "-------------- INSIRA O PACKAGE AQUI -----------------------",
      "edgeToEdgeEnabled": true
    },
    "ios": {
      "supportsTablet": true
    }
  }
}
```

> **Nota**: No arquivo acima, o <span style={{color: "red", fontWeight: "bold"}}>package</span> deve corresponder ao package name configurado no Firebase Console (Configurações do projeto → Seus aplicativos → Android).

#### O que é o Babel e por que precisamos do `babel.config.js`?

O **Babel** é um transpilador JavaScript que converte código JavaScript moderno (ES6+, JSX, TypeScript) em código compatível com versões mais antigas do JavaScript, permitindo que você use recursos modernos mesmo em ambientes que não os suportam nativamente.

No contexto do React Native com Expo, o Babel é essencial para:

1. **Transpilar JSX**: Converte sintaxe JSX (`<Component />`) em chamadas `React.createElement()`
2. **Converter ES6+ para ES5**: Permite usar arrow functions, async/await, destructuring, etc.
3. **Processar módulos**: Converte imports/exports modernos para CommonJS quando necessário
4. **Otimizar código**: Remove código não utilizado, minifica, etc.

O arquivo `babel.config.js` configura quais transformações o Babel deve aplicar ao seu código.

#### Explicação do código

```javascript
module.exports = function babelConfig(api) {
  // api.cache(true) habilita cache do Babel para melhorar performance
  // O cache armazena resultados de transformações anteriores
  api.cache(true);

  return {
    // presets são conjuntos pré-configurados de plugins do Babel
    // "babel-preset-expo" inclui todas as transformações necessárias para Expo
    presets: ["babel-preset-expo"],
  };
};
```

**Componentes explicados**:

- **`api.cache(true)`**: Habilita cache do Babel. Isso melhora significativamente a performance durante o desenvolvimento, pois o Babel não precisa recompilar arquivos que não mudaram. O cache é invalidado automaticamente quando arquivos são modificados.

- **`presets: ["babel-preset-expo"]`**: Define o preset do Expo, que inclui:
  - Suporte a JSX e React
  - Transformações para React Native
  - Suporte a TypeScript (se usado)
  - Otimizações específicas do Expo
  - Suporte a decorators e outras features modernas

**Quando você precisa modificar este arquivo**:

- Se você adicionar bibliotecas que requerem plugins específicos do Babel
- Se você quiser adicionar suporte a decorators (`@decorator`)
- Se você quiser configurar transformações customizadas
- Se você usar TypeScript e precisar de configurações específicas

**Nota importante**: Para a maioria dos projetos Expo, esta configuração padrão é suficiente. Não modifique a menos que tenha uma necessidade específica.

Crie ou atualize `/babel.config.js`:

```javascript
module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
```

### 4. Criar arquivo `.env`

Crie `/.env`:

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=ID do cliente da Web (do Firebase Console)
EXPO_PUBLIC_FIREBASE_API_KEY=sua-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

> **Nota**: Variáveis de ambiente no Expo devem começar com `EXPO_PUBLIC_` para serem acessíveis no código JavaScript.

Você encontra os valores das variáveis de ambiente no arquivo `google-services.json`.

![Apps da Web no Firebase Console](/img/firebase_config.png)

### 5. Criar arquivo de configuração do Firebase

Crie `/src/config/firebase.js`:

<details>
<summary>📄 Ver código completo: firebase.js</summary>

```javascript
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth com persistência usando AsyncStorage
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
/**
 * Configura o Google Sign-In com o webClientId fornecido
 * @param {string} webClientId - Web Client ID do Google OAuth
 */
const configureGoogleSignIn = webClientId => {
  if (webClientId) {
    GoogleSignin.configure({
      webClientId: webClientId,
      offlineAccess: true,
    });
  }
};

/**
 * Autentica o usuário no Firebase usando o idToken do Google Sign-In
 * @param {string} idToken - Token de ID obtido do Google Sign-In
 * @returns {Promise<void>}
 * @throws {Error} Se a autenticação falhar
 */
const signInWithGoogleToken = async idToken => {
  if (!idToken || typeof idToken !== "string") {
    throw new Error("idToken inválido ou não fornecido");
  }

  const googleCredential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, googleCredential);
};

/**
 * Verifica se o erro tem uma propriedade code (erros do Google Sign-In)
 * @param {Error} error - Erro a ser verificado
 * @returns {boolean} True se o erro tem propriedade code
 */
const isErrorWithCode = error => {
  return error && typeof error === "object" && "code" in error;
};

/**
 * Realiza login completo com Google Sign-In e autentica no Firebase
 * O usuário autenticado será disponibilizado através do listener onIdTokenChanged
 * @returns {Promise<void>}
 * @throws {Error} Se o login falhar
 */
const signInWithGoogle = async () => {
  try {
    // 1. Verificar Play Services (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // 2. Fazer login com Google Sign-In
    const response = await GoogleSignin.signIn();

    // 3. Obter o idToken do Google
    let idToken = response?.data?.idToken;

    // Se o idToken não vier na resposta inicial, tentar obter usando getTokens()
    if (!idToken) {
      const tokens = await GoogleSignin.getTokens();
      idToken = tokens.idToken;
    }

    // Validar se o idToken foi obtido
    if (!idToken) {
      throw new Error(
        "idToken não encontrado. Verifique se o webClientId está configurado corretamente."
      );
    }

    // 4. Autenticar no Firebase usando o idToken
    // O listener onIdTokenChanged será acionado automaticamente com o firebaseUser
    await signInWithGoogleToken(idToken);
  } catch (error) {
    // Tratar erros específicos do Google Sign-In
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          throw new Error("Login cancelado pelo usuário");
        case statusCodes.IN_PROGRESS:
          throw new Error("Login já em progresso");
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new Error("Play Services não disponível ou desatualizado");
        default:
          throw new Error("Erro no Google Sign-In: " + error.message);
      }
    }
    // Re-lançar outros erros
    throw error;
  }
};

/**
 * Faz logout do usuário do Firebase e do Google Sign-In
 * @returns {Promise<void>}
 * @throws {Error} Se o logout falhar
 */
const signOutUser = async () => {
  await firebaseSignOut(auth);
  await GoogleSignin.signOut();
};

// Exportar funções e objetos necessários
export { auth, configureGoogleSignIn, signInWithGoogle, signOutUser };
export { onIdTokenChanged } from "firebase/auth";
export { GoogleAuthProvider } from "firebase/auth";
```

</details>

#### 6.1Exemplo de uso no App.js

Atualize `/App.js`:

<details>
<summary>📄 Ver código completo: App.js</summary>

```javascript
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { Button, PaperProvider, Snackbar } from "react-native-paper";
import {
  auth,
  configureGoogleSignIn,
  signInWithGoogle,
  signOutUser,
  onIdTokenChanged,
} from "./src/config/firebase";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    // Configurar Google Sign-In usando variável de ambiente do Expo
    configureGoogleSignIn(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID);

    // Monitorar mudanças no token de autenticação do Firebase
    const unsubscribe = onIdTokenChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      const errorMessage = error?.message || "Erro ao fazer login. Tente novamente.";
      setError(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      const errorMessage = error?.message || "Erro ao fazer logout. Tente novamente.";
      setError(errorMessage);
      setSnackbarVisible(true);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#4285f4" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Firebase Auth</Text>
            {user ? (
              <View style={styles.userContainer}>
                <Text style={styles.welcomeText}>Bem-vindo!</Text>
                <Text style={styles.emailText}>{user.email}</Text>
                <Text style={styles.nameText}>
                  {user.displayName || user.email?.split("@")[0] || "Usuário"}
                </Text>
                {user.photoURL && (
                  <Image
                    source={{ uri: user.photoURL }}
                    style={styles.userPhoto}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    buttonColor="#d32f2f"
                    onPress={handleSignOut}
                    style={styles.logoutButton}>
                    Sair
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Faça login com sua conta Google</Text>
                {signingIn ? (
                  <View style={styles.signingInContainer}>
                    <ActivityIndicator size="large" color="#4285f4" />
                    <Text style={styles.signingInText}>Abrindo navegador...</Text>
                  </View>
                ) : (
                  <Button
                    mode="contained"
                    buttonColor="#1976d2"
                    onPress={signIn}
                    style={styles.loginButton}>
                    Entrar com Google
                  </Button>
                )}
              </View>
            )}
          </>
        )}
        <StatusBar style="auto" />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_LONG}
          action={{
            label: "Fechar",
            onPress: () => setSnackbarVisible(false),
          }}>
          {error || "Erro ao fazer login"}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  userContainer: {
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  nameText: {
    fontSize: 18,
    color: "#4285f4",
    marginBottom: 30,
    fontWeight: "600",
  },
  loginContainer: {
    alignItems: "center",
    width: "100%",
  },
  loginText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  signingInContainer: {
    alignItems: "center",
  },
  signingInText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    minWidth: 120,
  },
  loginButton: {
    minWidth: 200,
  },
});
```

</details>

#### 6.2 Adicionar `.env` ao `.gitignore`

Certifique-se de que `/.gitignore` inclui:

```text
.env
.env.local
.env.*.local
```

### 6. Criar Development Build

```bash
npx expo prebuild
```

Um **Development Build** é uma versão do seu aplicativo React Native compilada especificamente para testes e desenvolvimento, incluindo todas as dependências nativas (como Firebase, notificações, módulos específicos do dispositivo, etc.).

Com o Expo Go, você só pode usar módulos que já vêm pré-compilados no app do Expo. Já com o Development Build, seu app é compilado com todas as configurações, permissões e bibliotecas nativas que você adicionou, permitindo testar funcionalidades nativas que não estão disponíveis no Expo Go.

### 7. Configurar SHA1 no Android

> Siga as instruções do [Configurar SHA1 no Android](/docs/autenticacao/sha1-android)

### 8.Executar o projeto Android

```bash
npx expo run:android
```

O comando `npx expo run:android` é usado para criar e executar um **Development Build** do seu aplicativo React Native no Android. Este é um processo diferente do Expo Go tradicional e é necessário quando você usa bibliotecas nativas (como `@react-native-firebase/auth`).

**Development Build vs Expo Go:**

| Característica             | Expo Go                       | Development Build                     |
| -------------------------- | ----------------------------- | ------------------------------------- |
| **Bibliotecas nativas**    | ❌ Limitado (apenas Expo SDK) | ✅ Suporta qualquer biblioteca nativa |
| **Firebase Auth**          | ❌ Não funciona               | ✅ Funciona perfeitamente             |
| **Build necessário**       | ❌ Não precisa                | ✅ Precisa compilar o app nativo      |
| **Tempo de setup**         | ⚡ Instantâneo                | ⏱️ Primeira vez: ~5-10 min            |
| **Atualizações de código** | ⚡ Hot reload instantâneo     | ⚡ Hot reload (após build inicial)    |

**O que acontece quando você executa `npx expo run:android`:**

1. **Compila o código nativo**: Cria um APK/AAB com todas as dependências nativas (Firebase, etc.)
2. **Instala no dispositivo/emulador**: Instala o app compilado automaticamente
3. **Inicia o Metro Bundler**: Inicia o servidor de desenvolvimento para hot reload
4. **Abre o app**: Abre o aplicativo no dispositivo/emulador conectado

**Requisitos:**

- Android SDK instalado
- Emulador Android configurado OU dispositivo físico conectado via USB com depuração USB ativada
- Variáveis de ambiente do Android configuradas (ANDROID_HOME)

**Nota importante**: Na primeira execução, o comando pode demorar vários minutos enquanto compila o código nativo. Execuções subsequentes são mais rápidas devido ao cache do Gradle.

---

## Checklist de Implementação

### ✅ Configuração

- [ ] Criar projeto no Firebase Console
- [ ] Habilitar Google como provedor
- [ ] Configurar variáveis de ambiente
- [ ] Instalar dependências

### ✅ Mobile

- [ ] Configurar `google-services.json`
- [ ] Configurar SHA1 no Firebase
- [ ] Testar no Android

### ✅ Testes

- [ ] Testar login/logout
- [ ] Testar restauração de sessão

---

## 📚 Próximos Passos

- [Configuração Completa do Firebase](/docs/autenticacao/configuracao-completa)
- [Configurar SHA1 no Android](/docs/autenticacao/sha1-android)
- [Backlog de Implementação](/docs/backlog/github-project)
