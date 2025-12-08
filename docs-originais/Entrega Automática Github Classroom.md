# 🤖 Entrega Automática: Guia Completo com Código

## 🎯 **O que é Entrega Automática?**

É um sistema onde:

- ✅ **Aluno faz commit** → código é testado automaticamente
- ✅ **Testes rodam** → pontuação é calculada
- ✅ **Dashboard atualiza** → professor vê progresso em tempo real
- ✅ **Sem ação manual** → tudo acontece automaticamente

---

## 🔄 **Fluxo Técnico Completo**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ALUNO FAZ COMMIT                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    git push origin main
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. GITHUB DETECTA PUSH                                      │
│    • Webhook dispara                                        │
│    • GitHub Actions inicia                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. WORKFLOW EXECUTA                                         │
│    • Faz checkout do código                                 │
│    • Instala dependências (npm ci)                          │
│    • Roda testes (npm test)                                 │
│    • Captura resultados                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. AUTOGRADING PROCESSA                                     │
│    • Lê arquivo autograding.json                           │
│    • Executa cada teste configurado                        │
│    • Calcula pontuação (pass/fail)                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. RESULTADOS SÃO REPORTADOS                                │
│    • GitHub Actions mostra resultado (✅/❌)               │
│    • GitHub Classroom atualiza pontuação                   │
│    • Badge atualiza no README                              │
│    • Professor vê no dashboard                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 **Estrutura de Arquivos Necessária**

```
template-autenticacao/
├── .nvmrc                             # ← Versão do Node.js (18)
├── .github/
│   ├── classroom/
│   │   └── autograding.json          # ← Config dos testes (GitHub Classroom cria)
│   └── workflows/
│       └── classroom.yml              # ← Workflow GitHub Actions
├── react-web/
│   ├── src/
│   │   ├── __tests__/                # ← Testes do projeto
│   │   │   ├── setup.test.js
│   │   │   └── auth.test.js
│   │   └── config/
│   │       └── firebase.js
│   ├── package.json                   # ← Com script "test"
│   └── vitest.config.js              # ← Config do Vitest
├── react-mobile/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── setup.test.js
│   │   │   ├── firebase.test.js
│   │   │   └── structure.test.js
│   │   └── config/
│   │       └── firebase.js
│   ├── package.json                   # ← Com script "test"
│   └── jest.config.js                 # ← Config do Jest
└── README.md
```

---

## 🔒 **Segurança e Boas Práticas**

### **Variáveis de Ambiente**

**IMPORTANTE:** Nunca commite credenciais reais no repositório!

#### ❌ **NÃO FAÇA:**

```bash
# .env (com credenciais reais commitadas)
VITE_FIREBASE_API_KEY=AIzaSyC_REAL_KEY_123456789
VITE_FIREBASE_AUTH_DOMAIN=meu-projeto-real.firebaseapp.com
```

#### ✅ **FAÇA:**

**1. Crie `.env.example` (template sem credenciais):**

```bash
# .env.example
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**2. Adicione `.env` no `.gitignore`:**

```bash
# .gitignore
.env
.env.local
google-services.json
GoogleService-Info.plist
```

**3. Use projeto Firebase de TESTE para desenvolvimento:**

- Crie um projeto Firebase separado para testes
- Configure restrições de API key no Console Firebase
- Para testes automatizados, use credenciais mock (já configurado no setup.test.js)

### **Restrições de API Key no Firebase Console**

1. Acesse: [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto → ⚙️ Configurações do Projeto
3. Vá em "Chaves de API"
4. Restrinja sua API key:
   - **Application restrictions:** HTTP referrers
   - **Website restrictions:** Adicione apenas seus domínios autorizados
   - Exemplo: `localhost:*`, `seu-dominio.com/*`

---

## 📝 **Código: Parte 1 - Configuração dos Testes**

### **1. React Web - package.json**

```json
{
  "name": "react-web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "firebase": "^10.7.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jsdom": "^23.0.0"
  }
}
```

### **2. React Web - vitest.config.js**

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.test.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 3. React Web - `src/__tests__/setup.test.js`

```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup após cada teste
afterEach(() => {
  cleanup();
});

// Mock de variáveis de ambiente para testes
process.env.VITE_FIREBASE_API_KEY = 'test-api-key';
process.env.VITE_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.VITE_FIREBASE_PROJECT_ID = 'test-project';
process.env.VITE_FIREBASE_STORAGE_BUCKET = 'test-project.appspot.com';
process.env.VITE_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.VITE_FIREBASE_APP_ID = '1:123456789:web:abc123';
```

### **4. React Web - src/**tests**/firebase.test.js**

