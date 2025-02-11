import pImg from "./svg/menu.svg";
import eImg from "./svg/dots-vertical.svg";
import { editProjMenu } from "./editProject";
import { displayTaskDom, taskId } from "./addTask";
import {
  allTasks,
  allTasksDelete,
  displayAllTasksDom,
  selectTodayTasks,
  todayTasksDelete,
} from "./home";
import {
  allTaskSelected,
  checkIfAllTaskSelected,
  checkIfTodayTasksSelected,
  taskCompleted,
} from "./editTask";

// commonly used DOM elements
const addProjectDiv = document.querySelector(".addP");
const projectNameInput = document.querySelector("#projectName");
const projectsDOM = document.querySelector(".projects");

// EventListeners

const createProjectEL = () => {
  const addProject = document.querySelector("#addProject");
  addProject.addEventListener("click", showProjectCreation);

  const close = document.querySelector("#close");
  close.addEventListener("click", closeProjectCreation);

  const add = document.querySelector("#add");
  add.addEventListener("click", addProjectCreation);

  document.addEventListener("click", selectedOption);

  displayProject();
};

// display's the project creation menu
const showProjectCreation = () => {
  addProjectDiv.style.display = "flex";
  projectNameInput.focus();
};

//closes the project creation menu
const closeProjectCreation = () => {
  addProjectDiv.style.display = "none";
  projectNameInput.value = "";
};

//Project constructor
class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.task = [];
  }
}

// Local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem("projects");
  return data ? JSON.parse(data) : [];
};
const loadLocalID = () => {
  let localId = localStorage.getItem("id");

  if (localId === null) {
    localId = 0;
  } else {
    localId = parseInt(localId);
  }
  return localId;
};

// an array which contains the projects created by the user
let projects = [];
projects = loadFromLocalStorage();

// an id to track the project and access it
let id = 0;
id = loadLocalID();

// creates the project and adds it to the array
const saveToLocalStorage = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("id", id.toString());
  localStorage.setItem("taskId", taskId.toString());
};
const addProjectCreation = () => {
  const name = projectNameInput.value;
  const project = new Project(id, name);
  id++;
  projects.push(project);
  saveToLocalStorage();
  displayProject();
  renderProjectSelected();
};

// display the created projects on the DOM
const displayProject = () => {
  projectsDOM.textContent = "";
  projects.forEach((proj) => {
    const project = document.createElement("div");
    project.className = "options project";

    const img = document.createElement("img");
    img.src = pImg;
    project.appendChild(img);

    const para = document.createElement("p");
    para.textContent = proj.name;
    project.appendChild(para);

    const editImg = document.createElement("img");
    editImg.src = eImg;
    editImg.id = "editProj";
    const editProjDiv = document.createElement("div");
    editProjDiv.className = "editProjDiv";
    editProjDiv.appendChild(editImg);
    project.appendChild(editProjDiv);

    projectName.value = "";
    addProjectDiv.style.display = "none";
    project.setAttribute("data-id", proj.id);
    projectsDOM.appendChild(project);
  });
};

// storing the selected project on a global var to access later
let currentProj = null;
let currentProjDom = null;
// display selected project
const selectedOption = (event) => {
  const clickedElement = event.target.closest(".project");
  currentProjDom = clickedElement;

  if (clickedElement === null) {
    editProjMenu(event);
    allTasks(event);
    // checks if the user clicked all task func
    checkIfAllTaskSelected(event);
    allTasksDelete(event);
    selectTodayTasks(event);
    checkIfTodayTasksSelected(event);
    todayTasksDelete(event);
    taskCompleted(event);
    return;
  }
  const dataId = clickedElement.getAttribute("data-id");
  clearProjectSelect();
  clickedElement.classList.add("selected");

  projects.forEach((proj) => {
    const intDataId = parseInt(dataId);

    if (proj.id === intDataId) {
      const selectedProject = document.querySelector(".selectedProject");
      selectedProject.textContent = proj.name;

      const addTask = document.querySelector("#addTask");
      addTask.style.display = "block";

      currentProj = proj;
      displayTaskDom();
    }
  });
  editProjMenu(event);
  // checks if the user clicked all task func
  checkIfAllTaskSelected(event);
  checkIfTodayTasksSelected(event);
};

const clearProjectSelect = () => {
  const allProj = document.querySelectorAll(".project");
  allProj.forEach((proj) => {
    proj.classList.remove("selected");
  });
  const allTasks = document.querySelector("#allTasks");
  allTasks.classList.remove("selected");
  const todayTasks = document.querySelector("#todayTasks");
  todayTasks.classList.remove("selected");
};

const renderProjectSelected = () => {
  const allProj = document.querySelectorAll(".project");

  allProj.forEach((project) => {
    const projId = project.getAttribute("data-id");
    const intDataId = parseInt(projId);

    if (currentProj === null) {
      return;
    } else if (currentProj.id === intDataId) {
      project.classList.add("selected");
    }
  });
};
export {
  createProjectEL,
  currentProj,
  currentProjDom,
  projects,
  displayProject,
  renderProjectSelected,
  saveToLocalStorage,
  clearProjectSelect,
};
