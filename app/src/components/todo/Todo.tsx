import '../../scss/index.scss'
import _ from 'lodash'
import { TodoItem } from './Item'
import { useState } from 'react'
import { useToDo } from '../../hooks/useTodo'

const lastItemOf = (todoItemList: TodoItem[]) =>
	_.maxBy(todoItemList, (todoItem) => todoItem.id) as TodoItem

export const Todo = () => {
	const [newItemName, setName] = useState('')
	const [todo, setToDo] = useToDo()

	const addItem = (name: string) =>
		setToDo([
			...todo,
			{
				id: lastItemOf(todo).id + 1,
				isDone: false,
				name,
			},
		])

	const removeItem = (itemId: number) =>
		setToDo(todo.filter((todoItem) => todoItem.id !== itemId))

	const toggleIsDone = (itemId: number) => {
		const item = todo.filter((p) => p.id === itemId)[0]
		const updatedItem = _.update(item, 'isDone', (v) => !v) as TodoItem
		setToDo(
			[...todo.filter((p) => p.id !== itemId), updatedItem].sort(
				(a, b) => a.id - b.id
			)
		)
	}

	const cleanNewItemName = () => {
		setName('')
	}

	return (
		<div className="app">
			<ul className="todo-items">
				{todo.map(({ id, isDone, name }, i) => (
					<li key={i} className={['item', isDone ? 'visible' : ''].join(' ')}>
						<div onClick={() => toggleIsDone(id)}>
							<input className="is_done" type="checkbox" checked={isDone} />
							<div>{name}</div>
						</div>
						<button className="remove_button" onClick={() => removeItem(id)}>
							X
						</button>
					</li>
				))}
			</ul>

			<form
				className="add-item-form"
				onSubmit={(e) => {
					e.preventDefault()
					addItem(newItemName)
					cleanNewItemName()
				}}
			>
				<input
					autoFocus
					value={newItemName}
					type="text"
					onInput={(e) => {
						const target = e.target as unknown as { value: string }
						setName(target.value)
					}}
				/>

				<button>+todo</button>
			</form>
		</div>
	)
}
