// @ts-check

/**
 * Sidebar configuration for UberHub Mentorias Documentation Portal
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
	docsSidebar: [
		{
			type: "category",
			label: "Autenticação",
			link: {
				type: "doc",
				id: "autenticacao/aula-firebase-auth",
			},
			items: [],
		},
		{
			type: "category",
			label: "Diagranas de Sequencia UML da Autenticação",
			link: {
				type: "doc",
				id: "autenticacao/FIREBASE_AUTH_FLOW",
			},
			items: [],
		},
		{
			type: "doc",
			id: "intro",
			label: "🏠 Início",
		},
		{
			type: "category",
			label: "🚀 Guias Rápidos",
			link: {
				type: "doc",
				id: "guias-rapidos/inicio",
			},
			items: [
				"guias-rapidos/mentorado",
				"guias-rapidos/mentor",
				"guias-rapidos/admin",
				"guias-rapidos/desenvolvedor",
			],
		},
		{
			type: "doc",
			id: "mapa-conhecimento",
			label: "🗺️ Mapa do Conhecimento",
		},
		{
			type: "doc",
			id: "roteiro-estudos",
			label: "📖 Roteiro de Estudos",
		},
		{
			type: "category",
			label: "🏗️ Arquitetura",
			link: {
				type: "doc",
				id: "arquitetura/visao-geral",
			},
			collapsed: false,
			items: [
				"arquitetura/microservicos",
				"arquitetura/endpoints",
				"arquitetura/fluxos-jornadas",
				"arquitetura/dependencias-temporais",
			],
		},
		{
			type: "category",
			label: "🔐 Autenticação",
			link: {
				type: "doc",
				id: "autenticacao/firebase-auth-flow",
			},
			items: [
				"autenticacao/aula-firebase-auth",
				"autenticacao/configuracao-completa",
				"autenticacao/sha1-android",
			],
		},
		{
			type: "category",
			label: "⚙️ DevOps",
			link: {
				type: "doc",
				id: "devops/ci-cd-guia",
			},
			items: [
				"devops/github-actions",
				"devops/dependabot",
				"devops/branch-protection",
				"devops/padroes-codigo",
			],
		},
		{
			type: "category",
			label: "📋 Backlog",
			link: {
				type: "doc",
				id: "backlog/github-project",
			},
			items: ["backlog/epico-1-setup", "backlog/epico-2-core", "backlog/epico-3-testes"],
		},
		{
			type: "category",
			label: "📝 Requisitos",
			link: {
				type: "doc",
				id: "requisitos/especificacao",
			},
			items: ["requisitos/casos-uso", "requisitos/regras-negocio"],
		},
		{
			type: "category",
			label: "🎬 Material Audiovisual",
			link: {
				type: "doc",
				id: "audiovisual/lista-videos",
			},
			items: [],
		},
	],
};

export default sidebars;
