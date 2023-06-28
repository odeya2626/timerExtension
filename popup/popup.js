let todos = [];
const addTodoBtn = document.getElementById("add-btn");
addTodoBtn.addEventListener("click", () => {
  addTodo();
});

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (data) => {
    chrome.storage.local.set(
      {
        isRunning: !data.isRunning,
      },
      () => {
        startBtn.textContent = !data.isRunning ? "Stop" : "Start";
      }
    );
  });
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0, isRunning: false }, () => {
    startBtn.textContent = "Start";
  });
});

const todoContainer = document.getElementById("todo-container");

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
    deleteTodo(todoNum);
  });
  todoRow.appendChild(text);
  todoRow.appendChild(deleteBtn);
  todoContainer.appendChild(todoRow);
};

const updateTime = () => {
  chrome.storage.local.get(["timer", "breakTime"], (data) => {
    const time = document.getElementById("time");
    const timeVal = data.timer;
    const timeForTodo = data.breakTime;
    let hours = `${Math.floor(
      timeForTodo / 60 - Math.ceil(timeVal / 3600)
    )}`.padStart(2, "0");
    if (hours < 0) {
      hours = "00";
    }

    let minutes = `${timeForTodo - Math.ceil(timeVal / 60)}`.padStart(2, "0");
    minutes === "60" && (minutes = "00");
    minutes < 0 && (minutes = "00");
    const seconds = `${
      timeVal % 60 !== 0 ? 60 - (timeVal % 60) : "00"
    }`.padStart(2, "0");
    time.textContent = `${hours}:${minutes}:${seconds}`;
  });
};

updateTime();
setInterval(updateTime, 1000);
