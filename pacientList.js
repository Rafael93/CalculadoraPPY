//const fields = document.querySelectorAll("td");
const storage = Object.entries(localStorage);
const tableBody = document.querySelector("#field");
const container = document.querySelector(".container");
const content = document.querySelector(".content");

imprimirDatos();

function imprimirDatos() {
  container.style.height = "90vh";
  container.style.width = "85%";
  content.style.display = "Grid";
  content.style.justifyContent = "center";
  storage.forEach(([key, value]) => {
    const row = tableBody.insertRow();
    const pacient = JSON.parse(value);
    for (let field in pacient) {
      const valueCell = row.insertCell();
      valueCell.innerHTML = pacient[field];
    }
  });
}