```javascript
import { describe, it, expect, beforeAll } from 'vitest';

describe('Firebase Configuration Tests', () => {
  let firebase, auth, googleProvider;

  beforeAll(async () => {
    try {
      const module = await import('../config/firebase.js');
      firebase = module;
      auth = module.auth;
      googleProvider = module.googleProvider;
    } catch (error) {
      console.error('Erro ao importar firebase:', error);
    }
  });

  describe('Estrutura de Arquivos', () => {
    it('deve existir arquivo firebase.js em src/config/', () => {
      expect(firebase).toBeDefined();
    });
  });

  describe('Firebase Auth', () => {
    it('deve ter auth exportado e inicializado', () => {
      expect(auth).toBeDefined();
      expect(auth.app).toBeDefined();
    });

    it('deve ter configuração válida', () => {
      expect(auth.config).toBeDefined();
      expect(auth.config.apiKey).toBeDefined();
      expect(auth.config.authDomain).toBeDefined();
      expect(auth.config.projectId).toBeDefined();
    });

    it('deve ter authDomain com formato correto', () => {
      expect(auth.config.authDomain).toMatch(/\.firebaseapp\.com$/);
    });
  });

  describe('Google Provider', () => {
    it('deve ter googleProvider configurado', () => {
      expect(googleProvider).toBeDefined();
    });

    it('deve ter providerId correto', () => {
      expect(googleProvider.providerId).toBe('google.com');
    });

    it('deve ter custom parameters configurados', () => {
      const customParams = googleProvider.customParameters || {};
      expect(customParams.prompt).toBe('select_account');
    });
  });

  describe('Funções Exportadas', () => {
    it('deve exportar signInWithPopup', () => {
      expect(firebase.signInWithPopup).toBeDefined();
      expect(typeof firebase.signInWithPopup).toBe('function');
    });

    it('deve exportar onIdTokenChanged', () => {
      expect(firebase.onIdTokenChanged).toBeDefined();
      expect(typeof firebase.onIdTokenChanged).toBe('function');
    });

    it('deve exportar signOut', () => {
      expect(firebase.signOut).toBeDefined();
      expect(typeof firebase.signOut).toBe('function');
    });
  });
});
```

### **5. React Web - src/**tests**/structure.test.js**

```javascript
import { describe, it, expect } from 'vitest';
import { access, constants } from 'fs/promises';
import path from 'path';

describe('Estrutura do Projeto', () => {
  const projectRoot = path.resolve(__dirname, '../../');

  async function fileExists(filePath) {
    try {
      await access(filePath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  it('deve ter arquivo package.json', async () => {
    const packagePath = path.join(projectRoot, 'package.json');
    expect(await fileExists(packagePath)).toBe(true);
  });

  it('deve ter pasta src/config/', async () => {
    const configPath = path.join(projectRoot, 'src/config');
    expect(await fileExists(configPath)).toBe(true);
  });

  it('deve ter arquivo .env.example ou .env', async () => {
    const envExamplePath = path.join(projectRoot, '.env.example');
    const envPath = path.join(projectRoot, '.env');
    const hasEnvExample = await fileExists(envExamplePath);
    const hasEnv = await fileExists(envPath);
    expect(hasEnvExample || hasEnv).toBe(true);
  });

  it('deve ter src/services/ para API', async () => {
    const servicesPath = path.join(projectRoot, 'src/services');
    expect(await fileExists(servicesPath)).toBe(true);
  });

  it('deve ter src/context/ para AuthContext', async () => {
    const contextPath = path.join(projectRoot, 'src/context');
    expect(await fileExists(contextPath)).toBe(true);
  });
});
```

