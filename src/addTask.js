import { currentProj, projects, saveToLocalStorage } from "./createProject";
import editSvg from "./svg/square-edit-outline.svg";
import deleteSvg from "./svg/delete.svg";
import { deleteTask } from "./editTask";

const dialog = document.querySelector("#taskDialog");
const form = document.querySelector("form");
const tasksContainer = document.querySelector(".tasksContainer");

const addTaskEL = () => {
  const addTaskBtn = document.querySelector("#addTask");
  addTaskBtn.addEventListener("click", addTask);

  const closeTaskBtn = document.querySelector("#closeBtn");
  closeTaskBtn.addEventListener("click", closeTask);

  form.addEventListener("submit", createTask);

  tasksContainer.addEventListener("click", getCurrentTask);
};

class Task {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }
  markAsComplete() {
    this.isComplete = true;
  }
  markAsNotComplete() {
    this.isComplete = false;
  }
}

const closeTask = (event) => {
  event.preventDefault();
  form.reset();
  dialog.close();
};

const addTask = () => {
  dialog.showModal();
};

// track current task
let currentTask = null;
//id to track task
let taskId = 0;

const createTask = (event) => {
  event.preventDefault();
  const taskInput = document.querySelector("#task");
  const taskDescription = document.querySelector("#des");
  const taskDate = document.querySelector("#date");
  const priority = document.querySelector("#priority");

  const task = new Task(
    taskId,
    taskInput.value,
    taskDescription.value,
    taskDate.value,
    priority.value
  );
  currentProj.task.push(task);
  taskId++;
  dialog.close();
  form.reset();
  saveToLocalStorage();
  displayTaskDom();
};

const displayTaskDom = () => {
  tasksContainer.textContent = "";
  currentProj.task.forEach((task) => {
    const tasksConDom = document.querySelector(".tasksContainer");

    const taskCon = document.createElement("div");
    taskCon.className = "task";
    taskCon.setAttribute("task-id", task.id);

    const checkBox = document.createElement("div");
    checkBox.className = "checkBox";

    const details = document.createElement("div");
    details.className = "details";

    const taskTitle = document.createElement("div");
    const taskDes = document.createElement("div");
    taskTitle.className = "taskTitle";
    taskTitle.textContent = task.title;

    taskDes.className = "taskDes";
    taskDes.textContent = task.description;
    details.appendChild(taskTitle);
    details.appendChild(taskDes);

    const datePriority = document.createElement("div");
    const taskDueDate = document.createElement("div");
    taskDueDate.className = "taskDueDate";
    taskDueDate.textContent = task.dueDate;
    const priority = document.createElement("div");
    priority.className = "priority";
    priority.textContent = task.priority;
    datePriority.appendChild(taskDueDate);
    datePriority.appendChild(priority);

    const editTask = document.createElement("img");
    editTask.className = "taskSvg editTaskSvg";
    editTask.src = editSvg;
    const deleteTask = document.createElement("img");
    deleteTask.className = "taskSvg deleteTaskSvg";
    deleteTask.src = deleteSvg;

    taskCon.appendChild(checkBox);
    taskCon.appendChild(details);
    taskCon.appendChild(datePriority);
    taskCon.appendChild(editTask);
    taskCon.appendChild(deleteTask);
    tasksConDom.appendChild(taskCon);
  });
};

const getCurrentTask = (event) => {
  const clickedTask = event.target.closest(".task");

  if (!clickedTask) {
    return;
  }
  const taskId = clickedTask.getAttribute("task-id");
  const intTaskId = parseInt(taskId);

  projects.forEach((project) => {
    project.task.forEach((task) => {
      if (task.id === intTaskId) {
        currentTask = task;
      }
    });
  });

  deleteTask(event);
};

export { addTaskEL, displayTaskDom, currentTask };
