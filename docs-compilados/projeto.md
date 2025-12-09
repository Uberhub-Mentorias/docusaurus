# 🎓 UberHub Mentorias

> Plataforma mobile de mentorias conectando profissionais experientes (Mentores) a pessoas que buscam orientação e desenvolvimento profissional (Mentorados), dentro do ecossistema do UberHub.

---

## ✨ Sobre Este Documento ✨

**Este é um documento compilado e aprimorado** que consolida informações de dois READMEs originais:

📄 **Documentos Fonte:**
1. `E:\mentorias-starter\README.md` - README principal do repositório
2. `E:\docusaurus\docs-originais\projeto\README.md` - README da documentação

**Melhorias nesta versão:**
- ✨ Informações consolidadas e organizadas dos dois documentos originais
- ✨ Adição de seção completa de Troubleshooting
- ✨ Adição de seção de Segurança com boas práticas
- ✨ Requisitos de sistema detalhados
- ⚠️ Correções de erros e inconsistências encontradas
- ✨ Informações complementares para lacunas identificadas
- ✨ Tabelas aprimoradas com descrições adicionais

**Última atualização:** 2025-12-08

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg)](https://expo.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)

---

## 📋 Índice

- ✨ [Sobre Este Documento](#-sobre-este-documento) ✨
- [Sobre o Projeto](#-sobre-o-projeto)
- [Características Principais](#-características-principais)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
  - [Backend (Microserviços)](#backend-microserviços)
  - [Mobile (Aplicativos)](#mobile-aplicativos)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Documentação](#-documentação)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Desenvolvimento](#-desenvolvimento)
- ✨ [Troubleshooting](#-troubleshooting) ✨
- ✨ [Segurança](#-segurança) ✨
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🚀 Sobre o Projeto

O **UberHub Mentorias** é uma plataforma completa de mentorias desenvolvida como projeto acadêmico do IFTM Campus Uberlândia Centro. O sistema facilita a conexão entre mentores e mentorados através de matchmaking inteligente, automatiza processos administrativos e fornece ferramentas para gestão completa do ciclo de vida de mentorias.

### Objetivos

- 🎯 Democratizar o acesso à mentoria de qualidade
- 🤝 Facilitar o encontro entre mentorados e mentores compatíveis
- 🔄 Automatizar processos administrativos relacionados a mentorias
- 📊 Fornecer analytics e métricas para gestão do programa
- 📱 Garantir uma experiência fluida em dispositivos móveis

---

## ✨ Características Principais

### Para Mentorados

- ✅ Sistema de vouchers para ativação de conta
- 🎯 Matchmaking inteligente baseado em áreas de interesse
- 👤 Visualização de perfil de mentores
- 📅 Acompanhamento de mentorias agendadas
- ⭐ Sistema de avaliação pós-mentoria
- 🔄 Solicitação de troca de mentor (com aprovação administrativa)

### Para Mentores

- 📝 Criação e gerenciamento de perfil profissional
- 📊 Dashboard de mentorias ativas e pendentes
- 📆 Registro de agendamentos via ferramentas externas (Calendly, Google Agenda)
- 💬 Sistema de feedback pós-mentoria
- 🏆 Histórico completo de mentorias realizadas

### Para Administradores

- 👥 Aprovação de cadastros de mentores
- 🎫 Gerenciamento de vouchers (criação, validação, resgate)
- 🏷️ Gestão de tags e áreas de especialização
- 📈 Dashboard com métricas e analytics
- 🔄 Aprovação de solicitações de troca de mentor
- 🛡️ Suspensão/reativação de usuários

---

## 🏗️ Arquitetura

O sistema utiliza uma **arquitetura de microsserviços** com as seguintes características:

### Microsserviços

```
┌──────────────────────────────────────────────────────────────┐
│                      API GATEWAY (8080)                      │
│                   Spring Cloud Gateway                       │
│          Validação JWT | Roteamento | Rate Limiting          │
└───────┬────────────┬──────────────┬───────────────┬──────────┘
        │            │              │               │
        ▼            ▼              ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Auth Service │ │Profile Svc   │ │Mentorship Svc│ │ Admin Service│
│    :8081     │ │    :8082     │ │    :8084     │ │    :8085     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       │                └────────┬───────┘                │
       │                         ▼                        │
       │                ┌──────────────────┐              │
       │                │  Matchmaking Svc │◄─────────────┘
       │                │      :8083       │
       │                └─────────┬────────┘
       │                          │
       ▼                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                    MongoDB 7.0                                    │
│  auth_db | profile_db | matchmaking_db | mentorship_db | admin_db │
└───────────────────────────────────────────────────────────────────┘
```

### Aplicativos Mobile

- **mentoradoApp**: Aplicativo React Native para mentorados
- **mentorApp**: Aplicativo React Native para mentores

### Princípios Arquiteturais

- **Database per Service**: Cada microsserviço possui seu próprio banco de dados MongoDB
- **API Gateway Pattern**: Ponto único de entrada para requisições externas
- **Service-to-Service Communication**: Comunicação síncrona via REST/HTTP
- **JWT Authentication**: Autenticação centralizada com tokens JWT

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Java | 21 | Linguagem de programação |
| Spring Boot | 4.0.0 | Framework backend |
| Spring Security | - | Autenticação e autorização |
| Spring Cloud Gateway | - | API Gateway |
| MongoDB | 7.0 | Banco de dados NoSQL |
| JWT (JJWT) | 0.13.0 | JSON Web Tokens |
| Docker | - | Containerização |

### Mobile

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React Native | 0.81.5 | Framework mobile |
| Expo | ~54.0 | Plataforma de desenvolvimento |
| React Navigation | 7.x | Navegação entre telas |
| Axios | 1.13.2 | Cliente HTTP |
| AsyncStorage | 2.2.0 | Armazenamento local |
| React Native Paper | 5.14.5 | Componentes UI |

### DevOps & Infraestrutura

- **Docker Compose**: Orquestração de containers
- **Railway**: Plataforma de deploy recomendada
- **Heroku**: Plataforma de deploy alternativa (custo baixo, porém app 'adormece')
- **MongoDB Atlas**: MongoDB na nuvem (opcional)
- **Firebase Cloud Messaging**: Notificações push

---

## 📦 Pré-requisitos

### Para Backend

- ☕ **Java 21** ([Download Temurin](https://adoptium.net/))
- 🐳 **Docker** e **Docker Compose** ([Download](https://www.docker.com/))
- 🍃 **MongoDB 7.0+** (ou use Docker Compose)
- 📦 **Maven** (incluído no wrapper `mvnw`)

### Para Mobile

- 📱 **Node.js 18+** ([Download](https://nodejs.org/))
- 📲 **Expo CLI**: `npm install -g @expo/cli`
- 🤖 **Android Studio** (para emulador Android) ou **Xcode** (para iOS)
- 📱 **Expo Go** (app para testes em dispositivo físico)

### ✨ Requisitos de Sistema Recomendados ✨

#### Para Desenvolvimento Backend
- **CPU**: 4 cores ou mais
- **RAM**: 8GB mínimo, 16GB recomendado
- **Disco**: 10GB de espaço livre
- **Sistema Operacional**: Windows 10/11, macOS 10.15+, Linux (Ubuntu 20.04+)

#### Para Desenvolvimento Mobile
- **CPU**: 4 cores ou mais
- **RAM**: 8GB mínimo (16GB para emulador Android)
- **Disco**: 20GB de espaço livre (Android Studio requer bastante espaço)
- **Conexão**: Internet banda larga para download de dependências

---

## 💻 Instalação

### Backend (Microserviços)

#### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/angoti/mentorias-starter.git
cd mentorias-starter

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite .env e configure JWT_SECRET

# 3. Inicie todos os serviços
docker compose up -d

# 4. Verifique os logs
docker compose logs -f

# 5. Teste a API
curl http://localhost:8080/actuator/health
```

**Serviços disponíveis:**
- API Gateway: http://localhost:8080
- Auth Service: http://localhost:8081
- Profile Service: http://localhost:8082
- Matchmaking Service: http://localhost:8083 (interno)
- Mentorship Service: http://localhost:8084
- Admin Service: http://localhost:8085
- MongoDB: mongodb://localhost:27017
- Mongo Express: http://localhost:8086

#### Opção 2: Build Individual

⚠️ **IMPORTANTE**: Use **Java 21** (não Java 17)

```bash
# Configure Java 21
export JAVA_HOME=/usr/lib/jvm/temurin-21-jdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
java -version  # Deve mostrar 21.x

# Build de um serviço (exemplo: auth-service)
cd backend/auth-service
mvn clean package -DskipTests

# Execute o JAR
java -jar target/auth-service-1.0.0.jar
```

### Mobile (Aplicativos)

⚠️ **IMPORTANTE**: Instale cada app separadamente com `--legacy-peer-deps`

#### MentoradoApp

```bash
cd mobile/mentoradoApp

# Instale dependências
npm install --legacy-peer-deps

# Configure a URL da API no app.json
# Edite: expo.extra.API_BASE_URL

# Inicie o aplicativo
npm start
# ou
expo start

# Pressione 'a' para Android, 'i' para iOS, 'w' para Web
```

#### MentorApp

```bash
cd mobile/mentorApp

# Instale dependências
npm install --legacy-peer-deps

# Configure a URL da API no app.json
# Edite: expo.extra.API_BASE_URL

# Inicie o aplicativo
npm start
# ou
expo start
```

---

## ⚙️ Configuração

### Variáveis de Ambiente - Backend

Crie um arquivo `.env` na raiz do projeto:

```bash
# JWT Secret (gere uma chave segura)
# ✨ Use o comando abaixo para gerar uma chave segura: ✨
# ✨ openssl rand -base64 32 ✨
JWT_SECRET=nZFM0uYgNxLymT7BhaiaUJ2bfSDMFGX7ZcoxH8a9dpA=

# MongoDB Connection
# IMPORTANTE: Veja ENV_CONFIGURATION.md para detalhes
#
# Para desenvolvimento local (mvn spring-boot:run):
MONGODB_URI=mongodb://localhost:27017
#
# Para Docker Compose (docker-compose up):
# MONGODB_URI=mongodb://mongodb:27017
# OU simplesmente não defina (docker-compose usa padrão correto)

# Níveis de Log (opcional)
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_APP=DEBUG
```

> **📖 Veja [ENV_CONFIGURATION.md](ENV_CONFIGURATION.md) para explicação detalhada sobre MONGODB_URI**

### Configuração Mobile - API URL

Edite `app.json` em cada aplicativo:

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "http://10.0.2.2:8080",
      "ENV": "development"
    }
  }
}
```

**URLs por ambiente:**
- **Android Emulator**: `http://10.0.2.2:8080`
- **iOS Simulator**: `http://localhost:8080`
- **Dispositivo físico na mesma rede**: `http://<SEU_IP_NA_REDE>:8080`
- **Produção Railway**: `https://api-gateway-production.up.railway.app`
- **Produção Heroku**: `https://mentorias-api-gateway-10fcbc088ede.herokuapp.com`

### ✨ Como Descobrir Seu IP na Rede Local ✨

```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
# ou
ip addr show
```

---

## 🚀 Executando o Projeto

### Desenvolvimento Local Completo

```bash
# Terminal 1: Backend via Docker Compose
docker compose up -d
docker compose logs -f

# Terminal 2: MentoradoApp
cd mobile/mentoradoApp
npm start

# Terminal 3: MentorApp
cd mobile/mentorApp
npm start
```

### Testando a API

Use os arquivos `.http` em `testes-http/`:

```http
### Registrar usuário
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "MENTEE"
}

### Login
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Requer**: VS Code REST Client extension

---

## 📚 Documentação

### Documentação do Projeto

| Documento | Descrição |
|-----------|-----------|
| [Arquitetura v2.md](docs/projeto/Arquitetura%20v2.md) | Arquitetura completa do sistema |
| [ENDPOINTS-COMPLETOS.md](docs/projeto/ENDPOINTS-COMPLETOS.md) | Lista de todos os endpoints da API |
| [Especificação de Requisitos](docs/projeto/Especificação%20de%20Requisitos%20-%20UberHub%20Mentorias.md) | Casos de uso e requisitos |
| [FLUXOS-JORNADAS-OPERACOES.md](docs/projeto/FLUXOS-JORNADAS-OPERACOES.md) | Fluxos de navegação e jornadas do usuário |

### Documentação de Infraestrutura

| Documento | Descrição |
|-----------|-----------|
| [DEPLOY-QUICK-START.md](docs/infra/DEPLOY-QUICK-START.md) | Guia rápido de deploy no Railway (5 min) |
| [DEPLOY.md](docs/infra/DEPLOY.md) | Guia completo de deploy |
| [MONGODB-INSTALLATION.md](docs/infra/MONGODB-INSTALLATION.md) | Instalação e configuração do MongoDB |
| [GUIA-DEFINITIVO-LOGS.md](docs/infra/GUIA-DEFINITIVO-LOGS.md) | Sistema de logs |

### Documentação Mobile

| Documento | Descrição |
|-----------|-----------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitetura dos apps mobile |
| [API_INTEGRATION.md](docs/API_INTEGRATION.md) | Integração com a API |
| [NOTIFICATIONS.md](docs/NOTIFICATIONS.md) | Sistema de notificações push |
| [DEEP_LINKING.md](docs/DEEP_LINKING.md) | Deep linking e navegação |

### API Documentation (Swagger UI) - Desenvolvimento Local

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Auth Service | http://localhost:8081/swagger-ui.html | Autenticação e usuários |
| Profile Service | http://localhost:8082/swagger-ui.html | Perfis de mentores |
| ✨ Matchmaking Service ✨ | ✨ http://localhost:8083/swagger-ui.html ✨ | ✨ Algoritmo de matching ✨ |
| Mentorship Service | http://localhost:8084/swagger-ui.html | Gestão de mentorias |
| Admin Service | http://localhost:8085/swagger-ui.html | Administração |

### API Documentation (Swagger UI) - Produção Heroku

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Auth Service | https://mentorias-auth-service-e42a31f301f5.herokuapp.com/swagger-ui.html | Autenticação e usuários |
| Profile Service | https://mentorias-profile-service-7c1073700f9d.herokuapp.com/swagger-ui.html | Perfis de mentores |
| Matchmaking Service | https://mentorias-matchmaking-service-d7516fb4891c.herokuapp.com/swagger-ui.html | Algoritmo de matching |
| Mentorship Service | https://mentorias-mentorship-service-cf43e78b862a.herokuapp.com/swagger-ui.html | Gestão de mentorias |
| Admin Service | https://mentorias-admin-service-486e18361fbc.herokuapp.com/swagger-ui.html | Administração |

### ⚠️ Health Checks - Produção Heroku ⚠️

| Serviço | URL | Status |
|---------|-----|--------|
| Auth Service | https://mentorias-api-gateway-10fcbc088ede.herokuapp.com/api/v1/auth/health | ✨ Verifique status ✨ |
| Profile Service | https://mentorias-api-gateway-10fcbc088ede.herokuapp.com/api/v1/profiles/health | ✨ Verifique status ✨ |
| Matchmaking Service | https://mentorias-api-gateway-10fcbc088ede.herokuapp.com/api/v1/matchmaking/health | ✨ Verifique status ✨ |
| Mentorship Service | https://mentorias-api-gateway-10fcbc088ede.herokuapp.com/api/v1/mentorships/health | ✨ Verifique status ✨ |
| Admin Service | https://mentorias-api-gateway-10fcbc088ede.herokuapp.com/api/v1/admin/health | ✨ Verifique status ✨ |

---

## 🌐 Deploy

### Railway (Recomendado - 5 minutos)

Consulte o [Guia Rápido de Deploy](docs/infra/DEPLOY-QUICK-START.md)

```bash
# 1. Crie conta no Railway (gratuita)
# 2. Crie MongoDB no Railway
# 3. Deploy cada serviço:
#    - Selecione o repositório GitHub
#    - Configure Root Directory: backend/<service-name>
#    - Adicione variáveis de ambiente
#    - Gere domínio público
# 4. Deploy do API Gateway por último
```

**Ordem de deploy:**
1. MongoDB
2. Auth Service
3. Profile Service
4. Matchmaking Service
5. Mentorship Service
6. Admin Service
7. API Gateway (último - precisa das URLs dos outros)

### Outras Plataformas

- **Heroku**: Ver `heroku.yml` e docs
- **AWS/Azure/GCP**: Ver [DEPLOY.md](docs/infra/DEPLOY.md)
- **VPS**: Docker Compose em servidor

---

## 📂 Estrutura do Projeto

```
mentorias-starter/
├── backend/                    # Microserviços Spring Boot
│   ├── api-gateway/           # API Gateway (porta 8080)
│   ├── auth-service/          # Autenticação e usuários (porta 8081)
│   ├── profile-service/       # Perfis de mentores (porta 8082)
│   ├── matchmaking-service/   # Algoritmo de matching (porta 8083)
│   ├── mentorship-service/    # Mentorias (porta 8084)
│   └── admin-service/         # Administração (porta 8085)
│
├── mobile/                     # Aplicativos React Native
│   ├── mentoradoApp/          # App do Mentorado
│   └── mentorApp/             # App do Mentor
│
├── docs/                       # Documentação
│   ├── projeto/               # Arquitetura e requisitos
│   └── infra/                 # Deployment e infraestrutura
│
├── testes-http/               # Testes HTTP (.http files)
├── logging/                   # Utilitários de logs
├── docker-compose.yml         # Orquestração Docker
├── heroku.yml                 # Config Heroku
├── LICENSE                    # Licença MIT
├── SECURITY.md                # Política de segurança
└── README.md                  # Este arquivo
```

---

## 🔌 API Endpoints

### Resumo de Endpoints

| Serviço | Endpoints Públicos | Endpoints Admin | Endpoints Internos | Total |
|---------|-------------------|-----------------|-------------------|-------|
| Auth Service | 3 | 2 | 2 | **7** |
| Profile Service | 4 | 5 | 0 | **9** |
| Matchmaking Service | 0 | 0 | 4 | **4** |
| Mentorship Service | 9 | 0 | 0 | **9** |
| Admin Service | 0 | 20 | 2 | **22** |
| **TOTAL** | **16** | **27** | **8** | **51** |

### Principais Endpoints

#### Auth Service (`/api/v1/auth/*`)
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Autenticar e obter JWT
- `POST /auth/refresh` - Renovar access token
- `GET /users/me` - Dados do usuário autenticado

#### Profile Service (`/api/v1/profiles/*`)
- `POST /profiles/mentor` - Criar perfil de mentor
- `GET /profiles/mentors` - Listar mentores
- `GET /profiles/mentor/{id}` - Detalhes do mentor
- `GET /tags` - Listar tags de especialização

#### Mentorship Service (`/api/v1/mentorships/*`)
- `POST /mentorships` - Criar mentoria (com matchmaking)
- `GET /mentorships/mentee` - Mentorias do mentorado
- `GET /mentorships/mentor` - Mentorias do mentor
- `PUT /mentorships/{id}/schedule` - Agendar sessão
- `POST /mentorships/{id}/feedback/mentor` - Feedback do mentor
- `POST /mentorships/{id}/feedback/mentee` - Avaliação do mentorado

#### Admin Service (`/api/v1/admin/*`)
- `GET /admin/dashboard` - Dashboard administrativo
- `POST /admin/mentors/{id}/approve` - Aprovar mentor
- `POST /admin/vouchers/generate` - Gerar vouchers
- `POST /admin/vouchers/redeem` - Resgatar voucher

Ver documentação completa: [ENDPOINTS-COMPLETOS.md](docs/projeto/ENDPOINTS-COMPLETOS.md)

---

## 👨‍💻 Desenvolvimento

### Build dos Serviços

```bash
# Usar Java 21
export JAVA_HOME=/usr/lib/jvm/temurin-21-jdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Build de um serviço
cd backend/auth-service
mvn clean package -DskipTests

# Build de todos os serviços
cd backend
for service in auth-service profile-service matchmaking-service mentorship-service admin-service api-gateway; do
  cd $service
  mvn clean package -DskipTests
  cd ..
done
```

### Logs

```bash
# Ver logs de um serviço específico
docker compose logs -f auth-service

# Ver logs de todos os serviços
docker compose logs -f

# Usar utilitário de logs
cd logging
./logs.sh auth-service
./logs.sh -f  # Follow mode
```

### MongoDB

```bash
# Acessar MongoDB via CLI
docker exec -it mentorias-mongodb mongosh

# Acessar Mongo Express (GUI)
# http://localhost:8086
# Usuário: admin
# Senha: admin123
```

### Testes

```bash
# Backend - testes unitários
cd backend/auth-service
mvn test

# Mobile - sem testes configurados
# (Projeto focado em desenvolvimento, não inclui testes)
```

---

## ✨ 🔧 Troubleshooting ✨

### ✨ Problemas Comuns ✨

#### ✨ 1. Porta já está em uso ✨

**Problema**: Erro "Address already in use" ao iniciar serviços

**Solução**:
```bash
# Windows - Verificar portas em uso
netstat -ano | findstr :8080

# Linux/macOS - Verificar portas em uso
lsof -i :8080

# Parar processo usando a porta (substitua PID)
# Windows
taskkill /PID <PID> /F

# Linux/macOS
kill -9 <PID>
```

#### ✨ 2. MongoDB não conecta ✨

**Problema**: Erro "Connection refused" ao conectar MongoDB

**Solução**:
```bash
# Verificar se MongoDB está rodando
docker ps | grep mongodb

# Reiniciar MongoDB
docker compose restart mongodb

# Verificar logs do MongoDB
docker compose logs mongodb
```

#### ✨ 3. Erro ao instalar dependências do Mobile ✨

**Problema**: Conflitos de dependências no npm

**Solução**:
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar com --legacy-peer-deps
npm install --legacy-peer-deps
```

#### ✨ 4. Java 21 não reconhecido ✨

**Problema**: Sistema continua usando Java 17 ou outra versão

**Solução**:
```bash
# Verificar versão atual
java -version

# Windows - Configurar JAVA_HOME
set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;%PATH%

# Linux/macOS - Configurar JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/temurin-21-jdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

#### ✨ 5. Erro de autenticação JWT ✨

**Problema**: Token inválido ou expirado

**Solução**:
1. Verifique se o JWT_SECRET está configurado corretamente
2. Faça login novamente para obter novo token
3. Verifique se o token está sendo enviado no header corretamente:
   ```
   Authorization: Bearer <seu-token-aqui>
   ```

#### ✨ 6. Apps mobile não conectam ao backend ✨

**Problema**: Erro de conexão no app mobile

**Solução**:
```bash
# 1. Verifique se o backend está rodando
curl http://localhost:8080/actuator/health

# 2. Verifique a URL no app.json
# Android Emulator: http://10.0.2.2:8080
# iOS Simulator: http://localhost:8080
# Dispositivo físico: http://<SEU_IP>:8080

# 3. Descubra seu IP
# Windows
ipconfig
# Linux/macOS
ifconfig
```

---

## ✨ 🔒 Segurança ✨

### ✨ Boas Práticas de Segurança ✨

#### ✨ 1. Gerar JWT Secret Seguro ✨

```bash
# Usar OpenSSL para gerar chave aleatória
openssl rand -base64 32

# Ou usar Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### ✨ 2. Nunca Commitar Segredos ✨

- ❌ **NUNCA** commite arquivos `.env` no Git
- ✅ Use `.env.example` como template
- ✅ Adicione `.env` no `.gitignore`

#### ✨ 3. Configurações de Produção ✨

```bash
# Use variáveis de ambiente seguras
JWT_SECRET=<chave-super-segura-gerada-aleatoriamente>
MONGODB_URI=<conexão-mongodb-atlas-com-autenticação>

# Configure CORS adequadamente no API Gateway
# Apenas origens confiáveis
```

#### ✨ 4. Proteção de Endpoints ✨

- Todos os endpoints (exceto `/auth/register` e `/auth/login`) requerem autenticação
- Endpoints administrativos requerem role ADMIN
- Health checks são públicos para monitoramento

#### ✨ 5. Senhas ✨

- Senhas são armazenadas usando BCrypt (hash seguro)
- Mínimo de 6 caracteres recomendado
- ✨ Para produção, recomenda-se senhas mais fortes (mínimo 8 caracteres com letras, números e símbolos) ✨

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Ver [CONTRIBUTING.md](.github/CONTRIBUTING.md) para mais detalhes.

### Código de Conduta

- Seja respeitoso com outros colaboradores
- Use linguagem inclusiva
- Foque no que é melhor para a comunidade
- Mostre empatia

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
Copyright (c) 2025 IFTM Campus Uberlândia Centro - UberHub Mentorias
```

---

## 👥 Equipe

**Projeto Acadêmico - IFTM Campus Uberlândia Centro**

- **Disciplinas**: Projeto Microserviços e NOSQL e Projeto Aplicação para Dispositivos Móveis
- **Instituição**: Instituto Federal do Triângulo Mineiro - Campus Uberlândia Centro
- **Ano**: 2025

### Equipes de Desenvolvimento

- **Equipe A**: Alunos do 4º período do Cursou Seprior de Tecnologia em Sistemas para Internet
- **Equipe B**: Alunos do 4º período do Cursou Seprior de Tecnologia em Sistemas para Internet
- **Equipe C**: Alunos do 4º período do Cursou Seprior de Tecnologia em Sistemas para Internet

---

<p align="center">
  Desenvolvido com ❤️ por estudantes do IFTM Campus Uberlândia Centro
</p>

<p align="center">
  <img src="docs/projeto/logo%20udicentro.png" alt="IFTM Logo" width="200"/>
</p>
