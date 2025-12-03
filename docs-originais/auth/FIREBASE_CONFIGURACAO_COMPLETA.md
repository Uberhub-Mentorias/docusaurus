# 🔥 Guia Completo: Configuração do Firebase

Este guia completo explica como configurar o Firebase para autenticação com Google OAuth no projeto, incluindo configuração do frontend, backend e gerenciamento de roles.

## 📑 Sumário

- [Visão Geral](#visão-geral)
- [Configuração do Frontend](#configuração-do-frontend)
  - [Obter Credenciais do Web App](#1-obter-credenciais-do-web-app)
  - [Configurar no Frontend](#2-configurar-no-frontend)
  - [Habilitar Autenticação Google](#3-habilitar-autenticação-google)
  - [Configurar Domínios Autorizados](#4-configurar-domínios-autorizados)
- [Configuração do Backend](#configuração-do-backend)
  - [Obter Service Account JSON](#1-obter-service-account-json)
  - [Converter JSON para uma Linha](#2-converter-json-para-uma-linha)
  - [Configurar no Backend](#3-configurar-no-backend)
  - [Reiniciar o Serviço](#4-reiniciar-o-serviço)
- [Gerenciamento de Roles](#gerenciamento-de-roles)
  - [Solução Automática](#solução-automática-recomendada)
  - [Solução Manual](#solução-manual)
  - [Verificar Role Atual](#verificar-sua-role-atual)
- [Verificação](#verificação)
- [Troubleshooting](#troubleshooting)
- [Referências](#referências)

---

## Visão Geral

O projeto usa Firebase para autenticação com Google OAuth:

- **Frontend**: Usa as credenciais do Web App (configuradas em `frontend/admin-dashboard/.env`)
- **Backend**: Usa as credenciais do Service Account (configuradas em `.env` na raiz do projeto)

### Fluxo de Autenticação

1. Usuário faz login no frontend com Google (via Firebase Auth)
2. Frontend recebe um ID token do Firebase
3. Frontend envia o ID token para o backend
4. Backend valida o token usando Firebase Admin SDK
5. Backend cria/atualiza usuário e retorna JWT próprio
6. Frontend usa o JWT para requisições autenticadas

---

## Configuração do Frontend

### 1. Obter Credenciais do Web App

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em **Project Settings** (⚙️) > **General**
4. Role até **Your apps** e clique no ícone **Web** (`</>`)
5. Se já tiver um app, clique nele. Se não, registre um novo app
6. Copie as credenciais do objeto `firebaseConfig`:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### 2. Configurar no Frontend

Edite o arquivo `frontend/admin-dashboard/.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSyBV0Z7l1G8ot2_w3ec5LT5musNp0TW011w
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 3. Habilitar Autenticação Google

1. No Firebase Console, vá em **Authentication** > **Sign-in method**
2. Clique em **Google**
3. Ative o toggle e configure:
   - **Support email**: Seu email
   - **Project support email**: Seu email
4. Clique em **Save**

### 4. Configurar Domínios Autorizados

1. Vá em **Authentication** > **Settings** > **Authorized domains**
2. Adicione seus domínios (ex: `localhost` para desenvolvimento)

---

## Configuração do Backend

### 1. Obter Service Account JSON

1. No Firebase Console, vá em **Project Settings** (⚙️)
2. Clique na aba **Service accounts**
3. Clique em **Generate new private key**
4. Confirme clicando em **Generate key**
5. Um arquivo JSON será baixado (ex: `mentorias-uberhub-firebase-adminsdk-xxxxx.json`)

### 2. Converter JSON para uma Linha

O arquivo JSON baixado tem múltiplas linhas, mas precisa estar em uma única linha no `.env`.

#### Opção A: Usando PowerShell (Windows)

```powershell
# Leia o arquivo JSON
$json = Get-Content -Path "caminho/para/seu-arquivo.json" -Raw

# Converta para uma linha e escape as aspas
$jsonOneLine = $json -replace "`r`n", " " -replace "`n", " " -replace '"', '\"'

# Salve em uma variável de ambiente temporária para copiar
$jsonOneLine
```

#### Opção B: Usando Node.js

Crie um arquivo `convert-firebase-json.js`:

```javascript
const fs = require('fs');
const path = process.argv[2];

if (!path) {
  console.error('Uso: node convert-firebase-json.js <caminho-do-json>');
  process.exit(1);
}

const json = fs.readFileSync(path, 'utf8');
const oneLine = JSON.stringify(JSON.parse(json));
console.log(oneLine);
```

Execute:

```bash
node convert-firebase-json.js seu-arquivo.json
```

#### Opção C: Manualmente

1. Abra o arquivo JSON
2. Remova todas as quebras de linha
3. Mantenha o JSON válido (sem espaços extras entre propriedades)
4. As quebras de linha no `private_key` devem ser mantidas como estão (o sistema as trata automaticamente)

### 3. Configurar no Backend

Edite o arquivo `.env` na **raiz do projeto**:

```bash
FIREBASE_CREDENTIALS_JSON={"type":"service_account","project_id":"seu-projeto","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@seu-projeto.iam.gserviceaccount.com",...}
```

**⚠️ IMPORTANTE:**

- O JSON deve estar em **uma única linha**
- **Não use aspas** ao redor do JSON no `.env`
- Mantenha as quebras de linha no `private_key` como `\n`

### 4. Reiniciar o Serviço

```bash
# Docker Compose
docker-compose restart auth-service

# Ou localmente
# Pare o serviço (Ctrl+C) e inicie novamente
```

---

## Gerenciamento de Roles

O sistema suporta diferentes roles de usuário: `ADMIN`, `MENTOR` e `MENTEE`. Por padrão, novos usuários recebem a role `MENTEE`.

### Solução Automática (Recomendada)

O sistema foi configurado para **automaticamente atribuir a role ADMIN ao primeiro usuário** que fizer login no sistema.

**Como funciona:**

1. Quando você faz login pela primeira vez com Firebase
2. O sistema verifica se você é o primeiro usuário
3. Se for, automaticamente atribui a role `ADMIN`
4. Caso contrário, atribui a role `MENTEE` (padrão)

**⚠️ Importante:** Se você já criou uma conta antes dessa atualização, você precisará usar a solução manual abaixo.

### Solução Manual

Se você já tem uma conta e precisa adicionar a role ADMIN manualmente, você tem algumas opções:

#### Opção 1: Usando o Endpoint da API (Requer Autenticação)

Se você tem acesso a outro usuário ADMIN ou pode fazer uma requisição autenticada:

```bash
# Substitua <SEU_EMAIL> pelo seu email e <SEU_TOKEN> pelo token JWT
curl -X PUT http://localhost:8080/api/v1/users/<SEU_EMAIL>/add-role \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'
```

**Exemplo:**

```bash
curl -X PUT http://localhost:8080/api/v1/users/admin@example.com/add-role \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'
```

#### Opção 2: Diretamente no MongoDB

Se você tem acesso ao MongoDB, pode atualizar diretamente:

```javascript
// Conecte-se ao MongoDB
use auth_db

// Encontre seu usuário
db.users.findOne({ email: "seu-email@example.com" })

// Atualize a role para ADMIN
db.users.updateOne(
  { email: "seu-email@example.com" },
  { 
    $set: { 
      role: "ADMIN",
      updatedAt: new Date()
    }
  }
)

// Verifique se foi atualizado
db.users.findOne({ email: "seu-email@example.com" })
```

**Usando MongoDB Compass ou MongoDB Shell:**

1. Conecte-se ao MongoDB (localhost:27017)
2. Selecione o banco `auth_db`
3. Vá para a collection `users`
4. Encontre seu documento pelo email
5. Edite o campo `role` para `ADMIN`
6. Salve

#### Opção 3: Usando Docker Compose

Se você está usando Docker Compose:

```bash
# Acesse o container do MongoDB
docker-compose exec mongodb mongosh

# No MongoDB shell:
use auth_db
db.users.updateOne(
  { email: "seu-email@example.com" },
  { $set: { role: "ADMIN", updatedAt: new Date() } }
)
```

#### Opção 4: Criar um Novo Usuário ADMIN

Se você ainda não tem nenhum usuário no sistema:

1. Faça login pela primeira vez com Firebase
2. O sistema automaticamente atribuirá a role ADMIN
3. Você terá acesso completo ao dashboard

### Verificar sua Role Atual

Você pode verificar sua role atual fazendo uma requisição:

```bash
# Obtenha seu token JWT primeiro (faça login)
# Depois:
curl http://localhost:8080/api/v1/users/me \
  -H "Authorization: Bearer <SEU_TOKEN>"
```

A resposta mostrará sua role atual:

```json
{
  "id": "...",
  "name": "...",
  "email": "...",
  "role": "ADMIN",  // <-- Sua role
  "status": "ACTIVE"
}
```

---

## Verificação

### Frontend

1. Inicie o servidor de desenvolvimento:

   ```bash
   cd frontend/admin-dashboard
   npm run dev
   ```

2. Acesse a aplicação e tente fazer login com Google
3. Se aparecer a tela do Google, o frontend está configurado corretamente ✅

### Backend

1. Após fazer login no frontend, verifique os logs do `auth-service`:

   ```bash
   docker-compose logs -f auth-service
   ```

2. Se não aparecer o erro "Firebase não está configurado", o backend está configurado corretamente ✅

### Roles

Após adicionar a role ADMIN:

1. **Faça logout e login novamente** para obter um novo token JWT com a role ADMIN
2. Tente acessar o dashboard: `http://localhost:3000`
3. O erro 403 (Forbidden) deve desaparecer

---

## Troubleshooting

### Erro: "Firebase: Error (auth/api-key-not-valid)"

**Causa**: Credenciais do frontend incorretas ou não configuradas

**Solução**:

1. Verifique se o arquivo `frontend/admin-dashboard/.env` existe
2. Verifique se todas as variáveis `VITE_FIREBASE_*` estão preenchidas
3. Reinicie o servidor de desenvolvimento (`npm run dev`)

### Erro: "Firebase não está configurado. Configure FIREBASE_CREDENTIALS_JSON"

**Causa**: Credenciais do backend não configuradas

**Solução**:

1. Verifique se o arquivo `.env` existe na raiz do projeto
2. Verifique se `FIREBASE_CREDENTIALS_JSON` está preenchida
3. Verifique se o JSON está em uma única linha
4. Reinicie o serviço `auth-service`

### Erro: "Error parsing Firebase credentials JSON"

**Causa**: JSON mal formatado

**Solução**:

1. Valide o JSON usando um validador online
2. Certifique-se de que está em uma única linha
3. Verifique se não há aspas extras ao redor do JSON no `.env`

### Erro: "Invalid token signature"

**Causa**: Service Account não tem permissões ou está incorreto

**Solução**:

1. Gere uma nova chave privada no Firebase Console
2. Certifique-se de que o Service Account tem a role "Firebase Admin SDK Administrator Service Agent"

### Erro: "403 Forbidden" mesmo após adicionar role ADMIN

**Causa**: O token JWT ainda contém a role antiga

**Solução**:

1. Faça logout
2. Faça login novamente
3. Um novo token será gerado com a role ADMIN

### Erro: "User already has this role"

**Causa**: Você já tem a role ADMIN

**Solução**: Verifique se o problema é outro (token expirado, etc.)

### Não consigo acessar o MongoDB

**Solução**: Use a Opção 1 (endpoint da API) ou peça para outro desenvolvedor com acesso ADMIN fazer isso por você.

---

## 📝 Notas Importantes

- A role é armazenada no campo `role` do documento do usuário no MongoDB
- O JWT contém as roles no claim `roles` (formato: `ROLE_ADMIN`)
- Após alterar a role, é necessário fazer login novamente para obter um novo token
- O primeiro usuário do sistema sempre recebe a role ADMIN automaticamente
- **NUNCA** commite o arquivo `.env` no Git
- O arquivo `.env` já está no `.gitignore`
- **NUNCA** compartilhe suas credenciais do Firebase
- Se as credenciais forem expostas, gere uma nova chave no Firebase Console

---

## Referências

- [Documentação do Firebase](https://firebase.google.com/docs)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Autenticação com Google](https://firebase.google.com/docs/auth/web/google-signin)

---

**Última atualização:** 2025-01-27

