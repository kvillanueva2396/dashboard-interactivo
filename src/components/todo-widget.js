import { html, css, LitElement } from 'lit'

export class TodoWidget extends LitElement {
	static properties = {
		todos: { type: Array },
		newTodoText: { type: String },
		label: { type: String },
		maxTodos: { type: Number },
	}

	constructor() {
		super()
		this.todos = []
		this.newTodoText = ''
		this.label = 'Lista de Tareas'
		this.maxTodos = 10
	}

	static styles = css`
		:host {
			display: block;
			width: 100%;
			box-sizing: border-box;
		}

		.todo-container {
			padding: 1rem;
			width: 100%;
			box-sizing: border-box;
		}

		.todo-label {
			font-size: 1.2rem;
			color: #6c757d;
			margin-bottom: 1rem;
			font-weight: 600;
			text-align: center;
		}

		.todo-input-section {
			display: flex;
			gap: 0.5rem;
			margin-bottom: 1.5rem;
			align-items: center;
		}

		.todo-input {
			flex: 1;
			padding: 0.75rem;
			border: 2px solid #e1e8ed;
			border-radius: 8px;
			font-size: 1rem;
			transition: all 0.3s ease;
		}

		.todo-input:focus {
			border-color: #3b82f6;
			box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
		}

		.todo-input::placeholder {
			color: #95a5a6;
		}

		.add-btn {
			background: #10b981;
			color: white;
			border: none;
			padding: 0.75rem 1rem;
			border-radius: 8px;
			cursor: pointer;
			font-size: 1rem;
			font-weight: 600;
			transition: all 0.3s ease;
			min-width: 80px;
		}

		.add-btn:hover {
			background: #059669;
			transform: translateY(-1px);
		}

		.add-btn:disabled {
			background: #95a5a6;
			cursor: not-allowed;
			transform: none;
		}

		.todo-list {
			list-style: none;
			margin: 0;
			padding: 0;
			margin-bottom: 1.5rem;
		}

		.todo-item {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			padding: 0.75rem;
			margin-bottom: 0.5rem;
			background: #f8f9fa;
			border-radius: 8px;
			border-left: 4px solid transparent;
			transition: all 0.3s ease;
		}

		.todo-item:hover {
			background: #e9ecef;
			transform: translateX(4px);
		}

		.todo-item.completed {
			border-left-color: #28a745;
			opacity: 0.7;
		}

		.todo-item.completed .todo-text {
			text-decoration: line-through;
			color: #6c757d;
		}

		.todo-checkbox {
			width: 18px;
			height: 18px;
			cursor: pointer;
		}

		.todo-text {
			flex: 1;
			font-size: 0.95rem;
			line-height: 1.4;
		}

		.todo-delete {
			background: #ff6b6b;
			color: white;
			border: none;
			padding: 0.25rem 0.5rem;
			border-radius: 4px;
			cursor: pointer;
			font-size: 0.8rem;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.todo-item:hover .todo-delete {
			opacity: 1;
		}

		.todo-delete:hover {
			background: #e55656;
		}

		.todo-stats {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;
			background: #f8f9fa;
			border-radius: 8px;
			margin-bottom: 1rem;
		}

		.stat-group {
			display: flex;
			gap: 2rem;
		}

		.stat-item {
			text-align: center;
		}

		.stat-number {
			font-size: 1.5rem;
			font-weight: bold;
			color: #2c3e50;
		}

		.stat-label {
			font-size: 0.8rem;
			color: #6c757d;
			margin-top: 0.25rem;
		}

		.stat-item {
			font-weight: 600;
		}

		.clear-completed-btn {
			background: #ef4444;
			color: white;
			border: none;
			padding: 0.5rem 1rem;
			border-radius: 6px;
			cursor: pointer;
			font-size: 0.9rem;
			font-weight: 600;
			transition: all 0.3s ease;
		}

		.clear-completed-btn:hover {
			background: #dc2626;
			transform: translateY(-1px);
		}

		.clear-completed-btn:disabled {
			background: #95a5a6;
			cursor: not-allowed;
			transform: none;
		}

		.empty-state {
			text-align: center;
			padding: 2rem;
			color: #6c757d;
		}

		.empty-state h4 {
			margin-bottom: 0.5rem;
			color: #95a5a6;
		}

		@media (max-width: 768px) {
			.todo-container {
				width: 100%;
				padding: 0.5rem;
				box-sizing: border-box;
			}

			.todo-input-section {
				flex-direction: column;
				gap: 0.75rem;
				width: 100%;
			}

			.todo-input {
				width: 100%;
				box-sizing: border-box;
			}

			.add-btn {
				width: 100%;
				max-width: 200px;
				margin: 0 auto;
			}

			.todo-list {
				width: 100%;
				max-height: 200px;
				overflow-y: auto;
			}

			.todo-item {
				width: 100%;
				padding: 0.5rem;
				word-break: break-word;
			}

			.todo-stats {
				flex-direction: column;
				gap: 1rem;
				text-align: center;
				width: 100%;
			}

			.stat-group {
				justify-content: center;
			}
		}
	`

