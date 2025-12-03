# 🔐 Guia: Configurar SHA-1 no Firebase Console (Android)

## 📋 O que é SHA-1?

O **SHA-1** (Secure Hash Algorithm 1) é uma impressão digital do certificado usado para assinar seu aplicativo Android. O Google usa essa impressão digital para verificar que as requisições de autenticação vêm realmente do seu app.

### Por que é necessário?

- **Segurança**: Garante que apenas seu app autenticado pode usar o Google Sign In
- **Validação**: O Google valida o certificado antes de permitir o login
- **Obrigatório**: Sem o SHA-1 configurado, o Google Sign In **não funcionará** no Android

---

## 🎯 Quando você precisa configurar?

Você precisa configurar o SHA-1 em **dois cenários diferentes**:

1. **Desenvolvimento/Testing**: SHA-1 do certificado de debug
2. **Produção**: SHA-1 do certificado de release (Google Play App Signing)

---

## 📱 Método 1: Obter SHA-1 para Desenvolvimento (Debug)

### Opção A: Usando Java Keytool (Recomendado)

Se você já tem o Java JDK instalado:

```bash
# Windows (PowerShell)
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

# macOS/Linux
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**O que procurar:**
```
Certificate fingerprints:
     SHA1: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE
     SHA256: ...
```

Copie o valor do **SHA1** (sem os dois pontos `:`).

### Opção B: Usando Gradle (Android Studio)

1. Abra o projeto no Android Studio
2. Abra o terminal integrado
3. Execute:

```bash
# Para debug
./gradlew signingReport

# Ou para release
./gradlew signingReport --variant=release
```

Procure por `SHA1:` na saída.

### Opção C: Usando Expo/EAS Build

Se você está usando Expo com EAS Build:

```bash
# Obter SHA-1 do build de desenvolvimento
eas credentials

# Ou diretamente via comando
eas build:configure
```

O EAS mostrará o SHA-1 automaticamente após o primeiro build.

---

## 🏭 Método 2: Obter SHA-1 para Produção

### Cenário A: App já publicado no Google Play

1. Acesse: [Google Play Console](https://play.google.com/console)
2. Selecione seu app
3. Vá em **Release** > **Setup** > **App Integrity**
4. Procure por **App signing key certificate**
5. Copie o **SHA-1 certificate fingerprint**

### Cenário B: Usando Google Play App Signing

Se você usa Google Play App Signing (recomendado):

1. No Google Play Console, vá em **Release** > **Setup** > **App Integrity**
2. Você verá **dois** SHA-1 diferentes:
   - **Upload key certificate**: SHA-1 do certificado que você usa para fazer upload
   - **App signing key certificate**: SHA-1 do certificado que o Google usa para assinar o app final

**⚠️ IMPORTANTE**: Use o **App signing key certificate** SHA-1 no Firebase!

### Cenário C: Build local de produção

Se você está fazendo build local de produção:

```bash
# Substitua pelo caminho do seu keystore de produção
keytool -list -v -keystore caminho/para/seu/keystore.jks -alias seu-alias
```

Você precisará da senha do keystore.

---

## 🔥 Como adicionar SHA-1 no Firebase Console

### Passo 1: Acessar Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em **Project Settings** (⚙️) no canto superior esquerdo

### Passo 2: Adicionar SHA-1

1. Role até a seção **Your apps**
2. Encontre seu app Android (ou clique em **Add app** > **Android** se ainda não tiver)
3. Clique no app Android
4. Na seção **SHA certificate fingerprints**, clique em **Add fingerprint**
5. Cole o SHA-1 (com ou sem dois pontos, ambos funcionam)
6. Clique em **Save**

### Exemplo visual:

```
SHA certificate fingerprints
┌─────────────────────────────────────────┐
│ AA:BB:CC:DD:EE:FF:11:22:33:44:55:66... │ [Remove]
└─────────────────────────────────────────┘
[+ Add fingerprint]
```

---

## 📝 Exemplo Completo: Configuração para Expo

### 1. Obter SHA-1 do Debug Keystore

```bash
# No terminal, execute:
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

**Saída esperada:**
```
Alias name: androiddebugkey
Creation date: 01 Jan 2024
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 1234567890abcdef
Valid from: Mon Jan 01 00:00:00 UTC 2024 until: Mon Jan 01 00:00:00 UTC 2054
Certificate fingerprints:
     SHA1: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE
     SHA256: 11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00
```

### 2. Copiar SHA-1

Copie apenas a parte do SHA1:
```
AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE
```

### 3. Adicionar no Firebase

1. Firebase Console > Project Settings > Your apps > Android app
2. Adicione o SHA-1 na seção "SHA certificate fingerprints"
3. Salve

### 4. Baixar google-services.json atualizado

Após adicionar o SHA-1:

1. No Firebase Console, na mesma página do app Android
2. Clique em **Download google-services.json**
3. Coloque o arquivo em `mentorApp/android/app/google-services.json`

**⚠️ IMPORTANTE**: Se você usa Expo, pode precisar fazer `npx expo prebuild` novamente após adicionar o SHA-1.

---

## 🔄 Múltiplos SHA-1

Você pode (e deve) adicionar **múltiplos SHA-1**:

- ✅ SHA-1 do debug keystore (para desenvolvimento)
- ✅ SHA-1 do upload key (se usar Google Play App Signing)
- ✅ SHA-1 do app signing key (produção - Google Play)

Isso permite que o app funcione tanto em desenvolvimento quanto em produção.

---

## ✅ Verificação

Após adicionar o SHA-1:

1. **Aguarde alguns minutos** (pode levar até 5-10 minutos para propagar)
2. **Reinicie o app** completamente
3. **Teste o login** com Google
4. Se ainda não funcionar, verifique:
   - SHA-1 está correto (sem espaços extras)
   - google-services.json está atualizado
   - App foi reconstruído após adicionar SHA-1

---

## 🐛 Troubleshooting

### Erro: "10: The sign-in flow was canceled"

- **Causa**: SHA-1 não configurado ou incorreto
- **Solução**: Verifique se o SHA-1 está correto no Firebase Console

### Erro: "12500: Sign in failed"

- **Causa**: google-services.json desatualizado ou SHA-1 não propagado
- **Solução**: 
  1. Baixe o google-services.json novamente
  2. Aguarde 5-10 minutos
  3. Reconstrua o app

### SHA-1 não aparece no Firebase

- **Causa**: App Android não foi adicionado no Firebase
- **Solução**: Adicione o app Android no Firebase Console primeiro

### Como verificar se o SHA-1 está correto?

Execute o app e verifique os logs. Se o SHA-1 estiver incorreto, você verá erros relacionados a certificado.

---

## 📚 Referências

- [Firebase: Adicionar app Android](https://firebase.google.com/docs/android/setup)
- [Google Play: App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)
- [Expo: EAS Build Credentials](https://docs.expo.dev/build-reference/credentials/)

---

## 🎯 Resumo Rápido

1. **Obter SHA-1**: Use `keytool` ou Gradle
2. **Firebase Console**: Project Settings > Your apps > Android app
3. **Adicionar**: Cole o SHA-1 na seção "SHA certificate fingerprints"
4. **Aguardar**: 5-10 minutos para propagar
5. **Testar**: Reinicie o app e teste o login

**Lembre-se**: Você precisa adicionar SHA-1 tanto para desenvolvimento quanto para produção!

