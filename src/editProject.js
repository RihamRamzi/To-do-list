//const editProjEL = () => {};

const editProjMenu = (event) => {
  const clickedElement = event.target.closest("#editProj");
  const editProject = document.querySelector(".editProj");

  if (clickedElement) {
    const selectedProject = document.querySelector(".selected");

    // Find the target div inside the selected project
    const editProjectDiv = selectedProject.querySelector(".editProjDiv");

    // Append the edit project div to the target div
    editProject.style.display = "flex";

    editProjectDiv.appendChild(editProject);
  } else if (!clickedElement) {
    editProject.style.display = "none";
    document.body.appendChild(editProject);
  }
  // Find the currently selected project
};

export { editProjMenu };
