import {
  currentProj,
  currentProjDom,
  projects,
  displayProject,
} from "./createProject";

const editProject = document.querySelector(".editProj");

const editProjEL = () => {
  const projRename = document.querySelector("#projRename");
  projRename.addEventListener("click", editProjName);

  const projDelete = document.querySelector("#projDelete");
  projDelete.addEventListener("click", deleteProj);
};

const editProjMenu = (event) => {
  const clickedElement = event.target.closest("#editProj");

  if (clickedElement) {
    const selectedProject = document.querySelector(".selected");

    // Find the target div inside the selected project
    const editProjectDiv = selectedProject.querySelector(".editProjDiv");

    // Append the edit project div to the target div
    editProject.style.display = "flex";

    editProjectDiv.appendChild(editProject);
  } else {
    editProject.style.display = "none";
    document.body.appendChild(editProject);
  }
};

const editProjName = () => {
  currentProjDom.style.display = "none";
};

const deleteProj = () => {
  const index = projects.indexOf(currentProj);

  if (index !== -1) {
    document.body.appendChild(editProject);
    projects.splice(index, 1);
  }
  displayProject();
};

export { editProjMenu, editProjEL };
