// Obtener elementos del DOM con "getElementById"
const cambio = document.getElementById("theme-toggle");
const Input = document.getElementById("Input");
const addBtn = document.getElementById("addTask");
const tasksList = document.getElementById("tasks");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Agregar un addEvenlistener para el evento "click" al botón "Agregar"
addBtn.addEventListener("click", addTask);

// Agregar un addEventlistener para el evento "click" en la lista de tareas
tasksList.addEventListener("click", handleTaskClick);

// Agregar un addEventlistener para el evento "change" al interruptor de tema
cambio.addEventListener("change", toggleTheme);

// Función para agregar una nueva tarea
function addTask() {
  // Obtener el texto de la tarea ingresado
  const taskText = Input.value.trim();
  // Verificar si el texto no está vacío
  if (taskText !== "") {
    // Crear un nuevo elemento de lista
    const taskItem = document.createElement("li");
    // Obtener la hora y fecha actual
    const currentTime = new Date().toLocaleString();
    // Crear el contenido HTML del elemento de lista
    taskItem.innerHTML = `
            <span>${taskText} - ${currentTime}</span>
            <button class="btn-complete">✓</button>
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">x</button>
        `;
    // Agregar el elemento de lista a la lista de tareas
    tasksList.appendChild(taskItem);

    // Limpiar el campo de entrada
    Input.value = "";
    // Actualizar el estado de las tareas
    updateStatus();
  }
}

// Función para manejar los eventos de clic en una tarea
function handleTaskClick(e) {
  const target = e.target;
  if (target.classList.contains("btn-complete")) {
    target.parentElement.classList.toggle("completed");
    updateStatus();
  } else if (target.classList.contains("btn-delete")) {
    tasksList.removeChild(target.parentElement);
    updateStatus();
  } else if (target.classList.contains("btn-edit")) {
    // Obtener el texto actual de la tarea
    const taskText = target.parentElement
      .querySelector("span")
      .textContent.split(" - ")[0];
    // Pedir al usuario que ingrese el nuevo texto de la tarea
    const newText = prompt("Editar tarea:", taskText);
    // Verificar si se ingresó un nuevo texto
    if (newText !== null && newText.trim() !== "") {
      // Actualizar el texto de la tarea
      target.parentElement.querySelector("span").textContent =
        newText + " - " + new Date().toLocaleString();
    }
  }
}

function updateStatus() {
  // Contar la cantidad de tareas completadas
  const completedTasks = document.querySelectorAll(".completed").length;
  // Calcular la cantidad de tareas pendientes
  const pending = tasksList.children.length - completedTasks;

  // Actualizar el contador de tareas completadas
  completedCount.textContent = completedTasks;
  // Actualizar el contador de tareas pendientes
  pendingCount.textContent = pending;
}

// Función para cambiar entre el tema claro y oscuro
function toggleTheme() {
  document.body.classList.toggle("theme-dark");
}
