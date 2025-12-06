#!/usr/bin/env node

/**
 * Gerador de Relatório de Acessos ao Portal
 * 
 * Este script consulta os registros de rastreamento do Firestore
 * e gera um relatório simplificado dos acessos ao portal.
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, getDocs, orderBy } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

// Configuração do Firebase (mesma do projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBV0Z7l1G8ot2_w3ec5LT5musNp0TW011w",
  authDomain: "mentorias-uberhub.firebaseapp.com",
  projectId: "mentorias-uberhub",
  storageBucket: "mentorias-uberhub.firebasestorage.app",
  messagingSenderId: "248660691174",
  appId: "1:248660691174:web:35d1660691c1ffca115327"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Gera estatísticas dos acessos
 */
function generateStatistics(logs) {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const stats = {
    uniqueSessions: new Set(),
    uniqueIPs: new Set(),
    timeOnPage: [],
    byPage: {},
    bySession: {},
    lastHour: 0,
    last5Hours: 0,
    last24Hours: 0,
  };
  
  logs.forEach(log => {
    const logTime = log.timestamp?.toDate ? log.timestamp.toDate() : new Date(log.timestamp || log.clientTimestamp);
    
    // Contar acessos por período
    if (logTime >= oneHourAgo) {
      stats.lastHour++;
    }
    if (logTime >= fiveHoursAgo) {
      stats.last5Hours++;
    }
    if (logTime >= twentyFourHoursAgo) {
      stats.last24Hours++;
    }
    
    // Sessões únicas
    if (log.sessionId) {
      stats.uniqueSessions.add(log.sessionId);
    }
    
    // IPs únicos
    if (log.ipAddress) {
      stats.uniqueIPs.add(log.ipAddress);
    }
    
    // Tempo na página
    if (log.timeOnPage) {
      stats.timeOnPage.push(log.timeOnPage);
    }
    
    // Por página (excluir pastas - caminhos terminados em /)
    const pathname = log.page?.pathname || 'N/A';
    if (pathname !== 'N/A' && !pathname.endsWith('/')) {
      if (!stats.byPage[pathname]) {
        stats.byPage[pathname] = { views: 0, uniqueSessions: new Set() };
      }
      stats.byPage[pathname].views++;
      if (log.sessionId) {
        stats.byPage[pathname].uniqueSessions.add(log.sessionId);
      }
    }
    
    // Por sessão
    if (log.sessionId) {
      if (!stats.bySession[log.sessionId]) {
        stats.bySession[log.sessionId] = {
          events: 0,
          pages: new Set(),
          startTime: logTime,
          endTime: logTime,
        };
      }
      stats.bySession[log.sessionId].events++;
      if (log.page?.pathname && !log.page.pathname.endsWith('/')) {
        stats.bySession[log.sessionId].pages.add(log.page.pathname);
      }
      if (logTime < stats.bySession[log.sessionId].startTime) {
        stats.bySession[log.sessionId].startTime = logTime;
      }
      if (logTime > stats.bySession[log.sessionId].endTime) {
        stats.bySession[log.sessionId].endTime = logTime;
      }
    }
  });
  
  // Converter Sets para números
  Object.keys(stats.byPage).forEach(page => {
    stats.byPage[page].uniqueSessions = stats.byPage[page].uniqueSessions.size;
  });
  
  Object.keys(stats.bySession).forEach(session => {
    stats.bySession[session].pages = stats.bySession[session].pages.size;
  });
  
  // Calcular média de tempo na página
  if (stats.timeOnPage.length > 0) {
    stats.avgTimeOnPage = Math.round(
      stats.timeOnPage.reduce((a, b) => a + b, 0) / stats.timeOnPage.length
    );
  } else {
    stats.avgTimeOnPage = 0;
  }
  
  stats.uniqueSessions = stats.uniqueSessions.size;
  stats.uniqueIPs = stats.uniqueIPs.size;
  
  return stats;
}

/**
 * Gera os percursos de navegação por sessão
 */
