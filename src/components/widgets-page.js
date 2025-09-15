import { html, css, LitElement } from 'lit'
import './widget-wrapper.js'
import './todo-widget.js'

export class WidgetsPage extends LitElement {
	static properties = {
		widgets: { type: Array },
	}

	constructor() {
		super()
		this.widgets = [
			{
				id: 'todo-1',
				type: 'todo',
				title: 'Lista de Tareas Diarias',
				config: {
					label: 'Tareas del Día',
					maxTodos: 8,
				},
			},
		]
	}

	static styles = css`
		:host {
			display: block;
			padding: 1rem;
		}

		.dashboard-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 2rem;
			padding-bottom: 1rem;
			border-bottom: 2px solid #e1e8ed;
		}

		.dashboard-title {
			font-size: 1.8rem;
			color: #2c3e50;
			margin: 0;
			font-weight: 600;
		}

		.dashboard-subtitle {
			color: #7f8c8d;
			font-size: 1rem;
			margin: 0.5rem 0 0 0;
		}

		.dashboard-actions {
			display: flex;
			gap: 1rem;
		}

		.action-button {
			background: #3b82f6;
			color: white;
			border: none;
			padding: 0.75rem 1.5rem;
			border-radius: 8px;
			cursor: pointer;
			font-size: 0.9rem;
			font-weight: 600;
			transition: all 0.3s ease;
		}

		.action-button:hover {
			background: #1d4ed8;
			transform: translateY(-2px);
			box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
		}

		.widgets-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 1.5rem;
			margin-top: 1rem;
			width: 100%;
			box-sizing: border-box;
		}

		.empty-dashboard {
			text-align: center;
			padding: 3rem;
			color: #7f8c8d;
		}

		.empty-dashboard h3 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
			color: #95a5a6;
		}

		.empty-dashboard p {
			font-size: 1.1rem;
			line-height: 1.6;
		}

		.widget-stats {
			display: flex;
			gap: 2rem;
			margin-bottom: 1rem;
			padding: 1rem;
			background: #f8f9fa;
			border-radius: 8px;
			align-items: center;
		}

		.stat-item {
			text-align: center;
		}

		.stat-number {
			font-size: 1.5rem;
			font-weight: bold;
			color: #3b82f6;
		}

		.stat-label {
			font-size: 0.9rem;
			color: #6c757d;
			margin-top: 0.25rem;
		}

		@media (max-width: 768px) {
			:host {
				padding: 0.5rem;
				width: 100% !important;
				max-width: 100% !important;
				box-sizing: border-box;
				display: block !important;
			}

			.dashboard-header {
				flex-direction: column;
				gap: 1rem;
				text-align: center;
			}

			.dashboard-actions {
				width: 100%;
				justify-content: center;
			}

			.widgets-grid {
				display: grid !important;
				grid-template-columns: 1fr !important;
				gap: 1rem;
				width: 100% !important;
				max-width: 100% !important;
				overflow-x: hidden;
				padding: 0;
				margin: 1rem 0;
			}

			.widget-stats {
				flex-direction: column;
				gap: 1rem;
			}
		}

		/* Regla adicional para tabletas */
		@media (min-width: 769px) and (max-width: 1024px) {
			.widgets-grid {
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 1.25rem;
			}
		}
	`

	handleTodoEvent(event) {
		console.log('Evento de todo:', event.type, event.detail)

		// Emitir evento al dashboard principal
		this.dispatchEvent(
			new CustomEvent('todo-event', {
				detail: {
					eventType: event.type,
					data: event.detail,
				},
				bubbles: true,
				composed: true,
			})
		)
	}

	renderWidget(widget) {
		switch (widget.type) {
			case 'todo':
				return html`
					<widget-wrapper .widgetId=${widget.id} .title=${widget.title}>
						<todo-widget
							.label=${widget.config.label}
							.maxTodos=${widget.config.maxTodos || 10}
							@todo-added=${this.handleTodoEvent}
							@todo-completed=${this.handleTodoEvent}
							@todo-uncompleted=${this.handleTodoEvent}
							@todo-deleted=${this.handleTodoEvent}
							@todos-cleared=${this.handleTodoEvent}
						></todo-widget>
					</widget-wrapper>
				`
			default:
				return html`
					<widget-wrapper .widgetId=${widget.id} .title=${widget.title}>
						<p>Widget tipo "${widget.type}" no encontrado</p>
					</widget-wrapper>
				`
		}
	}

	render() {
		return html`
			<div class="dashboard-header">
				<h2 class="dashboard-title">Widgets Dashboard</h2>
			</div>

			${this.widgets.length > 0
				? html`
						<div class="widgets-grid">${this.widgets.map(widget => this.renderWidget(widget))}</div>
				  `
				: html`
						<div class="empty-dashboard">
							<h3>🎯 Dashboard Vacío</h3>
							<p>No hay widgets configurados. Haz clic en "Agregar Widget" para comenzar.</p>
						</div>
				  `}
		`
	}
}

window.customElements.define('widgets-page', WidgetsPage)
