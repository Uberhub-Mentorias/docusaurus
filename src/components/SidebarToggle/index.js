import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

export default function SidebarToggle() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      // Por padrão, começar recolhido (true)
      const saved = localStorage.getItem('sidebar-collapsed');
      return saved === null ? true : saved === 'true';
    }
    return true; // Padrão: recolhido
  });

  // Aplicar estado inicial e ao mudar
  useEffect(() => {
    // Aplicar estado inicial ao carregar
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.add('sidebar-expanded');
    }
    
    // Salvar no localStorage
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  // Observar mudanças de URL para manter o estado ao navegar
  useEffect(() => {
    const applyState = () => {
      const savedState = localStorage.getItem('sidebar-collapsed') === 'true';
      if (savedState !== isCollapsed) {
        setIsCollapsed(savedState);
      } else {
        // Aplicar o estado atual ao body
        if (savedState) {
          document.body.classList.add('sidebar-collapsed');
        } else {
          document.body.classList.remove('sidebar-collapsed');
        }
      }
    };

    // Aplicar ao carregar
    applyState();

    // Observar mudanças de URL (para SPA navigation)
    const observer = new MutationObserver(() => {
      applyState();
    });

    // Observar mudanças no body
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: false,
      });
    }

    // Também observar mudanças de popstate (navegação do browser)
    window.addEventListener('popstate', applyState);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', applyState);
    };
  }, [isCollapsed]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', newState.toString());
    
    if (newState) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.add('sidebar-expanded');
    }
  };

  return (
    <button
      className={styles.sidebarToggle}
      onClick={toggleSidebar}
      aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
      title={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
    >
      {isCollapsed ? (
        <>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M12.5 6L11.44 7.06L13.38 9H3V11H13.38L11.44 12.94L12.5 14L16.5 10L12.5 6Z" />
          </svg>
          <span>Expandir</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M7.5 6L8.56 7.06L6.62 9H17V11H6.62L8.56 12.94L7.5 14L3.5 10L7.5 6Z" />
          </svg>
          <span>Recolher</span>
        </>
      )}
    </button>
  );
}

