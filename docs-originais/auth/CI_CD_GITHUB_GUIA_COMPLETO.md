<a id="topo"></a>

# 🔄 Guia Completo: CI/CD e GitHub

> **Documentação completa de configuração e melhores práticas**

![Status](https://img.shields.io/badge/status-atualizado-success?style=flat-square)
![Última Atualização](https://img.shields.io/badge/atualização-29%2F11%2F2025-informational?style=flat-square)
![Versão](https://img.shields.io/badge/versão-1.0-blue?style=flat-square)

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [GitHub Actions (CI/CD)](#github-actions-cicd)
- [Dependabot](#dependabot)
- [Branch Protection](#branch-protection)
- [O que é `.gitattributes`?](#o-que-é-gitattributes)
- [Templates para Issues e Pull Requests](#templates-para-issues-e-pull-requests)
- [Pre-commit Hooks](#pre-commit-hooks)
- [CODEOWNERS](#codeowners)
- [Versionamento Semântico](#versionamento-semântico)
- [Estrutura de Branches](#estrutura-de-branches)
- [Badges no README](#badges-no-readme)
- [Documentação de Deploy](#documentação-de-deploy)
- [CHANGELOG.md](#changelogmd)
- [Revisar e Consolidar Remotes](#revisar-e-consolidar-remotes)
- [Referências](#referências)

---

<a id="visão-geral"></a>

## Visão Geral

> **💡 Sobre este guia**
>
> Este guia é um **checklist completo** de ações sobre configurações do Git e GitHub para o projeto, especialmente CI/CD. Como fonte de referência, temos após o checklist, tópicos sobre cada item de configuração para consulta rápida além das referências completas ao final do documento. São 16 ações classificadas por prioridade.
>
> - 6 ações com 🔴 (Prioridade Alta)
> - 6 ações com 🟡 (Prioridade Média)
> - 4 ações com 🟢 (Prioridade Baixa)
>
> A seguir a lista de ações ordenadas por prioridade.

- [ ] 🔴 Criar `.gitignore` na raiz do projeto

```text
✅ Consolidar regras comuns
✅ Manter `.gitignore` específicos nos apps apenas para regras específicas
```

- [ ] 🔴 Criar `.gitattributes`

```text

✅ Configurar `.gitattributes` para normalizar line endings, configurar arquivos binários e arquivos de texto
✅ Configurar Git localmente: `git config core.autocrlf true` (Windows) ou `false` (Linux/Mac)
```

Ver seção [O que é .gitattributes?](#o-que-é-gitattributes)

- [ ] 🔴 Configurar branch protection rules

Ver seção [Branch Protection](#branch-protection)

- [ ] 🔴 Criar templates para Issues e PRs

```text
✅ Criar pasta `.github` e estrutura de templates:

.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   └── question.md
├── pull_request_template.md
└── CONTRIBUTING.md
```

Ver seção [Templates para Issues e Pull Requests](#templates-para-issues-e-pull-requests)

- [ ] 🔴 Adicionar LICENSE

```text
✅ Criar arquivo `LICENSE` na raiz do projeto
✅ Recomendação: MIT License (mais utilizada pelas startups brasileiras)
```

- [ ] 🔴 Adicionar SECURITY.md

```text
✅ Criar arquivo `SECURITY.md` na raiz do projeto com:
  🔒 Como reportar vulnerabilidades
  📋 Política de divulgação responsável
  📧 Contatos de segurança
```

- [ ] 🟡 Definir Estrutura de Branches

```text
✅ Definir estratégia de branches (Git Flow, GitHub Flow, etc.)
✅ Estabelecer convenções de nomenclatura (`feature/`, `bugfix/`, `hotfix/`, etc.)
✅ Documentar workflow de branches no `CONTRIBUTING.md`
✅ Configurar branch protection baseada na estrutura definida
```

Ver seção [Estrutura de Branches](#estrutura-de-branches)

- [ ] 🟡 Configurar CI/CD (GitHub Actions)

```text
✅ Criar workflows do GitHub Actions para:
  🧪 Testes automatizados
  🔍 Linting
  🔨 Build verification
  🚀 Deploy automatizado
```

Ver seção [GitHub Actions (CI/CD)](#github-actions-cicd)

- [ ] 🟡 Adicionar pre-commit hooks

ver seção [Pre-commit Hooks](#pre-commit-hooks)

- [ ] 🟡 Configurar Dependabot

```text
✅ Configurar Dependabot para:
  🔍 Monitorar dependências
  🔄 Criar Pull Requests de atualizações
  🔄 Criar Pull Requests de correções de vulnerabilidades
  🔄 Criar Pull Requests de atualizações de segurança
  🔄 Criar Pull Requests de atualizações de dependências
```

ver seção [Dependabot](#dependabot)

- [ ] 🟡 Criar CODEOWNERS

```text
✅ Criar arquivo `CODEOWNERS` na raiz do projeto com:
  🔍 Responsáveis por cada app mobile
```

Ver seção [CODEOWNERS](#codeowners)

- [ ] 🟡 Implementar versionamento semântico

```text
🔖 Implementar versionamento semântico
🔖 Criar tags para cada release
🔖 Usar GitHub Releases
```

Ver seção [Versionamento Semântico](#versionamento-semântico)

- [ ] 🟢 Adicionar badges no README

```text
✅ Adicionar badges de CI/CD, cobertura de testes, versão e licença
✅ Organizar badges por categoria no README
✅ Manter badges atualizados e relevantes
```

Ver seção [Badges no README](#badges-no-readme)

- [ ] 🟢 Melhorar documentação de deploy

```text
✅ Documentar processo de deploy para cada ambiente (desenvolvimento, staging, produção)
✅ Incluir instruções passo a passo para deploy manual (se aplicável)
✅ Documentar variáveis de ambiente necessárias
✅ Criar guia de rollback em caso de problemas
✅ Documentar requisitos de infraestrutura e dependências
✅ Incluir checklist pré-deploy
```

(ver seção [Documentação de Deploy](#documentação-de-deploy))

- [ ] 🟢 Adicionar CHANGELOG.md

```text
✅ Criar arquivo `CHANGELOG.md` na raiz do projeto
✅ Seguir formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
✅ Documentar todas as mudanças notáveis por versão
✅ Organizar por categorias: Adicionado, Modificado, Corrigido, Removido, Segurança
✅ Manter CHANGELOG atualizado a cada release
✅ Usar ferramentas como `standard-version` para gerar automaticamente
```

(ver seção [CHANGELOG.md](#changelogmd))

- [ ] 🟢 Revisar e consolidar remotes

```text
✅ Verificar remotes configurados: `git remote -v`
✅ Remover remotes duplicados ou não utilizados
✅ Consolidar em um único remote principal (origin)
✅ Verificar URLs dos remotes (HTTPS vs SSH)
✅ Documentar remotes necessários no README ou CONTRIBUTING.md
✅ Atualizar referências em scripts e documentação
```

(ver seção [Revisar e Consolidar Remotes](#revisar-e-consolidar-remotes))

---

# 📚 Referências Detalhadas

> _Documentação completa de cada tópico abordado no checklist_

---

<a id="github-actions-cicd"></a>

## GitHub Actions (CI/CD) **[⬆️](#topo)**

### 📖 O que é CI/CD

> **CI (Continuous Integration)**  
> É a prática de integrar código frequentemente, com builds e testes automatizados.
>
> **CD (Continuous Deployment)**  
> É a prática de fazer deploy automaticamente após testes bem-sucedidos.

### ⚙️ Como o CI Funciona

**O workflow de CI é executado automaticamente quando:**

- 📤 Um código é enviado (push) para as branches `main` ou `develop`
- 🔄 Um Pull Request é aberto ou atualizado para `main` ou `develop`

> **ℹ️ O workflow é composto por 4 jobs principais que executam em paralelo:**

1. **`mobile-lint-and-test`** - Valida código e testes dos apps mobile
2. **`mobile-build-check`** - Verifica se os apps compilam corretamente
3. **`backend-build`** - Compila e testa os 6 microserviços Spring Boot
4. **`docker-compose-validate`** - Valida a sintaxe do docker-compose.yml

### Estrutura dos Jobs

#### 1. 📱 Mobile Lint and Test

**O que faz:**

- 📦 Instala dependências npm com `--legacy-peer-deps` (necessário para React Native)
- 🔍 Executa linter (se configurado)
- 🧪 Executa testes Jest com cobertura
- 📊 Faz upload da cobertura para Codecov

**Matrix Strategy:**

```yaml
matrix:
  app: [mentorApp, mentoradoApp]
```

Isso cria **2 jobs paralelos**, um para cada app.

**Exemplo de execução:**

```bash
# Job 1: mentorApp
cd mobile/mentorApp
npm ci --legacy-peer-deps
npm run lint || echo "Linter não configurado ainda"
npm test -- --coverage --watchAll=false

# Job 2: mentoradoApp (executando em paralelo)
cd mobile/mentoradoApp
npm ci --legacy-peer-deps
npm run lint || echo "Linter não configurado ainda"
npm test -- --coverage --watchAll=false
```

#### 2. 🔨 Mobile Build Check

**O que faz:**

- ✅ Verifica se o app pode ser compilado/exportado com Expo
- ⚡ Não executa testes, apenas valida o build

**Exemplo de execução:**

```bash
cd mobile/mentorApp
npm ci --legacy-peer-deps
npx expo export --platform web
```

#### 3. ⚙️ Backend Build

**O que faz:**

- ☕ Configura Java 21 (Temurin distribution)
- 🔨 Compila cada microserviço com Maven
- 🧪 Executa testes (se existirem)
- 📤 Faz upload dos resultados de testes como artifacts

**Matrix Strategy:**

```yaml
matrix:
  service:
    - auth-service
    - profile-service
    - matchmaking-service
    - mentorship-service
    - admin-service
    - api-gateway
```

Isso cria **6 jobs paralelos**, um para cada serviço.

**Exemplo de execução:**

```bash
# Job 1: auth-service
cd backend/auth-service
mvn clean package -DskipTests
mvn test

# Job 2: profile-service (executando em paralelo)
cd backend/profile-service
mvn clean package -DskipTests
mvn test

# ... e assim por diante para os outros 4 serviços
```

**Cache Maven:**
O cache é configurado automaticamente pela action `setup-java@v4` com `cache: "maven"`. Isso acelera builds subsequentes ao reutilizar dependências baixadas.

#### 4. 🐳 Docker Compose Validate

**O que faz:**

- ✅ Valida a sintaxe do arquivo `docker-compose.yml`
- 🔍 Verifica se todas as configurações estão corretas

**Exemplo de execução:**

```bash
docker compose config --quiet
```

### 📊 Interpretando os Resultados

#### ✅ Status: Success (Verde)

> **✅ Todos os jobs passaram:**
>
> - ✅ Apps mobile compilam e testes passam
> - ✅ Backend compila sem erros
> - ✅ Docker Compose está válido
>
> **🎯 Ação:** Código está pronto para merge/deploy.

#### ⚠️ Status: Partial Success (Amarelo)

> **⚠️ Alguns jobs falharam, mas com `continue-on-error: true`:**
>
> - ⚠️ Linter não configurado (esperado)
> - ⚠️ Testes falharam mas não bloqueiam
> - ⚠️ Algum serviço backend não tem testes
>
> **🎯 Ação:** Revisar logs para entender falhas não críticas.

#### ❌ Status: Failure (Vermelho)

> **❌ Jobs críticos falharam:**
>
> - ❌ Build do mobile falhou
> - ❌ Build do backend falhou
> - ❌ Docker Compose inválido
>
> **🎯 Ação:** Corrigir problemas antes de fazer merge.

### 🔧 Troubleshooting CI

#### ❌ Problema: "npm ci failed"

> **Causa comum:** `package-lock.json` desatualizado ou conflitos de dependências.

**💡 Solução:**

```bash
cd mobile/mentorApp
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
git add package-lock.json
git commit -m "chore: update package-lock.json"
```

#### ❌ Problema: "Maven build failed"

> **Causa comum:** Erro de compilação Java ou dependências faltando.

**💡 Solução:**

```bash
cd backend/auth-service
mvn clean
mvn dependency:resolve
mvn clean package
```

#### ❌ Problema: "Docker Compose validation failed"

> **Causa comum:** Sintaxe YAML incorreta ou variáveis não definidas.

**💡 Solução:**

```bash
docker compose config
# Isso mostrará o erro exato
```

#### ⚠️ Problema: "Tests are failing but continue-on-error"

> **Causa comum:** Testes quebrados que não estão bloqueando o CI.

**💡 Solução:**

- 🔍 Verificar logs do step "Run tests"
- 🔧 Corrigir testes ou código
- ⚙️ Remover `continue-on-error: true` se quiser que testes bloqueiem

### ⭐ Melhores Práticas CI/CD

1. **✅ Sempre verificar o CI antes de mergear:**

   - ⏳ Aguardar todos os jobs completarem
   - 🔍 Revisar falhas, mesmo com `continue-on-error`

2. **🧪 Executar localmente antes de push:**

```bash
# Mobile
cd mobile/mentorApp && npm test

# Backend
cd backend/auth-service && mvn test
```

3. **📦 Manter dependências atualizadas:**

   - 🤖 Usar Dependabot para atualizações automáticas
   - 🧪 Testar atualizações em branch separada

4. **📊 Monitorar cobertura de testes:**
   - 📈 Verificar relatórios do Codecov
   - 🎯 Manter cobertura acima de 70% (recomendado)

---

<a id="dependabot"></a>

## Dependabot **[⬆️](#topo)**

### 📖 O que é Dependabot

> **Dependabot** é um bot automatizado do GitHub que monitora as dependências do seu projeto e cria Pull Requests (PRs) automaticamente quando encontra atualizações disponíveis ou vulnerabilidades de segurança.

### ⚙️ Como Funciona

1. **📊 Monitoramento Automático**  
   O Dependabot verifica periodicamente (diariamente, semanalmente, etc.) os arquivos de dependências do projeto

2. **🔍 Detecção de Atualizações**  
   Compara as versões atuais com as versões mais recentes disponíveis nos repositórios de pacotes

3. **🔄 Criação de PRs**  
   Quando encontra atualizações, cria automaticamente um Pull Request com as mudanças

4. **🔒 Detecção de Vulnerabilidades**  
   Identifica dependências com vulnerabilidades conhecidas e cria PRs de correção prioritários

### 💡 Exemplos Práticos

#### 📦 Exemplo 1: Atualização de Dependência NPM

> **Situação:** Seu projeto usa `react-native: 0.72.0` e a versão `0.72.5` é lançada com correções de bugs.
>
> **O que o Dependabot faz:**
>
> - ✅ Detecta que há uma versão mais recente disponível
> - 🔄 Cria um PR automaticamente atualizando `package.json`
> - 📋 O PR inclui informações sobre o que mudou na nova versão

#### 🔒 Exemplo 2: Correção de Vulnerabilidade Crítica

> ⚠️ **Situação:** Uma biblioteca que você usa (`jsonwebtoken: 8.5.1`) tem uma vulnerabilidade de segurança (CVE-2023-12345) e a versão `8.5.2` corrige o problema.
>
> **O que o Dependabot faz:**
>
> - 🚨 Detecta a vulnerabilidade através do GitHub Security Advisories
> - 🔴 Cria um PR marcado como **"security"** com alta prioridade
> - 📋 O PR mostra detalhes da vulnerabilidade e como ela é corrigida

### 📊 Tipos de Atualizações

O Dependabot categoriza atualizações em três tipos (usando [Semantic Versioning](https://semver.org/)):

- **🟢 Patch (1.0.0 → 1.0.1):** Correções de bugs e segurança - geralmente seguro fazer merge
- **🟡 Minor (1.0.0 → 1.1.0):** Novas funcionalidades (retrocompatíveis) - requer revisão
- **🔴 Major (1.0.0 → 2.0.0):** Mudanças que podem quebrar compatibilidade - requer testes extensivos

### 🎯 Estratégia Recomendada

#### 📋 Para PRs atuais

1. ✅ Use o script para mesclar os que estão prontos (checks ✅)
2. 🔍 Revise manualmente os que falharam
3. 🗑️ Feche os que não são necessários

#### 🚀 Para PRs futuros

- 🤖 O auto-merge cuidará da maioria automaticamente
- 👀 Você só precisará revisar major updates e security updates

---

<a id="branch-protection"></a>

## Branch Protection **[⬆️](#topo)**

### ⚙️ Como Configurar Branch Protection

#### 📋 Pré-requisitos

- 👤 Acesso de **Administrador** ou **Owner** ao repositório
- 📦 Repositório no GitHub

#### 📝 Passo a Passo

**1. Acessar as Configurações do Repositório**

- 🌐 Acesse seu repositório no GitHub
- ⚙️ Clique na aba **Settings** (Configurações)
- 📂 No menu lateral esquerdo, clique em **Branches** (Ramificações)

**2. Adicionar Regra de Proteção**

- ➕ Na seção **Branch protection rules**, clique no botão **Add classic  branch protection rule**
- 📝 No campo **Branch name pattern**, digite o nome da branch que deseja proteger:
  - Para proteger a branch principal: `main`

**3. Configurar as Proteções**

##### ✅ Require pull request reviews before merging

**O que faz:** Exige que pelo menos uma pessoa revise o código antes de fazer merge.

**Como configurar:**

1. ✅ Marque a opção **Require pull request reviews before merging**
2. ⚙️ Configure as opções:
   - **Required number of approvals:** `1` (ou mais)
   - **Dismiss stale pull request approvals when new commits are pushed:** ✅ (recomendado)
   - **Require review from Code Owners:** ✅ (recomendado, se você tiver CODEOWNERS)

##### ✅ Require status checks to pass before merging

**O que faz:** Exige que todos os checks de CI/CD passem antes de permitir o merge.

**Como configurar:**

1. ✅ Marque a opção **Require status checks to pass before merging**
2. ✅ Marque também **Require branches to be up to date before merging**
3. 📋 Selecione quais status checks são obrigatórios

> **ℹ️ Nota:** Os status checks só aparecerão aqui depois que você tiver executado pelo menos um workflow de CI/CD que crie esses checks.

#### ⭐ Outras Opções Recomendadas

- ✅ **Require linear history**: Exige que o histórico seja linear (sem merge commits)
- ✅ **Include administrators**: Aplica as regras mesmo para administradores

### 🎯 Configuração Recomendada

```text
Branch name pattern: main

☑ Require pull request reviews before merging
   ☑ Required approvals: 1
   ☑ Dismiss stale pull request approvals when new commits are pushed
   ☑ Require review from Code Owners

☑ Require status checks to pass before merging
   ☑ Require branches to be up to date before merging

   Status checks:
   ☑ lint-and-test (mentorApp)
   ☑ lint-and-test (mentoradoApp)
   ☑ build-check (mentorApp)
   ☑ build-check (mentoradoApp)

☑ Do not allow bypassing the above settings
```

### ✅ Verificação Branch Protection

#### 🧪 Teste 1: Tentar Push Direto

1. Tente fazer push direto na branch `main`:

   ```bash
   git checkout main
   git commit --allow-empty -m "Test: direct push"
   git push origin main
   ```

2. **Resultado esperado:** O push deve ser rejeitado com uma mensagem como:

   ```text
   ! [remote rejected] main -> main (protected branch hook declined)
   ```

#### 🧪 Teste 2: Criar Pull Request

1. Crie uma nova branch e faça push

```bash
git checkout -b test-branch
git push origin test-branch
```

2. Crie um Pull Request no GitHub

Entrar no GitHub/Pull Requests e criar um Pull Request a partir da branch test-branch para a branch main.


3. **Resultado esperado:**
   - O botão "Merge" deve estar desabilitado até que:
     - ✅ Pelo menos 1 revisão seja aprovada
     - ✅ Todos os status checks passem
     - ✅ A branch esteja atualizada

### Problemas Comuns Branch Protection

#### Problema: "Status checks not found"

**Causa:** Os workflows de CI/CD ainda não foram executados ou não estão criando os checks corretamente.

**Solução:**

1. Faça um commit e push em uma branch
2. Crie um Pull Request
3. Aguarde os workflows executarem
4. Volte às configurações de branch protection
5. Os checks agora devem aparecer na lista

#### Problema: "No one can merge this PR"

**Causa:** As regras estão muito restritivas ou não há pessoas com permissão.

**Solução:**

1. Verifique se há revisores disponíveis
2. Verifique se os status checks estão passando
3. Considere adicionar exceções temporárias se necessário

#### Problema: "Branch is out of date"

**Causa:** A branch não está atualizada com `main`.

**Solução:**

```bash
git checkout sua-branch
git fetch origin
git rebase origin/main
# ou
git merge origin/main
git push origin sua-branch
```

### Boas Práticas Branch Protection

1. **Sempre proteja a branch principal:** `main` ou `master`
2. **Proteja branches de desenvolvimento:** `develop` (se usar Git Flow)
3. **Use CODEOWNERS:** Facilita a atribuição de revisores
4. **Configure status checks:** Garante qualidade antes do merge
5. **Inclua administradores:** Ninguém deve contornar as regras
6. **Documente as regras:** Mantenha este guia atualizado

---

<a id="o-que-é-gitattributes"></a>

## O que é `.gitattributes`? **[⬆️](#topo)**

O `.gitattributes` é um arquivo de configuração do Git que define atributos para arquivos e padrões. Ele resolve problemas de line endings (CRLF/LF), identifica arquivos binários e controla como o Git trata diferentes tipos de arquivo.

### Problema: Line Endings (CRLF vs LF)

Diferentes sistemas operacionais usam diferentes caracteres para quebra de linha:

- Windows: CRLF (`\r\n`)
- Linux/Mac: LF (`\n`)
- Mac antigo: CR (`\r`)

Sem normalização, isso pode causar:

- Diferenças desnecessárias no diff
- Conflitos em merges
- Problemas em scripts
- Avisos do Git sobre conversão

### Solução: `.gitattributes`

O `.gitattributes` força o Git a normalizar line endings no repositório, independente do sistema operacional.

### Exemplo de `.gitattributes`

Crie um arquivo `.gitattributes` na raiz do projeto:

```bash
# Normalizar line endings para todos os arquivos de texto
* text=auto

# Forçar LF para arquivos de código fonte
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.xml text eol=lf
*.html text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.sh text eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

# Arquivos binários (não normalizar)
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.pdf binary
*.zip binary
*.tar.gz binary
*.exe binary
*.dll binary
*.so binary
*.dylib binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
*.otf binary

# Arquivos de texto que devem ser normalizados
*.txt text
*.log text
*.env text
*.env.example text

# Arquivos de configuração
.gitignore text
.gitattributes text
.editorconfig text

# Arquivos do Node.js
package.json text eol=lf
package-lock.json text eol=lf
yarn.lock text eol=lf
pnpm-lock.yaml text eol=lf

# Arquivos do React Native
*.pbxproj text eol=lf
*.xcconfig text eol=lf
*.plist text eol=lf
```

### Explicação dos atributos

#### `text=auto`

- Git detecta automaticamente se é texto ou binário
- Normaliza line endings conforme necessário

#### `text eol=lf`

- Força o arquivo a ser tratado como texto
- Normaliza para LF no repositório
- Converte para o line ending do sistema ao fazer checkout

#### `text eol=crlf`

- Força o arquivo a ser tratado como texto
- Normaliza para CRLF no repositório
- Útil para scripts do Windows (`.bat`, `.cmd`, `.ps1`)

#### `binary`

- Marca o arquivo como binário
- Git não tenta normalizar line endings
- Git não mostra diff textual

### Configuração local do Git

Além do `.gitattributes`, configure o Git localmente:

### Windows

```bash
# Converter CRLF para LF ao commitar, LF para CRLF ao fazer checkout
git config --global core.autocrlf true

# Ou apenas converter ao commitar (recomendado)
git config --global core.autocrlf input
```

### Linux/Mac

```bash
# Não fazer conversão automática
git config --global core.autocrlf false
```

### Verificar configuração atual

```bash
git config core.autocrlf
```

### Aplicar normalização em repositório existente

Se o repositório já tem arquivos com line endings mistos:

```bash
# 1. Criar/atualizar .gitattributes
# (use o exemplo acima)

# 2. Normalizar todos os arquivos
git add --renormalize .

# 3. Verificar mudanças
git status

# 4. Commit
git commit -m "Normalizar line endings com .gitattributes"
```

### Exemplo prático para seu projeto

Para um projeto React/React Native com Node.js:

```bash
# Auto-detect text files and perform LF normalization
* text=auto

# Source code (force LF)
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.yaml text eol=lf

# Scripts (manter line ending nativo)
*.sh text eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

# Binários
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.pdf binary
*.zip binary
*.woff binary
*.woff2 binary
*.ttf binary

# Arquivos de configuração
.gitignore text eol=lf
.gitattributes text eol=lf
.editorconfig text eol=lf
.env.example text eol=lf

# Lock files
package-lock.json text eol=lf
yarn.lock text eol=lf
pnpm-lock.yaml text eol=lf
```

### Benefícios

1. Consistência: todos os desenvolvedores usam os mesmos line endings
2. Menos conflitos: evita conflitos por line endings
3. Diffs mais limpos: não mostra mudanças de line endings
4. Compatibilidade: funciona bem em Windows, Linux e Mac

### Verificação

```bash
# Verificar line endings de um arquivo
file nome-do-arquivo.js

# Verificar configuração do Git
git config --list | grep autocrlf

# Verificar atributos de um arquivo
git check-attr -a nome-do-arquivo.js
```

### Resumo

- `.gitattributes` normaliza line endings no repositório
- Define quais arquivos são texto e quais são binários
- Funciona junto com `core.autocrlf` do Git
- Deve ser commitado no repositório para aplicar a todos

---

<a id="templates-para-issues-e-pull-requests"></a>

## Templates para Issues e Pull Requests **[⬆️](#topo)**

### O que são Templates?

Templates são arquivos Markdown que padronizam a criação de Issues e Pull Requests no GitHub. Eles garantem que todas as issues e PRs tenham informações consistentes e completas.

### Benefícios

1. **Consistência**: Todas as issues/PRs seguem o mesmo formato
2. **Completude**: Força o preenchimento de informações importantes
3. **Eficiência**: Reduz tempo de triagem e revisão
4. **Documentação**: Serve como guia para novos contribuidores

### Estrutura de Diretórios

```text
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   └── config.yml (opcional)
└── pull_request_template.md
```

---

### Templates de Issues

#### 1. Template de Bug Report

Crie `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: 🐛 Bug Report
about: Reportar um bug ou problema
title: "[BUG] "
labels: bug
assignees: ""
---

## 📋 Descrição do Bug

Uma descrição clara e concisa do bug.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

Uma descrição clara do que você esperava que acontecesse.

## ❌ Comportamento Atual

Uma descrição clara do que está acontecendo.

## 📸 Screenshots

Se aplicável, adicione screenshots para ajudar a explicar o problema.

## 🖥️ Ambiente

- **OS**: [ex: Windows 10, macOS 12.0, Ubuntu 22.04]
- **Navegador**: [ex: Chrome 120, Firefox 121, Safari 17]
- **Versão**: [ex: 1.2.3]

## 📝 Informações Adicionais

Adicione qualquer outro contexto sobre o problema aqui.

## 🔍 Checklist

- [ ] Verifiquei se o bug já foi reportado
- [ ] Adicionei informações suficientes para reproduzir
- [ ] Incluí screenshots se aplicável
- [ ] Testei em diferentes navegadores/ambientes
```

#### 2. Template de Feature Request

Crie `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: ✨ Feature Request
about: Sugerir uma nova funcionalidade
title: "[FEATURE] "
labels: enhancement
assignees: ""
---

## 🎯 Problema ou Necessidade

Uma descrição clara do problema que esta feature resolveria ou da necessidade que atenderia.

## 💡 Solução Proposta

Uma descrição clara da solução que você gostaria de ver implementada.

## 🔄 Alternativas Consideradas

Uma descrição de outras soluções ou features que você considerou.

## 📊 Impacto

- **Usuários afetados**: [ex: Todos, Apenas admins, Desenvolvedores]
- **Prioridade**: [ex: Alta, Média, Baixa]
- **Complexidade estimada**: [ex: Baixa, Média, Alta]

## 📝 Informações Adicionais

Adicione qualquer outro contexto, mockups, ou exemplos sobre a feature aqui.

## 🔍 Checklist

- [ ] Verifiquei se a feature já foi solicitada
- [ ] Descrevi claramente o problema/necessidade
- [ ] Proporcionei uma solução clara
- [ ] Considerei alternativas
```

#### 3. Template de Question/Dúvida

Crie `.github/ISSUE_TEMPLATE/question.md`:

```markdown
---
name: ❓ Question
about: Fazer uma pergunta ou tirar uma dúvida
title: "[QUESTION] "
labels: question
assignees: ""
---

## ❓ Pergunta

Sua pergunta aqui.

## 🔍 O que você já tentou?

Descreva o que você já tentou fazer ou pesquisar.

## 📚 Contexto Adicional

Adicione qualquer contexto adicional, links, ou exemplos que possam ajudar.

## 📝 Informações do Ambiente

- **Versão**: [ex: 1.2.3]
- **OS**: [ex: Windows 10]
- **Navegador**: [ex: Chrome 120] (se aplicável)
```

#### 4. Configuração de Template (Opcional)

Crie `.github/ISSUE_TEMPLATE/config.yml` para personalizar o formulário:

```yaml
blank_issues_enabled: false
contact_links:
  - name: 💬 Discussões
    url: https://github.com/seu-usuario/seu-repo/discussions
    about: Pergunte e discuta com a comunidade
  - name: 📖 Documentação
    url: https://github.com/seu-usuario/seu-repo/wiki
    about: Consulte a documentação do projeto
```

---

### Template de Pull Request

Crie `.github/pull_request_template.md`:

```markdown
## 📋 Descrição

Uma descrição clara e concisa do que este PR faz.

## 🔗 Issue Relacionada

Closes #(número da issue)

## 🔄 Tipo de Mudança

Marque com um `x` as opções que se aplicam:

- [ ] 🐛 Bug fix (correção que não quebra funcionalidade existente)
- [ ] ✨ Nova feature (mudança que adiciona funcionalidade sem quebrar existente)
- [ ] 💥 Breaking change (correção ou feature que quebra funcionalidade existente)
- [ ] 📝 Documentação (mudanças apenas em documentação)
- [ ] 🎨 Estilo (formatação, ponto e vírgula faltando, etc; sem mudança de código)
- [ ] ♻️ Refatoração (mudança de código que não corrige bug nem adiciona feature)
- [ ] ⚡ Performance (mudança que melhora performance)
- [ ] ✅ Teste (adição ou correção de testes)
- [ ] 🔧 Build (mudanças no sistema de build ou dependências)

## 🧪 Como Testar

Descreva os testes que você executou para verificar suas mudanças:

1. Passo 1
2. Passo 2
3. Passo 3

## 📸 Screenshots (se aplicável)

Adicione screenshots para ajudar a explicar suas mudanças.

## ✅ Checklist

- [ ] Meu código segue os padrões de estilo do projeto
- [ ] Realizei uma auto-revisão do meu código
- [ ] Comentei código complexo, especialmente em áreas difíceis de entender
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes que provam que minha correção é efetiva ou que minha feature funciona
- [ ] Testes novos e existentes passam localmente com minhas mudanças
- [ ] Atualizei a documentação conforme necessário
- [ ] Minhas mudanças não quebram funcionalidades existentes

## 📝 Notas Adicionais

Adicione qualquer outra informação relevante sobre o PR aqui.

## 🔍 Revisores Sugeridos

@usuario1 @usuario2
```

---

### Template Simplificado de PR

Para projetos menores, um template mais simples:

```markdown
## Descrição

[Descreva brevemente o que este PR faz]

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist

- [ ] Código testado
- [ ] Documentação atualizada
- [ ] Sem warnings
```

---

### Como Funciona

1. **Templates de Issues**:

   - Quando um usuário cria uma nova issue, o GitHub mostra um menu para escolher o tipo
   - O template selecionado preenche automaticamente o corpo da issue
   - O usuário preenche as seções e submete

2. **Template de PR**:
   - Quando um PR é criado, o template aparece automaticamente no corpo
   - O desenvolvedor preenche as seções relevantes
   - Facilita a revisão e documentação

---

### Exemplo Prático para Projeto React/React Native

#### Template de Bug para Mobile

```markdown
---
name: 🐛 Bug Mobile
about: Reportar bug em aplicativo mobile
title: "[MOBILE BUG] "
labels: bug, mobile
---

## 📱 Plataforma

- [ ] Android
- [ ] iOS
- [ ] Ambos

## 📋 Descrição

[Descreva o bug]

## 🔄 Passos para Reproduzir

1. ...
2. ...

## ✅ Esperado

[O que deveria acontecer]

## ❌ Atual

[O que está acontecendo]

## 📸 Screenshots/Logs

[Adicione screenshots ou logs do console]
```

#### Template de PR para Feature

```markdown
## 🎯 Feature

[Descrição da feature]

## 📱 Plataformas

- [ ] Web
- [ ] Android
- [ ] iOS

## 🧪 Testes

- [ ] Testes unitários adicionados
- [ ] Testes em dispositivo físico
- [ ] Testes em emulador/simulador

## 📸 Screenshots

[Adicione screenshots se aplicável]

## ✅ Checklist

- [ ] Código segue padrões do projeto
- [ ] Documentação atualizada
- [ ] Sem warnings ou erros
- [ ] Testado em todas as plataformas relevantes
```

---

### Boas Práticas

1. **Seja Específico**: Templates devem pedir informações relevantes
2. **Seja Conciso**: Não crie templates muito longos
3. **Use Checklist**: Facilita revisão e acompanhamento
4. **Atualize Regularmente**: Ajuste templates conforme o projeto evolui
5. **Documente**: Explique como usar os templates no CONTRIBUTING.md

---

### Configuração no Repositório

1. **Criar diretório**:

   ```bash
   mkdir -p .github/ISSUE_TEMPLATE
   ```

2. **Criar templates**:

   - `bug_report.md`
   - `feature_request.md`
   - `question.md`
   - `config.yml` (opcional)

3. **Criar template de PR**:

   ```bash
   touch .github/pull_request_template.md
   ```

4. **Commitar**:

   ```bash
   git add .github/
   git commit -m "Adicionar templates de Issues e PRs"
   git push
   ```

---

### Verificação

Após criar os templates:

1. Vá para o repositório no GitHub
2. Clique em "New Issue"
3. Verifique se os templates aparecem como opções
4. Crie um PR de teste para verificar o template de PR

---

### Resumo

- Templates padronizam Issues e PRs
- Melhoram qualidade e completude das informações
- Facilitam triagem e revisão
- Devem ser mantidos no diretório `.github/`
- Podem ser customizados com `config.yml` para Issues

---

<a id="pre-commit-hooks"></a>

## Pre-commit Hooks **[⬆️](#topo)**

### O que são Pre-commit Hooks?

Pre-commit hooks são scripts que executam automaticamente antes de cada commit no Git. Eles validam o código e podem bloquear commits que não atendem aos padrões estabelecidos.

### Benefícios

1. **Previne Problemas**: Detecta erros antes do código entrar no repositório
2. **Mantém Padrões**: Garante que todo código segue os padrões do projeto
3. **Economiza Tempo**: Evita que problemas cheguem ao CI/CD
4. **Melhora Qualidade**: Força boas práticas desde o início

### Como Funciona

```text
git commit -m "mensagem"
    ↓
Pre-commit hooks executam
    ↓
✅ Passou? → Commit é criado
❌ Falhou? → Commit é bloqueado (você precisa corrigir)
```

### Ferramentas Populares

#### 1. Husky (JavaScript/Node.js) ⭐ Recomendado

**Instalação**:

```bash
# Instalar Husky e lint-staged
npm install --save-dev husky lint-staged

# Inicializar Husky
npx husky install

# Criar hook de pre-commit
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configuração no `package.json`**:

```json
{
	"scripts": {
		"prepare": "husky install"
	},
	"lint-staged": {
		"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{json,md,yml,yaml}": ["prettier --write"],
		"*.{js,jsx,ts,tsx,json,md}": ["git add"]
	}
}
```

**Estrutura de diretórios**:

```text
.husky/
└── pre-commit
```

**Exemplo de `.husky/pre-commit`**:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### 2. Pre-commit (Python, funciona com qualquer linguagem)

**Instalação**:

```bash
# Instalar pre-commit
pip install pre-commit

# Criar arquivo de configuração
# .pre-commit-config.yaml (veja exemplo abaixo)

# Instalar hooks
pre-commit install
```

**Configuração `.pre-commit-config.yaml`**:

```yaml
repos:
  # Hooks básicos
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-added-large-files
      - id: check-merge-conflict
      - id: check-case-conflict

  # ESLint para JavaScript
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.56.0
    hooks:
      - id: eslint
        files: \.(js|jsx|ts|tsx)$
        additional_dependencies:
          - eslint@8.56.0
          - "@typescript-eslint/eslint-plugin@5.0.0"

  # Prettier
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v3.1.0
    hooks:
      - id: prettier
        files: \.(js|jsx|ts|tsx|json|md|yml|yaml)$
```

---

### Exemplo Completo: Husky + lint-staged

#### 1. Instalar dependências

```bash
npm install --save-dev husky lint-staged
```

#### 2. Configurar `package.json`

```json
{
	"name": "seu-projeto",
	"version": "1.0.0",
	"scripts": {
		"prepare": "husky install"
	},
	"devDependencies": {
		"husky": "^8.0.0",
		"lint-staged": "^15.0.0",
		"eslint": "^8.0.0",
		"prettier": "^3.0.0"
	},
	"lint-staged": {
		"*.{js,jsx}": ["eslint --fix", "prettier --write"],
		"*.{ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{json,md,yml,yaml}": ["prettier --write"],
		"*.{js,jsx,ts,tsx,json,md}": ["git add"]
	}
}
```

#### 3. Inicializar Husky

```bash
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 4. Testar

```bash
# Fazer uma mudança no código
echo "const test = 'test'" > test.js

# Tentar commitar
git add test.js
git commit -m "test"

# O hook deve executar e formatar o arquivo automaticamente
```

---

### Hooks Adicionais Úteis

#### Pre-push Hook

Executa antes do push:

```bash
npx husky add .husky/pre-push "npm test"
```

**Exemplo de `.husky/pre-push`**:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

#### Commit-msg Hook (valida mensagem de commit)

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

**Instalar commitlint**:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

**Criar `commitlint.config.js`**:

```javascript
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat", // Nova feature
				"fix", // Correção de bug
				"docs", // Documentação
				"style", // Formatação
				"refactor", // Refatoração
				"test", // Testes
				"chore", // Manutenção
			],
		],
	},
};
```

---

### Exemplo para Projeto React/React Native

**`package.json` completo**:

```json
{
	"name": "mentorias-frontend",
	"version": "1.0.0",
	"scripts": {
		"prepare": "husky install",
		"lint": "eslint . --ext .js,.jsx,.ts,.tsx",
		"lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
		"format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,yml,yaml}\""
	},
	"devDependencies": {
		"husky": "^8.0.0",
		"lint-staged": "^15.0.0",
		"eslint": "^8.57.0",
		"prettier": "^3.2.0",
		"@typescript-eslint/eslint-plugin": "^6.0.0",
		"@typescript-eslint/parser": "^6.0.0"
	},
	"lint-staged": {
		"*.{js,jsx}": ["eslint --fix", "prettier --write"],
		"*.{ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{json,md,yml,yaml}": ["prettier --write"],
		"*.{js,jsx,ts,tsx,json,md}": ["git add"]
	}
}
```

---

### Validações Comuns

#### 1. Linting (ESLint)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ]
}
```

#### 2. Formatação (Prettier)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

#### 3. Verificação de Tipos (TypeScript)

```json
"lint-staged": {
  "*.{ts,tsx}": [
    "tsc --noEmit"
  ]
}
```

#### 4. Testes

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "npm test -- --findRelatedTests"
  ]
}
```

#### 5. Verificar Secrets/Tokens

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,env}": [
    "grep -L 'GITHUB_TOKEN\\|API_KEY\\|SECRET' || (echo '⚠️  Possível token encontrado!' && exit 1)"
  ]
}
```

---

### Pular Hooks (Emergência)

⚠️ **Use apenas em emergências!**

```bash
# Pular pre-commit hook
git commit --no-verify -m "mensagem"

# Pular pre-push hook
git push --no-verify
```

---

### Troubleshooting

#### Problema: Hook não executa

**Solução**:

```bash
# Verificar se Husky está instalado
ls -la .husky/

# Reinstalar hooks
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

#### Problema: Hook muito lento

**Solução**: Limitar arquivos processados

```json
"lint-staged": {
  "*.{js,jsx}": [
    "eslint --fix --max-warnings 0"
  ]
}
```

#### Problema: Erro de permissão (Linux/Mac)

**Solução**:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

### Boas Práticas

1. **Seja Rápido**: Hooks devem executar em segundos, não minutos
2. **Seja Claro**: Mensagens de erro devem ser úteis e específicas
3. **Seja Flexível**: Permita pular em emergências (com aviso)
4. **Documente**: Explique hooks no README ou CONTRIBUTING.md
5. **Mantenha Atualizado**: Atualize dependências regularmente

---

### Configuração no Repositório

1. **Adicionar ao `.gitignore`** (se necessário):

```text
# Husky
.husky/_/
```

2. **Commitar configuração**:

```bash
git add .husky/ package.json
git commit -m "Adicionar pre-commit hooks com Husky"
git push
```

3. **Instruir equipe**

Adicione no `CONTRIBUTING.md`:

```markdown
## Pre-commit Hooks

Este projeto usa Husky para executar validações antes de cada commit.

Após clonar o repositório, execute:

    npm install
    npm run prepare

Os hooks serão executados automaticamente em cada commit.
```

---

### Resumo

- Pre-commit hooks validam código antes do commit
- Husky é a ferramenta mais popular para projetos JavaScript/Node.js
- lint-staged processa apenas arquivos modificados (mais rápido)
- Hooks devem ser rápidos e claros
- Devem ser commitados no repositório para toda a equipe usar

---

<a id="codeowners"></a>

## CODEOWNERS **[⬆️](#topo)**

### O que é CODEOWNERS?

O arquivo `CODEOWNERS` define automaticamente quem é responsável pelo código em diferentes partes do repositório. Quando um Pull Request modifica arquivos, o GitHub automaticamente solicita revisão dos code owners correspondentes.

### Benefícios

1. **Revisão Automática**: GitHub solicita revisão automaticamente dos responsáveis
2. **Responsabilidade Clara**: Define quem é responsável por cada parte do código
3. **Proteção de Código**: Garante que mudanças críticas sejam revisadas pelos especialistas
4. **Integração com Branch Protection**: Funciona com "Require review from Code Owners"

### Localização do Arquivo

O arquivo `CODEOWNERS` pode estar em três locais (GitHub usa o primeiro que encontrar):

1. `.github/CODEOWNERS` (recomendado) ⭐
2. `docs/CODEOWNERS`
3. Raiz do repositório: `CODEOWNERS`

**Recomendação**: Use `.github/CODEOWNERS` para manter organizado.

### Sintaxe

```text
# Padrão: caminho/arquivo @usuario ou @equipe
# Comentários começam com #

# Todos os arquivos na raiz
* @usuario-principal

# Arquivos específicos
package.json @tech-lead
README.md @tech-lead @documentation-team

# Diretórios inteiros
/docs/ @documentation-team
/src/ @dev-team

# Padrões com wildcards
*.js @frontend-team
*.java @backend-team
*.md @documentation-team

# Exceções (usando !)
*.md @documentation-team
!README.md @tech-lead

# Múltiplos owners (todos precisam aprovar se configurado)
/src/ @dev-lead @senior-dev
```

### Regras Importantes

1. **Ordem importa**: O último padrão que corresponder será usado
2. **Wildcards suportados**: `*` (qualquer caractere), `?` (um caractere), `**` (qualquer diretório)
3. **Usuários e equipes**: Use `@usuario` ou `@organizacao/equipe`
4. **Comentários**: Linhas começando com `#` são ignoradas

### Exemplo Completo para Projeto Multi-App

```text
# CODEOWNERS - Define responsáveis por cada parte do código

# ============================================
# Administradores e Tech Leads
# ============================================
* @tech-lead @admin-team

# ============================================
# Aplicativos Mobile
# ============================================

# MentorApp (iOS/Android)
/mentorApp/ @mobile-team @ios-lead @android-lead
/mentorApp/ios/ @ios-team
/mentorApp/android/ @android-team

# MentoradoApp
/mentoradoApp/ @mobile-team @mentorado-lead

# ============================================
# Frontend Web
# ============================================
/web/ @frontend-team @frontend-lead
/web/src/ @frontend-team
/web/public/ @frontend-team @design-team

# ============================================
# Backend
# ============================================
/backend/ @backend-team @backend-lead
/backend/auth-service/ @backend-team @security-team
/backend/user-service/ @backend-team
/backend/notification-service/ @backend-team

# ============================================
# Infraestrutura e DevOps
# ============================================
/.github/ @devops-team @tech-lead
/.github/workflows/ @devops-team
/docker-compose.yml @devops-team @backend-lead
/Dockerfile @devops-team

# ============================================
# Documentação
# ============================================
/docs/ @documentation-team @tech-lead
*.md @documentation-team
README.md @tech-lead @documentation-team

# ============================================
# Configurações e Scripts
# ============================================
/scripts/ @devops-team @tech-lead
package.json @tech-lead
package-lock.json @tech-lead
yarn.lock @tech-lead

# ============================================
# Arquivos de Configuração
# ============================================
.env.example @tech-lead @security-team
.gitignore @tech-lead
.gitattributes @tech-lead
.editorconfig @tech-lead
.eslintrc.* @frontend-lead @backend-lead
tsconfig.json @frontend-lead @backend-lead

# ============================================
# Testes
# ============================================
**/*.test.js @frontend-team @qa-team
**/*.test.ts @frontend-team @qa-team
**/*.spec.js @frontend-team @qa-team
/tests/ @qa-team @tech-lead

# ============================================
# Exceções
# ============================================
# README principal sempre precisa do tech lead
README.md @tech-lead
```

### Exemplo Simplificado

Para projetos menores:

```text
# CODEOWNERS

# Todos os arquivos
* @tech-lead

# Mobile
/mentorApp/ @mobile-team
/mentoradoApp/ @mobile-team

# Web
/web/ @frontend-team

# Backend
/backend/ @backend-team

# Documentação
/docs/ @tech-lead
*.md @tech-lead
```

### Como Funciona

1. **Pull Request criado**: GitHub verifica quais arquivos foram modificados
2. **CODEOWNERS consultado**: GitHub encontra os padrões que correspondem aos arquivos
3. **Revisores solicitados**: GitHub automaticamente adiciona os code owners como revisores
4. **Branch Protection**: Se configurado, PR não pode ser mergeado sem aprovação dos code owners

### Integração com Branch Protection

Para usar CODEOWNERS com Branch Protection:

1. Vá em **Settings** → **Branches** → **Branch protection rules**
2. Edite a regra da branch (ex: `main`)
3. Marque: **Require review from Code Owners** ✅
4. Configure quantas aprovações são necessárias

**Configuração recomendada**:

- ✅ Require review from Code Owners
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require approvals: 1 (ou mais, conforme necessário)

### Exemplo Prático: Fluxo de Revisão

**Cenário**: Desenvolvedor cria PR modificando `/mentorApp/ios/AppDelegate.swift`

1. PR é criado
2. GitHub verifica `CODEOWNERS`:

   ```text
   /mentorApp/ios/ @ios-team
   ```

3. GitHub automaticamente:
   - Adiciona `@ios-team` como revisor
   - Notifica a equipe
   - Bloqueia merge até aprovação (se configurado)

### Padrões Úteis

#### Por Extensão de Arquivo

```text
# Frontend
*.js @frontend-team
*.jsx @frontend-team
*.ts @frontend-team
*.tsx @frontend-team
*.css @frontend-team @design-team
*.scss @frontend-team @design-team

# Backend
*.java @backend-team
*.py @backend-team
*.go @backend-team

# Mobile
*.swift @ios-team
*.kt @android-team
*.kts @android-team

# Configuração
*.json @tech-lead
*.yml @devops-team
*.yaml @devops-team
```

#### Por Diretório

```text
# Estrutura de diretórios
/src/ @dev-team
/tests/ @qa-team
/docs/ @documentation-team
/.github/ @devops-team
/scripts/ @devops-team
```

#### Por Tipo de Arquivo

```text
# Arquivos críticos sempre precisam do tech lead
package.json @tech-lead
Dockerfile @devops-team @tech-lead
docker-compose.yml @devops-team @tech-lead
.env.example @tech-lead @security-team

# Documentação
*.md @documentation-team
README.md @tech-lead
CHANGELOG.md @tech-lead
```

### Boas Práticas

1. **Seja Específico**: Use padrões específicos antes de genéricos
2. **Organize por Prioridade**: Coloque regras mais específicas primeiro
3. **Use Equipes**: Prefira `@org/team` em vez de usuários individuais quando possível
4. **Documente**: Adicione comentários explicando por que certas áreas têm certos owners
5. **Revise Regularmente**: Atualize quando a estrutura do projeto mudar

### Troubleshooting

#### Problema: Code owners não são solicitados automaticamente

**Soluções**:

1. Verifique se o arquivo está no local correto (`.github/CODEOWNERS`)
2. Verifique a sintaxe (sem erros de formatação)
3. Verifique se os usuários/equipes existem no GitHub
4. Verifique se o arquivo foi commitado na branch correta

#### Problema: Muitos revisores sendo solicitados

**Solução**: Use padrões mais específicos e organize a ordem:

```text
# Específico primeiro
/src/components/Button.tsx @component-owner

# Depois genérico
/src/ @frontend-team
```

#### Problema: Code owner não recebe notificação

**Soluções**:

1. Verifique se o usuário está na equipe correta
2. Verifique configurações de notificação do GitHub
3. Verifique se o padrão corresponde corretamente

### Verificação

Após criar o arquivo `CODEOWNERS`:

1. Crie um PR de teste modificando um arquivo
2. Verifique se os code owners aparecem como revisores
3. Verifique se as notificações foram enviadas
4. Teste com diferentes tipos de arquivos

### Exemplo para Projeto React Native + Backend

```text
# ============================================
# CODEOWNERS - Mentorias Frontend
# ============================================

# Tech Lead sempre revisa mudanças críticas
* @tech-lead

# ============================================
# Mobile Apps
# ============================================

# MentorApp
/mentorApp/ @mobile-team
/mentorApp/app.json @mobile-lead @tech-lead
/mentorApp/package.json @mobile-lead

# MentoradoApp
/mentoradoApp/ @mobile-team
/mentoradoApp/app.json @mobile-lead @tech-lead

# ============================================
# Web Frontend
# ============================================
/web/ @frontend-team
/web/src/ @frontend-team
/web/public/ @frontend-team @design-team
/web/vite.config.js @frontend-lead

# ============================================
# Backend Services
# ============================================
/backend/ @backend-team
/backend/auth-service/ @backend-team @security-team
/backend/user-service/ @backend-team
/backend/notification-service/ @backend-team

# ============================================
# CI/CD e DevOps
# ============================================
/.github/ @devops-team
/.github/workflows/ @devops-team @tech-lead
/docker-compose.yml @devops-team @backend-lead

# ============================================
# Documentação
# ============================================
/docs/ @documentation-team @tech-lead
*.md @documentation-team
README.md @tech-lead

# ============================================
# Configurações
# ============================================
package.json @tech-lead
package-lock.json @tech-lead
yarn.lock @tech-lead
tsconfig.json @frontend-lead @backend-lead
.eslintrc.* @frontend-lead @backend-lead
.prettierrc @tech-lead
```

### Resumo

- CODEOWNERS define responsáveis automáticos por partes do código
- GitHub solicita revisão automaticamente dos code owners
- Funciona com Branch Protection para garantir aprovações
- Deve estar em `.github/CODEOWNERS` (recomendado)
- Use padrões específicos antes de genéricos
- Organize por prioridade e documente com comentários

---

<a id="versionamento-semântico"></a>

## Versionamento Semântico **[⬆️](#topo)**

### O que é Versionamento Semântico?

**Versionamento Semântico (Semantic Versioning ou SemVer)** é um padrão de versionamento que usa um formato de três números separados por pontos: `MAJOR.MINOR.PATCH` (ex: `1.2.3`).

### Formato: MAJOR.MINOR.PATCH

```text
1.2.3
│ │ │
│ │ └─ Patch: Correções de bugs (retrocompatível)
│ └─── Minor: Novas funcionalidades (retrocompatível)
└───── Major: Mudanças que quebram compatibilidade
```

### Regras de Versionamento

#### 1. MAJOR (X.0.0) - Breaking Changes

**Quando incrementar:**

- Mudanças que quebram a API pública
- Remoção de funcionalidades
- Mudanças incompatíveis com versões anteriores
- Mudanças que exigem ação do usuário para atualizar

**Exemplos:**

- `1.0.0` → `2.0.0`: Remoção de uma função pública
- `1.0.0` → `2.0.0`: Mudança na estrutura de dados retornada
- `1.0.0` → `2.0.0`: Mudança em requisitos mínimos (ex: Node.js 14 → 18)

#### 2. MINOR (0.X.0) - Novas Funcionalidades

**Quando incrementar:**

- Adição de novas funcionalidades
- Adição de novos métodos/APIs (sem remover os antigos)
- Melhorias que não quebram compatibilidade
- Deprecação de funcionalidades (ainda funcionam, mas serão removidas no futuro)

**Exemplos:**

- `1.0.0` → `1.1.0`: Adição de novo endpoint na API
- `1.0.0` → `1.1.0`: Novo componente React
- `1.0.0` → `1.1.0`: Nova feature no app mobile

#### 3. PATCH (0.0.X) - Correções de Bugs

**Quando incrementar:**

- Correções de bugs
- Correções de segurança
- Correções de performance (sem mudar API)
- Correções de documentação

**Exemplos:**

- `1.0.0` → `1.0.1`: Correção de bug em validação
- `1.0.0` → `1.0.1`: Correção de vulnerabilidade de segurança
- `1.0.0` → `1.0.1`: Correção de typo na documentação

### Exemplos Práticos

#### Exemplo 1: API REST

```text
v1.0.0 - Release inicial
v1.0.1 - Correção de bug no endpoint /users
v1.1.0 - Adição de novo endpoint /notifications
v1.1.1 - Correção de segurança no endpoint /auth
v2.0.0 - Mudança na estrutura de resposta do /users (breaking change)
v2.0.1 - Correção de bug após breaking change
```

#### Exemplo 2: Biblioteca JavaScript

```text
1.0.0 - Release inicial
1.0.1 - Correção de bug no método validate()
1.1.0 - Adição de novo método format()
1.1.1 - Correção de performance
2.0.0 - Remoção do método deprecated oldMethod()
```

#### Exemplo 3: Aplicativo Mobile

```text
1.0.0 - Versão inicial no App Store
1.0.1 - Correção de crash no login
1.1.0 - Adição de tela de perfil
1.1.1 - Correção de bug na tela de perfil
2.0.0 - Redesign completo da interface (breaking change para usuários)
```

### Pré-versões e Build Metadata

#### Pré-versões (Pre-release)

Para versões em desenvolvimento ou testes:

```text
1.0.0-alpha.1    # Versão alfa
1.0.0-beta.1     # Versão beta
1.0.0-rc.1        # Release candidate
1.0.0-dev.1       # Desenvolvimento
```

**Exemplos:**

- `1.0.0-alpha.1` → `1.0.0-alpha.2` → `1.0.0-beta.1` → `1.0.0-rc.1` → `1.0.0`

#### Build Metadata

Informações adicionais (não afetam ordenação):

```text
1.0.0+20240101
1.0.0+build.123
1.0.0+exp.sha.5114f85
```

### Como Implementar no Projeto

#### 1. Definir Versão Inicial

**Para cada aplicativo/serviço:**

```json
// package.json (web, mentorApp, mentoradoApp)
{
	"version": "0.1.0"
}
```

```xml
<!-- pom.xml (backend services) -->
<version>0.1.0</version>
```

#### 2. Atualizar Versão Manualmente

**Antes de cada release:**

```bash
# Atualizar package.json
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# Atualizar pom.xml manualmente
# <version>1.0.1</version>
```

#### 3. Usar Scripts de Versionamento

**Criar script `scripts/version.sh`:**

```bash
#!/bin/bash

# Atualizar versão em todos os projetos
VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Uso: ./version.sh 1.2.3"
  exit 1
fi

# Web
cd web && npm version $VERSION --no-git-tag-version && cd ..

# Mobile Apps
cd mentorApp && npm version $VERSION --no-git-tag-version && cd ..
cd mentoradoApp && npm version $VERSION --no-git-tag-version && cd ..

# Backend (atualizar pom.xml manualmente ou usar mvn versions:set)
echo "Versão atualizada para $VERSION"
echo "Lembre-se de atualizar pom.xml dos serviços backend manualmente"
```

**Ou usar ferramentas como `lerna` ou `nx` para monorepos:**

```bash
# Com lerna
lerna version patch
lerna version minor
lerna version major
```

### Criar Tags para Cada Release

**Importante:** Sempre crie uma tag Git para cada release. Tags marcam pontos específicos no histórico do repositório e são essenciais para rastreabilidade, rollback e distribuição de versões.

#### Por que Criar Tags?

1. **Rastreabilidade**: Marca exatamente qual código foi lançado em cada versão
2. **Rollback**: Permite voltar facilmente para uma versão anterior
3. **Distribuição**: Facilita o download de versões específicas
4. **Documentação**: Histórico claro de releases
5. **CI/CD**: Permite builds e deploys de versões específicas

#### Workflow Completo: Criar Tag para Release

**Passo a passo completo:**

```bash
# 1. Certifique-se de estar na branch correta (geralmente main)
git checkout main
git pull origin main

# 2. Verifique se há mudanças não commitadas
git status

# 3. Atualize a versão no package.json (ou pom.xml)
npm version patch   # ou minor, ou major

# 4. A tag já foi criada automaticamente pelo npm version
# Verifique a tag criada
git tag -l "v*"

# 5. Faça push do código e das tags
git push origin main
git push origin --tags

# OU em um único comando:
git push origin main --tags
```

#### Criar Tag Anotada (Recomendado)

Tags anotadas são preferíveis porque contêm metadados (autor, data, mensagem):

```bash
# Criar tag anotada com mensagem descritiva
git tag -a v1.0.0 -m "Release version 1.0.0

- Adiciona nova tela de perfil
- Corrige bug no login
- Melhora performance da listagem"

# Push da tag específica
git push origin v1.0.0

# Push de todas as tags
git push origin --tags
```

**Diferença entre tag leve e anotada:**

```bash
# Tag leve (não recomendada para releases)
git tag v1.0.0

# Tag anotada (recomendada - contém metadados)
git tag -a v1.0.0 -m "Mensagem do release"
```

#### Criar Tag com npm version

O `npm version` cria automaticamente uma tag anotada:

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch -m "chore: release version %s"
git push origin main --tags

# Minor release (1.0.0 → 1.1.0)
npm version minor -m "chore: release version %s"
git push origin main --tags

# Major release (1.0.0 → 2.0.0)
npm version major -m "chore: release version %s"
git push origin main --tags
```

**Nota:** O `%s` será substituído automaticamente pela versão (ex: "chore: release version 1.0.1")

#### Convenção de Nomenclatura de Tags

**Recomendado:** Use o prefixo `v` seguido da versão semântica:

```bash
# ✅ Correto
v1.0.0
v1.0.1
v1.1.0
v2.0.0

# ❌ Evite
1.0.0          # Sem prefixo v
release-1.0.0  # Prefixo diferente
V1.0.0         # V maiúsculo (pode causar problemas)
```

#### Listar e Gerenciar Tags

```bash
# Listar todas as tags
git tag

# Listar tags com padrão
git tag -l "v1.*"        # Todas as tags v1.x.x
git tag -l "v1.0.*"      # Todas as tags v1.0.x
git tag -l "*beta*"       # Tags beta

# Listar tags ordenadas por versão
git tag -l --sort=-version:refname

# Ver detalhes de uma tag
git show v1.0.0

# Ver commits desde uma tag
git log v1.0.0..HEAD

# Ver diferenças entre tags
git diff v1.0.0 v1.1.0
```

#### Verificar se Tag Já Existe

Antes de criar uma tag, verifique se ela já existe:

```bash
# Verificar se tag existe
if git rev-parse "v1.0.0" >/dev/null 2>&1; then
  echo "Tag v1.0.0 já existe!"
else
  echo "Tag v1.0.0 não existe, pode criar"
fi
```

#### Deletar Tag (se necessário)

⚠️ **Cuidado:** Só delete tags se realmente necessário e antes de fazer push:

```bash
# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin --delete v1.0.0

# OU usar o formato alternativo
git push origin :refs/tags/v1.0.0
```

**Nota:** Se a tag já foi usada em um GitHub Release, você precisará deletar o release primeiro.

#### Tags para Pré-releases

Para versões em desenvolvimento (alpha, beta, rc):

```bash
# Alpha release
git tag -a v1.0.0-alpha.1 -m "Alpha release 1.0.0-alpha.1"
git push origin v1.0.0-alpha.1

# Beta release
git tag -a v1.0.0-beta.1 -m "Beta release 1.0.0-beta.1"
git push origin v1.0.0-beta.1

# Release candidate
git tag -a v1.0.0-rc.1 -m "Release candidate 1.0.0-rc.1"
git push origin v1.0.0-rc.1
```

#### Checklist: Criar Tag para Release

Antes de criar uma tag, verifique:

- [ ] Código está na branch `main` (ou branch de release)
- [ ] Todos os testes passam
- [ ] CHANGELOG.md foi atualizado
- [ ] Versão foi atualizada em `package.json`/`pom.xml`
- [ ] Não há mudanças não commitadas
- [ ] Tag não existe ainda (verificar com `git tag -l`)
- [ ] Mensagem da tag é descritiva e clara

### Usar GitHub Releases

**Importante:** Sempre crie um GitHub Release para cada tag de versão. Releases fornecem uma interface amigável para documentar mudanças, distribuir binários e comunicar atualizações aos usuários.

#### Por que Usar GitHub Releases?

1. **Documentação**: Interface visual para documentar mudanças de cada versão
2. **Distribuição**: Anexar binários (APK, IPA, executáveis, etc.)
3. **Comunicação**: Notificar usuários sobre novas versões
4. **Histórico**: Histórico completo e acessível de todas as versões
5. **Downloads**: Estatísticas de downloads e links diretos para binários
6. **Notificações**: Usuários podem "watch" releases para receber notificações

#### Criar Release Manualmente (Passo a Passo)

##### 1. Acessar a Página de Releases

- Vá para o repositório no GitHub
- Clique na aba **Releases** (ou acesse diretamente: `https://github.com/usuario/repo/releases`)
- Clique em **Create a new release** ou **Draft a new release**

##### 2. Selecionar ou Criar Tag

- **Se a tag já existe**: Selecione a tag no dropdown "Choose a tag"
- **Se a tag não existe**: Digite o nome da tag (ex: `v1.0.0`) e clique em "Create new tag: v1.0.0 on publish"

##### 3. Preencher Informações do Release

- **Title**: Título do release (ex: `v1.0.0 - Release Inicial` ou `v1.2.0 - Nova Tela de Perfil`)
- **Description**: Descrição detalhada das mudanças

**Exemplo de Description:**

```markdown
## 🎉 Release v1.2.0

### ✨ Novidades

- Nova tela de perfil do usuário
- Sistema de notificações push
- Filtros avançados na busca

### 🐛 Correções

- Corrigido bug no cálculo de distância
- Corrigida vulnerabilidade de segurança no login

### 📝 Mudanças Técnicas

- Atualizado React Native para 0.72.0
- Melhorada performance da listagem de mentores

### 📦 Downloads

- [APK Android](link-para-apk)
- [IPA iOS](link-para-ipa)

---

**Notas de Atualização:**

- Esta versão requer Android 8.0+ e iOS 13.0+
- Recomendamos fazer backup antes de atualizar

**Changelog completo:** [CHANGELOG.md](link-para-changelog)
```

##### 4. Anexar Binários (Opcional mas Recomendado)

- Clique em **Attach binaries by dropping them here or selecting them**
- Arraste arquivos ou selecione:
  - APK (Android)
  - IPA (iOS)
  - Executáveis
  - Arquivos ZIP com builds
  - Documentação

##### 5. Configurar Opções

- **Set as the latest release**: Marque se esta é a versão mais recente
- **Set as a pre-release**: Marque se é uma versão alpha/beta/rc
- **Set as a draft**: Salvar como rascunho (não publicar ainda)

##### 6. Publicar

- Clique em **Publish release** para publicar
- Ou **Save draft** para salvar e publicar depois

#### Estrutura Recomendada para Description

Use este template como base:

```markdown
## 🎯 Resumo

Breve descrição do que esta versão traz de novo.

## ✨ Novidades

- Feature 1
- Feature 2
- Feature 3

## 🐛 Correções

- Bug fix 1
- Bug fix 2

## 🔒 Segurança

- Correção de vulnerabilidade X
- Atualização de dependências

## 📝 Mudanças Técnicas

- Atualização de dependências
- Refatorações
- Melhorias de performance

## ⚠️ Breaking Changes

- Mudança que quebra compatibilidade 1
- Como migrar: [instruções]

## 📦 Downloads

- [Android APK](link)
- [iOS IPA](link)
- [Web Build](link)

## 📚 Documentação

- [Guia de Migração](link)
- [Changelog Completo](link-para-changelog)

## 🙏 Agradecimentos

Agradecimentos a contribuidores, se aplicável.
```

#### Automatizar Releases com GitHub Actions

**Criar `.github/workflows/release.yml`:**

```yaml
name: Release

on:
  push:
    tags:
      - "v*" # Dispara quando uma tag v* é criada

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Necessário para ler CHANGELOG completo

      - name: Extract version from tag
        id: tag_version
        run: |
          TAG_NAME=${GITHUB_REF#refs/tags/}
          echo "VERSION=${TAG_NAME#v}" >> $GITHUB_OUTPUT
          echo "TAG_NAME=$TAG_NAME" >> $GITHUB_OUTPUT

      - name: Generate release notes from CHANGELOG
        id: changelog
        run: |
          if [ -f CHANGELOG.md ]; then
            # Extrair seção do CHANGELOG para esta versão
            VERSION="${{ steps.tag_version.outputs.VERSION }}"
            awk "/^## \[$VERSION\]/,/^## \[/" CHANGELOG.md | head -n -1 > release_notes.md
            echo "HAS_CHANGELOG=true" >> $GITHUB_OUTPUT
          else
            echo "HAS_CHANGELOG=false" >> $GITHUB_OUTPUT
          fi

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          name: Release ${{ steps.tag_version.outputs.TAG_NAME }}
          body_path: release_notes.md
          draft: false
          prerelease: ${{ contains(steps.tag_version.outputs.TAG_NAME, '-') }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Workflow mais completo com build e upload de binários:**

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build web
        run: |
          cd web
          npm ci
          npm run build

      - name: Build mobile apps
        run: |
          cd mentorApp
          npm ci
          npx expo export --platform android --output-dir dist/android
          npx expo export --platform ios --output-dir dist/ios

      - name: Create release archive
        run: |
          mkdir -p release
          cp -r web/dist release/web
          cp -r mentorApp/dist release/mobile
          tar -czf release-v${GITHUB_REF#refs/tags/v}.tar.gz release/

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            release-v*.tar.gz
          draft: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Editar ou Deletar Release

**Editar Release:**

1. Vá para a página de Releases
2. Clique no release que deseja editar
3. Clique em **Edit release**
4. Faça as alterações necessárias
5. Clique em **Update release**

**Deletar Release:**

1. Vá para a página de Releases
2. Clique no release que deseja deletar
3. Clique em **Delete release**
4. Confirme a exclusão

⚠️ **Nota:** Deletar um release não deleta a tag Git associada.

#### Boas Práticas para GitHub Releases

1. **Sempre crie release para cada tag**: Não deixe tags sem release
2. **Use descrições detalhadas**: Inclua todas as mudanças importantes
3. **Anexe binários**: Facilite o download para usuários
4. **Link para CHANGELOG**: Referencie o CHANGELOG.md completo
5. **Use emojis**: Torne as descrições mais legíveis (opcional)
6. **Mencione breaking changes**: Destaque mudanças incompatíveis
7. **Inclua instruções de migração**: Se houver breaking changes
8. **Mantenha consistência**: Use o mesmo formato para todos os releases
9. **Teste antes de publicar**: Certifique-se de que a versão funciona
10. **Use drafts**: Salve como draft e revise antes de publicar

#### Checklist: Criar GitHub Release

Antes de criar um release, verifique:

- [ ] Tag Git foi criada e está no repositório remoto
- [ ] CHANGELOG.md foi atualizado
- [ ] Descrição do release está completa e clara
- [ ] Binários foram testados (se houver)
- [ ] Binários estão prontos para anexar (se aplicável)
- [ ] Breaking changes foram documentados
- [ ] Instruções de migração foram fornecidas (se necessário)
- [ ] Release foi revisado (use draft se necessário)

### CHANGELOG.md

(ver seção detalhada [CHANGELOG.md](#changelogmd))

Manter um arquivo `CHANGELOG.md` na raiz do projeto:

```markdown
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2025-01-15

### Adicionado

- Nova tela de perfil do usuário
- Endpoint `/api/notifications` na API

### Modificado

- Melhorada performance da listagem de mentores

### Corrigido

- Bug no cálculo de distância entre mentores

## [1.1.0] - 2025-01-01

### Adicionado

- Sistema de notificações push
- Filtros avançados na busca

## [1.0.1] - 2024-12-20

### Corrigido

- Correção de vulnerabilidade de segurança no login
- Bug no carregamento de imagens

## [1.0.0] - 2024-12-01

### Adicionado

- Release inicial
- Autenticação de usuários
- Sistema de matching entre mentores e mentorados
```

### Convenções de Commits e Versionamento

#### Conventional Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/) facilita versionamento automático:

```bash
feat: adiciona nova tela de perfil        # → MINOR
fix: corrige bug no login                 # → PATCH
docs: atualiza README                     # → PATCH
style: formata código                     # → PATCH
refactor: reorganiza estrutura            # → PATCH
perf: melhora performance                 # → PATCH
test: adiciona testes                    # → PATCH
chore: atualiza dependências             # → PATCH
feat!: remove API antiga                 # → MAJOR (breaking change)
```

#### Automatizar Versionamento com Conventional Commits

**Usar `standard-version` ou `semantic-release`:**

```bash
# Instalar
npm install --save-dev standard-version

# Adicionar script no package.json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

**Uso:**

```bash
# Gera versão, CHANGELOG e tag automaticamente
npm run release

# Para patch (1.0.0 → 1.0.1)
npm run release -- --release-as patch

# Para minor (1.0.0 → 1.1.0)
npm run release -- --release-as minor

# Para major (1.0.0 → 2.0.0)
npm run release -- --release-as major
```

### Workflow Recomendado

#### 1. Desenvolvimento

```bash
# Trabalhar em feature branch
git checkout -b feature/nova-tela
# ... fazer mudanças ...
git commit -m "feat: adiciona nova tela de perfil"
```

#### 2. Merge para Main

```bash
# Merge via Pull Request
# Após merge, atualizar versão se necessário
```

#### 3. Criar Release

```bash
# 1. Atualizar CHANGELOG.md manualmente ou automaticamente

# 2. Atualizar versão
npm version minor -m "chore: release version %s"

# 3. Push com tags
git push origin main --tags

# 4. GitHub Actions cria release automaticamente (se configurado)
```

### Versionamento para Projeto Multi-App

Para projetos com múltiplos apps (web, mentorApp, mentoradoApp, backend):

#### Opção 1: Versão Única (Recomendado para início)

Todos os apps compartilham a mesma versão:

```text
v1.0.0 - Todos os apps na versão 1.0.0
v1.1.0 - Todos os apps na versão 1.1.0
```

**Vantagens:**

- Simples de gerenciar
- Fácil de comunicar aos usuários
- Releases sincronizados

**Desvantagens:**

- Um app pode não ter mudanças, mas versão incrementa

#### Opção 2: Versões Independentes

Cada app tem sua própria versão:

```text
web: v1.2.0
mentorApp: v2.0.0
mentoradoApp: v1.5.0
backend: v3.1.0
```

**Vantagens:**

- Versão reflete mudanças reais de cada app
- Mais preciso

**Desvantagens:**

- Mais complexo de gerenciar
- Pode confundir usuários

**Recomendação:** Comece com versão única, migre para independentes se necessário.

### Integração com CI/CD

#### Verificar Versão no CI

**Adicionar step no workflow:**

```yaml
- name: Verificar versão
  run: |
    VERSION=$(node -p "require('./package.json').version")
    echo "Versão atual: $VERSION"

    # Verificar se tag já existe
    if git rev-parse "$VERSION" >/dev/null 2>&1; then
      echo "⚠️ Tag $VERSION já existe!"
      exit 1
    fi
```

#### Auto-versioning com CI/CD

**Criar workflow que incrementa versão automaticamente:**

```yaml
name: Auto Version

on:
  push:
    branches:
      - main

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node
        uses: actions/setup-node@v4

      - name: Bump version
        run: |
          npm version patch -m "chore: bump version to %s [skip ci]"
          git push origin main --tags
```

### Boas Práticas

1. **Sempre use tags anotadas**: `git tag -a` em vez de `git tag`
2. **Siga SemVer rigorosamente**: Não quebre compatibilidade em MINOR ou PATCH
3. **Mantenha CHANGELOG atualizado**: Documente todas as mudanças
4. **Use Conventional Commits**: Facilita versionamento automático
5. **Comunique breaking changes**: Avise usuários sobre mudanças incompatíveis
6. **Teste antes de release**: Sempre teste a versão antes de criar tag
7. **Documente versões**: Use GitHub Releases com descrições detalhadas
8. **Não pule versões**: Se está em 1.0.0, não vá direto para 2.0.0 sem passar por 1.1.0, 1.2.0, etc.

### Troubleshooting

#### Problema: Tag já existe

**Solução:**

```bash
# Deletar tag local e remota
git tag -d v1.0.0
git push origin --delete v1.0.0

# Criar nova tag
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

#### Problema: Versão inconsistente entre apps

**Solução:**

```bash
# Criar script para sincronizar versões
./scripts/sync-versions.sh 1.2.0
```

#### Problema: Esqueci de atualizar versão antes de release

**Solução:**

```bash
# Atualizar versão retroativamente
npm version patch -m "chore: release version %s"

# Ou criar tag manualmente
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

### Ferramentas Úteis

- **[standard-version](https://github.com/conventional-changelog/standard-version)**: Versionamento automático baseado em Conventional Commits
- **[semantic-release](https://github.com/semantic-release/semantic-release)**: Versionamento e releases totalmente automatizados
- **[lerna](https://lerna.js.org/)**: Gerenciamento de versões em monorepos
- **[changesets](https://github.com/changesets/changesets)**: Gerenciamento de versões e changelogs

### Exemplo Completo: Script de Release

**Criar `scripts/release.sh`:**

```bash
#!/bin/bash

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando processo de release...${NC}"

# Verificar se está na branch main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo -e "${RED}❌ Você deve estar na branch main${NC}"
  exit 1
fi

# Verificar se há mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
  echo -e "${RED}❌ Há mudanças não commitadas${NC}"
  exit 1
fi

# Perguntar tipo de release
echo -e "${YELLOW}Qual tipo de release?${NC}"
echo "1) patch (1.0.0 → 1.0.1)"
echo "2) minor (1.0.0 → 1.1.0)"
echo "3) major (1.0.0 → 2.0.0)"
read -p "Escolha (1-3): " TYPE

case $TYPE in
  1) TYPE="patch" ;;
  2) TYPE="minor" ;;
  3) TYPE="major" ;;
  *) echo -e "${RED}❌ Opção inválida${NC}"; exit 1 ;;
esac

# Atualizar versão
echo -e "${GREEN}📦 Atualizando versão...${NC}"
npm version $TYPE -m "chore: release version %s"

# Obter nova versão
VERSION=$(node -p "require('./package.json').version")
TAG="v$VERSION"

# Push
echo -e "${GREEN}📤 Fazendo push...${NC}"
git push origin main --tags

echo -e "${GREEN}✅ Release $TAG criado com sucesso!${NC}"
echo -e "${YELLOW}💡 Não esqueça de criar o GitHub Release manualmente${NC}"
```

### Resumo

- **Versionamento Semântico** usa formato `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes
- **MINOR**: Novas funcionalidades (retrocompatível)
- **PATCH**: Correções de bugs
- **Tags Git** marcam releases no histórico
- **GitHub Releases** documentam e distribuem versões
- **CHANGELOG.md** documenta todas as mudanças
- **Conventional Commits** facilitam versionamento automático
- Use ferramentas como `standard-version` ou `semantic-release` para automatizar

---

<a id="estrutura-de-branches"></a>

## Estrutura de Branches **[⬆️](#topo)**

### O que é Estrutura de Branches?

Estrutura de branches é uma estratégia de organização do fluxo de trabalho Git que define padrões de nomenclatura, propósito e ciclo de vida das branches do projeto. Uma boa estrutura facilita colaboração, reduz conflitos e melhora a rastreabilidade do código.

### Por que é Importante?

1. **Organização**: Facilita encontrar e entender o propósito de cada branch
2. **Colaboração**: Reduz conflitos e facilita code review
3. **Rastreabilidade**: Histórico claro de mudanças e features
4. **Deploy**: Facilita controle de versões em diferentes ambientes
5. **Manutenção**: Simplifica correções e hotfixes

### Estratégias Comuns

#### 1. Git Flow (Tradicional)

**Melhor para:** Projetos com releases planejadas e múltiplos ambientes.

**Estrutura:**

```text
main          → Produção (sempre estável)
develop       → Desenvolvimento (integração contínua)
feature/*     → Novas funcionalidades
release/*     → Preparação de releases
hotfix/*      → Correções urgentes em produção
```

**Fluxo:**

```bash
# 1. Criar feature
git checkout develop
git checkout -b feature/nova-tela

# 2. Desenvolver e commitar
git commit -m "feat: adiciona nova tela"

# 3. Merge para develop
git checkout develop
git merge feature/nova-tela

# 4. Criar release
git checkout -b release/v1.1.0
# Preparar release, atualizar versão, etc.

# 5. Merge para main e develop
git checkout main
git merge release/v1.1.0
git tag v1.1.0
git checkout develop
git merge release/v1.1.0

# 6. Hotfix (se necessário)
git checkout main
git checkout -b hotfix/security-patch
# Corrigir bug
git checkout main
git merge hotfix/security-patch
git tag v1.1.1
git checkout develop
git merge hotfix/security-patch
```

**Vantagens:**

- Separação clara entre desenvolvimento e produção
- Suporta múltiplas versões em produção
- Ideal para projetos com releases planejadas

**Desvantagens:**

- Mais complexo
- Pode ser excessivo para projetos pequenos
- Requer disciplina da equipe

#### 2. GitHub Flow (Simples)

**Melhor para:** Projetos com deploy contínuo e equipes pequenas.

**Estrutura:**

```text
main          → Produção (sempre deployável)
feature/*     → Novas funcionalidades
bugfix/*      → Correções de bugs
```

**Fluxo:**

```bash
# 1. Criar branch a partir de main
git checkout main
git pull origin main
git checkout -b feature/nova-tela

# 2. Desenvolver e commitar
git commit -m "feat: adiciona nova tela"

# 3. Criar Pull Request
# (via interface do GitHub)

# 4. Após aprovação, merge para main
# 5. Deploy automático (se configurado)
```

**Vantagens:**

- Simples e direto
- Ideal para deploy contínuo
- Menos overhead

**Desvantagens:**

- Menos controle sobre releases
- Pode ser difícil manter múltiplas versões

#### 3. GitLab Flow (Híbrido)

**Melhor para:** Projetos que precisam de ambientes intermediários (staging, pre-prod).

**Estrutura:**

```text
main          → Produção
staging        → Ambiente de staging
pre-prod      → Pré-produção
feature/*     → Novas funcionalidades
```

**Fluxo:**

```bash
# 1. Feature branch
git checkout -b feature/nova-tela
# Desenvolver...

# 2. Merge para staging
git checkout staging
git merge feature/nova-tela

# 3. Testes em staging
# Se OK, merge para pre-prod

# 4. Testes em pre-prod
# Se OK, merge para main
```

### Estrutura Recomendada para o Projeto

Para um projeto com web, mobile apps e backend, recomenda-se uma estrutura híbrida:

```text
main                    → Produção (deploy automático)
develop                 → Desenvolvimento (integração contínua)
feature/*               → Novas funcionalidades
  feature/auth-firebase
  feature/nova-tela
  feature/notifications
bugfix/*                → Correções de bugs
  bugfix/login-error
  bugfix/memory-leak
hotfix/*                → Correções urgentes em produção
  hotfix/security-patch
  hotfix/critical-bug
release/*               → Preparação de releases
  release/v1.1.0
  release/v1.2.0
```

### Convenções de Nomenclatura

#### Prefixos Recomendados

```bash
feature/    → Nova funcionalidade
bugfix/     → Correção de bug
hotfix/     → Correção urgente
release/    → Preparação de release
chore/      → Tarefas de manutenção
docs/       → Documentação
refactor/   → Refatoração
test/       → Testes
```

#### Formato Recomendado

```bash
# ✅ Bom
feature/nova-tela-perfil
feature/auth-firebase
bugfix/login-crash
hotfix/security-vulnerability
release/v1.1.0

# ❌ Evite
feature-nova-tela          # Use / em vez de -
nova-tela                  # Sem prefixo
FEATURE/NOVA-TELA          # Evite maiúsculas
feature/novaTela           # Use kebab-case
```

### Workflow Prático

#### Criar Nova Feature

```bash
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch
git checkout -b feature/nova-tela-perfil

# 3. Desenvolver
# ... fazer mudanças ...
git add .
git commit -m "feat: adiciona tela de perfil"

# 4. Push
git push origin feature/nova-tela-perfil

# 5. Criar Pull Request no GitHub
# 6. Após aprovação, merge para develop
```

#### Criar Bugfix

```bash
# 1. Criar branch a partir de develop
git checkout develop
git pull origin develop
git checkout -b bugfix/login-error

# 2. Corrigir bug
# ... fazer correções ...
git commit -m "fix: corrige erro no login"

# 3. Push e criar PR
git push origin bugfix/login-error
```

#### Criar Hotfix

```bash
# 1. Criar branch a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/security-patch

# 2. Corrigir problema
# ... fazer correções ...
git commit -m "fix: corrige vulnerabilidade de segurança"

# 3. Merge para main
git checkout main
git merge hotfix/security-patch
git tag v1.0.1
git push origin main --tags

# 4. Merge para develop também
git checkout develop
git merge hotfix/security-patch
git push origin develop
```

### Proteção de Branches

Configure branch protection para branches importantes (ver seção [Branch Protection](#branch-protection)):

- `main`: Sempre protegida
- `develop`: Protegida (opcional, mas recomendado)
- `release/*`: Protegida durante preparação de release

### Limpeza de Branches

**Deletar branches locais:**

```bash
# Deletar branch local (após merge)
git branch -d feature/nova-tela

# Forçar deleção (se não foi mergeado)
git branch -D feature/nova-tela
```

**Deletar branches remotas:**

```bash
# Deletar branch remota
git push origin --delete feature/nova-tela
```

**Limpar branches mergeadas automaticamente:**

```bash
# Listar branches mergeadas
git branch --merged

# Deletar todas as branches mergeadas (exceto main e develop)
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d
```

### Boas Práticas

1. **Use nomes descritivos**: `feature/nova-tela-perfil` é melhor que `feature/tela`
2. **Mantenha branches pequenas**: Uma branch por feature/bugfix
3. **Atualize regularmente**: Faça rebase/merge de develop frequentemente
4. **Delete branches antigas**: Limpe branches mergeadas
5. **Documente convenções**: Mantenha este guia atualizado
6. **Use Pull Requests**: Sempre revise código antes de merge
7. **Proteja branches principais**: Configure branch protection
8. **Comunique mudanças**: Avise equipe sobre mudanças na estrutura

### Troubleshooting

#### Problema: Branch desatualizada

**Solução:**

```bash
# Atualizar branch com develop
git checkout feature/minha-feature
git fetch origin
git rebase origin/develop
# ou
git merge origin/develop
```

#### Problema: Conflitos no merge

**Solução:**

```bash
# Resolver conflitos
git merge develop
# Editar arquivos com conflitos
git add .
git commit -m "fix: resolve conflitos de merge"
```

#### Problema: Branch deletada acidentalmente

**Solução:**

```bash
# Recuperar branch deletada (se commit ainda existe)
git reflog
git checkout -b feature/nova-tela <commit-hash>
```

### Exemplo Completo: Estrutura para Projeto Multi-App

```text
main
├── develop
│   ├── feature/auth-firebase
│   ├── feature/nova-tela-perfil
│   ├── feature/notifications-push
│   ├── bugfix/login-error
│   └── bugfix/memory-leak
├── release/v1.1.0
└── hotfix/security-patch
```

**Fluxo de trabalho:**

1. Features são desenvolvidas em `feature/*` a partir de `develop`
2. Após PR e merge, código vai para `develop`
3. Quando `develop` está estável, cria-se `release/v1.1.0`
4. Após testes, `release/v1.1.0` é mergeado em `main` e tag criada
5. Hotfixes são criados a partir de `main` e mergeados em `main` e `develop`

### Resumo

- **Estrutura de branches** organiza o fluxo de trabalho Git
- **Git Flow** é mais completo, **GitHub Flow** é mais simples
- Use **prefixos consistentes**: `feature/`, `bugfix/`, `hotfix/`, etc.
- **Proteja branches principais** com branch protection
- **Mantenha branches atualizadas** com develop/main
- **Delete branches antigas** para manter organização
- **Documente convenções** para toda a equipe seguir

---

<a id="badges-no-readme"></a>

## Badges no README **[⬆️](#topo)**

### O que são Badges?

Badges são pequenas imagens visuais que exibem informações sobre o status e métricas do projeto diretamente no README.md. Eles fornecem informações rápidas sobre CI/CD, cobertura de testes, versão, licença, etc.

### Por que Usar Badges?

1. **Transparência**: Mostra status atual do projeto
2. **Profissionalismo**: Melhora apresentação do repositório
3. **Informação Rápida**: Status de CI, cobertura, versão em um relance
4. **Confiança**: Usuários veem que o projeto está ativo e mantido
5. **Padronização**: Formato comum usado em projetos open source

### Tipos de Badges

#### 1. Badges de CI/CD

Mostram status dos workflows do GitHub Actions:

```markdown
![CI](https://github.com/usuario/repo/workflows/CI/badge.svg)
![Build](https://img.shields.io/github/workflow/status/usuario/repo/CI)
```

**Exemplo completo:**

```markdown
![CI](https://github.com/usuario/mentorias-frontend/workflows/CI/badge.svg)
![Tests](https://github.com/usuario/mentorias-frontend/workflows/Tests/badge.svg)
![Lint](https://github.com/usuario/mentorias-frontend/workflows/Lint/badge.svg)
```

#### 2. Badges de Cobertura de Testes

Mostram porcentagem de cobertura de testes:

```markdown
![Codecov](https://codecov.io/gh/usuario/repo/branch/main/graph/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/usuario/repo)
```

**Exemplo:**

```markdown
[![codecov](https://codecov.io/gh/usuario/mentorias-frontend/branch/main/graph/badge.svg)](https://codecov.io/gh/usuario/mentorias-frontend)
```

#### 3. Badges de Versão

Mostram versão atual do projeto:

```markdown
![Version](https://img.shields.io/github/package-json/v/usuario/repo)
![Release](https://img.shields.io/github/v/release/usuario/repo?include_prereleases)
![Tag](https://img.shields.io/github/v/tag/usuario/repo)
```

**Exemplo:**

```markdown
![Version](https://img.shields.io/github/package-json/v/usuario/mentorias-frontend/main)
![Latest Release](https://img.shields.io/github/v/release/usuario/mentorias-frontend)
```

#### 4. Badges de Licença

Mostram licença do projeto:

```markdown
![License](https://img.shields.io/github/license/usuario/repo)
```

**Exemplo:**

```markdown
![License](https://img.shields.io/github/license/usuario/mentorias-frontend)
```

#### 5. Badges de Linguagem/Tecnologia

Mostram tecnologias usadas:

```markdown
![React](https://img.shields.io/badge/React-18.0-blue)
![Node](https://img.shields.io/badge/Node-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
```

**Exemplo completo:**

```markdown
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.72.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
```

#### 6. Badges de Status do Projeto

Mostram status geral:

```markdown
![Status](https://img.shields.io/badge/status-active-success)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
```

#### 7. Badges de Estatísticas

Mostram estatísticas do repositório:

```markdown
![Stars](https://img.shields.io/github/stars/usuario/repo)
![Forks](https://img.shields.io/github/forks/usuario/repo)
![Issues](https://img.shields.io/github/issues/usuario/repo)
![Pull Requests](https://img.shields.io/github/issues-pr/usuario/repo)
```

### Como Adicionar Badges

#### Método 1: Shields.io (Recomendado)

##### 1. Acesse

Acesse: https://shields.io/

##### 2. Escolha o tipo de badge

- GitHub
- npm
- Codecov
- Custom

##### 3. Configure o badge

- Repositório
- Estilo
- Cor
- Logo (opcional)

##### 4. Copie o código Markdown

**Exemplo:**

```markdown
![GitHub Actions](https://img.shields.io/github/workflow/status/usuario/repo/CI?logo=github-actions&logoColor=white)
```

#### Método 2: GitHub Actions (Automático)

Badges do GitHub Actions são gerados automaticamente:

```markdown
![CI](https://github.com/USER/REPO/workflows/WORKFLOW_NAME/badge.svg)
```

**Exemplo:**

```markdown
![CI](https://github.com/usuario/mentorias-frontend/workflows/CI/badge.svg)
```

#### Método 3: Serviços Externos

Muitos serviços fornecem badges próprios:

- **Codecov**: `https://codecov.io/gh/USER/REPO/branch/main/graph/badge.svg`
- **SonarCloud**: Fornecido na interface
- **npm**: `https://img.shields.io/npm/v/package-name`

### Exemplo Completo de README com Badges

```markdown
# 🚀 Mentorias Frontend

![CI](https://github.com/usuario/mentorias-frontend/workflows/CI/badge.svg)
![Tests](https://github.com/usuario/mentorias-frontend/workflows/Tests/badge.svg)
[![codecov](https://codecov.io/gh/usuario/mentorias-frontend/branch/main/graph/badge.svg)](https://codecov.io/gh/usuario/mentorias-frontend)
![Version](https://img.shields.io/github/package-json/v/usuario/mentorias-frontend/main)
![License](https://img.shields.io/github/license/usuario/mentorias-frontend)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.72.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)

## 📋 Sobre o Projeto

Projeto de mentoria conectando mentores e mentorados...

## 🚀 Tecnologias

- React 18.2
- React Native 0.72
- Node.js 18.x
- TypeScript 5.0

...
```

### Organização de Badges

**Recomendação:** Agrupe badges por categoria:

```markdown
<!-- Status e Qualidade -->

![CI](https://github.com/usuario/repo/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/usuario/repo/branch/main/graph/badge.svg)

<!-- Versão e Licença -->

![Version](https://img.shields.io/github/package-json/v/usuario/repo)
![License](https://img.shields.io/github/license/usuario/repo)

<!-- Tecnologias -->

![React](https://img.shields.io/badge/React-18.0-blue)
![Node](https://img.shields.io/badge/Node-18.x-green)
```

### Badges Personalizados

Crie badges personalizados com Shields.io:

```markdown
![Custom](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&logo=github)
```

**Parâmetros úteis:**

- `style`: `flat`, `flat-square`, `plastic`, `for-the-badge`
- `logo`: Nome do logo (ex: `github`, `react`, `node`)
- `logoColor`: Cor do logo
- `label`: Texto do label
- `message`: Texto da mensagem
- `color`: Cor de fundo

### Badges Dinâmicos

Alguns badges são atualizados automaticamente:

- **GitHub Actions**: Atualizado a cada execução
- **Codecov**: Atualizado a cada push
- **npm version**: Atualizado quando package.json muda
- **GitHub stats**: Atualizado em tempo real

### Troubleshooting

#### Problema: Badge não aparece

**Soluções:**

1. Verifique a URL do badge
2. Certifique-se de que o workflow existe (para GitHub Actions)
3. Verifique se o serviço está acessível (Codecov, etc.)
4. Use formato correto: `![Alt text](URL)`

#### Problema: Badge mostra erro

**Soluções:**

1. Verifique se o repositório/serviço está configurado corretamente
2. Para GitHub Actions, certifique-se de que o workflow foi executado pelo menos uma vez
3. Para Codecov, verifique se o token está configurado

#### Problema: Badge desatualizado

**Soluções:**

1. Badges são atualizados automaticamente, mas pode haver delay
2. Force atualização acessando a URL do badge diretamente
3. Verifique se o serviço está funcionando

### Boas Práticas

1. **Use badges relevantes**: Não adicione badges desnecessários
2. **Mantenha atualizados**: Remova badges de serviços não utilizados
3. **Organize por categoria**: Agrupe badges relacionados
4. **Use links**: Torne badges clicáveis quando possível
5. **Teste localmente**: Verifique se badges aparecem corretamente
6. **Documente**: Explique badges incomuns
7. **Mantenha consistência**: Use mesmo estilo para todos
8. **Não exagere**: 5-10 badges são suficientes

### Exemplo: Template de Badges para Projeto React Native

```markdown
# 🚀 Mentorias Frontend

<!-- CI/CD -->

![CI](https://github.com/usuario/mentorias-frontend/workflows/CI/badge.svg)
![Tests](https://github.com/usuario/mentorias-frontend/workflows/Tests/badge.svg)

<!-- Qualidade -->

[![codecov](https://codecov.io/gh/usuario/mentorias-frontend/branch/main/graph/badge.svg)](https://codecov.io/gh/usuario/mentorias-frontend)

<!-- Versão -->

![Version](https://img.shields.io/github/package-json/v/usuario/mentorias-frontend/main)
![Latest Release](https://img.shields.io/github/v/release/usuario/mentorias-frontend)

<!-- Licença -->

![License](https://img.shields.io/github/license/usuario/mentorias-frontend)

<!-- Status -->

![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![Status](https://img.shields.io/badge/status-active-success)

<!-- Tecnologias -->

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.72.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-49.0.0-000020?logo=expo&logoColor=white)

<!-- Estatísticas -->

![Stars](https://img.shields.io/github/stars/usuario/mentorias-frontend?style=social)
![Forks](https://img.shields.io/github/forks/usuario/mentorias-frontend?style=social)
```

### Resumo

- **Badges** fornecem informações visuais rápidas sobre o projeto
- Use **Shields.io** para criar badges personalizados
- **GitHub Actions** gera badges automaticamente
- Organize badges por **categoria**
- Mantenha badges **relevantes e atualizados**
- Use **links clicáveis** quando possível
- Não exagere: **5-10 badges são suficientes**

---

<a id="documentação-de-deploy"></a>

## Documentação de Deploy **[⬆️](#topo)**

### Por que Documentar o Processo de Deploy?

Documentação de deploy é essencial para:

1. **Reprodutibilidade**: Qualquer pessoa da equipe pode fazer deploy
2. **Consistência**: Garante que deploys sejam feitos da mesma forma
3. **Segurança**: Reduz erros e problemas em produção
4. **Onboarding**: Facilita integração de novos membros
5. **Troubleshooting**: Facilita identificação e resolução de problemas
6. **Compliance**: Atende requisitos de auditoria e governança

### O que Documentar?

#### 1. Visão Geral do Processo

**Estrutura básica:**

```markdown
# Processo de Deploy

## Ambientes

- **Desenvolvimento**: Ambiente local e de testes
- **Staging**: Ambiente de pré-produção para validação
- **Produção**: Ambiente final para usuários

## Fluxo de Deploy

1. Desenvolvimento → Staging
2. Validação em Staging
3. Staging → Produção
```

#### 2. Requisitos e Pré-requisitos

**Documentar:**

- Versões de ferramentas necessárias (Node.js, npm, Docker, etc.)
- Acesso necessário (SSH, VPN, credenciais)
- Permissões de repositório e serviços
- Dependências externas (banco de dados, APIs, etc.)

**Exemplo:**

```markdown
## Pré-requisitos

### Ferramentas Necessárias

- Node.js 18.x ou superior
- npm 9.x ou superior
- Docker 20.x ou superior
- Git 2.30 ou superior

### Acesso Necessário

- Acesso SSH ao servidor
- Credenciais do banco de dados
- Tokens de API (GitHub, Firebase, etc.)
- Acesso ao painel de controle do servidor
```

#### 3. Variáveis de Ambiente

**Documentar todas as variáveis necessárias:**

```markdown
## Variáveis de Ambiente

### Desenvolvimento

\`\`\`env
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/mentorias_dev
FIREBASE_API_KEY=your-dev-key
\`\`\`

### Staging

\`\`\`env
NODE_ENV=staging
API_URL=https://api-staging.mentorias.com
DATABASE_URL=postgresql://staging-db:5432/mentorias_staging
FIREBASE_API_KEY=your-staging-key
\`\`\`

### Produção

\`\`\`env
NODE_ENV=production
API_URL=https://api.mentorias.com
DATABASE_URL=postgresql://prod-db:5432/mentorias_prod
FIREBASE_API_KEY=your-prod-key
\`\`\`
```

**Importante:** Nunca commite arquivos `.env` com valores reais. Use `.env.example` como template.

#### 4. Processo de Deploy por Ambiente

##### Deploy em Desenvolvimento

**Exemplo de estrutura:**

````markdown
## Deploy em Desenvolvimento

### Setup Inicial

1. Clonar repositório:
   ```bash
   git clone https://github.com/usuario/mentorias-frontend.git
   cd mentorias-frontend
   ```
````

````

2. Instalar dependências:

   ```bash
   npm install
````

3. Configurar variáveis de ambiente:

   ```bash
   cp .env.example .env
   # Editar .env com valores de desenvolvimento
   ```

4. Iniciar aplicação:
   ```bash
   npm run dev
   ```

### Atualização

```bash
git pull origin develop
npm install
npm run dev
```

##### Deploy em Staging

**Exemplo de estrutura:**

````markdown
## Deploy em Staging

### Deploy Automático (Recomendado)

O deploy em staging é automático via GitHub Actions quando código é mergeado em `develop`.

### Deploy Manual

1. Conectar ao servidor:
   ```bash
   ssh usuario@staging.mentorias.com
   ```
````

````

2. Navegar para diretório do projeto:

   ```bash
   cd /var/www/mentorias-frontend
````

3. Atualizar código:

   ```bash
   git pull origin develop
   ```

4. Instalar dependências:

   ```bash
   npm ci --production
   ```

5. Build da aplicação:

   ```bash
   npm run build
   ```

6. Reiniciar serviços:

   ```bash
   pm2 restart mentorias-frontend
   # ou
   systemctl restart mentorias-frontend
   ```

7. Verificar status:
   ```bash
   pm2 status
   # ou
   systemctl status mentorias-frontend
   ```

##### Deploy em Produção

**Exemplo de estrutura:**

````markdown
## Deploy em Produção

⚠️ **IMPORTANTE**: Deploy em produção requer aprovação e deve ser feito com cuidado.

### Checklist Pré-Deploy

- [ ] Todos os testes passaram
- [ ] Code review aprovado
- [ ] CHANGELOG.md atualizado
- [ ] Versão atualizada
- [ ] Backup do banco de dados realizado
- [ ] Rollback plan preparado
- [ ] Equipe notificada sobre deploy

### Processo de Deploy

1. **Criar release branch:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.2.0
   ```
````

````

2. **Atualizar versão:**

   ```bash
   npm version minor
   git push origin release/v1.2.0
````

3. **Criar Pull Request para main:**

   - PR deve ser revisado e aprovado
   - Todos os checks devem passar

4. **Merge para main:**

   ```bash
   git checkout main
   git merge release/v1.2.0
   git push origin main --tags
   ```

5. **Deploy automático via CI/CD:**

   - GitHub Actions detecta push em main
   - Executa build e testes
   - Faz deploy automático (se configurado)

6. **Verificação pós-deploy:**
   - Verificar logs do servidor
   - Testar funcionalidades críticas
   - Monitorar métricas (erros, performance)

````

#### 5. Deploy de Aplicativos Mobile

**Exemplo de estrutura:**

```markdown
## Deploy de Apps Mobile

### Android (Google Play Store)

1. **Build de produção:**
   ```bash
   cd mentorApp
   npm run build:android
````

````

2. **Gerar APK/AAB:**

   ```bash
   eas build --platform android --profile production
````

3. **Upload para Google Play Console:**
   - Acessar Google Play Console
   - Criar nova release
   - Upload do arquivo AAB
   - Preencher release notes
   - Publicar (staged rollout recomendado)

### iOS (App Store)

1. **Build de produção:**

   ```bash
   cd mentorApp
   npm run build:ios
   ```

2. **Gerar IPA:**

   ```bash
   eas build --platform ios --profile production
   ```

3. **Upload para App Store Connect:**
   - Acessar App Store Connect
   - Criar nova versão
   - Upload do arquivo IPA via Transporter
   - Preencher informações da versão
   - Submeter para revisão

````

#### 6. Deploy de Backend/Serviços

**Exemplo de estrutura:**

```markdown
## Deploy de Serviços Backend

### Usando Docker

1. **Build da imagem:**
   ```bash
   docker build -t mentorias-backend:latest .
````

````

2. **Tag da imagem:**

   ```bash
   docker tag mentorias-backend:latest registry.mentorias.com/backend:v1.2.0
````

3. **Push para registry:**

   ```bash
   docker push registry.mentorias.com/backend:v1.2.0
   ```

4. **Deploy no servidor:**
   ```bash
   ssh servidor
   docker pull registry.mentorias.com/backend:v1.2.0
   docker-compose up -d
   ```

### Usando Kubernetes

```bash
kubectl set image deployment/backend backend=registry.mentorias.com/backend:v1.2.0
kubectl rollout status deployment/backend
```

#### 7. Rollback

**Exemplo de estrutura:**

````markdown
## Processo de Rollback

### Rollback Rápido (Última versão)

```bash
# Git
git revert HEAD
git push origin main

# Docker
docker-compose down
docker-compose up -d backend:v1.1.0

# Kubernetes
kubectl rollout undo deployment/backend
```
````

````

### Rollback para Versão Específica

1. **Identificar versão estável:**

   ```bash
   git tag -l
   git checkout v1.1.0
````

2. **Criar hotfix branch:**

   ```bash
   git checkout -b hotfix/rollback-v1.1.0
   ```

3. **Merge para main:**

   ```bash
   git checkout main
   git merge hotfix/rollback-v1.1.0
   git push origin main
   ```

4. **Deploy da versão anterior:**
   - Seguir processo de deploy normal
   - Usar tag/versão específica

````

#### 8. Monitoramento Pós-Deploy

```markdown
## Monitoramento Pós-Deploy

### Verificações Imediatas (Primeiros 5 minutos)

- [ ] Aplicação está respondendo
- [ ] Health check endpoints funcionando
- [ ] Sem erros críticos nos logs
- [ ] Métricas de performance normais
- [ ] Banco de dados conectado

### Verificações Contínuas (Primeira hora)

- [ ] Taxa de erro dentro do normal
- [ ] Tempo de resposta adequado
- [ ] Uso de recursos (CPU, memória) normal
- [ ] Sem vazamentos de memória
- [ ] Funcionalidades críticas testadas

### Ferramentas de Monitoramento

- **Logs**: CloudWatch, Datadog, ELK Stack
- **Métricas**: Prometheus, Grafana
- **APM**: New Relic, AppDynamics
- **Uptime**: Pingdom, UptimeRobot
````

### Estrutura de Documentação Recomendada

**Criar arquivo `DEPLOY.md` na raiz do projeto:**

```markdown
# Guia de Deploy

## Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Deploy em Desenvolvimento](#deploy-em-desenvolvimento)
5. [Deploy em Staging](#deploy-em-staging)
6. [Deploy em Produção](#deploy-em-produção)
7. [Deploy Mobile](#deploy-mobile)
8. [Rollback](#rollback)
9. [Troubleshooting](#troubleshooting)

## Visão Geral

[Descrição do processo geral]

## Pré-requisitos

[Ferramentas e acessos necessários]

...
```

### Checklist de Documentação

Antes de considerar a documentação completa, verifique:

- [ ] Processo de deploy documentado para todos os ambientes
- [ ] Variáveis de ambiente listadas e explicadas
- [ ] Comandos de deploy testados e funcionando
- [ ] Processo de rollback documentado
- [ ] Troubleshooting comum documentado
- [ ] Contatos de emergência listados
- [ ] Requisitos de infraestrutura documentados
- [ ] Scripts de deploy automatizados (se houver)
- [ ] Documentação revisada por outro membro da equipe
- [ ] Documentação atualizada após mudanças no processo

### Boas Práticas

1. **Mantenha atualizado**: Documentação deve refletir o processo atual
2. **Seja específico**: Inclua comandos exatos, não apenas descrições
3. **Teste os comandos**: Certifique-se de que todos os comandos funcionam
4. **Inclua exemplos**: Mostre saídas esperadas de comandos
5. **Documente erros comuns**: Ajude outros a evitar problemas conhecidos
6. **Use versionamento**: Mantenha histórico de mudanças na documentação
7. **Revise regularmente**: Atualize quando o processo mudar
8. **Torne acessível**: Coloque em local fácil de encontrar (README, docs/, etc.)

### Exemplo: Template Completo de DEPLOY.md

**Estrutura recomendada:**

````markdown
# 🚀 Guia de Deploy - Mentorias Frontend

> **Última atualização**: 29/11/2025
> **Responsável**: Equipe DevOps

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Ambientes](#ambientes)
- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy em Desenvolvimento](#deploy-em-desenvolvimento)
- [Deploy em Staging](#deploy-em-staging)
- [Deploy em Produção](#deploy-em-produção)
- [Deploy Mobile](#deploy-mobile)
- [Rollback](#rollback)
- [Troubleshooting](#troubleshooting)
- [Contatos](#contatos)

## Visão Geral

Este documento descreve o processo completo de deploy da aplicação Mentorias Frontend em todos os ambientes.

## Ambientes

| Ambiente        | URL                           | Branch    | Deploy     |
| --------------- | ----------------------------- | --------- | ---------- |
| Desenvolvimento | http://localhost:3000         | `develop` | Manual     |
| Staging         | https://staging.mentorias.com | `develop` | Automático |
| Produção        | https://mentorias.com         | `main`    | Automático |

## Pré-requisitos

[Conteúdo detalhado...]

## Variáveis de Ambiente

[Conteúdo detalhado...]

## Deploy em Desenvolvimento

[Conteúdo detalhado...]

## Deploy em Staging

[Conteúdo detalhado...]

## Deploy em Produção

[Conteúdo detalhado...]

## Deploy Mobile

[Conteúdo detalhado...]

## Rollback

[Conteúdo detalhado...]

## Troubleshooting

### Problema: Build falha

**Solução:**

```bash
# Limpar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```
````

### Problema: Deploy não atualiza

**Solução:**

```bash
# Verificar se código foi atualizado
git pull origin main

# Forçar rebuild
npm run build -- --force
```

## Contatos

- **DevOps**: devops@mentorias.com
- **Emergência**: +55 11 99999-9999
- **Slack**: #deploy-alerts

````

### Resumo

- **Documentação de deploy** é essencial para reprodutibilidade e segurança
- Documente **todos os ambientes** (dev, staging, produção)
- Inclua **variáveis de ambiente**, **comandos exatos** e **troubleshooting**
- Mantenha documentação **atualizada** e **testada**
- Use **checklists** para garantir completude
- Documente **processo de rollback** para emergências
- Inclua **contatos de emergência** e **monitoramento pós-deploy**

---

<a id="changelogmd"></a>

## CHANGELOG.md **[⬆️](#topo)**

### O que é CHANGELOG.md?

O `CHANGELOG.md` é um arquivo que documenta todas as mudanças notáveis do projeto, organizadas por versão e data. Ele serve como histórico de mudanças e facilita a comunicação com usuários e desenvolvedores sobre o que mudou em cada release.

### Por que Manter um CHANGELOG?

1. **Transparência**: Usuários sabem o que mudou em cada versão
2. **Histórico**: Registro permanente de todas as mudanças
3. **Comunicação**: Facilita release notes e anúncios
4. **Rastreabilidade**: Facilita identificar quando bugs foram introduzidos
5. **Profissionalismo**: Demonstra cuidado e organização do projeto

### Formato Recomendado: Keep a Changelog

O formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) é amplamente adotado e bem estruturado:

```markdown
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Versão] - Data

### Adicionado
- Nova funcionalidade X
- Novo endpoint Y

### Modificado
- Melhorada performance de Z

### Corrigido
- Bug no componente A

### Removido
- Funcionalidade deprecated B

### Segurança
- Correção de vulnerabilidade C
````

### Categorias de Mudanças

#### Adicionado

Novas funcionalidades, endpoints, componentes, etc.

```markdown
### Adicionado

- Nova tela de perfil do usuário
- Endpoint `/api/notifications` na API
- Sistema de notificações push
- Filtros avançados na busca
```

#### Modificado

Mudanças em funcionalidades existentes que não quebram compatibilidade.

```markdown
### Modificado

- Melhorada performance da listagem de mentores
- Atualizado design do componente de busca
- Otimizado carregamento de imagens
```

#### Corrigido

Correções de bugs.

```markdown
### Corrigido

- Bug no cálculo de distância entre mentores
- Correção de crash no login
- Bug no carregamento de imagens
```

#### Removido

Funcionalidades removidas ou deprecadas.

```markdown
### Removido

- Removida API antiga `/api/v1/users` (use `/api/v2/users`)
- Removido suporte para Internet Explorer
```

#### Segurança

Correções de vulnerabilidades de segurança.

```markdown
### Segurança

- Correção de vulnerabilidade de segurança no login
- Atualização de dependências com vulnerabilidades conhecidas
```

### Como Manter o CHANGELOG Atualizado

#### Método 1: Manual

**Durante o desenvolvimento:**

1. Ao adicionar uma feature, adicione na seção "Unreleased":

   ```markdown
   ## [Unreleased]

   ### Adicionado

   - Nova feature X
   ```

2. Antes de cada release, mova itens de "Unreleased" para a nova versão:

   ```markdown
   ## [1.2.0] - 2025-01-15

   ### Adicionado

   - Nova feature X
   ```

#### Método 2: Automático com standard-version

**Configurar `standard-version`:**

```json
{
	"scripts": {
		"release": "standard-version"
	}
}
```

**Uso:**

```bash
# Gera versão, atualiza CHANGELOG e cria tag
npm run release
```

O `standard-version` automaticamente:

- Lê commits no formato Conventional Commits
- Gera/atualiza CHANGELOG.md
- Incrementa versão
- Cria tag Git

### Boas Práticas

1. **Mantenha atualizado**: Atualize o CHANGELOG a cada mudança significativa
2. **Seja específico**: Descreva o que mudou, não apenas "melhorias"
3. **Use links**: Referencie issues e PRs quando relevante
4. **Organize por categoria**: Use as categorias padrão (Adicionado, Modificado, etc.)
5. **Inclua breaking changes**: Destaque mudanças incompatíveis
6. **Use formato consistente**: Siga o mesmo padrão em todas as versões
7. **Mantenha ordem cronológica**: Versões mais recentes primeiro
8. **Seja honesto**: Documente bugs e problemas conhecidos

### Resumo

- **CHANGELOG.md** documenta todas as mudanças do projeto
- Use formato **Keep a Changelog** para consistência
- Organize por **categorias**: Adicionado, Modificado, Corrigido, Removido, Segurança
- Mantenha **atualizado** a cada release
- Use ferramentas como **standard-version** para automatizar
- **Integre com GitHub Releases** para facilitar comunicação

---

<a id="revisar-e-consolidar-remotes"></a>

## Revisar e Consolidar Remotes **[⬆️](#topo)**

### O que são Git Remotes?

Remotes são referências a repositórios Git remotos. Eles permitem que você trabalhe com repositórios hospedados em servidores (GitHub, GitLab, etc.) além do seu repositório local.

### Por que Revisar e Consolidar Remotes?

1. **Organização**: Evita confusão com múltiplos remotes
2. **Segurança**: Remove remotes não autorizados ou obsoletos
3. **Consistência**: Garante que todos usam os mesmos remotes
4. **Performance**: Reduz overhead de remotes desnecessários
5. **Clareza**: Facilita entender de onde vem o código

### Verificar Remotes Configurados

**Listar todos os remotes:**

```bash
# Listar remotes com URLs
git remote -v

# Saída exemplo:
# origin    https://github.com/usuario/mentorias-frontend.git (fetch)
# origin    https://github.com/usuario/mentorias-frontend.git (push)
# upstream  https://github.com/original/mentorias-frontend.git (fetch)
# upstream  https://github.com/original/mentorias-frontend.git (push)
```

**Ver detalhes de um remote específico:**

```bash
# Ver URL do remote
git remote get-url origin

# Ver todas as informações
git remote show origin
```

### Tipos de Remotes Comuns

#### 1. Origin (Principal)

O remote principal do repositório, geralmente o seu fork ou repositório principal.

```bash
# Configurar origin
git remote add origin https://github.com/usuario/mentorias-frontend.git

# Ou alterar URL existente
git remote set-url origin https://github.com/usuario/mentorias-frontend.git
```

#### 2. Upstream

O repositório original (quando você tem um fork).

```bash
# Adicionar upstream
git remote add upstream https://github.com/original/mentorias-frontend.git
```

### Problemas Comuns com Remotes

#### Problema 1: Múltiplos Remotes Duplicados

**Situação:** Vários remotes apontando para o mesmo repositório.

**Solução:**

```bash
# Verificar remotes
git remote -v

# Remover remotes duplicados
git remote remove remote-duplicado

# Manter apenas origin
git remote remove upstream  # Se não for necessário
```

#### Problema 2: URLs Incorretas

**Situação:** Remote apontando para URL errada ou obsoleta.

**Solução:**

```bash
# Verificar URL atual
git remote get-url origin

# Atualizar URL
git remote set-url origin https://github.com/usuario/mentorias-frontend.git

# Verificar se foi atualizado
git remote -v
```

#### Problema 3: Mistura de HTTPS e SSH

**Situação:** Alguns remotes usando HTTPS, outros SSH.

**Solução:**

**Converter para SSH (recomendado para desenvolvedores):**

```bash
# Converter origin de HTTPS para SSH
git remote set-url origin git@github.com:usuario/mentorias-frontend.git
```

**Converter para HTTPS (mais simples para iniciantes):**

```bash
# Converter origin de SSH para HTTPS
git remote set-url origin https://github.com/usuario/mentorias-frontend.git
```

### Consolidar Remotes

#### Passo a Passo

##### 1. Verificar remotes atuais

```bash
git remote -v
```

##### 2. Identificar remotes necessários

- **origin**: Sempre necessário (repositório principal)
- **upstream**: Necessário apenas se você tem um fork
- **outros**: Avaliar se são realmente necessários

##### 3. Remover remotes desnecessários

```bash
# Remover remote específico
git remote remove nome-do-remote

# Exemplo: remover remote de backup antigo
git remote remove backup
```

##### 4. Atualizar URLs se necessário

```bash
# Atualizar URL do origin
git remote set-url origin https://github.com/usuario/mentorias-frontend.git
```

##### 5. Verificar configuração final

```bash
git remote -v
```

### Configuração Recomendada

#### Para Projeto Próprio (Sem Fork)

```bash
# Apenas origin
git remote -v
# origin    https://github.com/usuario/mentorias-frontend.git (fetch)
# origin    https://github.com/usuario/mentorias-frontend.git (push)
```

#### Para Fork de Projeto

```bash
# Origin (seu fork) e upstream (original)
git remote -v
# origin    https://github.com/seu-usuario/mentorias-frontend.git (fetch)
# origin    https://github.com/seu-usuario/mentorias-frontend.git (push)
# upstream  https://github.com/original/mentorias-frontend.git (fetch)
# upstream  https://github.com/original/mentorias-frontend.git (push)
```

### Comandos Úteis

#### Adicionar Remote

```bash
# Adicionar novo remote
git remote add nome https://github.com/usuario/repo.git

# Adicionar upstream (exemplo)
git remote add upstream https://github.com/original/repo.git
```

#### Remover Remote

```bash
# Remover remote
git remote remove nome

# Exemplo
git remote remove upstream
```

#### Renomear Remote

```bash
# Renomear remote
git remote rename nome-antigo nome-novo

# Exemplo: renomear origin para main-repo
git remote rename origin main-repo
```

#### Atualizar URL do Remote

```bash
# Atualizar URL
git remote set-url nome nova-url

# Exemplo: atualizar origin
git remote set-url origin https://github.com/usuario/mentorias-frontend.git
```

#### Verificar Conexão

```bash
# Testar conexão com remote
git remote show origin

# Ou fazer fetch para testar
git fetch origin
```

### Documentar Remotes

**Adicionar no README.md ou CONTRIBUTING.md:**

```markdown
## Configuração de Remotes

Este projeto usa os seguintes remotes:

- **origin**: Repositório principal

  - URL: `https://github.com/usuario/mentorias-frontend.git`
  - Uso: Push e pull do código principal

- **upstream**: Repositório original (se aplicável)
  - URL: `https://github.com/original/mentorias-frontend.git`
  - Uso: Sincronizar com mudanças do projeto original
```

### Troubleshooting

#### Problema: Remote não encontrado

**Erro:** `fatal: 'origin' does not appear to be a git repository`

**Solução:**

```bash
# Verificar se remote existe
git remote -v

# Se não existir, adicionar
git remote add origin https://github.com/usuario/repo.git
```

#### Problema: Erro de autenticação

**Erro:** `Permission denied (publickey)` ou `Authentication failed`

**Solução:**

**Para SSH:**

```bash
# Verificar chave SSH
ssh -T git@github.com

# Se não funcionar, configurar chave SSH ou usar HTTPS
```

**Para HTTPS:**

```bash
# Usar token de acesso pessoal
git remote set-url origin https://TOKEN@github.com/usuario/repo.git

# Ou configurar credenciais
git config --global credential.helper store
```

### Boas Práticas

1. **Mantenha apenas remotes necessários**: Remova remotes não utilizados
2. **Use nomes descritivos**: `origin`, `upstream`, não `remote1`, `remote2`
3. **Documente remotes**: Explique no README quais remotes são usados
4. **Padronize URLs**: Use HTTPS ou SSH consistentemente
5. **Revise periodicamente**: Verifique remotes a cada poucos meses
6. **Use origin como principal**: Mantenha `origin` como remote principal
7. **Atualize URLs obsoletas**: Se repositório mudou de local, atualize

### Checklist: Revisar Remotes

Antes de considerar remotes consolidados:

- [ ] Listou todos os remotes: `git remote -v`
- [ ] Identificou remotes necessários vs desnecessários
- [ ] Removeu remotes duplicados ou não utilizados
- [ ] Verificou URLs estão corretas
- [ ] Padronizou formato de URL (HTTPS ou SSH)
- [ ] Testou conexão com cada remote: `git fetch <remote>`
- [ ] Documentou remotes no README ou CONTRIBUTING.md
- [ ] Atualizou scripts que referenciam remotes

### Resumo

- **Remotes** são referências a repositórios Git remotos
- **Revise periodicamente** para manter organização
- **Mantenha apenas remotes necessários** (geralmente apenas `origin`)
- **Padronize URLs** (HTTPS ou SSH)
- **Documente remotes** no README ou CONTRIBUTING.md
- **Use `git remote -v`** para verificar configuração atual
- **Remova remotes duplicados** ou não utilizados

---

<a id="referências"></a>

## Referências **[⬆️](#topo)**

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Setup Java Action](https://github.com/actions/setup-java)
- [Setup Node Action](https://github.com/actions/setup-node)
- [Codecov Action](https://github.com/codecov/codecov-action)
- [Matrix Strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [Caching Dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

---

**Última atualização:** 29/11/2025

```

```

```

```
