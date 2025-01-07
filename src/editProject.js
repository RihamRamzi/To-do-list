import {
  currentProj,
  currentProjDom,
  projects,
  displayProject,
  renderProjectSelected,
  saveToLocalStorage,
} from "./createProject";

// commonly used DOMelements
const editProject = document.querySelector(".editProj");
const renameProj = document.querySelector(".renameProj");
const renameProjInput = document.querySelector("#renameProjInput");

const editProjEL = () => {
  const projRename = document.querySelector("#projRename");
  projRename.addEventListener("click", renameProjMenu);

  const projDelete = document.querySelector("#projDelete");
  projDelete.addEventListener("click", deleteProj);

  const renameProjBTN = document.querySelector("#renameProj");
  renameProjBTN.addEventListener("click", renameProjBtn);

  const cancelRenameBTN = document.querySelector("#cancelRename");
  cancelRenameBTN.addEventListener("click", cancelRenameProjBtn);
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

const renameProjMenu = () => {
  currentProjDom.style.display = "none";
  renameProj.style.display = "block";
  // selected proj name
  renameProjInput.value = currentProj.name;

  currentProjDom.parentNode.insertBefore(renameProj, currentProjDom);
  renameProjInput.focus();
  renameProjInput.select();
};

const deleteProj = () => {
  const index = projects.indexOf(currentProj);

  if (index !== -1) {
    document.body.appendChild(editProject);
    projects.splice(index, 1);
  }
  saveToLocalStorage();
  displayProject();
};

const renameProjBtn = () => {
  const selectedProject = document.querySelector(".selectedProject");
  currentProj.name = renameProjInput.value;
  selectedProject.textContent = currentProj.name;
  renameProj.style.display = "none";
  document.body.appendChild(renameProj);
  saveToLocalStorage();
  displayProject();
  renderProjectSelected();
};
const cancelRenameProjBtn = () => {
  renameProj.style.display = "none";
  document.body.appendChild(renameProj);
  displayProject();
  renderProjectSelected();
};

export { editProjMenu, editProjEL };