function generateNavigationPaths(logs) {
  const sessions = {};
  
  // Agrupar eventos por sessão
  logs.forEach(log => {
    if (!log.sessionId) return;
    
    const logTime = log.timestamp?.toDate ? log.timestamp.toDate() : new Date(log.timestamp || log.clientTimestamp);
    const pathname = log.page?.pathname || 'N/A';
    
    if (!sessions[log.sessionId]) {
      sessions[log.sessionId] = {
        id: log.sessionId,
        ip: log.ipAddress || 'N/A',
        events: [],
        startTime: logTime,
        endTime: logTime,
      };
    }
    
    // Adicionar evento à sessão
    sessions[log.sessionId].events.push({
      type: log.eventType,
      pathname: pathname,
      time: logTime,
      timeOnPage: log.timeOnPage || null,
    });
    
    // Atualizar tempo de início e fim
    if (logTime < sessions[log.sessionId].startTime) {
      sessions[log.sessionId].startTime = logTime;
    }
    if (logTime > sessions[log.sessionId].endTime) {
      sessions[log.sessionId].endTime = logTime;
    }
  });
  
  // Processar cada sessão: ordenar eventos e criar percurso
  const navigationPaths = Object.values(sessions).map(session => {
    // Ordenar eventos por tempo
    session.events.sort((a, b) => a.time - b.time);
    
    // Criar percurso (sequência de páginas visitadas)
    const path = [];
    const seenPages = new Set();
    
    session.events.forEach((event, index) => {
      // Incluir apenas page_view para o percurso (evitar duplicatas)
      if (event.type === 'page_view' && event.pathname !== 'N/A' && !event.pathname.endsWith('/')) {
        // Evitar repetir a mesma página consecutivamente
        if (path.length === 0 || path[path.length - 1].pathname !== event.pathname) {
          path.push({
            pathname: event.pathname,
            time: event.time,
            order: path.length + 1,
          });
        }
      }
    });
    
    // Calcular duração total
    const duration = Math.round((session.endTime - session.startTime) / 1000 / 60); // em minutos
    
    return {
      sessionId: session.id,
      ip: session.ip,
      path: path,
      totalPages: path.length,
      duration: duration,
      totalEvents: session.events.length,
      startTime: session.startTime,
      endTime: session.endTime,
    };
  });
  
  // Ordenar por número de páginas visitadas (mais ativas primeiro)
  navigationPaths.sort((a, b) => b.totalPages - a.totalPages);
  
  return navigationPaths;
}

/**
 * Gera o relatório HTML
 */