---

## 📱 **Código: Parte 2 - React Mobile**

### **1. React Mobile - package.json**

```json
{
  "name": "react-mobile",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "expo": "~49.0.0",
    "@react-native-firebase/app": "^18.7.0",
    "@react-native-firebase/auth": "^18.7.0",
    "@react-native-google-signin/google-signin": "^10.1.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "@react-navigation/native": "^6.1.0",
    "axios": "^1.6.0",
    "react-native-paper": "^5.11.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@testing-library/react-native": "^12.0.0",
    "jest": "^29.2.1",
    "jest-expo": "~49.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

### **2. React Mobile - jest.config.js**

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.test.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/__tests__/**'
  ]
};
```

### 3. React Mobile - `src/__tests__/setup.test.js`

```javascript
// Setup para testes

// Mock do Firebase
jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    utils: () => ({
      FilePath: {
        PICTURES_DIRECTORY: 'PICTURES_DIRECTORY',
      },
    }),
  })),
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: null,
  })),
}));

// Mock do Google Sign-In
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(),
    signOut: jest.fn(),
    isSignedIn: jest.fn(() => Promise.resolve(false)),
    getCurrentUser: jest.fn(() => Promise.resolve(null)),
  },
}));

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

### **4. React Mobile - src/**tests**/firebase.test.js**

```javascript
describe('Firebase Configuration Tests', () => {
  let firebase;

  beforeAll(() => {
    try {
      firebase = require('../config/firebase');
    } catch (error) {
      console.error('Erro ao importar firebase:', error);
    }
  });

  describe('Estrutura de Arquivos', () => {
    it('deve existir arquivo firebase.js em src/config/', () => {
      expect(firebase).toBeDefined();
    });
  });

  describe('Firebase Functions', () => {
    it('deve exportar auth', () => {
      expect(firebase.auth).toBeDefined();
    });

    it('deve exportar signInWithGoogle', () => {
      expect(firebase.signInWithGoogle).toBeDefined();
      expect(typeof firebase.signInWithGoogle).toBe('function');
    });

    it('deve exportar signOutUser', () => {
      expect(firebase.signOutUser).toBeDefined();
      expect(typeof firebase.signOutUser).toBe('function');
    });

    it('deve exportar onIdTokenChanged', () => {
      expect(firebase.onIdTokenChanged).toBeDefined();
      expect(typeof firebase.onIdTokenChanged).toBe('function');
    });
  });

  describe('Google Sign-In Configuration', () => {
    it('deve ter GoogleSignin configurado', () => {
      const { GoogleSignin } = require('@react-native-google-signin/google-signin');
      expect(GoogleSignin.configure).toHaveBeenCalled();
    });
  });
});
```

### **5. React Mobile - src/**tests**/structure.test.js**

```javascript
import { access, constants } from 'fs/promises';
import path from 'path';

