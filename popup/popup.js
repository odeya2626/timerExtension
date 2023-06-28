let todos = [];
const addTodoBtn = document.getElementById("add-btn");
const todoContainer = document.getElementById("todo-container");
addTodoBtn.addEventListener("click", () => {
  addTodo();
});

chrome.storage.sync.get(["todos"], (data) => {
  todos = data.todos ? data.todos : [];
  renderTodos();
});
const saveTodos = () => {
  chrome.storage.sync.set({ todos: todos });
};
const addTodo = () => {
  const todoNum = todos.length;
  todos.push("");
  renderTodo(todoNum);
  saveTodos();
};

const deleteTodo = (todoIndex) => {
  todos.splice(todoIndex, 1);
  renderTodos();
  saveTodos();
  console.log(todos);
};

const renderTodos = () => {
  const todoContainer = document.getElementById("todo-container");
  todoContainer.innerHTML = "";
  todos.forEach((todo, index) => {
    renderTodo(index);
  });
};

const renderTodo = (todoNum) => {
  const todoRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a todo";
  text.value = todos[todoNum];
  text.addEventListener("change", () => {
    todos[todoNum] = text.value;
    saveTodos();
    console.log(todos);
  });
  const deleteBtn = document.createElement("i");
  deleteBtn.className = "material-icons delete";
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", () => {
    deleteTodo();
  });
  todoRow.appendChild(text);
  todoRow.appendChild(deleteBtn);
  todoContainer.appendChild(todoRow);
};
