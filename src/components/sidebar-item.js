import { html, css, LitElement } from 'lit'

export class SidebarItem extends LitElement {
	static properties = {
		item: { type: Object },
		collapsed: { type: Boolean },
	}

	static styles = css`
		:host {
			display: block;
		}

		.nav-item {
			display: flex;
			align-items: center;
			padding: 0.75rem 1rem;
			cursor: pointer;
			transition: all 0.3s ease;
			text-decoration: none;
			color: inherit;
			border: none;
			background: none;
			width: 100%;
			text-align: left;
			color: white;
			border-left: 4px solid transparent;
			position: relative;
		}

		.nav-item:hover {
			background-color: #34495e;
			transform: translateX(2px);
		}

		.nav-item:hover .nav-icon {
			transform: scale(1.05);
		}

		.nav-item.active {
			background-color: #3498db;
			border-left: 4px solid #2980b9;
			transform: translateX(2px);
		}

		.nav-item.active .nav-icon {
			color: white;
			transform: scale(1.1);
		}

		.nav-icon {
			min-width: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.2rem;
			color: #ecf0f1;
			transition: all 0.3s ease;
		}

		.nav-text {
			margin-left: 0.5rem;
			white-space: nowrap;
			overflow: hidden;
			opacity: 1;
			transition: opacity 0.3s ease;
		}

		:host([collapsed]) .nav-text {
			opacity: 0;
			width: 0;
			margin-left: 0;
		}

		:host([collapsed]) .nav-item {
			position: relative;
		}

		:host([collapsed]) .nav-item::after {
			content: attr(data-tooltip);
			position: absolute;
			left: 100%;
			top: 50%;
			transform: translateY(-50%);
			background: #2c3e50;
			color: white;
			padding: 0.5rem;
			border-radius: 4px;
			white-space: nowrap;
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
			z-index: 1000;
			margin-left: 0.5rem;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		}

		:host([collapsed]) .nav-item:hover::after {
			opacity: 1;
			visibility: visible;
		}
	`

	handleClick() {
		this.dispatchEvent(
			new CustomEvent('item-click', {
				detail: { item: this.item },
				bubbles: true,
				composed: true,
			})
		)
	}

	render() {
		return html`
			<button
				class="nav-item ${this.item?.active ? 'active' : ''}"
				@click=${this.handleClick}
				data-tooltip="${this.item?.label}"
			>
				<div class="nav-icon">${this.item?.icon || '📄'}</div>
				<span class="nav-text">${this.item?.label}</span>
			</button>
		`
	}
}

window.customElements.define('sidebar-item', SidebarItem)
