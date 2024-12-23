import "./styles.css";

const addTask = document.querySelector("#addTask");
const dialog = document.querySelector("#taskDialog");
addTask.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
