import React from 'react';
import { useState } from 'react';
import './App.css';
const App = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');

	// handle change
	const handleTodoChange = (e) => {
		setTodo(e.target.value);
	};

	//  handlesubmit
	const handlesubmit = (e) => {
		e.preventDefault();
		const newTodo = {
			id: new Date().getTime(),
			text: todo.trim(),
			complete: false,
		};
		if (newTodo.text.length > 0) {
			setTodos([...todos].concat(newTodo));
			setTodo('');
		} else {
			alert('Enter valid task');
			setTodo('');
		}
	};
	//  deleteTodo
	const deleteTodo = (id) => {
		let updatedTodos = [...todos].filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	//  toggleComplete

	// submitEdits

	return (
		<div id="todo-list">
			<h1>Todo List</h1>
			<form onSubmit={handlesubmit}>
				<input
					type="text"
					value={todo}
					placeholder="Add a new task"
					onChange={handleTodoChange}
				/>
				<button type="submit">Add</button>
			</form>
			{todos.map((todo) => (
				<div className="todo" key={todo.id}>
					{todo.text}
					<button onClick={() => deleteTodo(todo.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};
export default App;
