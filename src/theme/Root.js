import React from "react";
import { createRoot } from "react-dom/client";
import { trackPageView, resetPageTracking } from "../lib/tracking";

// Root component que será carregado em todas as páginas
export default function Root({ children }) {
	// Rastreamento de acessos
	React.useEffect(() => {
		console.log("[Tracking] Inicializando rastreamento de acessos");

		// Rastrear visualização inicial da página
		trackPageView();

		// Rastrear mudanças de rota (SPA navigation)
		let currentPath = window.location.pathname;

		const handleRouteChange = () => {
			const newPath = window.location.pathname;
			if (newPath !== currentPath) {
				console.log("[Tracking] Mudança de rota detectada:", currentPath, "->", newPath);
				resetPageTracking();
				trackPageView();
				currentPath = newPath;
			}
		};

		// Observar mudanças no histórico do navegador
		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		history.pushState = function (...args) {
			originalPushState.apply(history, args);
			setTimeout(handleRouteChange, 100);
		};

		history.replaceState = function (...args) {
			originalReplaceState.apply(history, args);
			setTimeout(handleRouteChange, 100);
		};

		// Escutar eventos de popstate (voltar/avançar no navegador)
		window.addEventListener("popstate", handleRouteChange);

		// Observar mudanças no DOM que podem indicar mudança de rota
		const routeObserver = new MutationObserver(() => {
			const newPath = window.location.pathname;
			if (newPath !== currentPath) {
				handleRouteChange();
			}
		});

		if (document.body) {
			routeObserver.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			window.removeEventListener("popstate", handleRouteChange);
			routeObserver.disconnect();
			history.pushState = originalPushState;
			history.replaceState = originalReplaceState;
		};
	}, []);

	// Adicionar tooltips nos itens do menu
	React.useEffect(() => {
		const addTooltips = () => {
			// Mapeamento de labels para tooltips
			const tooltips = {
				Documentação: "Acesse a documentação completa do projeto",
				"📁 Docs Originais": "Documentação original do projeto",
				"🚀": "Guia rápido de início",
				"🗺️": "Mapa do conhecimento do projeto",
				"📖": "Roteiro de estudos recomendado",
				GitHub: "Acesse o repositório no GitHub",
			};

			// Adicionar tooltips aos links da navbar
			const navbarLinks = document.querySelectorAll(".navbar__item a, .navbar__link");
			navbarLinks.forEach(link => {
				const text = link.textContent.trim();
				const tooltip = tooltips[text];

				if (tooltip) {
					// Remover title nativo para evitar tooltip duplicada
					link.removeAttribute("title");
					// Adicionar apenas data-tooltip para a tooltip customizada
					link.setAttribute("data-tooltip", tooltip);
				}
			});
		};

		// Tentar adicionar tooltips após um delay
		setTimeout(addTooltips, 500);

		// Observar mudanças no DOM para adicionar tooltips em elementos dinâmicos
		const observer = new MutationObserver(() => {
			setTimeout(addTooltips, 100);
		});

		if (document.body) {
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	React.useEffect(() => {
		console.log("[Root] Componente Root carregado");

		// Aplicar estado inicial: sidebar recolhido por padrão
		const applyInitialState = () => {
			const saved = localStorage.getItem("sidebar-collapsed");
			const shouldBeCollapsed = saved === null ? true : saved === "true";

			console.log("[Root] Estado inicial:", shouldBeCollapsed ? "recolhido" : "expandido");

			if (shouldBeCollapsed) {
				document.body.classList.add("sidebar-collapsed");
				document.body.classList.remove("sidebar-expanded");
			} else {
				document.body.classList.remove("sidebar-collapsed");
				document.body.classList.add("sidebar-expanded");
			}
		};

		// Aplicar estado inicial
		applyInitialState();

		// Função para injetar o botão
		const injectToggle = () => {
			// Verificar se já foi injetado
			const existing = document.getElementById("sidebar-toggle-container");
			if (existing) {
				console.log("[Root] Botão já existe, pulando...");
				return;
			}

			// Verificar se sidebar está escondido
			const isCollapsed =
				document.body.classList.contains("sidebar-collapsed") ||
				!document.body.classList.contains("sidebar-expanded");

			console.log("[Root] Estado collapsed:", isCollapsed);

			let targetElement = null;

			if (isCollapsed) {
				// Se sidebar está escondido, colocar botão na navbar (lado direito)
				targetElement = document.querySelector(".navbar__items--right");
				console.log("[Root] Procurando navbar:", targetElement);
			} else {
				// Se sidebar está visível, colocar botão na sidebar
				targetElement = document.querySelector(".theme-doc-sidebar-menu");
				console.log("[Root] Procurando sidebar menu:", targetElement);
			}

			if (targetElement) {
				console.log("[Root] Elemento encontrado, criando botão...");

				// Criar container para o botão
				const container = document.createElement("div");
				container.id = "sidebar-toggle-container";
				container.className = isCollapsed ? "navbar-sidebar-toggle" : "sidebar-toggle-wrapper";

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
					console.log("[Root] ✅ Botão injetado com sucesso!");

					// Forçar visibilidade após um pequeno delay
					setTimeout(() => {
						container.style.display = "flex";
						container.style.visibility = "visible";
						container.style.opacity = "1";
						const button = container.querySelector("button");
						if (button) {
							button.style.display = "flex";
							button.style.visibility = "visible";
							button.style.opacity = "1";
						}
					}, 100);
				} catch (error) {
					console.error("[Root] ❌ Erro ao renderizar:", error);
				}
			} else {
				console.log("[Root] ⚠️ Elemento alvo não encontrado");
			}
		};

		// Função para tentar injetar
		const tryInject = (attempt = 0) => {
			if (attempt > 15) {
				console.warn("[Root] ⚠️ Muitas tentativas, desistindo");
				return;
			}

			if (!document.getElementById("sidebar-toggle-container")) {
				console.log(`[Root] Tentativa ${attempt + 1}...`);
				injectToggle();

				// Se ainda não foi injetado, tentar novamente
				if (!document.getElementById("sidebar-toggle-container") && attempt < 15) {
					setTimeout(() => tryInject(attempt + 1), 500);
				}
			}
		};

		// Tentar injetar após um delay
		const timeout = setTimeout(() => tryInject(0), 1000);

		// Observar mudanças no DOM
		const observer = new MutationObserver(() => {
			if (!document.getElementById("sidebar-toggle-container")) {
				setTimeout(() => tryInject(0), 300);
			} else {
				// Verificar se precisa mover o botão
				const container = document.getElementById("sidebar-toggle-container");
				if (container) {
					const isCollapsed =
						document.body.classList.contains("sidebar-collapsed") ||
						!document.body.classList.contains("sidebar-expanded");
					const isInNavbar = container.classList.contains("navbar-sidebar-toggle");

					if ((isCollapsed && !isInNavbar) || (!isCollapsed && isInNavbar)) {
						container.remove();
						setTimeout(() => tryInject(0), 100);
					}
				}
			}
		});

		if (document.body) {
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			clearTimeout(timeout);
			observer.disconnect();
		};
	}, []);

	return <>{children}</>;
}
