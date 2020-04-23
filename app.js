const todoInput = document.querySelector('.todo');
const btn = document.querySelector('.todo-add');
const list = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter');

document.addEventListener('DOMContentLoaded', showTodos);
btn.addEventListener('click', addTodo);
list.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', todosFilter);

function addTodo(event) {
	event.preventDefault();
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todoDiv');

	const todoNew = document.createElement('li');
	todoNew.classList.add('newTodo');
	todoNew.innerText = todoInput.value;

	todoDiv.appendChild(todoNew);

	//saving
	saveLocal(todoInput.value);
	const completedButton = document.createElement('button');
	completedButton.classList.add('btn', 'btn-info');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	todoDiv.appendChild(completedButton);

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('btn', 'btn-danger');
	deleteButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
	todoDiv.appendChild(deleteButton);
	list.appendChild(todoDiv);
	todoInput.value = '';
}
function deleteOrCheck(event) {

	const item = event.target;
	if (item.classList[1] == 'btn-danger') {
		const todo = item.parentElement;
		todo.classList.add('deleted');
		removeTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});

	}
	if (item.classList[1] == 'btn-info') {
		const todo = item.parentElement;
		todo.classList.toggle('checked');
	}
}
function todosFilter(event) {
	const todos = list.childNodes;
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if (todo.classList.contains('checked')) {
					todo.style.display = 'flex';
					console.log(todo.innerHTML);
				} else {
					todo.style.display = 'none';
				}
				break;
			case "notCompleted":
				if (!todo.classList.contains('checked')) {
					todo.style.display = 'flex';
					console.log(todo.innerHTML);
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}
function saveLocal(todo) {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}
function showTodos() {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todoDiv');

		const todoNew = document.createElement('li');
		todoNew.classList.add('newTodo');
		todoNew.innerText = todo;
		todoDiv.appendChild(todoNew);
		const completedButton = document.createElement('button');
		completedButton.classList.add('btn', 'btn-info');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		todoDiv.appendChild(completedButton);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
		todoDiv.appendChild(deleteButton);
		list.appendChild(todoDiv);
	});
}
function removeTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}