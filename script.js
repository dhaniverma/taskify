let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("task");
  const taskText = input.value.trim();
  if (taskText === "") return;
  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    if (
      (filter === "active" && task.completed) ||
      (filter === "completed" && !task.completed)
    )
      return;

    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span onclick="toggleTask(${i})">${task.text}</span>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

function filterTasks(mode) {
  renderTasks(mode);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

renderTasks();
