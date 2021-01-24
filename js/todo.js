const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finList = document.querySelector(".js-finList");

const TODOS_LS = "toDos";
const FINISHED_LS = "finish";

let toDos = [],
  finish = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function checkToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
  const text = li.querySelector("span").innerText;
  paintFinish(text);
  saveFinish();
}

function deletefinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const cleanFinish = toDos.filter(function (fin) {
    return fin.id !== parseInt(li.id);
  });
  finish = cleanFinish;
  saveFinish();
}

function reCheckToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finList.removeChild(li);
  const cleanFinish = toDos.filter(function (fin) {
    return fin.id !== parseInt(li.id);
  });
  finish = cleanFinish;
  saveFinish();
  const text = li.querySelector("span").innerText;
  paintToDo(text);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinish() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finish));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chekBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  chekBtn.innerHTML = "✅";
  chekBtn.addEventListener("click", checkToDo);
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chekBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const reChekBtn = document.createElement("button");
  const span = document.createElement("span");
  const finId = finish.length + 1;
  reChekBtn.innerHTML = "⏪";
  reChekBtn.addEventListener("click", reCheckToDo);
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deletefinish);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(reChekBtn);
  li.id = finId;
  finList.appendChild(li);
  const finishObj = {
    text: text,
    id: finId
  };
  finish.push(finishObj);
  saveFinish();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinish() {
  const loadedFinish = localStorage.getItem(FINISHED_LS);
  if (loadedFinish !== null) {
    const parsedFinish = JSON.parse(loadedFinish);
    parsedFinish.forEach(function (fin) {
      paintFinish(fin.text);
    });
  }
}

function init() {
  loadFinish();
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
