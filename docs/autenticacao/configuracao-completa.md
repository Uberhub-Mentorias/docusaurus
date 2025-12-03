---
id: configuracao-completa
title: Configuração Completa do Firebase
sidebar_label: ⚙️ Configuração Completa
sidebar_position: 3
---

# ⚙️ Configuração Completa do Firebase

> Passo a passo para configurar o Firebase Authentication

---

## 📋 Pré-requisitos

- Conta Google
- Node.js 16+ instalado
- Projeto React/React Native criado

---

## 🔥 Passo 1: Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Digite o nome do projeto (ex: "uberhub-mentorias")
4. Aceite os termos e clique em **"Continuar"**
5. (Opcional) Configure Google Analytics
6. Clique em **"Criar projeto"**

---

## 🔐 Passo 2: Habilitar Google como Provedor

1. No painel do projeto, clique em **"Authentication"**
2. Clique em **"Get started"** (ou vá para aba "Sign-in method")
3. Clique em **"Google"**
4. Ative o toggle **"Habilitar"**
5. Selecione um email de suporte
6. Clique em **"Salvar"**

---

## 🖥️ Passo 3: Configurar App Web

1. Na página inicial do projeto, clique no ícone **"Web"** (`</>`)
2. Digite um apelido para o app (ex: "admin-web")
3. (Opcional) Marque "Firebase Hosting"
4. Clique em **"Registrar app"**
5. Copie as credenciais exibidas:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 📱 Passo 4: Configurar App Android

1. Na página inicial do projeto, clique em **"Adicionar app"** → **Android**
2. Digite o **nome do pacote Android** (ex: `com.uberhub.mentorias`)
   
   :::warning Importante
   Este nome deve corresponder ao `package` no seu `app.json` (Expo)
   :::

3. (Opcional) Digite um apelido
4. **SHA-1** - Veja a seção [Configurar SHA1](/docs/autenticacao/sha1-android)
5. Clique em **"Registrar app"**
6. Baixe o arquivo **`google-services.json`**
7. Coloque o arquivo na raiz do projeto (Expo) ou em `android/app/` (CLI)

---

## 🌍 Passo 5: Variáveis de Ambiente

### Web (Vite)

Crie o arquivo `web/.env`:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Mobile (Expo)

Crie o arquivo `mentorApp/.env` (ou `mentoradoApp/.env`):

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:android:xyz789
```

:::tip Onde encontrar o GOOGLE_CLIENT_ID?
No arquivo `google-services.json`, procure por `client_id` onde `client_type` é `3` (Web client).
:::

---

## 📦 Passo 6: Instalar Dependências

### Web

```bash
cd web
npm install firebase axios
```

### Mobile (Expo)

```bash
cd mentorApp  # ou mentoradoApp
npm install firebase @react-native-google-signin/google-signin @react-native-async-storage/async-storage axios
```

---

## ✅ Verificação

### Web

1. Rode `npm run dev`
2. Tente fazer login com Google
3. Verifique no console do navegador se o token é retornado

### Mobile

1. Rode `npx expo run:android`
2. Tente fazer login com Google
3. Verifique se não há erros de configuração

---

## ❓ Problemas Comuns

<details>
<summary><strong>Erro: "auth/configuration-not-found"</strong></summary>

Verifique se o domínio está autorizado em:
- Firebase Console → Authentication → Settings → Authorized domains

</details>

<details>
<summary><strong>Erro: "DEVELOPER_ERROR" no Android</strong></summary>

O SHA-1 não está configurado corretamente. Veja [Configurar SHA1](/docs/autenticacao/sha1-android).

</details>

<details>
<summary><strong>Variáveis de ambiente não carregam</strong></summary>

- **Web**: Use prefixo `VITE_`
- **Mobile**: Use prefixo `EXPO_PUBLIC_`
- Reinicie o servidor após mudanças

</details>

---

## 📚 Próximos Passos

- [Configurar SHA1 no Android](/docs/autenticacao/sha1-android)
- [Aula Completa de Firebase Auth](/docs/autenticacao/aula-firebase-auth)
