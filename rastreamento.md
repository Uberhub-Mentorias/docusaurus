# Rastreamento de Acessos

Este documento descreve a funcionalidade de rastreamento de acessos implementada no portal Docusaurus.

## Visão Geral

O sistema de rastreamento registra automaticamente os acessos dos usuários ao portal, armazenando os dados no Firebase Firestore. Isso permite analisar o comportamento dos usuários, páginas mais visitadas, tempo de permanência e outras métricas importantes.

## Funcionalidades

### Eventos Rastreados

1. **page_view**: Registrado quando uma página é visualizada
2. **page_exit**: Registrado quando o usuário sai da página (fecha a aba/navegador)
3. **page_hidden**: Registrado quando o usuário muda de aba (página fica oculta)
4. **page_visible**: Registrado quando o usuário volta para a aba (página fica visível)

### Dados Coletados

Para cada evento, os seguintes dados são registrados:

- **sessionId**: ID único da sessão do usuário
- **eventType**: Tipo do evento (page_view, page_exit, etc.)
- **timestamp**: Timestamp do servidor Firebase
- **clientTimestamp**: Timestamp do cliente
- **page**: Informações da página
  - url: URL completa
  - pathname: Caminho da página
  - search: Parâmetros de busca
  - hash: Hash da URL
  - title: Título da página
  - referrer: Página de origem
- **browser**: Informações do navegador
  - userAgent: User agent do navegador
  - language: Idioma do navegador
  - platform: Plataforma do sistema operacional
  - screenWidth/Height: Resolução da tela
  - viewportWidth/Height: Tamanho da viewport
- **timeOnPage**: Tempo de permanência na página (em segundos) - apenas para eventos de saída

## Estrutura dos Dados no Firebase

Os dados são armazenados na coleção `access_logs` do Firestore com a seguinte estrutura:

```json
{
  "sessionId": "session_1234567890_abc123",
  "eventType": "page_view",
  "timestamp": "2024-01-15T10:30:00Z",
  "clientTimestamp": "2024-01-15T10:30:00.123Z",
  "page": {
    "url": "https://example.com/docs/intro",
    "pathname": "/docs/intro",
    "search": "",
    "hash": "",
    "title": "Introdução - Docusaurus",
    "referrer": "https://example.com/"
  },
  "browser": {
    "userAgent": "Mozilla/5.0...",
    "language": "pt-BR",
    "platform": "Win32",
    "screenWidth": 1920,
    "screenHeight": 1080,
    "viewportWidth": 1920,
    "viewportHeight": 937
  },
  "timeOnPage": 45
}
```

## Visualizando os Dados

### No Console do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione o projeto `mentorias-uberhub`
3. Vá para **Firestore Database**
4. Navegue até a coleção `access_logs`
5. Visualize os documentos registrados

### Consultas Úteis

Você pode criar consultas no Firestore para analisar os dados:

- **Páginas mais visitadas**: Agrupar por `page.pathname`
- **Tempo médio de permanência**: Calcular média de `timeOnPage` para eventos `page_exit`
- **Sessões por dia**: Agrupar por data usando `timestamp`
- **Dispositivos mais usados**: Analisar `browser.platform` e `browser.userAgent`

## Configuração

As credenciais do Firebase estão configuradas em `src/lib/firebase.js`. 

⚠️ **Importante**: O arquivo `firebase-dados.txt` contém credenciais sensíveis e não deve ser commitado no repositório. Ele já está incluído no `.gitignore`.

## Privacidade

O sistema de rastreamento:
- Não coleta informações pessoais identificáveis
- Usa apenas dados técnicos do navegador
- Gera IDs de sessão anônimos
- Respeita a privacidade dos usuários

## Desenvolvimento

### Arquivos Relacionados

- `src/lib/firebase.js`: Configuração do Firebase
- `src/lib/tracking.js`: Módulo de rastreamento
- `src/theme/Root.js`: Integração do rastreamento no Docusaurus

### Desabilitar Rastreamento

Para desabilitar o rastreamento durante desenvolvimento, comente as importações e chamadas em `src/theme/Root.js`.

## Suporte

Para questões ou problemas relacionados ao rastreamento, consulte a documentação do Firebase ou entre em contato com a equipe de desenvolvimento.

