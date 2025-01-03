import { currentTask } from "./addTask";
import { projects } from "./createProject";

const deleteTask = (event) => {
  const deleteBtn = event.target.matches(".editTaskSvg");

  if (!deleteBtn) {
    return;
  }
  const index = projects.task.indexOf(currentTask);
  console.log(index);

  // if (index !== -1) {

  // }
};

export {};
// const deleteProj = () => {
//   const index = projects.indexOf(currentProj);

//   if (index !== -1) {
//     document.body.appendChild(editProject);
//     projects.splice(index, 1);
//   }
//   displayProject();
// };
