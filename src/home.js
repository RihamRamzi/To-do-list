import {
  projects,
  clearProjectSelect,
  saveToLocalStorage,
} from "./createProject";
import { createTaskDom, currentTask } from "./addTask";
import { format } from "date-fns";

const allTasks = (event) => {
  if (event.target.closest("#allTasks")) {
    clearProjectSelect();
    const allTask = document.querySelector("#allTasks");
    allTask.className = "options selected";
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
    return;
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

const selectTodayTasks = (event) => {
  if (event.target.closest("#todayTasks")) {
    clearProjectSelect();
    const todayTasks = document.querySelector("#todayTasks");
    todayTasks.className = "options selected";
    displayTodayTasksDom();
  }
};

const displayTodayTasksDom = () => {
  const selectedProjectDom = document.querySelector(".selectedProject");
  selectedProjectDom.textContent = `Today Tasks`;
  const tasksContainer = document.querySelector(".tasksContainer");
  tasksContainer.textContent = "";
  const today = format(new Date(), "yyyy-MM-dd");
  projects.forEach((project) =>
    project.task.filter((task) => {
      if (task.dueDate === today) {
        createTaskDom(
          task.id,
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          "taskSvg deleteTodayTaskSvg"
        );
      }
    })
  );
};
const todayTasksDelete = (event) => {
  const clickedElement = event.target.matches(".deleteTodayTaskSvg");
  if (!clickedElement) {
    return;
  }
  projects.forEach((project) => {
    const index = project.task.indexOf(currentTask);

    if (index !== -1) {
      project.task.splice(index, 1);
      saveToLocalStorage();
      displayTodayTasksDom();
    }
  });
};

export {
  allTasks,
  allTasksDelete,
  displayAllTasksDom,
  selectTodayTasks,
  displayTodayTasksDom,
  todayTasksDelete,
};
