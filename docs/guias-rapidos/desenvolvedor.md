---
id: desenvolvedor
title: Guia do Desenvolvedor
sidebar_label: 💻 Desenvolvedor
sidebar_position: 5
---

# 💻 Guia Rápido do Desenvolvedor

> Como configurar o ambiente e começar a contribuir

---

## 🛠️ Pré-requisitos

Antes de começar, instale:

| Ferramenta | Versão | Download |
|------------|--------|----------|
| **Node.js** | 20.x ou superior | [nodejs.org](https://nodejs.org/) |
| **npm** | 10.x ou superior | (vem com Node.js) |
| **Git** | Qualquer versão | [git-scm.com](https://git-scm.com/) |
| **VS Code** (recomendado) | Qualquer versão | [code.visualstudio.com](https://code.visualstudio.com/) |

---

## 📦 Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/uberhub-mentorias/docusaurus.git

# Entre na pasta
cd docusaurus
```

---

## 🗂️ Estrutura do Projeto

```
docusaurus/
├── docs/                   # 📚 Documentação principal
│   ├── arquitetura/       # Documentação de arquitetura
│   ├── autenticacao/      # Documentação de autenticação
│   ├── guias-rapidos/     # Guias rápidos por perfil
│   └── ...                # Outras seções
├── docs-originais/        # 📄 Documentação original
│   ├── auth/              # Docs de autenticação
│   └── projeto/           # Docs do projeto
├── src/                   # 💻 Código fonte do Docusaurus
│   ├── components/        # Componentes React
│   ├── css/               # Estilos customizados
│   ├── lib/               # Bibliotecas e utilitários
│   ├── pages/             # Páginas customizadas
│   └── theme/             # Customizações do tema
├── static/                # 📁 Arquivos estáticos
│   └── img/               # Imagens
├── docusaurus.config.js   # ⚙️ Configuração principal
├── sidebars.js            # 📋 Configuração da sidebar
└── package.json           # 📦 Dependências e scripts
```

---

## 🌐 Projeto Web (React + Vite)

### Configuração

```bash
# Entre na pasta web
cd web

# Instale as dependências
npm install

# Crie o arquivo de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Firebase
```

### Comandos Disponíveis

```bash
# Servidor de desenvolvimento com HMR
npm run dev

# Verificar código com ESLint
npm run lint

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

:::tip Hot Module Replacement (HMR)
O Vite oferece HMR ultrarrápido. Alterações no código são refletidas instantaneamente no navegador!
:::

---

## 📱 Projetos Mobile (Expo)

### Configuração

```bash
# App do Mentorado
cd mentoradoApp
npm install

# OU App do Mentor
cd mentorApp
npm install
```

### Comandos Disponíveis

```bash
# Iniciar o Expo
npm run start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Rodar no navegador
npm run web
```

:::warning Atenção
Para rodar no Android, você precisa:
1. Android SDK instalado
2. Emulador configurado OU dispositivo conectado via USB
3. Google Services configurado (ver [SHA1 Android](/docs/autenticacao/sha1-android))
:::

---

## 🔑 Variáveis de Ambiente

### Web (Vite)

Prefixo: `VITE_`

```env
# web/.env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Mobile (Expo)

Prefixo: `EXPO_PUBLIC_`

```env
# mentorApp/.env ou mentoradoApp/.env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=seu-web-client-id
EXPO_PUBLIC_FIREBASE_API_KEY=sua-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
# ... outras variáveis
```

---

## 📝 Padrões de Código

### Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| **Componentes React** | PascalCase | `HomeScreen.js` |
| **Funções/variáveis** | camelCase | `loadData()` |
| **Constantes globais** | UPPER_SNAKE_CASE | `API_BASE_URL` |
| **Arquivos utilitários** | camelCase | `errorHandler.js` |

### Ordem de Imports

```javascript
// 1. React e React Native
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// 2. Bibliotecas de terceiros
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

// 3. Componentes locais
import LoadingSpinner from "../components/LoadingSpinner";

// 4. Serviços e utilitários
import { authService } from "../services/api";
import { validateEmail } from "../utils/validators";
```

### Estilos

**Web:** Use arquivos CSS separados (`.css`)

**Mobile:** Use `StyleSheet.create()` no final do arquivo

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

---

## 🧪 Validação de Mudanças

Antes de commitar, sempre execute:

```bash
# Para o projeto web
cd web
npm run lint
npm run build

# Para projetos mobile
cd mentorApp  # ou mentoradoApp
npm run lint  # se disponível
```

---

## 🚀 Fluxo de Contribuição

```
1. Fork/Clone → 2. Branch → 3. Develop → 4. Lint/Build → 5. PR
```

1. **Fork** o repositório (ou clone se tiver acesso)
2. Crie uma **branch** para sua feature
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Desenvolva** seguindo os padrões
4. **Valide** com lint e build
5. Abra um **Pull Request** com descrição clara

---

## 📚 Recursos Importantes

| Recurso | Descrição | Link |
|---------|-----------|------|
| **Arquitetura** | Entenda os microsserviços | [Ver →](/docs/arquitetura/visao-geral) |
| **Autenticação** | Firebase Auth flow | [Ver →](/docs/autenticacao/firebase-auth-flow) |
| **Endpoints** | Especificação da API | [Ver →](/docs/arquitetura/endpoints) |
| **Padrões de Código** | Guia completo | [Ver →](/docs/devops/padroes-codigo) |
| **CI/CD** | GitHub Actions | [Ver →](/docs/devops/ci-cd-guia) |
| **Backlog** | Tarefas pendentes | [Ver →](/docs/backlog/github-project) |

---

<details>
<summary>💡 <strong>Decisão de Arquitetura (ADR-002)</strong>: Por que Expo para Mobile?</summary>

### Contexto
Precisávamos escolher entre React Native CLI e Expo para desenvolver os apps mobile.

### Decisão
Escolhemos **Expo** pelos seguintes motivos:
- ✅ Setup mais simples (sem Android Studio obrigatório inicialmente)
- ✅ Expo Go para testes rápidos
- ✅ Build na nuvem (EAS Build)
- ✅ Suporte a bibliotecas nativas via Development Build
- ✅ Over-the-air updates

### Consequências
- Positivas: Desenvolvimento mais ágil, menos configuração
- Negativas: Algumas limitações em bibliotecas nativas muito específicas

</details>

---

## ❓ Problemas Comuns

<details>
<summary><strong>Erro: "Module not found"</strong></summary>

Execute `npm install` na pasta do projeto específico.

</details>

<details>
<summary><strong>Erro de SHA1 no Android</strong></summary>

Consulte o [Guia de Configuração SHA1](/docs/autenticacao/sha1-android).

</details>

<details>
<summary><strong>Variáveis de ambiente não carregam</strong></summary>

- **Web**: Use prefixo `VITE_`
- **Mobile**: Use prefixo `EXPO_PUBLIC_`
- Reinicie o servidor de desenvolvimento após mudanças

</details>
