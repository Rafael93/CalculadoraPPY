const container = document.querySelector(".container");
const content = document.querySelector(".content");
container.classList.add("form");
content.classList.add("form");
const registerButton = document.querySelector("#submit");
registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  const pacientData = JSON.stringify(obtainUserData());
  const key = saveData(pacientData);
  const pacient = localStorage.getItem(key);
  console.log(JSON.parse(pacient));
  registerButton.innerHTML = "Registrado!";
  setTimeout(() => (window.location.href = "pacientList.html"), 2000);
});

function obtainUserData() {
  const name = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const ci = document.querySelector("#ci").value;
  const age = document.querySelector("#age").value;
  const city = document.querySelector("#city").value;
  const dpto = document.querySelector("#department-select").value;
  const dosis = document.querySelector("#dosis").value;
  const pacient = createObjet(name, lastName, ci, age, city, dpto, dosis);
  return pacient;
}

function createObjet(name, lastName, ci, age, city, dpto, dosis) {
  let pacient = {
    nombre: name,
    apellido: lastName,
    ci: ci,
    edad: age,
    ciudad: city,
    departamento: dpto,
    dosis: dosis,
  };
  return pacient;
}

function saveData(pacientData) {
  let ultimoNumero = parseInt(localStorage.getItem("ultimoNumero") || "0");
  let nuevoNumero = ultimoNumero + 1;
  var clave = "Paciente_" + nuevoNumero;
  localStorage.setItem(clave, pacientData);
  localStorage.setItem("ultimoNumero", nuevoNumero.toString());
  return clave;
}
