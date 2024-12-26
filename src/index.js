import "./styles.css";
import { createProjectEL } from "./createProject";
import { addTaskEL } from "./addTask";

const dialog = document.querySelector("#taskDialog");

// input
const task = document.querySelector("#task");
const description = document.querySelector("#des");
const date = document.querySelector("#date");

//Options
const addProject = document.querySelector("#addProject");

createProjectEL();
addTaskEL();
