// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "UberHub Mentorias",
	tagline: "Portal de Documentação do Sistema de Mentorias",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: "https://uberhub-mentorias.github.io/",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/docusaurus/",

	// GitHub pages deployment config.
	organizationName: "uberhub-mentorias", // Usually your GitHub org/user name.
	projectName: "docusaurus", // Usually your repo name.

	// Using 'warn' to allow incremental documentation updates
	// Some links may temporarily break as documentation evolves
	onBrokenLinks: "warn",

	// Set Portuguese as default
	i18n: {
		defaultLocale: "pt-BR",
		locales: ["pt-BR"],
		localeConfigs: {
			"pt-BR": {
				label: "Português",
				direction: "ltr",
				htmlLang: "pt-BR",
			},
		},
	},

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: "./sidebars.js",
					editUrl: "https://github.com/angoti/mentorias-frontend/tree/main/docusaurus/",
				},
				blog: false, // Disable blog
				theme: {
					customCss: "./src/css/custom.css",
				},
			}),
		],
	],

	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-originais",
				path: "docs-originais",
				routeBasePath: "docs-originais",
				sidebarPath: "./sidebarsOriginais.js",
				editUrl: "https://github.com/angoti/mentorias-frontend/tree/main/docusaurus/",
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: "img/social-card.png",
			colorMode: {
				defaultMode: "light",
				respectPrefersColorScheme: false,
				disableSwitch: false,
			},
			navbar: {
				title: "UberHub Mentorias",
				logo: {
					alt: "UberHub Logo",
					src: "img/logo.svg",
				},
				items: [
					{
						type: "docSidebar",
						sidebarId: "docsSidebar",
						position: "left",
						label: "📚 Documentação",
					},
					{
						to: "/docs-originais/intro",
						label: "📁 Docs Originais",
						position: "left",
					},
					{
						to: "/docs/guias-rapidos/inicio",
						label: "🚀 Quick Start",
						position: "left",
					},
					{
						to: "/docs/mapa-conhecimento",
						label: "🗺️ Mapa do Conhecimento",
						position: "left",
					},
					{
						to: "/docs/roteiro-estudos",
						label: "📖 Roteiro de Estudos",
						position: "left",
					},
					{
						href: "https://github.com/angoti/mentorias-frontend",
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Documentação",
						items: [
							{
								label: "Início Rápido",
								to: "/docs/guias-rapidos/inicio",
							},
							{
								label: "Arquitetura",
								to: "/docs/arquitetura/visao-geral",
							},
							{
								label: "Autenticação",
								to: "/docs/autenticacao/firebase-auth-flow",
							},
						],
					},
					{
						title: "Recursos",
						items: [
							{
								label: "Mapa do Conhecimento",
								to: "/docs/mapa-conhecimento",
							},
							{
								label: "Roteiro de Estudos",
								to: "/docs/roteiro-estudos",
							},
							{
								label: "Backlog",
								to: "/docs/backlog/github-project",
							},
						],
					},
					{
						title: "Projeto",
						items: [
							{
								label: "GitHub",
								href: "https://github.com/Uberhub-Mentorias",
							},
							{
								label: "IFTM",
								href: "https://iftm.edu.br/cursos/uberlandiacentro/tecnologo/sistemas-para-internet/",
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} IFTM - Instituto Federal do Triângulo Mineiro. Built with Docusaurus.`,
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ["java", "bash", "json", "yaml"],
			},
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 4,
			},
		}),
};

export default config;
