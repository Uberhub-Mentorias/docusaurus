// @ts-check

/**
 * Sidebar configuration for Original Documents (docs-originais)
 * 
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  originaisSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Início',
    },
    {
      type: 'category',
      label: '🔐 Autenticação',
      items: [
        'auth/FIREBASE_AUTH_FLOW',
        'auth/AULA_FIREBASE_AUTH',
        'auth/FIREBASE_CONFIGURACAO_COMPLETA',
        'auth/CONFIGURAR_SHA1_ANDROID',
        'auth/Plano - implementação autenticação web e mobile',
      ],
    },
    {
      type: 'category',
      label: '📋 Projeto',
      items: [
        'projeto/README',
        'projeto/Arquitetura v2',
        'projeto/Endpoints',
        'projeto/Especificação de Requisitos - UberHub Mentorias',
        'projeto/FLUXOS-JORNADAS-OPERACOES',
        'projeto/DEPENDENCIAS-TEMPORAIS-FLUXOS',
      ],
    },
    {
      type: 'category',
      label: '⚙️ DevOps',
      items: [
        'auth/CI_CD_GITHUB_GUIA_COMPLETO',
        'auth/BACKLOG_GITHUB_PROJECT',
        'auth/PADROES_CODIGO_GUIA_COMPLETO',
      ],
    },
  ],
};

export default sidebars;
