import { currentTask, displayTaskDom } from "./addTask";
import { currentProj, saveToLocalStorage } from "./createProject";
import { displayAllTasksDom } from "./home";

const editTaskEL = () => {
  const form = document.querySelector(".editTaskForm");
  form.addEventListener("submit", submitEditTask);
};

let allTaskSelected = false;
const checkIfAllTaskSelected = (event) => {
  const clickedElement = event.target.matches("#allTasks");
  const clickedElement2 = event.target.closest(".project");

  if (clickedElement) {
    allTaskSelected = true;
  } else if (clickedElement2) {
    allTaskSelected = false;
  }
};

const deleteTask = (event) => {
  const deleteBtn = event.target.matches(".deleteTaskSvg");

  if (!deleteBtn) {
    return;
  }
  const index = currentProj.task.indexOf(currentTask);
  if (index !== -1) {
    currentProj.task.splice(index, 1);
  }
  saveToLocalStorage();
  displayTaskDom();
};

const openEditTask = (event) => {
  const editTaskBtn = event.target.matches(".editTaskSvg");

  if (!editTaskBtn) {
    return;
  }
  const dialog = document.querySelector("#editTaskDialog");

  const taskInput = document.querySelector("#renameTask");
  const taskDescription = document.querySelector("#renameDes");
  const taskDate = document.querySelector("#renameDate");
  const priority = document.querySelector("#renamePriority");

  taskInput.value = currentTask.title;
  taskDescription.value = currentTask.description;
  taskDate.value = currentTask.dueDate;
  priority.value = currentTask.priority;

  dialog.showModal();
};

const submitEditTask = (event) => {
  event.preventDefault();
  const form = document.querySelector(".editTaskForm");
  const dialog = document.querySelector("#editTaskDialog");

  const taskInput = document.querySelector("#renameTask");
  const taskDescription = document.querySelector("#renameDes");
  const taskDate = document.querySelector("#renameDate");
  const priority = document.querySelector("#renamePriority");

  currentTask.title = taskInput.value;
  currentTask.description = taskDescription.value;
  currentTask.dueDate = taskDate.value;
  currentTask.priority = priority.value;

  if (allTaskSelected === true) {
    dialog.close();
    form.reset();
    saveToLocalStorage();
    displayAllTasksDom();
    return;
  }

  dialog.close();
  saveToLocalStorage();
  form.reset();
  displayTaskDom();
};

export {
  deleteTask,
  openEditTask,
  editTaskEL,
  checkIfAllTaskSelected,
  allTaskSelected,
};
