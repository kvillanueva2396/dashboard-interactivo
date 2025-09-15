import { html, css, LitElement } from 'lit'

export class WidgetWrapper extends LitElement {
	static properties = {
		widgetId: { type: String },
		title: { type: String },
	}

	constructor() {
		super()
		this.title = 'Widget'
		this.widgetId = ''
	}

	static styles = css`
		:host {
			display: block;
			margin-bottom: 1.5rem;
			width: 100%;
			max-width: 100%;
			box-sizing: border-box;
		}

		.widget-container {
			background: white;
			border-radius: 12px;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
			border: 1px solid #e1e8ed;
			transition: all 0.3s ease;
			overflow: hidden;
			width: 100%;
			max-width: 100%;
			box-sizing: border-box;
		}

		.widget-container:hover {
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
			transform: translateY(-2px);
		}

		.widget-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 1.5rem;
			background: #3b82f6;
			color: white;
			border-bottom: 1px solid #e1e8ed;
		}

		.widget-title {
			font-size: 1.1rem;
			font-weight: 600;
			margin: 0;
			color: white;
		}

		.widget-content {
			display: flex;
			justify-content: center;
			width: fit-content;
			padding: 1.5rem;
			min-height: 120px;
		}

		.widget-content ::slotted(*) {
			margin: 0;
		}

		@media (max-width: 768px) {
			:host {
				width: 100% !important;
				max-width: 100% !important;
				box-sizing: border-box !important;
				display: block !important;
			}

			.widget-container {
				margin-bottom: 1rem;
				width: 100% !important;
				max-width: 100% !important;
				box-sizing: border-box !important;
				min-width: unset !important;
			}

			.widget-header {
				padding: 0.75rem 1rem;
				width: 100% !important;
				box-sizing: border-box !important;
			}

			.widget-content {
				padding: 1rem;
				min-height: 100px;
				width: 100% !important;
				box-sizing: border-box !important;
				overflow-x: hidden;
			}
		}
	`

	render() {
		return html`
			<div class="widget-container">
				<div class="widget-header">
					<h3 class="widget-title">${this.title}</h3>
				</div>
				<div class="widget-content">
					<slot></slot>
				</div>
			</div>
		`
	}
}

window.customElements.define('widget-wrapper', WidgetWrapper)
