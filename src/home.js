import {
  projects,
  clearProjectSelect,
  saveToLocalStorage,
} from "./createProject";
import { createTaskDom, currentTask } from "./addTask";

const allTasks = (event) => {
  if (event.target.matches("#allTasks")) {
    clearProjectSelect();
    event.target.className = "selected";
    displayAllTasksDom();
  }
};

const displayAllTasksDom = () => {
  const selectedProjectDom = document.querySelector(".selectedProject");
  selectedProjectDom.textContent = `All Tasks`;
  const tasksContainer = document.querySelector(".tasksContainer");
  tasksContainer.textContent = "";
  projects.forEach((project) => {
    project.task.forEach((task) => {
      createTaskDom(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        "taskSvg deleteAllTaskSvg"
      );
    });
  });
  const addTask = document.querySelector("#addTask");
  addTask.style.display = "none";
};

const allTasksDelete = (event) => {
  const clickedElement = event.target.matches(".deleteAllTaskSvg");
  if (!clickedElement) {
  }
  projects.forEach((project) => {
    const index = project.task.indexOf(currentTask);

    if (index !== -1) {
      project.task.splice(index, 1);
      saveToLocalStorage();
      displayAllTasksDom();
    }
  });
};

export { allTasks, allTasksDelete };
