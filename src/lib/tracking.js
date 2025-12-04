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
 * Registra um acesso no Firebase
 * @param {string} eventType - Tipo de evento (page_view, page_exit, etc.)
 * @param {Object} additionalData - Dados adicionais opcionais
 */
export async function trackAccess(eventType = 'page_view', additionalData = {}) {
  try {
    const sessionId = getSessionId();
    const browserInfo = getBrowserInfo();
    const pageInfo = getPageInfo();

    const accessData = {
      sessionId,
      eventType,
      timestamp: serverTimestamp(),
      clientTimestamp: new Date().toISOString(),
      page: pageInfo,
      browser: browserInfo,
      ...additionalData,
    };

    // Salvar no Firestore
    await addDoc(collection(db, 'access_logs'), accessData);
    
    console.log('[Tracking] Acesso registrado:', {
      eventType,
      pathname: pageInfo.pathname,
      sessionId,
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

