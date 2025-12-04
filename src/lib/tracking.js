// Módulo de rastreamento de acessos
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Gera um ID único para a sessão do usuário
 */
function getSessionId() {
  let sessionId = sessionStorage.getItem('docusaurus_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('docusaurus_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Obtém informações do navegador
 */
function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
}

/**
 * Obtém informações da página atual
 */
function getPageInfo() {
  return {
    url: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    title: document.title,
    referrer: document.referrer || null,
  };
}

/**
 * Obtém o IP do usuário usando uma API externa
 * O IP é cacheado na sessão para evitar múltiplas chamadas
 */
let ipCache = null;
let ipPromise = null;

async function getIpAddress() {
  // Retornar IP em cache se já foi obtido
  if (ipCache) {
    return ipCache;
  }

  // Se já existe uma requisição em andamento, aguardar ela
  if (ipPromise) {
    return ipPromise;
  }

  // Tentar obter do cache da sessão primeiro
  const cachedIp = sessionStorage.getItem('docusaurus_ip_address');
  if (cachedIp) {
    ipCache = cachedIp;
    return cachedIp;
  }

  // Fazer requisição para obter o IP
  ipPromise = fetch('https://api.ipify.org?format=json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao obter IP');
      }
      return response.json();
    })
    .then(data => {
      const ip = data.ip;
      ipCache = ip;
      // Cachear na sessão para reutilizar
      sessionStorage.setItem('docusaurus_ip_address', ip);
      ipPromise = null;
      return ip;
    })
    .catch(error => {
      console.warn('[Tracking] Erro ao obter IP:', error);
      ipPromise = null;
      // Tentar API alternativa
      return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          const ip = data.ip;
          ipCache = ip;
          sessionStorage.setItem('docusaurus_ip_address', ip);
          return ip;
        })
        .catch(() => {
          // Se falhar, retornar null
          return null;
        });
    });

  return ipPromise;
}

/**
 * Registra um acesso no Firebase
 * @param {string} eventType - Tipo de evento (page_view, page_exit, etc.)
 * @param {Object} additionalData - Dados adicionais opcionais
 */
export async function trackAccess(eventType = 'page_view', additionalData = {}) {
  try {
    const sessionId = getSessionId();
    const browserInfo = getBrowserInfo();
    const pageInfo = getPageInfo();
    
    // Obter IP (não bloqueia se falhar)
    let ipAddress = null;
    try {
      ipAddress = await getIpAddress();
    } catch (error) {
      console.warn('[Tracking] Não foi possível obter IP:', error);
    }

    const accessData = {
      sessionId,
      eventType,
      timestamp: serverTimestamp(),
      clientTimestamp: new Date().toISOString(),
      page: pageInfo,
      browser: browserInfo,
      ...(ipAddress && { ipAddress }), // Incluir IP apenas se foi obtido com sucesso
      ...additionalData,
    };

    // Salvar no Firestore
    await addDoc(collection(db, 'access_logs'), accessData);
    
    console.log('[Tracking] Acesso registrado:', {
      eventType,
      pathname: pageInfo.pathname,
      sessionId,
      ipAddress: ipAddress || 'não disponível',
    });
  } catch (error) {
    console.error('[Tracking] Erro ao registrar acesso:', error);
    // Não interromper a execução em caso de erro
  }
}

/**
 * Rastreia o tempo de permanência na página
 */
let pageStartTime = Date.now();
let pageViewTracked = false;

export function trackPageView() {
  if (pageViewTracked) {
    return; // Evitar múltiplos registros da mesma página
  }
  
  pageStartTime = Date.now();
  pageViewTracked = true;
  
  trackAccess('page_view');
  
  // Rastrear saída da página
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // em segundos
    trackAccess('page_exit', { timeOnPage });
  });
  
  // Rastrear mudança de visibilidade (quando usuário muda de aba)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
      trackAccess('page_hidden', { timeOnPage });
    } else {
      pageStartTime = Date.now(); // Resetar tempo quando voltar
      trackAccess('page_visible');
    }
  });
}

/**
 * Reseta o estado de rastreamento (útil quando navega para nova página)
 */
export function resetPageTracking() {
  pageViewTracked = false;
  pageStartTime = Date.now();
}

/**
 * Rastreia cliques em links externos
 */
export function trackExternalLink(url) {
  trackAccess('external_link_click', { externalUrl: url });
}

/**
 * Rastreia cliques em links internos
 */
export function trackInternalLink(pathname) {
  trackAccess('internal_link_click', { internalPath: pathname });
}

