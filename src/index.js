import "./styles.css";
import { createProjectEL } from "./createProject";

const addTask = document.querySelector("#addTask");
const dialog = document.querySelector("#taskDialog");
const closeTask = document.querySelector("#closeBtn");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("form");

// input
const task = document.querySelector("#task");
const description = document.querySelector("#des");
const date = document.querySelector("#date");

//Options
const addProject = document.querySelector("#addProject");

createProjectEL();

addTask.addEventListener("click", () => {
  dialog.showModal();
});

closeTask.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  dialog.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  dialog.close();
});
