import pImg from "./svg/menu.svg";

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

// an array which contains the projects created by the user
let projects = [];

// an id to track the project and access it
let id = 0;

// creates the project and adds it to the array
const addProjectCreation = () => {
  const name = projectNameInput.value;
  const project = new Project(id, name);
  id++;
  projects.push(project);
  projectsDOM.textContent = "";
  displayProject();
};

// display the created projects on the DOM
const displayProject = () => {
  projects.forEach((proj) => {
    const project = document.createElement("div");
    project.className = "options project";

    const img = document.createElement("img");
    img.src = pImg;
    project.appendChild(img);

    const para = document.createElement("p");
    para.textContent = proj.name;
    project.appendChild(para);

    projectName.value = "";
    addProjectDiv.style.display = "none";
    project.setAttribute("data-id", proj.id);
    projectsDOM.appendChild(project);
  });
};

export { createProjectEL };
