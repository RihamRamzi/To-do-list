export function projectDetails() {
  const form = document.querySelector("#add");
  const projectName = document.querySelector("#projectName");

  const addProjectDiv = document.querySelector(".addP");
  addProjectDiv.style.display = "flex";

  const close = document.querySelector("#close");
  close.addEventListener("click", () => {
    addProjectDiv.style.display = "none";
    projectName.value = "";
  });

  const add = document.querySelector("#add");
  add.addEventListener("click", () => {
    const projects = document.querySelector(".projects");

    const project = document.createElement("div");
    project.textContent = projectName.value;
    project.classList.add("options");
    projectName.value = "";
    addProjectDiv.style.display = "none";

    projects.appendChild(project);
  });
}
