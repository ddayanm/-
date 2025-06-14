let nav = document.querySelector(".nav");
let taskInp = document.getElementById("taskInp");
let addBtn = document.getElementById("addBtn");
let done = document.getElementById("done");

readTask();

addBtn.addEventListener("click", () => {
  if (!taskInp.value.trim()) {
    alert("Заполните поле");
    return;
  }
  if (taskInp.value.length < 6) {
    taskInp.value = "";
    alert("Напишите слово выше 5");
    return;
  }
  let obj = {
    do: taskInp.value,
    id: Date.now(),
  };

  let data = JSON.parse(localStorage.getItem("done")) || [];
  data.push(obj);
  localStorage.setItem("done", JSON.stringify(data));
  taskInp.value = "";

  readTask();
});

function readTask() {
  let data = JSON.parse(localStorage.getItem("done")) || [];
  done.innerHTML = ""; //

  data.forEach((item) => {
    let doneContent = document.createElement("div");
    doneContent.classList.add("done-content");

    let ulName = document.createElement("ul");
    ulName.innerText = item.do;

    let doneCard = document.createElement("div");
    doneCard.classList.add("done-card");

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.classList.add("doneBtn");

    let btnRemove = document.createElement("button");
    btnRemove.innerText = "Remove";
    btnRemove.classList.add("btnRemove");
    doneCard.append(doneBtn, btnRemove);

    doneContent.append(ulName, doneCard);

    done.append(doneContent);
    btnRemove.addEventListener("click", () => deleteTask(item.id));
    doneBtn.addEventListener("click", () => {
      ulName.style.textDecoration = "line-through";
      ulName.style.filter = "blur(1.5px)"; // добавляем размытие
      doneBtn.style.filter = "blur(1.5px)";
    });
    let toggleDone = false;
    doneBtn.addEventListener("click", () => {
      toggleDone = !toggleDone;
      doneBtn.innerHTML = toggleDone ? "Undone" : "Done";
      ulName.style.textDecoration = toggleDone ? "line-through" : "none";
      doneBtn.style.filter = toggleDone ? "blur(1px)" : "none";

      ulName.style.filter = toggleDone ? "blur(1px)" : "none";
    });
  });
}

function deleteTask(id) {
  let data = JSON.parse(localStorage.getItem("done")) || [];
  data = data.filter((item) => item.id !== id);
  localStorage.setItem("done", JSON.stringify(data));
  readTask();
}
