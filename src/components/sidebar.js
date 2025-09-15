import { html, css, LitElement } from 'lit'
import { SidebarItem } from './sidebar-item'

export class Sidebar extends LitElement {
	static properties = {
		collapsed: { type: Boolean, reflect: true },
		activeItemId: { type: String },
	}

	constructor() {
		super()
		this.collapsed = false
		this.activeItemId = 'inicio'
	}

	static styles = css`
		:host {
			display: block;
			height: 100vh;
			background-color: #2c3e50;
			color: white;
			transition: width 0.3s ease;
			width: var(--sidebar-width, 250px);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1000;
		}

		:host([collapsed]) {
			--sidebar-width: 70px;
		}

		.sidebar-container {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: hidden;
		}

		.sidebar-header {
			padding: 1rem;
			border-bottom: 1px solid #34495e;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.toggle-btn {
			background: none;
			border: none;
			color: white;
			cursor: pointer;
			padding: 0.5rem;
			border-radius: 4px;
			transition: background-color 0.2s;
		}

		.toggle-btn:hover {
			background-color: #34495e;
		}

		.sidebar-nav {
			flex: 1;
			padding: 1rem 0;
		}

		.logo {
			font-size: 1.2rem;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			transition: opacity 0.3s ease;
		}

		:host([collapsed]) .logo {
			opacity: 0;
			width: 0;
			overflow: hidden;
		}

		@media (max-width: 768px) {
			:host {
				--sidebar-width: 70px;
			}
		}
	`

	toggleSidebar() {
		this.collapsed = !this.collapsed

		this.dispatchEvent(
			new CustomEvent('sidebar-toggle', {
				detail: { collapsed: this.collapsed },
				bubbles: true,
				composed: true,
			})
		)
	}

	selectItem(event) {
		const item = event.detail.item
		this.activeItemId = item.id

		this.dispatchEvent(
			new CustomEvent('item-selected', {
				detail: {
					item,
					previousActiveId: this.activeItemId !== item.id ? this.activeItemId : null,
				},
				bubbles: true,
				composed: true,
			})
		)
	}

	render() {
		const menuItems = [
			{ id: 'inicio', label: 'Inicio', icon: '🏠' },
			{ id: 'widgets', label: 'Widgets', icon: '🧩' },
			{ id: 'configuracion', label: 'Configuración', icon: '⚙️' },
		]

		return html`
			<div class="sidebar-container">
				<div class="sidebar-header">
					<button class="toggle-btn" @click=${this.toggleSidebar}>☰</button>
				</div>

				<nav class="sidebar-nav" @item-click=${this.selectItem}>
					${menuItems.map(
						item => html`
							<sidebar-item
								.item=${{ ...item, active: item.id === this.activeItemId }}
								?collapsed=${this.collapsed}
							></sidebar-item>
						`
					)}
				</nav>
			</div>
		`
	}
}

window.customElements.define('my-sidebar', Sidebar)
