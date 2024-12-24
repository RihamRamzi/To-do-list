import pImg from "./svg/menu.svg";

const addProjectDiv = document.querySelector(".addP");
const projectNameInput = document.querySelector("#projectName");

// EventListeners
const createProjectEL = () => {
  const addProject = document.querySelector("#addProject");
  addProject.addEventListener("click", showProjectCreation);

  const close = document.querySelector("#close");
  close.addEventListener("click", closeProjectCreation);

  const add = document.querySelector("#add");
  add.addEventListener("click", addProjectCreation);
};

const showProjectCreation = () => {
  addProjectDiv.style.display = "flex";
  projectNameInput.focus();
};

const closeProjectCreation = () => {
  addProjectDiv.style.display = "none";
  projectNameInput.value = "";
};

const addProjectCreation = () => {
  const projects = document.querySelector(".projects");

  const project = document.createElement("div");
  project.className = "options project";
  const img = document.createElement("img");
  img.src = pImg;
  project.appendChild(img);
  const para = document.createElement("p");
  para.textContent = projectName.value;
  project.appendChild(para);

  projectName.value = "";
  addProjectDiv.style.display = "none";

  projects.appendChild(project);
};

export { createProjectEL };
