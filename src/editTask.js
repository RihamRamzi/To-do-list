import { currentTask, displayTaskDom } from "./addTask";
import { currentProj, saveToLocalStorage } from "./createProject";
import { displayAllTasksDom, displayTodayTasksDom } from "./home";

const editTaskEL = () => {
  const form = document.querySelector(".editTaskForm");
  form.addEventListener("submit", submitEditTask);
};

// checks if All tasks selected so i can apply different delete and edit func
let allTaskSelected = false;
const checkIfAllTaskSelected = (event) => {
  const clickedElement = event.target.closest("#allTasks");
  const clickedElement2 = event.target.closest(".project");

  if (clickedElement) {
    allTaskSelected = true;
    todayTasksSelected = false;
  } else if (clickedElement2) {
    allTaskSelected = false;
  }
};

let todayTasksSelected = false;
const checkIfTodayTasksSelected = (event) => {
  const clickedElement = event.target.closest("#todayTasks");
  const clickedElement2 = event.target.closest(".project");

  if (clickedElement) {
    todayTasksSelected = true;
    allTaskSelected = false;
  } else if (clickedElement2) {
    todayTasksSelected = false;
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
  } else if (todayTasksSelected === true) {
    dialog.close();
    form.reset();
    saveToLocalStorage();
    displayTodayTasksDom();
    return;
  }

  dialog.close();
  saveToLocalStorage();
  form.reset();
  displayTaskDom();
};

const taskCompleted = (event) => {
  const clickedElement = event.target.matches(".checkBox");

  if (!clickedElement) {
    return;
  }
  const taskDiv = event.target.closest(".task");
  const taskTitle = taskDiv.querySelector(".taskTitle");
  currentTask.isComplete = !currentTask.isComplete;

  if (currentTask.isComplete) {
    event.target.classList.add("completed");
    taskTitle.style.textDecoration = "line-through";
  } else {
    event.target.classList.remove("completed");
    taskTitle.style.textDecoration = "none";
  }

  saveToLocalStorage();
};

export {
  deleteTask,
  openEditTask,
  editTaskEL,
  checkIfAllTaskSelected,
  checkIfTodayTasksSelected,
  taskCompleted,
};
