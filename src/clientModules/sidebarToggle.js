/**
 * Client-side module to inject sidebar toggle button into the sidebar
 * This file is automatically loaded by Docusaurus from src/clientModules/
 */
import React from 'react';
import {createRoot} from 'react-dom/client';
import SidebarToggle from '../components/SidebarToggle';

let injected = false;

function injectSidebarToggle() {
  // Verificar se já foi injetado
  if (injected || document.getElementById('sidebar-toggle-container')) {
    console.log('[SidebarToggle] Já foi injetado');
    return true;
  }

  // Verificar se sidebar está escondido - se sim, colocar botão na navbar
  const isCollapsed = document.body.classList.contains('sidebar-collapsed') || 
                      !document.body.classList.contains('sidebar-expanded');
  
  console.log('[SidebarToggle] Estado collapsed:', isCollapsed);
  
  let targetElement = null;
  
  if (isCollapsed) {
    // Se sidebar está escondido, colocar botão na navbar (lado direito)
    targetElement = document.querySelector('.navbar__items--right');
    console.log('[SidebarToggle] Procurando navbar:', targetElement);
  } else {
    // Se sidebar está visível, colocar botão na sidebar
    targetElement = document.querySelector('.theme-doc-sidebar-menu');
    console.log('[SidebarToggle] Procurando sidebar menu:', targetElement);
  }
  
  if (targetElement) {
    console.log('[SidebarToggle] Elemento encontrado, criando botão...');
    
    // Criar container para o botão
    const container = document.createElement('div');
    container.id = 'sidebar-toggle-container';
    container.className = isCollapsed ? 'navbar-sidebar-toggle' : 'sidebar-toggle-wrapper';
    
    // Inserir no lugar apropriado
    if (isCollapsed) {
      // Na navbar, inserir antes do primeiro item
      targetElement.insertBefore(container, targetElement.firstChild);
    } else {
      // Na sidebar, inserir no início do menu
      targetElement.insertBefore(container, targetElement.firstChild);
    }
    
    // Renderizar o componente React
    try {
      const root = createRoot(container);
      root.render(React.createElement(SidebarToggle));
      injected = true;
      console.log('[SidebarToggle] ✅ Botão injetado com sucesso!');
      return true;
    } catch (error) {
      console.error('[SidebarToggle] ❌ Erro ao renderizar:', error);
      return false;
    }
  } else {
    console.log('[SidebarToggle] ⚠️ Elemento alvo não encontrado');
  }
  return false;
}

// Executar quando o DOM estiver pronto
if (typeof window !== 'undefined') {
  console.log('[SidebarToggle] Módulo carregado');
  
  // Aplicar estado inicial: sidebar recolhido por padrão
  const applyInitialState = () => {
    const saved = localStorage.getItem('sidebar-collapsed');
    const shouldBeCollapsed = saved === null ? true : saved === 'true';
    
    console.log('[SidebarToggle] Estado inicial:', shouldBeCollapsed ? 'recolhido' : 'expandido');
    
    if (shouldBeCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.add('sidebar-expanded');
    }
  };

  // Aplicar estado inicial imediatamente
  if (document.body) {
    applyInitialState();
  } else {
    // Aguardar body estar pronto
    const bodyObserver = new MutationObserver(() => {
      if (document.body) {
        applyInitialState();
        bodyObserver.disconnect();
      }
    });
    bodyObserver.observe(document.documentElement, { childList: true });
  }

  // Função para tentar injetar
  const tryInject = (attempt = 0) => {
    if (attempt > 15) {
      console.warn('[SidebarToggle] ⚠️ Muitas tentativas, desistindo');
      return;
    }
    
    if (!document.getElementById('sidebar-toggle-container')) {
      console.log(`[SidebarToggle] Tentativa ${attempt + 1}...`);
      const success = injectSidebarToggle();
      
      // Se ainda não foi injetado, tentar novamente
      if (!success && attempt < 15) {
        setTimeout(() => tryInject(attempt + 1), 500);
      }
    } else {
      console.log('[SidebarToggle] Botão já existe');
    }
  };

  // Tentar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[SidebarToggle] DOM carregado');
      applyInitialState();
      setTimeout(() => tryInject(0), 1000);
    });
  } else {
    console.log('[SidebarToggle] DOM já pronto');
    applyInitialState();
    setTimeout(() => tryInject(0), 1000);
  }

  // Observar mudanças no DOM e no estado do sidebar
  const observer = new MutationObserver(() => {
    const container = document.getElementById('sidebar-toggle-container');
    if (!container) {
      injected = false;
      setTimeout(() => tryInject(0), 300);
    } else {
      // Verificar se precisa mover o botão (sidebar expandiu/recolheu)
      const isCollapsed = document.body.classList.contains('sidebar-collapsed') || 
                          !document.body.classList.contains('sidebar-expanded');
      const isInNavbar = container.classList.contains('navbar-sidebar-toggle');
      
      // Se estado mudou, remover e reinjetar
      if ((isCollapsed && !isInNavbar) || (!isCollapsed && isInNavbar)) {
        container.remove();
        injected = false;
        setTimeout(() => tryInject(0), 100);
      }
    }
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