	addTodo() {
		if (this.newTodoText.trim() && this.todos.length < this.maxTodos) {
			const newTodo = {
				id: Date.now(),
				text: this.newTodoText.trim(),
				completed: false,
				createdAt: new Date().toLocaleString(),
			}

			this.todos = [...this.todos, newTodo]
			this.newTodoText = ''
			this.requestUpdate()

			// Emitir evento
			this.dispatchEvent(
				new CustomEvent('todo-added', {
					detail: { todo: newTodo, total: this.todos.length },
					bubbles: true,
					composed: true,
				})
			)
		}
	}

	toggleTodo(id) {
		this.todos = this.todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)
		this.requestUpdate()

		const todo = this.todos.find(t => t.id === id)
		const eventType = todo.completed ? 'todo-completed' : 'todo-uncompleted'

		this.dispatchEvent(
			new CustomEvent(eventType, {
				detail: {
					todo,
					completedCount: this.todos.filter(t => t.completed).length,
				},
				bubbles: true,
				composed: true,
			})
		)
	}

	deleteTodo(id) {
		const todo = this.todos.find(t => t.id === id)
		this.todos = this.todos.filter(todo => todo.id !== id)
		this.requestUpdate()

		this.dispatchEvent(
			new CustomEvent('todo-deleted', {
				detail: { todo, total: this.todos.length },
				bubbles: true,
				composed: true,
			})
		)
	}

	clearCompleted() {
		const completedCount = this.todos.filter(t => t.completed).length
		this.todos = this.todos.filter(todo => !todo.completed)
		this.requestUpdate()

		this.dispatchEvent(
			new CustomEvent('todos-cleared', {
				detail: { clearedCount: completedCount, remaining: this.todos.length },
				bubbles: true,
				composed: true,
			})
		)
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.addTodo()
		}
	}

	handleInputChange(e) {
		this.newTodoText = e.target.value
	}

	get completedCount() {
		return this.todos.filter(todo => todo.completed).length
	}

	get pendingCount() {
		return this.todos.filter(todo => !todo.completed).length
	}

	render() {
		return html`
			<div class="todo-container">
				<div class="todo-label">${this.label}</div>

				<div class="todo-input-section">
					<input
						type="text"
						class="todo-input"
						placeholder="Agregar nueva tarea..."
						.value=${this.newTodoText}
						@input=${this.handleInputChange}
						@keypress=${this.handleKeyPress}
						?disabled=${this.todos.length >= this.maxTodos}
					/>
					<button
						class="add-btn"
						@click=${this.addTodo}
						?disabled=${!this.newTodoText.trim() || this.todos.length >= this.maxTodos}
					>
						${this.todos.length >= this.maxTodos ? 'Límite' : 'Agregar'}
					</button>
				</div>

				${this.todos.length > 0
					? html`
							<ul class="todo-list">
								${this.todos.map(
									todo => html`
										<li class="todo-item ${todo.completed ? 'completed' : ''}">
											<input
												type="checkbox"
												class="todo-checkbox"
												.checked=${todo.completed}
												@change=${() => this.toggleTodo(todo.id)}
											/>
											<span class="todo-text">${todo.text}</span>
											<button class="todo-delete" @click=${() => this.deleteTodo(todo.id)}>
												🗑️
											</button>
										</li>
									`
								)}
							</ul>

							<div class="todo-stats">
								<div class="stat-group">
									<div class="stat-item">
										<div class="stat-number">${this.todos.length}</div>
										<div class="stat-label">Total</div>
									</div>
									<div class="stat-item">
										<div class="stat-number">${this.pendingCount}</div>
										<div class="stat-label">Pendientes</div>
									</div>
									<div class="stat-item">
										<div class="stat-number">${this.completedCount}</div>
										<div class="stat-label">Completadas</div>
									</div>
								</div>
								<button
									class="clear-completed-btn"
									@click=${this.clearCompleted}
									?disabled=${this.completedCount === 0}
								>
									Limpiar Completadas
								</button>
							</div>
					  `
					: html`
							<div class="empty-state">
								<h4>📝 Sin tareas</h4>
								<p>Agrega tu primera tarea para comenzar</p>
							</div>
					  `}
			</div>
		`
	}
}

window.customElements.define('todo-widget', TodoWidget)
