import { currentProj } from "./createProject";

const dialog = document.querySelector("#taskDialog");
const form = document.querySelector("form");

const addTaskEL = () => {
  const addTaskBtn = document.querySelector("#addTask");
  addTaskBtn.addEventListener("click", addTask);

  const closeTaskBtn = document.querySelector("#closeBtn");
  closeTaskBtn.addEventListener("click", closeTask);

  const submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", createTask);
};

class Task {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }
  markAsComplete() {
    this.isComplete = true;
  }
  markAsNotComplete() {
    this.isComplete = false;
  }
}

const closeTask = (event) => {
  event.preventDefault();
  form.reset();
  dialog.close();
};

const addTask = () => {
  dialog.showModal();
};

// track current task
let currentTask = null;
//id to track task
let taskId = 0;

const createTask = (event) => {
  event.preventDefault();
  const taskInput = document.querySelector("#task");
  const taskDescription = document.querySelector("#des");
  const taskDate = document.querySelector("#date");
  const priority = document.querySelector("#priority");

  const task = new Task(
    taskId,
    taskInput.value,
    taskDescription.value,
    taskDate.value,
    priority.value
  );
  currentProj.task.push(task);
  taskId++;
  displayTaskDom();
};

const displayTaskDom = () => {
  currentProj.task.forEach((task) => {
    console.log(task);
  });
};

export { addTaskEL };
