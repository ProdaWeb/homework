"use strict";

const todoKeys = {
	id: "id",
	text: "text",
	is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `todo with id ${todoId} not found.`;

const getNewTodoId = (todos) => {
	return (
		todos.reduce((maxId, todo) => {
			return Math.max(maxId, todo[todoKeys.id]);
		}, 0) + 1
	);
};

const createTodo = (todos, text) => {
	const newTodo = {
		[todoKeys.id]: getNewTodoId(todos),
		[todoKeys.text]: text,
		[todoKeys.is_completed]: false,
	};

	todos.push(newTodo);
	return newTodo;
};

const completeTodoById = (todos, todoId) => {
	const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
	if (!todo) {
		console.error(errTodoNotFound(todoId));
		return null;
	}

	todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];

	return todo;
};

const deleteTodoById = (todos, todoId) => {
	const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);

	if (todoIndex === -1) {
		console.error(errTodoNotFound(todoId));
		return null;
	}

	todos.splice(todoIndex, 1);
	return todos;
};

const editTodoTextById = (todos, text, todoId) => {
	const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
	if (!todo) {
		console.error(errTodoNotFound(todoId));
		return null;
	}

	todo[todoKeys.text] = text;
	return todo;
};
