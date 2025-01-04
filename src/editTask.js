import { currentTask, displayTaskDom } from "./addTask";
import { currentProj, saveToLocalStorage } from "./createProject";

const deleteTask = (event) => {
  const deleteBtn = event.target.matches(".deleteTaskSvg");

  if (!deleteBtn) {
    return;
  }
  const index = currentProj.task.indexOf(currentTask);
  if (index !== -1) {
    currentProj.task.splice(index, 1);
  }
  saveToLocalStorage();
  displayTaskDom();
};

export { deleteTask };
