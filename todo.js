document.addEventListener("DOMContentLoaded", () => {
    const savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
  
    const allContainer = document.getElementById("allContainer");
    const completedContainer = document.getElementById("completedContainer");
    const pendingContainer = document.getElementById("pendingContainer");
  
    const showAllBtn = document.getElementById("showAll");
    const showCompletedBtn = document.getElementById("showCompleted");
    const showPendingBtn = document.getElementById("showPending");
    const backBtn = document.getElementById("backBtn");
  
    function createTaskElement(task) {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.textContent = task.text;
      if (task.disabled) taskItem.classList.add("completed");
      return taskItem;
    }
  
    function renderTasks() {
      allContainer.innerHTML = '<button id="showAll">All</button>';
      completedContainer.innerHTML = '<button id="showCompleted">Completed</button>';
      pendingContainer.innerHTML = '<button id="showPending">Pending</button>';
  
      savedTodos.forEach(task => {
        const taskElement = createTaskElement(task);
        allContainer.appendChild(taskElement);
        if (task.disabled) {
          completedContainer.appendChild(createTaskElement(task));
        } else {
          pendingContainer.appendChild(createTaskElement(task));
        }
      });
  
      document.getElementById("showAll").addEventListener("click", showAll);
      document.getElementById("showCompleted").addEventListener("click", showCompleted);
      document.getElementById("showPending").addEventListener("click", showPending);
    }
  
    function showAll() {
      allContainer.style.display = "block";
      completedContainer.style.display = "block";
      pendingContainer.style.display = "block";
      backBtn.style.display = "none";
    }
  
    function showCompleted() {
      allContainer.style.display = "none";
      completedContainer.style.display = "block";
      pendingContainer.style.display = "none";
      backBtn.style.display = "block";
    }
  
    function showPending() {
      allContainer.style.display = "none";
      completedContainer.style.display = "none";
      pendingContainer.style.display = "block";
      backBtn.style.display = "block";
    }
  
    backBtn.addEventListener("click", showAll);
  
    renderTasks();
    showAll();
  });
  