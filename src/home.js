import { projects } from "./createProject";
import editSvg from "./svg/square-edit-outline.svg";
import deleteSvg from "./svg/delete.svg";

const allTasks = (event) => {
  const clickedElement = event.target.closest("#allTasks");

  if (!clickedElement) {
    return;
  }
  displayAllTasksDom();
};

const displayAllTasksDom = () => {
  const selectedProjectDom = document.querySelector(".selectedProject");
  selectedProjectDom.textContent = `All Tasks`;
  const tasksContainer = document.querySelector(".tasksContainer");
  tasksContainer.textContent = "";
  projects.forEach((project) => {
    project.task.forEach((task) => {
      const tasksConDom = document.querySelector(".tasksContainer");

      const taskCon = document.createElement("div");
      taskCon.className = "task";
      taskCon.setAttribute("task-id", task.id);

      const checkBox = document.createElement("div");
      checkBox.className = "checkBox";

      const details = document.createElement("div");
      details.className = "details";

      const taskTitle = document.createElement("div");
      const taskDes = document.createElement("div");
      taskTitle.className = "taskTitle";
      taskTitle.textContent = task.title;

      taskDes.className = "taskDes";
      taskDes.textContent = task.description;
      details.appendChild(taskTitle);
      details.appendChild(taskDes);

      const datePriority = document.createElement("div");
      const taskDueDate = document.createElement("div");
      taskDueDate.className = "taskDueDate";
      taskDueDate.textContent = task.dueDate;
      const priority = document.createElement("div");
      priority.className = "priority";
      priority.textContent = task.priority;
      datePriority.appendChild(taskDueDate);
      datePriority.appendChild(priority);

      const editTask = document.createElement("img");
      editTask.className = "taskSvg editTaskSvg";
      editTask.src = editSvg;
      const deleteTask = document.createElement("img");
      deleteTask.className = "taskSvg deleteTaskSvg";
      deleteTask.src = deleteSvg;

      taskCon.appendChild(checkBox);
      taskCon.appendChild(details);
      taskCon.appendChild(datePriority);
      taskCon.appendChild(editTask);
      taskCon.appendChild(deleteTask);
      tasksConDom.appendChild(taskCon);
    });
  });
  const addTask = document.querySelector("#addTask");
  addTask.style.display = "none";
};

export { allTasks };
