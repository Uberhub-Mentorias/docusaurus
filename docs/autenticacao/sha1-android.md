---
id: sha1-android
title: Configurar SHA1 Android
sidebar_label: 🤖 SHA1 Android
sidebar_position: 4
---

# 🤖 Configurar SHA1 no Android

> Passo a passo para configurar a impressão digital SHA1 no Firebase

---

## ❓ O que é SHA1?

SHA1 é uma **impressão digital** do seu certificado de assinatura Android. O Firebase usa essa impressão para verificar que as requisições vêm do seu app legítimo.

Você precisa configurar SHA1 para:
- Google Sign-In funcionar no Android
- Outras integrações do Firebase (como Google Maps)

---

## 🔑 Passo 1: Obter SHA1 de Debug

### Usando Gradle

```bash
cd android
./gradlew signingReport
```

Procure por:
```
Variant: debug
Config: debug
Store: /Users/.../.android/debug.keystore
Alias: AndroidDebugKey
MD5:  A1:B2:C3...
SHA1: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
SHA-256: ...
```

### Usando Keytool (Manual)

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

---

## 🔥 Passo 2: Adicionar SHA1 no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Clique no ícone de engrenagem → **Configurações do projeto**
4. Role até **Seus apps** → selecione o app Android
5. Clique em **"Adicionar impressão digital"**
6. Cole o SHA1 copiado
7. Clique em **"Salvar"**

---

## 📱 Passo 3: Baixar google-services.json Atualizado

Após adicionar o SHA1:

1. Na mesma tela de configurações
2. Clique em **"Baixar google-services.json"**
3. Substitua o arquivo antigo no seu projeto

---

## 🏭 Passo 4: SHA1 de Produção (Release)

Para produção, você precisa de um **keystore de release**:

### Criar Keystore (se não tiver)

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Obter SHA1 do Release

```bash
keytool -list -v -keystore my-release-key.keystore -alias my-key-alias
```

### Adicionar no Firebase

Repita o Passo 2 com o SHA1 de release.

---

## 📋 Configurar no Expo (app.json)

```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.uberhub.mentorias"
    },
    "plugins": [
      "@react-native-google-signin/google-signin"
    ]
  }
}
```

---

## ✅ Verificação

1. Rode o app: `npx expo run:android`
2. Tente fazer login com Google
3. Não deve aparecer erro "DEVELOPER_ERROR"

---

## ❓ Problemas Comuns

<details>
<summary><strong>Erro: DEVELOPER_ERROR</strong></summary>

Este erro geralmente significa:
- SHA1 não configurado no Firebase
- SHA1 incorreto (debug vs release)
- `package` no app.json diferente do cadastrado no Firebase

**Solução:**
1. Verifique se o SHA1 correto está no Firebase
2. Verifique se o package name está correto
3. Baixe o google-services.json atualizado

</details>

<details>
<summary><strong>SHA1 diferente a cada build</strong></summary>

Se você usa EAS Build (Expo), cada build pode ter um SHA1 diferente.

**Solução:**
1. Use `eas credentials` para configurar um keystore fixo
2. Ou adicione ambos os SHA1 (local e EAS) no Firebase

</details>

<details>
<summary><strong>Onde está o debug.keystore?</strong></summary>

Localização padrão:
- **Linux/Mac:** `~/.android/debug.keystore`
- **Windows:** `C:\Users\<Usuario>\.android\debug.keystore`

Se não existir, rode o projeto uma vez e será criado automaticamente.

</details>

---

## 📚 Documentação Relacionada

- [Configuração Completa do Firebase](/docs/autenticacao/configuracao-completa)
- [Aula Firebase Auth](/docs/autenticacao/aula-firebase-auth)
