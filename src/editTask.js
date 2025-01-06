import { currentTask, displayTaskDom } from "./addTask";
import { currentProj, saveToLocalStorage } from "./createProject";

const editTaskEL = () => {
  // const form = document.querySelector(".editTaskForm");
  // form.addEventListener("submit");
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
  dialog.showModal();
};

export { deleteTask, openEditTask, editTaskEL };
