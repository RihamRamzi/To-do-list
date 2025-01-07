import { currentProj, projects, saveToLocalStorage } from "./createProject";
import editSvg from "./svg/square-edit-outline.svg";
import deleteSvg from "./svg/delete.svg";
import { deleteTask, openEditTask } from "./editTask";

const dialog = document.querySelector("#taskDialog");
const dialogEdit = document.querySelector("#editTaskDialog");
const form = document.querySelector(".addTaskForm");
const tasksContainer = document.querySelector(".tasksContainer");

const addTaskEL = () => {
  const addTaskBtn = document.querySelector("#addTask");
  addTaskBtn.addEventListener("click", addTask);

  const closeTaskBtn = document.querySelectorAll(".closeBtn");
  closeTaskBtn.forEach((button) => {
    button.addEventListener("click", closeTask);
  });

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
  dialogEdit.close();
};

const addTask = () => {
  dialog.showModal();
};

const loadTaskLocalID = () => {
  let localId = localStorage.getItem("taskId");

  if (localId === null) {
    localId = 0;
  } else {
    localId = parseInt(localId);
  }
  return localId;
};
// track current task
let currentTask = null;
//id to track task
let taskId = 0;
taskId = loadTaskLocalID();

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
    createTaskDom(
      task.id,
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      "taskSvg deleteTaskSvg"
    );
  });
};

const createTaskDom = (
  taskId,
  title,
  description,
  dueDate,
  tPriority,
  taskSvg
) => {
  const tasksConDom = document.querySelector(".tasksContainer");

  const taskCon = document.createElement("div");
  taskCon.className = "task";
  taskCon.setAttribute("task-id", taskId);

  const checkBox = document.createElement("div");
  checkBox.className = "checkBox";

  const details = document.createElement("div");
  details.className = "details";

  const taskTitle = document.createElement("div");
  const taskDes = document.createElement("div");
  taskTitle.className = "taskTitle";
  taskTitle.textContent = title;

  taskDes.className = "taskDes";
  taskDes.textContent = description;
  details.appendChild(taskTitle);
  details.appendChild(taskDes);

  const datePriority = document.createElement("div");
  const taskDueDate = document.createElement("div");
  taskDueDate.className = "taskDueDate";
  taskDueDate.textContent = dueDate;
  const priority = document.createElement("div");
  priority.className = "priority";
  priority.textContent = tPriority;
  datePriority.appendChild(taskDueDate);
  datePriority.appendChild(priority);

  const editTask = document.createElement("img");
  editTask.className = "taskSvg editTaskSvg";
  editTask.src = editSvg;
  const deleteTask = document.createElement("img");
  deleteTask.className = taskSvg;
  deleteTask.src = deleteSvg;

  taskCon.appendChild(checkBox);
  taskCon.appendChild(details);
  taskCon.appendChild(datePriority);
  taskCon.appendChild(editTask);
  taskCon.appendChild(deleteTask);
  tasksConDom.appendChild(taskCon);
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

  openEditTask(event);
  deleteTask(event);
};

export { addTaskEL, currentTask, taskId, createTaskDom, displayTaskDom };