function generateHTMLReport(logs, stats) {
  // Páginas mais acessadas (excluir pastas)
  const topPages = Object.entries(stats.byPage)
    .filter(([path]) => !path.endsWith('/'))
    .map(([path, data]) => ({ path, ...data }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
  
  // Top 10 sessões
  const topSessions = Object.entries(stats.bySession)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.events - a.events)
    .slice(0, 10);
  
  // Gerar percursos de navegação
  const navigationPaths = generateNavigationPaths(logs);
  const topNavigationPaths = navigationPaths.slice(0, 10); // Top 10 percursos mais longos
  
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Acessos - Portal Docusaurus</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
    }
    
    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .stat-card h3 {
      font-size: 0.9em;
      opacity: 0.9;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .stat-card .value {
      font-size: 2.5em;
      font-weight: bold;
    }
    
    .stat-card .description {
      font-size: 0.85em;
      opacity: 0.8;
      margin-top: 8px;
      line-height: 1.4;
    }
    
    .section {
      margin-bottom: 40px;
    }
    
    .section h2 {
      color: #667eea;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
    }
    
    .section-description {
      color: #666;
      margin-bottom: 20px;
      font-size: 0.95em;
      padding: 12px;
      background: #f5f5f5;
      border-left: 4px solid #667eea;
      border-radius: 4px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    
    th {
      background: #667eea;
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
    }
    
    td {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
    }
    
    tr:hover {
      background: #f5f5f5;
    }
    
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
    }
    
    .badge-primary {
      background: #667eea;
      color: white;
    }
    
    .badge-success {
      background: #10b981;
      color: white;
    }
    
    .badge-info {
      background: #3b82f6;
      color: white;
    }
    
    .time-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .time-stat-card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    
    .time-stat-card h3 {
      color: #667eea;
      margin-bottom: 8px;
      font-size: 1.1em;
    }
    
    .time-stat-card .value {
      font-size: 2em;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    
    .time-stat-card .description {
      color: #666;
      font-size: 0.9em;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      color: #666;
    }
    
    .navigation-path {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-left: 4px solid #667eea;
    }
    
    .navigation-path-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }
    
    .navigation-path-header h3 {
      color: #667eea;
      font-size: 1.1em;
      margin: 0;
    }
    
    .navigation-path-info {
      display: flex;
      gap: 15px;
      font-size: 0.9em;
      color: #666;
    }
    
    .navigation-path-info span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .navigation-path-sequence {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-top: 15px;
    }
    
    .navigation-path-page {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 15px;
      border-radius: 6px;
      font-size: 0.9em;
      font-weight: 500;
      position: relative;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .navigation-path-arrow {
      color: #667eea;
      font-size: 1.2em;
      font-weight: bold;
    }
    
    .navigation-path-empty {
      color: #999;
      font-style: italic;
      padding: 20px;
      text-align: center;
    }
    
    .events-section {
      background: #f9f9f9;
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 40px;
      border-left: 4px solid #667eea;
    }
    
    .events-section h2 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 1.8em;
    }
    
    .events-intro {
      color: #666;
      margin-bottom: 25px;
      font-size: 1em;
      line-height: 1.6;
    }
    
    .event-type {
      background: white;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      border-left: 3px solid #667eea;
    }
    
    .event-type h3 {
      color: #667eea;
      margin-bottom: 8px;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .event-type-code {
      background: #667eea;
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      font-weight: 600;
    }
    
    .event-type-description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    
    .event-type-details {
      color: #777;
      font-size: 0.9em;
      font-style: italic;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Relatório de Acessos ao Portal</h1>
    <p class="subtitle">Gerado em ${new Date().toLocaleString('pt-BR')}</p>
    
    <div class="events-section">
      <h2>📋 Sobre Eventos</h2>
      <div class="events-intro">
        <p>
          O sistema de rastreamento registra diferentes tipos de eventos que ocorrem durante a navegação dos usuários no portal. 
          Cada evento representa uma ação específica realizada pelo visitante e contém informações como timestamp, página acessada, 
          informações do navegador e endereço IP. Entender os tipos de eventos ajuda a interpretar melhor as estatísticas apresentadas neste relatório.
        </p>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">page_view</span>
          Visualização de Página
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado sempre que uma página do portal é carregada ou visualizada pelo usuário.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Este é o evento mais comum e indica que o usuário acessou uma página específica do portal. 
          É registrado automaticamente quando a página é carregada, seja através de navegação direta, cliques em links internos, 
          ou ao usar os botões de voltar/avançar do navegador.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> URL da página, título, caminho (pathname), referrer (página de origem), informações do navegador e IP.
        </div>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">page_exit</span>
          Saída de Página
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado quando o usuário sai de uma página, seja fechando a aba, navegando para outra página, 
          ou fechando o navegador completamente.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Indica o término da visualização de uma página. Este evento é importante porque inclui 
          o <strong>tempo de permanência na página</strong> (timeOnPage), medido em segundos desde o último page_view até a saída.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> Todas as informações do page_view, mais o campo <code>timeOnPage</code> (tempo em segundos).
        </div>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">page_hidden</span>
          Página Ocultada
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado quando a aba do navegador perde o foco, ou seja, quando o usuário muda para outra aba, 
          minimiza a janela, ou o navegador fica em segundo plano.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Indica que o usuário ainda está com a página aberta, mas não está visualizando ativamente. 
          Este evento também inclui o tempo de permanência até o momento em que a página foi ocultada.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> Todas as informações do page_view, mais o campo <code>timeOnPage</code> até o momento da ocultação.
        </div>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">page_visible</span>
          Página Visível
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado quando a aba do navegador volta a ter foco, ou seja, quando o usuário retorna para a aba, 
          restaura a janela, ou o navegador volta ao primeiro plano.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Indica que o usuário voltou a visualizar a página após ter a ocultado. 
          O sistema reinicia a contagem de tempo quando este evento ocorre, permitindo medir o engajamento real do usuário.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> Todas as informações padrão do evento, sem tempo de permanência (pois é um evento de retorno).
        </div>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">internal_link_click</span>
          Clique em Link Interno
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado quando o usuário clica em um link que aponta para outra página dentro do próprio portal Docusaurus.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Indica navegação interna no portal, mostrando como os usuários se movem entre as diferentes seções 
          e páginas da documentação. Ajuda a entender os padrões de navegação e quais links são mais utilizados.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> Todas as informações padrão, mais o campo <code>internalPath</code> com o caminho da página de destino.
        </div>
      </div>
      
      <div class="event-type">
        <h3>
          <span class="event-type-code">external_link_click</span>
          Clique em Link Externo
        </h3>
        <div class="event-type-description">
          <strong>Quando ocorre:</strong> Registrado quando o usuário clica em um link que aponta para um site externo ao portal Docusaurus.
        </div>
        <div class="event-type-description">
          <strong>O que representa:</strong> Indica que o usuário está saindo do portal para acessar conteúdo externo. 
          Este evento é útil para entender quais recursos externos são mais acessados e podem indicar interesse em tópicos relacionados.
        </div>
        <div class="event-type-details">
          <strong>Dados incluídos:</strong> Todas as informações padrão, mais o campo <code>externalUrl</code> com a URL completa do destino externo.
        </div>
      </div>
      
      <div class="events-intro" style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #eee;">
        <p style="margin-bottom: 10px;"><strong>💡 Importante:</strong></p>
        <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
          <li>Todos os eventos são registrados com um <strong>timestamp</strong> preciso (tanto do servidor quanto do cliente)</li>
          <li>Cada evento está associado a uma <strong>sessão única</strong> (sessionId), permitindo rastrear a jornada completa de um usuário</li>
          <li>Os eventos <code>page_exit</code> e <code>page_hidden</code> incluem o tempo de permanência, usado para calcular o tempo médio na página</li>
          <li>Os eventos de clique em links ajudam a entender os padrões de navegação e interesse do usuário</li>
          <li>O sistema evita registrar múltiplos <code>page_view</code> para a mesma página na mesma sessão, garantindo dados mais precisos</li>
        </ul>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Sessões Únicas</h3>
        <div class="value">${stats.uniqueSessions.toLocaleString('pt-BR')}</div>
        <div class="description">
          Número total de sessões de usuários únicas registradas. Cada sessão representa uma visita única ao portal, identificada por um ID de sessão único.
        </div>
      </div>
      <div class="stat-card">
        <h3>IPs Únicos</h3>
        <div class="value">${stats.uniqueIPs.toLocaleString('pt-BR')}</div>
        <div class="description">
          Número de endereços IP únicos que acessaram o portal. Cada IP representa um dispositivo ou rede diferente, ajudando a identificar visitantes distintos.
        </div>
      </div>
      <div class="stat-card">
        <h3>Tempo Médio na Página</h3>
        <div class="value">${stats.avgTimeOnPage}s</div>
        <div class="description">
          Tempo médio que os usuários permanecem em cada página antes de navegar para outra ou sair. Calculado a partir dos eventos de saída de página registrados.
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>⏱️ Acessos por Período</h2>
      <div class="section-description">
        Estatísticas de acessos nos últimos períodos de tempo. Esses dados ajudam a entender os padrões de uso do portal e identificar picos de atividade.
      </div>
      <div class="time-stats">
        <div class="time-stat-card">
          <h3>Última Hora</h3>
          <div class="value">${stats.lastHour}</div>
          <div class="description">
            Total de eventos de acesso registrados na última hora. Inclui visualizações de página, saídas e outros eventos de interação.
          </div>
        </div>
        <div class="time-stat-card">
          <h3>Últimas 5 Horas</h3>
          <div class="value">${stats.last5Hours}</div>
          <div class="description">
            Total de eventos de acesso registrados nas últimas 5 horas. Fornece uma visão de curto prazo da atividade do portal.
          </div>
        </div>
        <div class="time-stat-card">
          <h3>Últimas 24 Horas</h3>
          <div class="value">${stats.last24Hours}</div>
          <div class="description">
            Total de eventos de acesso registrados nas últimas 24 horas. Oferece uma visão diária completa da atividade do portal.
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>📄 Páginas Mais Acessadas</h2>
      <div class="section-description">
        Lista das páginas mais visitadas do portal, excluindo diretórios (pastas). Mostra apenas páginas de conteúdo real, ordenadas por número de visualizações. A coluna "Sessões Únicas" indica quantas sessões diferentes acessaram cada página.
      </div>
      <table>
        <thead>
          <tr>
            <th>Página</th>
            <th>Visualizações</th>
            <th>Sessões Únicas</th>
          </tr>
        </thead>
        <tbody>
          ${topPages.length > 0 ? topPages.map(page => `
            <tr>
              <td><code>${page.path}</code></td>
              <td><span class="badge badge-primary">${page.views}</span></td>
              <td><span class="badge badge-success">${page.uniqueSessions}</span></td>
            </tr>
          `).join('') : '<tr><td colspan="3" style="text-align: center; padding: 20px; color: #999;">Nenhuma página encontrada</td></tr>'}
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2>🔗 Top 10 Sessões</h2>
      <div class="section-description">
        As 10 sessões mais ativas do portal, ordenadas por número de eventos. Cada sessão representa uma visita de um usuário. A duração é calculada desde o primeiro até o último evento da sessão. A coluna "Páginas Visitadas" mostra quantas páginas diferentes foram acessadas durante a sessão.
      </div>
      <table>
        <thead>
          <tr>
            <th>ID da Sessão</th>
            <th>Eventos</th>
            <th>Páginas Visitadas</th>
            <th>Duração</th>
          </tr>
        </thead>
        <tbody>
          ${topSessions.length > 0 ? topSessions.map(session => {
            const startTime = session.startTime;
            const endTime = session.endTime;
            const duration = Math.round((endTime - startTime) / 1000 / 60); // em minutos
            const durationText = duration < 1 ? '< 1 min' : `${duration} min`;
            return `
              <tr>
                <td><code>${session.id.substring(0, 30)}...</code></td>
                <td><span class="badge badge-primary">${session.events}</span></td>
                <td><span class="badge badge-success">${session.pages}</span></td>
                <td>${durationText}</td>
              </tr>
            `;
          }).join('') : '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">Nenhuma sessão encontrada</td></tr>'}
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2>🗺️ Percursos de Navegação</h2>
      <div class="section-description">
        Esta seção mostra o percurso completo de navegação dos usuários dentro do portal. Cada percurso representa a sequência de páginas visitadas por uma sessão, mostrando como os usuários navegam pelo portal. Os percursos são ordenados pelo número de páginas visitadas, mostrando primeiro as sessões mais ativas. Esta análise ajuda a entender os padrões de navegação, identificar quais páginas são mais acessadas em sequência e descobrir possíveis pontos de saída ou áreas de maior interesse.
      </div>
      ${topNavigationPaths.length > 0 ? topNavigationPaths.map((navPath, index) => {
        const startTime = navPath.startTime instanceof Date 
          ? navPath.startTime.toLocaleString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          : new Date(navPath.startTime).toLocaleString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            });
        const durationText = navPath.duration < 1 ? '< 1 min' : `${navPath.duration} min`;
        return `
          <div class="navigation-path">
            <div class="navigation-path-header">
              <h3>Percurso #${index + 1}</h3>
              <div class="navigation-path-info">
                <span>📅 ${startTime}</span>
                <span>⏱️ ${durationText}</span>
                <span>📄 ${navPath.totalPages} páginas</span>
                <span>🔢 ${navPath.totalEvents} eventos</span>
                <span>🌐 IP: ${navPath.ip}</span>
              </div>
            </div>
            <div style="margin-bottom: 10px;">
              <strong>ID da Sessão:</strong> <code style="font-size: 0.85em;">${navPath.sessionId.substring(0, 40)}...</code>
            </div>
            ${navPath.path.length > 0 ? `
              <div class="navigation-path-sequence">
                ${navPath.path.map((page, pageIndex) => `
                  <div class="navigation-path-page" title="${page.pathname}">
                    ${pageIndex + 1}. ${page.pathname.length > 50 ? page.pathname.substring(0, 50) + '...' : page.pathname}
                  </div>
                  ${pageIndex < navPath.path.length - 1 ? '<span class="navigation-path-arrow">→</span>' : ''}
                `).join('')}
              </div>
            ` : '<div class="navigation-path-empty">Nenhuma página registrada neste percurso</div>'}
          </div>
        `;
      }).join('') : '<div class="navigation-path-empty" style="padding: 40px; text-align: center; color: #999;">Nenhum percurso de navegação encontrado</div>'}
    </div>
    
    <div class="footer">
      <p>Relatório gerado automaticamente pelo sistema de rastreamento do portal Docusaurus</p>
    </div>
  </div>
</body>
</html>`;
  
  return html;
}

/**
 * Abre o arquivo HTML no navegador padrão do sistema
 */
function openInBrowser(filePath) {
  const platform = os.platform();
  let command;
  
  switch (platform) {
    case 'win32':
      // Windows
      command = `start "" "${filePath}"`;
      break;
    case 'darwin':
      // macOS
      command = `open "${filePath}"`;
      break;
    case 'linux':
      // Linux
      command = `xdg-open "${filePath}"`;
      break;
    default:
      console.log(`⚠️  Sistema operacional não suportado para abertura automática: ${platform}`);
      return;
  }
  
  exec(command, (error) => {
    if (error) {
      console.warn(`⚠️  Não foi possível abrir o navegador automaticamente: ${error.message}`);
      console.log(`💡 Abra manualmente o arquivo: ${filePath}`);
    } else {
      console.log(`🌐 Abrindo relatório no navegador...`);
    }
  });
}

/**
 * Função principal
 */
async function main() {
  try {
    console.log('🔍 Conectando ao Firebase...');
    
    // Consultar registros do Firestore
    const logsRef = collection(db, 'access_logs');
    const q = query(logsRef, orderBy('timestamp', 'desc'));
    
    console.log('📥 Buscando registros...');
    const querySnapshot = await getDocs(q);
    
    const logs = [];
    querySnapshot.forEach((doc) => {
      logs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ ${logs.length} registros encontrados`);
    
    if (logs.length === 0) {
      console.log('⚠️  Nenhum registro encontrado. O relatório estará vazio.');
    }
    
    // Gerar estatísticas
    console.log('📊 Gerando estatísticas...');
    const stats = generateStatistics(logs);
    
    // Gerar relatório HTML
    console.log('📄 Gerando relatório HTML...');
    const html = generateHTMLReport(logs, stats);
    
    // Salvar relatório
    const outputPath = path.join(__dirname, 'relatorio-acessos.html');
    fs.writeFileSync(outputPath, html, 'utf8');
    
    console.log(`\n✨ Relatório gerado com sucesso!`);
    console.log(`📁 Arquivo: ${outputPath}`);
    console.log(`\n📈 Resumo:`);
    console.log(`   - Sessões únicas: ${stats.uniqueSessions}`);
    console.log(`   - IPs únicos: ${stats.uniqueIPs}`);
    console.log(`   - Tempo médio na página: ${stats.avgTimeOnPage}s`);
    console.log(`   - Acessos na última hora: ${stats.lastHour}`);
    console.log(`   - Acessos nas últimas 5 horas: ${stats.last5Hours}`);
    console.log(`   - Acessos nas últimas 24 horas: ${stats.last24Hours}`);
    
    // Abrir no navegador automaticamente
    openInBrowser(outputPath);
    
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { main, generateStatistics, generateHTMLReport };
