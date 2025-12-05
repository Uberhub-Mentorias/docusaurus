# ⌨️ Guia Completo: Atalhos de Teclado no Cursor

Este guia completo mostra como listar, visualizar e configurar atalhos de teclado no Cursor IDE.

---

## 📋 Como Listar Todos os Atalhos

### 🚀 Método Mais Rápido

**Pressione**: `Ctrl+K Ctrl+S` (Windows/Linux) ou `Cmd+K Cmd+S` (macOS)

Isso abre a interface gráfica com todos os atalhos organizados e pesquisáveis.

---

### Todos os Métodos Disponíveis

#### 1️⃣ Interface Gráfica (Mais Fácil)

**Atalho**: `Ctrl+K Ctrl+S` (ou `Cmd+K Cmd+S` no macOS)

**Ou pelo menu**:
- `File` → `Preferences` → `Keyboard Shortcuts`

**Ou pelo Command Palette**:
1. `Ctrl+Shift+P` (ou `Cmd+Shift+P`)
2. Digite: `Preferences: Open Keyboard Shortcuts`
3. Enter

**Vantagens**:
- ✅ Interface visual amigável
- ✅ Busca integrada
- ✅ Fácil de editar atalhos
- ✅ Mostra conflitos
- ✅ Organizado por categoria

---

#### 2️⃣ Ver Atalhos Padrão (JSON - Somente Leitura)

**Pelo Command Palette**:
1. `Ctrl+Shift+P` (ou `Cmd+Shift+P`)
2. Digite: `Preferences: Open Default Keyboard Shortcuts (JSON)`
3. Enter

**O que você verá**:
- Todos os atalhos padrão do Cursor
- Formato JSON legível
- Organizado por comando
- **Nota**: Arquivo somente leitura (não pode editar)

**Exemplo do conteúdo**:
```json
[
  {
    "key": "ctrl+shift+p",
    "command": "workbench.action.showCommands"
  },
  {
    "key": "ctrl+k ctrl+s",
    "command": "workbench.action.openGlobalKeybindings"
  },
  // ... centenas de outros atalhos
]
```

---

#### 3️⃣ Ver Seus Atalhos Personalizados (JSON - Editável)

**Pelo Command Palette**:
1. `Ctrl+Shift+P` (ou `Cmd+Shift+P`)
2. Digite: `Preferences: Open Keyboard Shortcuts (JSON)`
3. Enter

**O que você verá**:
- Apenas os atalhos que você personalizou
- Se estiver vazio `[]`, você não tem personalizações
- Este arquivo você PODE editar

**Exemplo**:
```json
[
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  }
]
```

---

## 🔍 Como Buscar Atalhos Específicos

### Na Interface Gráfica (`Ctrl+K Ctrl+S`)

1. **Por nome do comando**:
   - Digite: "open file", "save", "commit", "terminal"
   - Mostra todos os atalhos relacionados

2. **Por atalho de teclado**:
   - Digite: "ctrl+s", "f5", "ctrl+shift+p"
   - Mostra qual comando está associado

3. **Por categoria**:
   - Digite: "git", "terminal", "search", "file"
   - Mostra todos os atalhos daquela categoria

### Exemplos de Busca

| Buscar por | Resultado |
|------------|-----------|
| `git` | Todos os atalhos relacionados ao Git |
| `terminal` | Atalhos do terminal integrado |
| `ctrl+s` | Mostra o comando associado a Ctrl+S |
| `toggle` | Todos os comandos que alternam algo |
| `focus` | Comandos que focam em painéis/views |

---

## ⚡ Configurar Atalhos Personalizados

### Configuração Rápida: Atalho para Source Control (2 minutos)

#### 1. Abrir Configuração de Atalhos
- Pressione: `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS)
- Digite: `Preferences: Open Keyboard Shortcuts (JSON)`
- Pressione Enter

#### 2. Adicionar o Atalho
Cole este código no arquivo que abrir:

```json
[
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  }
]
```

**Importante**: Se o arquivo já tiver conteúdo (começar com `[`), adicione apenas o objeto `{...}` dentro do array existente, sem duplicar os colchetes.

## 📍 Localização do Arquivo

O arquivo `keybindings.json` fica em:

- **Windows**: `C:\Users\angot\AppData\Roaming\Cursor\User\keybindings.json`
- **macOS**: `~/Library/Application Support/Cursor/User/keybindings.json`
- **Linux**: `~/.config/Cursor/User/keybindings.json`

---

## 🎯 Outros Atalhos Úteis

Se quiser adicionar mais atalhos, aqui estão alguns úteis:

```json
[
  // Source Control
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  },
  
  // Explorer (Explorador de Arquivos)
  {
    "key": "ctrl+shift+e",
    "command": "workbench.view.explorer"
  },
  
  // Terminal
  {
    "key": "ctrl+shift+`",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  
  // Commit rápido (quando Source Control está aberto)
  {
    "key": "ctrl+enter",
    "command": "git.commit",
    "when": "scmRepository && scmProvider == 'git'"
  }
]
```

---

## 📊 Categorias de Atalhos

Os atalhos estão organizados em categorias:

| Categoria | Exemplos |
|-----------|----------|
| **File** | New File, Save, Open File |
| **Edit** | Copy, Paste, Undo, Find |
| **View** | Toggle Sidebar, Zoom, Full Screen |
| **Go** | Go to File, Go to Symbol, Go to Line |
| **Debug** | Start Debugging, Step Over, Breakpoint |
| **Terminal** | New Terminal, Toggle Terminal |
| **Git** | Commit, Push, Pull, Stage |
| **Search** | Find in Files, Replace, Search |
| **Preferences** | Open Settings, Keyboard Shortcuts |

---

## 🎯 Atalhos Mais Usados

Aqui estão alguns dos atalhos mais úteis para começar:

| Atalho | Comando | Descrição |
|--------|---------|-----------|
| `Ctrl+Shift+P` | Command Palette | Abre menu de comandos |
| `Ctrl+K Ctrl+S` | Keyboard Shortcuts | Abre lista de atalhos |
| `Ctrl+Shift+G` | Source Control | Abre painel Git |
| `Ctrl+Shift+E` | Explorer | Abre explorador de arquivos |
| `Ctrl+` ` | Terminal | Abre/fecha terminal |
| `Ctrl+P` | Quick Open | Abre arquivo rapidamente |
| `Ctrl+F` | Find | Busca no arquivo |
| `Ctrl+Shift+F` | Find in Files | Busca em todos os arquivos |
| `F5` | Start Debugging | Inicia depuração |
| `Ctrl+S` | Save | Salva arquivo |

---

## 💡 Dicas Úteis

### Ver Atalho de um Comando Específico

1. Abra o Command Palette: `Ctrl+Shift+P`
2. Digite o nome do comando
3. O atalho aparecerá ao lado do nome

**Exemplo**:
- Digite "open file" → Verá `Ctrl+P` ao lado
- Digite "save" → Verá `Ctrl+S` ao lado

### Ver Todos os Atalhos de um Painel

1. Abra a interface: `Ctrl+K Ctrl+S`
2. Busque pelo nome do painel:
   - "source control" → Atalhos do Git
   - "explorer" → Atalhos do Explorer
   - "terminal" → Atalhos do Terminal

### Exportar Lista de Atalhos

Atualmente, o Cursor não tem uma função nativa para exportar. Mas você pode:

1. Abrir o arquivo de atalhos padrão (JSON)
2. Copiar o conteúdo
3. Salvar em um arquivo `.txt` ou `.md` para referência
