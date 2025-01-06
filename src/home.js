import { projects, clearProjectSelect } from "./createProject";
import editSvg from "./svg/square-edit-outline.svg";
import deleteSvg from "./svg/delete.svg";
import { createTaskDom } from "./addTask";

const allTasks = (event) => {
  const clickedElement = event.target.closest("#allTasks");

  if (!clickedElement) {
    return;
  }
  clearProjectSelect();
  clickedElement.classList.add("selected");
  displayAllTasksDom();
};

const displayAllTasksDom = () => {
  const selectedProjectDom = document.querySelector(".selectedProject");
  selectedProjectDom.textContent = `All Tasks`;
  const tasksContainer = document.querySelector(".tasksContainer");
  tasksContainer.textContent = "";
  projects.forEach((project) => {
    project.task.forEach((task) => {
      createTaskDom(task.id, task.title, task.description, task.priority);
    });
  });
  const addTask = document.querySelector("#addTask");
  addTask.style.display = "none";
};

export { allTasks };
