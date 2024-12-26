import { currentProj } from "./createProject";

const addTaskEL = () => {
  const dialog = document.querySelector("#taskDialog");
  const form = document.querySelector("form");

  const addTask = document.querySelector("#addTask");
  addTask.addEventListener("click", () => {
    dialog.showModal();
    console.log(currentProj.task);
  });

  const closeTask = document.querySelector("#closeBtn");
  closeTask.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    dialog.close();
  });

  const submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    dialog.close();
  });
};

export { addTaskEL };
