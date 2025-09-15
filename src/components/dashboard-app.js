import { html, css, LitElement } from 'lit'
import './sidebar.js'
import './widgets-page.js'

export class DashboardApp extends LitElement {
	static properties = {
		selectedItem: { type: Object },
	}

	constructor() {
		super()
		this.selectedItem = { id: 'inicio', label: 'Inicio' }
	}

	static styles = css`
		:host {
			display: flex;
			height: 100vh;
			overflow: hidden;
		}

		.main-content {
			flex: 1;
			margin-left: 250px; /* Ancho del sidebar */
			transition: margin-left 0.3s ease;
			background-color: #ecf0f1;
			overflow: auto;
			width: calc(100vw - 250px);
			max-width: calc(100vw - 250px);
			box-sizing: border-box;
		}

		.main-content.sidebar-collapsed {
			margin-left: 70px; /* Ancho del sidebar colapsado */
			width: calc(100vw - 70px);
			max-width: calc(100vw - 70px);
		}

		.content-panel {
			padding: 2rem;
			height: 100%;
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 100%;
			box-sizing: border-box;
		}

		.panel-header {
			margin-bottom: 2rem;
		}

		.panel-title {
			font-size: 2rem;
			color: #2c3e50;
			margin: 0 0 0.5rem 0;
			font-weight: 600;
		}

		.panel-subtitle {
			color: #7f8c8d;
			font-size: 1rem;
			margin: 0;
		}

		.panel-content {
			flex: 1;
			background: white;
			border-radius: 8px;
			padding: 2rem;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			border: 1px solid #e0e6ed;
		}

		.welcome-message {
			text-align: center;
			color: #7f8c8d;
			font-size: 1.2rem;
			margin-top: 2rem;
		}

		.selected-info {
			background: #f8f9fa;
			border: 2px solid #3498db;
			border-radius: 8px;
			padding: 1.5rem;
			margin-bottom: 2rem;
		}

		.selected-info h3 {
			color: #3498db;
			margin: 0 0 0.5rem 0;
			font-size: 1.2rem;
		}

		.selected-info p {
			color: #2c3e50;
			margin: 0;
			font-size: 1rem;
		}

		.config-options,
		.stats-grid {
			margin: 2rem 0;
		}

		.config-options ul {
			list-style: none;
			padding: 0;
		}

		.config-options li {
			padding: 0.75rem;
			background: #f8f9fa;
			margin: 0.5rem 0;
			border-radius: 6px;
			border-left: 4px solid #3498db;
		}

		.stats-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1.5rem;
		}

		.stat-card {
			background: #3b82f6;
			color: white;
			padding: 1.5rem;
			border-radius: 12px;
			text-align: center;
			box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
			transition: all 0.3s ease;
		}

		.stat-card:hover {
			background: #1d4ed8;
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
		}

		.stat-card h3 {
			margin: 0 0 1rem 0;
			font-size: 1rem;
		}

		.stat-number {
			font-size: 2.5rem;
			font-weight: bold;
			margin: 0.5rem 0;
		}

		.stat-label {
			font-size: 0.9rem;
			opacity: 0.9;
			margin: 0;
		}

		@media (max-width: 768px) {
			.main-content {
				margin-left: 70px;
				width: calc(100vw - 70px);
				max-width: calc(100vw - 70px);
				box-sizing: border-box;
			}

			.content-panel {
				padding: 1rem;
				width: 100%;
				max-width: 100%;
				box-sizing: border-box;
			}

			.panel-title {
				font-size: 1.5rem;
			}
		}
	`

	handleSidebarToggle(event) {
		// Actualizar el margen del contenido principal basado en el estado del sidebar
		const mainContent = this.shadowRoot.querySelector('.main-content')
		if (event.detail && event.detail.collapsed !== undefined) {
			if (event.detail.collapsed) {
				mainContent.classList.add('sidebar-collapsed')
			} else {
				mainContent.classList.remove('sidebar-collapsed')
			}
		} else {
			// Toggle manual si no hay información específica
			mainContent.classList.toggle('sidebar-collapsed')
		}
	}

	handleItemSelected(event) {
		if (event.detail && event.detail.item) {
			this.selectedItem = event.detail.item
			console.log('Item seleccionado:', this.selectedItem)
		}
	}

	renderContent() {
		switch (this.selectedItem?.id) {
			case 'widgets':
				return html`<widgets-page></widgets-page>`

			case 'configuracion':
				return html`
					<div class="welcome-message">
						<h2>⚙️ Configuración</h2>
					</div>
				`

			case 'inicio':
			default:
				return html`
					<div class="welcome-message">
						<h2>🏠 Bienvenido</h2>
					</div>
				`
		}
	}

	render() {
		return html`
			<my-sidebar
				@item-selected=${this.handleItemSelected}
				@sidebar-toggle=${this.handleSidebarToggle}
			></my-sidebar>

			<main class="main-content">
				<div class="content-panel">
					<div class="panel-content">${this.renderContent()}</div>
				</div>
			</main>
		`
	}
}

window.customElements.define('dashboard-app', DashboardApp)
