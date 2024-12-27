//const editProjEL = () => {};

const editProjMenu = (event) => {
  const clickedElement = event.target.closest("#editProj");
  if (clickedElement) {
    console.log(`true`);
  }
};

export { editProjMenu };
