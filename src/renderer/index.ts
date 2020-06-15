import './main.scss';

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("root");
  if (element === null) {
    throw Error("#root is missing");
  }
  element.innerHTML = 'Hello World;'
})
