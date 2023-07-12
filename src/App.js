import { useState, useEffect } from 'react';

import './App.css';
const App = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');
	const [editingText, setEditingText] = useState('');
	const [todoEditing, setTodoEditing] = useState(null);

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
			completed: false,
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
	const toggleComplete = (id) => {
		let updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	// submitEdits
	const submitEdits = (id) => {
		const updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.text = editingText;
			}
			return todo;
		});
		setTodos(updatedTodos);
		setTodoEditing(null);
	};

	// editingTextChange
	const editingTextChange = (e) => {
		setEditingText(e.target.value);
	};

	// save new todos into localstorage
	useEffect(() => {
		const json = localStorage.getItem('todos');
		const loadedTodos = JSON.parse(json);
		if (loadedTodos) {
			setTodos(loadedTodos);
		}
	}, []);

	useEffect(() => {
		if (todos.length > 0) {
			const json = JSON.stringify(todos);
			localStorage.setItem('todos', json);
		}
	}, [todos]);


	let remaining = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === false) {
            remaining = remaining + 1;
        }
    }

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
					<div className="todo-text">
						<input
							type="checkbox"
							id="completed"
							checked={todo.completed}
							onChange={() => toggleComplete(todo.id)}
						/>
						{todo.id === todoEditing ? (
							<input typeof="text" onChange={editingTextChange} />
						) : (
							<div>{todo.text}</div>
						)}
					</div>
					<div className="todo-actions">
						{todo.id === todoEditing ? (
							<button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
						) : (
							<button onClick={() => setTodoEditing(todo.id)}>Edit</button>
						)}
							<div className="todo-counter">
                    {remaining} remaining out of {todos.length} tasks
                </div>
						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					
					</div>
				</div>
			))}
		</div>
	);
};
export default App;