describe('Estrutura do Projeto Mobile', () => {
  const projectRoot = path.resolve(__dirname, '../../');

  async function fileExists(filePath) {
    try {
      await access(filePath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  it('deve ter arquivo app.json', async () => {
    const appJsonPath = path.join(projectRoot, '../app.json');
    expect(await fileExists(appJsonPath)).toBe(true);
  });

  it('deve ter google-services.json para Android', async () => {
    const googleServicesPath = path.join(projectRoot, '../google-services.json');
    const androidPath = path.join(projectRoot, '../android/app/google-services.json');
    const hasGoogleServicesRoot = await fileExists(googleServicesPath);
    const hasGoogleServicesAndroid = await fileExists(androidPath);
    const hasGoogleServices = hasGoogleServicesRoot || hasGoogleServicesAndroid;

    // Apenas warning se não existir
    if (!hasGoogleServices) {
      console.warn('⚠️  google-services.json não encontrado');
    }
  });

  it('deve ter src/config/ para configurações', async () => {
    const configPath = path.join(projectRoot, 'src/config');
    expect(await fileExists(configPath)).toBe(true);
  });
});
```

---

## ⚙️ **Código: Parte 3 - GitHub Actions**

### **1. .github/classroom/autograding.json**

Este arquivo é **criado automaticamente** pelo GitHub Classroom quando você configura os testes. Mas você pode criá-lo manualmente:

```json
{
  "tests": [
    {
      "name": "React Web - Estrutura",
      "setup": "cd react-web && npm ci",
      "run": "cd react-web && npm test -- src/__tests__/structure.test.js",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 10,
      "points": 10
    },
    {
      "name": "React Web - Firebase Config",
      "setup": "cd react-web && npm ci",
      "run": "cd react-web && npm test -- src/__tests__/firebase.test.js",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 10,
      "points": 40
    },
    {
      "name": "React Mobile - Estrutura",
      "setup": "cd react-mobile && npm ci",
      "run": "cd react-mobile && npm test -- src/__tests__/structure.test.js",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 10,
      "points": 10
    },
    {
      "name": "React Mobile - Firebase Config",
      "setup": "cd react-mobile && npm ci",
      "run": "cd react-mobile && npm test -- src/__tests__/firebase.test.js",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 10,
      "points": 40
    }
  ]
}
```

### **2. .github/workflows/classroom.yml**

```yaml
name: GitHub Classroom Workflow

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

permissions:
  checks: write
  actions: read
  contents: read

jobs:
  test-web:
    name: Test React Web
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: |
          cd react-web
          npm ci

      - name: Run tests
        run: |
          cd react-web
          npm test
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: web-test-results
          path: react-web/coverage/

  test-mobile:
    name: Test React Mobile
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: |
          cd react-mobile
          npm ci

      - name: Run tests
        run: |
          cd react-mobile
          npm test
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: mobile-test-results
          path: react-mobile/coverage/

  # Job de autograding do GitHub Classroom
  autograding:
    name: Autograding
    runs-on: ubuntu-latest
    if: always()

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Run Autograding
        uses: education/autograding@v1
        id: autograder
        continue-on-error: true

      - name: Grade Report
        uses: education/autograding-grading-reporter@v1
        env:
          RESULTS: "${{steps.autograder.outputs.results}}"
```

---

## 📊 **Código: Parte 4 - Badge de Status no README**

### **README.md (atualizado)**

```markdown
# Setup Web + Mobile - Firebase Authentication

<!-- Badge dinâmico - funciona automaticamente quando o repo for criado via GitHub Classroom -->
![Autograding](https://img.shields.io/github/workflow/status/ORGANIZATION/REPO-NAME/GitHub%20Classroom%20Workflow?label=autograding)
![Points](https://img.shields.io/badge/points-100-brightgreen)

> **Nota:** Substitua `ORGANIZATION` e `REPO-NAME` pelos valores do seu repositório, ou use o caminho relativo:
> `![Autograding](../../actions/workflows/classroom.yml/badge.svg)`

## 📦 Status da Entrega

Seu assignment é avaliado automaticamente a cada commit!

### Como Verificar:

1. **Badge acima** - mostra se os testes passaram (✅ passing / ❌ failing)
2. **Aba Actions** - veja detalhes de cada execução
3. **Dashboard do Classroom** - professor vê sua pontuação atualizada

### Pontuação Automática:

| Teste | Pontos | Status |
|-------|--------|--------|
| React Web - Estrutura | 10 | - |
| React Web - Firebase | 40 | - |
| React Mobile - Estrutura | 10 | - |
| React Mobile - Firebase | 40 | - |
| **Total** | **100** | - |

## 🚀 Como Começar

1. Clone este repositório
2. Instale dependências:
   ```bash
   cd react-web && npm install
   cd ../react-mobile && npm install
   ```

3. Configure Firebase (veja instruções abaixo)
4. Implemente as funcionalidades
5. Faça commit e push

**Os testes rodam automaticamente!**

## ✅ Checklist de Implementação

### React Web

- [ ] Firebase configurado em `src/config/firebase.js`
- [ ] Variáveis de ambiente em `.env`
- [ ] Google Sign-In implementado
- [ ] Logout funcional
- [ ] Testes locais passando: `npm test`

### React Mobile

- [ ] Firebase configurado para Android
- [ ] `google-services.json` adicionado
- [ ] Google Sign-In implementado
- [ ] Logout funcional
- [ ] Testes locais passando: `npm test`

## 🧪 Testar Localmente

Antes de fazer push, teste localmente:

```bash
# Web
cd react-web
npm test

# Mobile
cd react-mobile
npm test
```

## 📈 Acompanhar Progresso

### No GitHub

1. Vá na aba **"Actions"**
2. Veja a execução mais recente
3. ✅ verde = passou | ❌ vermelho = falhou
4. Clique para ver detalhes

### No Dashboard do Professor

- Sua pontuação atualiza automaticamente
- Professor vê seu progresso em tempo real

## 🎯 Critérios de Avaliação

### Testes Automáticos (100 pontos)

- Estrutura de arquivos correta
- Firebase configurado adequadamente
- Funções exportadas corretamente
- Provedores configurados

### Qualidade do Código (avaliação manual)

- Organização e limpeza
- Commits bem descritos
- Tratamento de erros
- Documentação

## ⏰ Deadline

**Data de Entrega:** 15/12/2024 às 23:59

Você pode fazer commits até o deadline. O código no momento do deadline será considerado sua entrega final.

## 💬 Precisa de Ajuda?

1. **Testes falhando?** Veja os logs na aba Actions
2. **Dúvidas técnicas?** Abra uma Issue
3. **Dúvidas gerais?** Use Discussions

## 📚 Recursos

- [Documentação Firebase](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com/)
- [React Native Firebase](https://rnfirebase.io/)
- [Aula: Autenticação Firebase](link-da-aula)

```

---

## 🎓 **Guia para o Aluno: Como Trabalhar com Entrega Automática**

Crie um arquivo `GUIA-DO-ALUNO.md`:

```markdown
# 🎓 Guia do Aluno: Entrega Automática

## 📌 Como Funciona

Toda vez que você faz `git push`, o GitHub:
1. Roda seus testes automaticamente
2. Calcula sua pontuação
3. Atualiza o dashboard do professor
4. Mostra resultado na aba "Actions"

**Você não precisa fazer nada especial para "entregar"!**

## 🚀 Fluxo de Trabalho

### 1. Clone o Repositório

```bash
git clone https://github.com/turma-2024/assignment-seu-usuario.git
cd assignment-seu-usuario
```

### 2. Trabalhe Normalmente

```bash
# Faça suas alterações
code react-web/src/config/firebase.js

# Teste localmente ANTES de commitar
cd react-web
npm test
```

### 3. Commit e Push

```bash
git add .
git commit -m "feat: configura Firebase authentication"
git push origin main
```

### 4. Aguarde os Testes (30s - 2min)

Acesse: **github.com/seu-repo → Actions**

Você verá:

```
● GitHub Classroom Workflow
  ├─ ✅ Test React Web (passou!)
  ├─ ✅ Test React Mobile (passou!)
  └─ ✅ Autograding (100/100 pontos)
```

## 📊 Entendendo os Resultados

### ✅ Testes Passaram

```
✅ All checks have passed
   Pontuação: 100/100
```

**Parabéns!** Continue assim.

### ❌ Testes Falharam

```
❌ Some checks failed
   Pontuação: 45/100
```

**O que fazer:**

1. Clique no ❌ vermelho
2. Veja qual teste falhou
3. Leia o erro
4. Corrija o código
5. Faça novo commit

### Exemplo de Erro

```
Error: Cannot find module '../config/firebase.js'
```

**Solução:** Criar o arquivo `src/config/firebase.js`

## 🔍 Como Ver Detalhes dos Testes

1. Vá na aba **"Actions"**
2. Clique na execução mais recente
3. Clique em **"Test React Web"** ou **"Test React Mobile"**
4. Expanda cada etapa:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ❌ Run tests ← veja o erro aqui

## 💡 Dicas

### ✅ Faça Commits Pequenos e Frequentes

```bash
# BOM
git commit -m "feat: adiciona Firebase config"
git commit -m "feat: implementa Google Sign-In"
git commit -m "test: adiciona testes de autenticação"

# RUIM
git commit -m "tudo pronto" # depois de 3 dias de trabalho
```

**Por quê?**

- Cada commit é testado
- Você vê exatamente onde algo quebrou
- Mais fácil reverter se necessário

### ✅ Teste Localmente Primeiro

```bash
# SEMPRE antes de fazer push
npm test
```

Economiza tempo e evita commits desnecessários.

### ✅ Use Branches para Experimentar

```bash
# Crie branch para nova feature
git checkout -b feature/login-google

# Trabalhe na branch
# Quando tudo estiver OK:
git checkout main
git merge feature/login-google
git push
```

## 🎯 Checklist Antes do Deadline

- [ ] Todos os testes passando localmente
- [ ] Último push mostra ✅ verde
- [ ] Pontuação no dashboard = 100/100
- [ ] README atualizado (se necessário)
- [ ] Código organizado e comentado
- [ ] Commits com mensagens claras

## ❓ FAQ

**P: Posso fazer push quantas vezes quiser?**
R: Sim! Cada push roda os testes. Use isso a seu favor.

**P: Os testes demoraram muito. É normal?**
R: Primeira execução demora ~5min (instala dependências). Próximas: ~1-2min.

**P: Fiz push mas não rodou os testes. Por quê?**
R: Verifique se fez push na branch `main`. GitHub Actions só roda em `main`.

**P: Posso ver os testes de outros alunos?**
R: Não. Cada repositório é privado.

**P: E se eu passar dos 100 pontos?**
R: Não é possível. Máximo é sempre 100.

**P: Preciso "entregar" de alguma forma especial?**
R: Não! Seu último commit antes do deadline é sua entrega.

## 🆘 Problemas Comuns

### Problema 1: "Tests failed"

```
❌ Error: Test suite failed to run
```

**Solução:**

```bash
# Limpe e reinstale dependências
rm -rf node_modules package-lock.json
npm install
npm test
```

### Problema 2: "Module not found"

```
Error: Cannot find module './config/firebase'
```

**Solução:** Verifique se o arquivo existe no caminho correto.

### Problema 3: "Timeout"

```
Error: Test exceeded timeout of 5000ms
```

**Solução:** Teste está demorando muito. Verifique:

- Chamadas assíncronas sem await
- Loops infinitos
- Imports incorretos

## 📞 Precisa de Ajuda?

1. **Veja os logs de erro** na aba Actions
2. **Abra uma Issue** no seu repositório
3. **Use Discussions** para dúvidas gerais
4. **Email do professor** para urgências

---

**Boa sorte! 🚀**

```

---

## 👨‍🏫 **Guia para o Professor: Monitorar Entregas**

### **1. Acessar Dashboard**

```

<https://classroom.github.com/classrooms/[classroom-id]/assignments/[assignment-id>]

```

### **2. Visão Geral**

Você verá uma tabela:

| Student | Status | Score | Last Activity | View Repository |
|---------|--------|-------|---------------|-----------------|
| João Silva | ✅ Passed | 100/100 | 2 hours ago | [View](link) |
| Maria Santos | ⚠️ Failed | 60/100 | 1 day ago | [View](link) |
| Pedro Costa | ⏳ Running | -/100 | just now | [View](link) |
| Ana Lima | ❌ Not started | 0/100 | - | [View](link) |

### **3. Filtros Disponíveis**

```

[ Status ▼ ]  [ Score ▼ ]  [ Last Activity ▼ ]

Status:
  ○ All
  ○ Passed (100 points)
  ○ Partially passed (1-99 points)
  ○ Failed (0 points)
  ○ Not started

Score:
  ○ All
  ○ 90-100
  ○ 70-89
  ○ 50-69
  ○ Below 50

Last Activity:
  ○ All
  ○ Today
  ○ This week
  ○ This month

```

### **4. Exportar Dados**

Clique em **"Download grades"**:

```csv
identifier,github_username,github_id,roster_identifier,assignment_name,assignment_url,submission_timestamp,points_awarded,points_available
1,joao-silva,123456,,Setup Firebase,https://...,2024-12-15T21:30:00Z,100,100
2,maria-santos,234567,,Setup Firebase,https://...,2024-12-14T18:45:00Z,60,100
3,pedro-costa,345678,,Setup Firebase,https://...,2024-12-15T23:58:00Z,95,100
```

### **5. Revisar Trabalho Específico**

```bash
# Clone o repositório do aluno
git clone https://github.com/turma-2024/assignment-joao-silva
cd assignment-joao-silva

# Veja histórico de commits
git log --oneline --graph

# Rode os testes
cd react-web && npm ci && npm test
cd ../react-mobile && npm ci && npm test
```

### **6. Dar Feedback Individual**

**Opção A: Via Issues**

```markdown
## Feedback da Entrega

### Resultado: 85/100 ⭐

### O que funcionou bem ✅
- Configuração do Firebase perfeita
- Código bem organizado
- Commits descritivos

### Pontos de melhoria ⚠️
1. **Tratamento de erros (faltou 10 pontos)**
   - Adicione try/catch em `src/services/api.js`
   - Exemplo:
   ```javascript
   try {
     const response = await api.get('/user');
     return response.data;
   } catch (error) {
     console.error('Erro:', error);
     throw error;
   }
   ```

2. **Testes mobile (faltou 5 pontos)**
   - Arquivo `firebase.test.js` não cobre todos os casos
   - Adicione testes para `signInWithGoogle`

### Próximos passos

- [ ] Adicionar tratamento de erros
- [ ] Completar testes mobile
- [ ] (Opcional) Adicionar loading states

Excelente trabalho no geral! 🚀

```

**Opção B: Via Pull Request Review**

Se aluno criou PR, faça code review:
- Comente linhas específicas
- Sugira melhorias
- Aprove ou solicite mudanças

---

## 📊 **Estatísticas e Análises**

### **Criar Dashboard Customizado**

Use a API do GitHub para análises:

```javascript
// script: analyze-submissions.js
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function analyzeSubmissions() {
  const org = "turma-2024-1";
  const assignment = "setup-web-mobile";
  
  // Buscar todos os repositórios do assignment
  const repos = await octokit.repos.listForOrg({
    org,
    per_page: 100
  });
  
  const assignmentRepos = repos.data.filter(r => 
    r.name.startsWith(assignment)
  );
  
  // Analisar cada repositório
  for (const repo of assignmentRepos) {
    const workflows = await octokit.actions.listWorkflowRunsForRepo({
      owner: org,
      repo: repo.name,
      per_page: 1
    });
    
    const lastRun = workflows.data.workflow_runs[0];
    
    console.log({
      student: repo.name.replace(`${assignment}-`, ''),
      status: lastRun?.conclusion,
      score: lastRun?.conclusion === 'success' ? '100' : 'failed',
      lastCommit: lastRun?.created_at
    });
  }
}

analyzeSubmissions();
```

### Como Usar o Script

#### 1. Instalar dependências

```bash
npm install @octokit/rest
```

#### 2. Criar token no GitHub

- Settings → Developer settings → Personal access tokens → Tokens (classic)
- Gerar novo token com permissão: `repo`, `read:org`
- Copiar o token

#### 3. Configurar variável de ambiente

```bash
export GITHUB_TOKEN="seu_token_aqui"
```

#### 4. Rodar o script

```bash
node analyze-submissions.js
```

#### Saída esperada

```
{
  student: 'joao-silva',
  status: 'success',
  score: '100',
  lastCommit: '2024-12-15T22:30:00Z'
}
```

---

## ⚠️ **Troubleshooting**

### **Problema: Testes não rodam automaticamente**

**Verificar:**

1. Arquivo `.github/workflows/classroom.yml` existe?
2. GitHub Actions está habilitado? (Settings → Actions)
3. Push foi para branch `main`?

**Solução:**

```bash
# Verificar nome da branch padrão
git branch -a

# Se for 'master', atualizar workflow
# .github/workflows/classroom.yml
on:
  push:
    branches:
      - main
      - master  # adicionar esta linha
```

### **Problema: Testes passam localmente mas falham no GitHub**

**Causas comuns:**

1. **Variáveis de ambiente faltando**

```yaml
# Adicionar no workflow
- name: Run tests
  run: npm test
  env:
    VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
```

2. **Dependências desatualizadas**

```bash
# Aluno deve rodar
npm ci  # ao invés de npm install
```

### Diferença: npm install vs npm ci

**npm install:**

- Atualiza package-lock.json
- Aceita ranges de versões (~, ^)
- Mais lento
- **Use no desenvolvimento local**

**npm ci (Clean Install):**

- Requer package-lock.json existente
- Usa versões exatas
- Mais rápido
- Deleta node_modules antes
- **Use no CI/CD (GitHub Actions)**

**Solução se npm ci falhar:**

```bash
# Se package-lock.json não existe:
npm install

# Depois commite o arquivo:
git add package-lock.json
git commit -m "chore: add package-lock.json"
git push
```

3. **Caminhos relativos incorretos**

```javascript
// ERRADO
import firebase from './firebase';

// CORRETO
import firebase from '../config/firebase';
```

### **Problema: Timeout nos testes**

```yaml
# Aumentar timeout no workflow
- name: Run tests
  run: npm test
  timeout-minutes: 15  # padrão é 10
```

---

## 🎯 **Checklist Final: Implementação Completa**

### **Professor:**

- [ ] Criar repositório template com código inicial
- [ ] Adicionar testes (Web e Mobile)
- [ ] Configurar workflows GitHub Actions
- [ ] Criar assignment no GitHub Classroom
- [ ] Configurar autograding (testes + pontos)
- [ ] Definir deadline
- [ ] Adicionar instruções no README
- [ ] Testar com assignment de exemplo
- [ ] Compartilhar link com alunos

### **Sistema:**

- [ ] Testes rodam automaticamente em cada push
- [ ] Pontuação atualiza no dashboard
- [ ] Badge de status funciona no README
- [ ] Logs detalhados disponíveis na aba Actions
- [ ] Export de notas funciona (CSV)

### **Alunos:**

- [ ] Recebem feedback imediato (✅/❌)
- [ ] Veem pontuação atualizada
- [ ] Podem fazer múltiplas tentativas
- [ ] Têm acesso a logs de erro detalhados

---

## 🔒 Configurações Avançadas (Opcional)

### Branch Protection Rules

Para evitar que alunos forcem push ou deletem histórico:

**No repositório template ou na organização:**

1. Settings → Branches
2. Add rule
3. Branch name pattern: `main`
4. Configurações recomendadas:
   - ✅ Require status checks to pass
     - ✅ Require branches to be up to date
     - Selecionar: `test-web`, `test-mobile`
   - ✅ Require pull request reviews (opcional)
   - ✅ Include administrators (se quiser aplicar a todos)
   - ❌ Allow force pushes (deixe desmarcado)
   - ❌ Allow deletions (deixe desmarcado)

**Impacto:**

- Alunos não podem forçar push (`git push -f`)
- Precisam que testes passem antes de merge (se usar PRs)
- Histórico de commits preservado
