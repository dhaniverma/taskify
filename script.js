window.onload = function () {
  let tasks = [];

  window.addTask = function () {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  };

  window.filterTasks = function (filter) {
    renderTasks(filter);
  };

  function renderTasks(filter = "all") {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
      if (
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)
      ) {
        const li = document.createElement("li");
        li.className = "task-item" + (task.completed ? " completed" : "");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.innerHTML = "🗑️";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
      }
    });
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
};
