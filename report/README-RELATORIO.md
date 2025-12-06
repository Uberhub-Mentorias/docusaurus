# Gerador de Relatório de Acessos

Este aplicativo consulta os registros de rastreamento do Firestore e gera um relatório detalhado dos acessos ao portal Docusaurus.

## 📋 Pré-requisitos

- Node.js >= 20.0 (conforme especificado no `package.json`)
- Acesso ao projeto Firebase `mentorias-uberhub`
- Dependências do projeto instaladas (`npm install`)

## 🚀 Como Usar

### 1. Instalar dependências (se ainda não instalou)

```bash
npm install
```

### 2. Gerar o relatório

Execute o comando:

```bash
npm run report
```

Ou diretamente:

```bash
node report/report-generator.js
```

### 3. Visualizar o relatório

Após a execução, um arquivo `relatorio-acessos.html` será gerado na pasta `report` e **aberto automaticamente no seu navegador padrão**. 

Se o navegador não abrir automaticamente, você pode abrir manualmente o arquivo `report/relatorio-acessos.html` no seu navegador.

## 📊 O que o relatório inclui

O relatório gerado contém:

- **Estatísticas Gerais**
  - Total de eventos registrados
  - Número de sessões únicas
  - Número de IPs únicos
  - Tempo médio de permanência nas páginas

- **Distribuição por Tipo de Evento**
  - `page_view`: Visualizações de página
  - `page_exit`: Saídas de página
  - `page_hidden`: Páginas ocultadas (mudança de aba)
  - `page_visible`: Páginas tornadas visíveis
  - `external_link_click`: Cliques em links externos
  - `internal_link_click`: Cliques em links internos

- **Páginas Mais Acessadas**
  - Lista das páginas mais visitadas
  - Número de visualizações por página
  - Número de sessões únicas por página
  - Número de saídas por página

- **Análise de Navegadores e Sistemas Operacionais**
  - Distribuição por navegador (Chrome, Firefox, Safari, Edge, etc.)
  - Distribuição por sistema operacional (Windows, macOS, Linux, Android, iOS)

- **Distribuição Temporal**
  - Acessos por hora do dia
  - Acessos por dia

- **Top 10 Sessões**
  - Sessões com mais eventos
  - Número de páginas visitadas por sessão
  - Duração das sessões

- **Top 10 IPs**
  - Endereços IP com mais acessos

## 🔧 Configuração

O script usa a mesma configuração do Firebase definida em `src/lib/firebase.js`. Se precisar alterar a configuração, edite as constantes no início do arquivo `report/report-generator.js`.

## 📝 Notas

- O relatório consulta todos os registros da coleção `access_logs` no Firestore
- Os dados são ordenados por timestamp (mais recentes primeiro)
- O relatório é gerado em HTML com estilos CSS embutidos, não requer servidor web
- O arquivo gerado pode ser compartilhado ou enviado por email
- O relatório será salvo na pasta `report`
- **O navegador abre automaticamente** após a geração do relatório (Windows, macOS e Linux)

## 🐛 Solução de Problemas

### Erro de conexão com Firebase

Certifique-se de que:
- Você tem acesso à internet
- O projeto Firebase está ativo
- As credenciais no código estão corretas

### Nenhum registro encontrado

Se o relatório estiver vazio:
- Verifique se há registros na coleção `access_logs` do Firestore
- Confirme que o sistema de rastreamento está funcionando no portal

### Erro de módulo não encontrado

Execute:
```bash
npm install
```

Para garantir que todas as dependências estão instaladas.

