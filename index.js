const weightInput = document.getElementById("weight-input");
const calculate = document.getElementById("calculate-button");
const resultContainer = document.getElementById("resultContainer");

//El algoritmo debe funcionar de tal manera que al darle click
//en el boton de calcular los resultados son mostrardos en la pantalla
//El disparador se ejecutara a hacer click y llama a las funciones
//que calculan la HB segun el peso del paciente

calculate.addEventListener("click", function (event) {
  event.preventDefault(); //se previene el comportamiento default
  hideResult();
  const weight = weightInput.value;
  let dailyVolume = 0;
  //condicion que comprueba el peso del paciente
  if (weight > 30) {
    dailyVolume = bodySurfaceMethod(weight);
    maintenanceVolume1 = maintenance(dailyVolume[0]);
    maintenanceVolume2 = maintenance(dailyVolume[1]);
    maintenancePlusHalf1 = mPlusHalfm(maintenanceVolume1);
    maintenancePlusHalf2 = mPlusHalfm(maintenanceVolume2);

    printResultsBSM(
      dailyVolume,
      maintenanceVolume1,
      maintenanceVolume2,
      maintenancePlusHalf1,
      maintenancePlusHalf2
    );
  } else if (weight > 0 && weight <= 30) {
    dailyVolume = hollidaySegarMethod(weight);
    maintenanceVolume = maintenance(dailyVolume);
    maintenancePlusHalf = mPlusHalfm(maintenanceVolume);

    printResultsHSM(dailyVolume, maintenanceVolume, maintenancePlusHalf);
  } else {
    window.alert("El peso debe ser mayor que 0");
  }
});

//funcion que toma el peso y asumimos que puede llegar solo hasta 30
//por eso empezamos por el peso mas alto posible y reduciendo de a 10
//el valor del peso del paciente y luego cargando las dosis necesarias
// segun el peso sustraido en la variable hasta que el peso en la funcion llegue a 0
function hollidaySegarMethod(weight) {
  const cantCC = {
    firstKg: "100",
    secondKg: "50",
    lastKg: "20",
  }; //
  const multiple = 10; //la variable multiple es 10 por que cada 10 kg hay variacion en la cantidad de la dosis a ser suministrada
  const dosis = weight / multiple;
  let volumen = 0; //es el resultado final en cc
  if (dosis < 1) {
    volumen = (dosis % 1) * multiple * cantCC.firstKg;
  } else if (dosis >= 1 && dosis <= 2) {
    volumen = Math.floor(dosis) * multiple * cantCC.firstKg;
    dosis > 1
      ? (volumen = volumen + (dosis % 1) * multiple * cantCC.secondKg)
      : null;
  } else if (dosis > 2) {
    let tenKg = multiple * cantCC.firstKg;
    let twentyKg = multiple * cantCC.secondKg;
    volumen = tenKg + twentyKg;
    dosis > 1
      ? (volumen = volumen + (dosis % 1) * multiple * cantCC.lastKg)
      : null;
  }

  return volumen;
}

//
function maintenance(dosis) {
  return dosis / 24;
}

function mPlusHalfm(maintenance) {
  return maintenance * 1.5;
}

function bodySurfaceMethod(weight) {
  const bodySurface = (weight * 4 + 7) / (weight + 90);
  const multipleforFirstConst = bodySurface * 1500;
  const multipleforSecondConst = bodySurface * 2000;
  return [multipleforFirstConst, multipleforSecondConst];
}

function printResultsBSM(
  dailyVolume,
  maintenanceVolume1,
  maintenanceVolume2,
  maintenancePlusHalf1,
  maintenancePlusHalf1
) {
  let container = document.querySelector(".container");
  container.style.height = "90vh";
  //creamos dos elementos en el dom para insertar el volumen diario
  const dailyVolumenResult1 = document.createElement("div");
  const dailyVolumenResult2 = document.createElement("div");
  //Agregando esta clase al div vamos a poder formatear su estilo
  dailyVolumenResult1.classList.add("results");
  dailyVolumenResult2.classList.add("results");
  //insertar el texto en el html
  dailyVolumenResult1.innerHTML =
    "El volumen diario con constante 1500 debe ser " +
    dailyVolume[0].toFixed(2) +
    "cc";

  resultContainer.appendChild(dailyVolumenResult1);

  dailyVolumenResult2.innerHTML =
    "El volumen diario con constante 2000 debe ser " +
    dailyVolume[1].toFixed(2) +
    "cc";

  resultContainer.appendChild(dailyVolumenResult2);

  //creamos elementos para mostrar el mantenimiento
  const maintenanceResult1 = document.createElement("div");
  maintenanceResult1.classList.add("results");

  maintenanceResult1.innerHTML =
    "El mantenimiento con constante 1500, en cc es " +
    maintenanceVolume1.toFixed(2) +
    "cc";
  resultContainer.appendChild(maintenanceResult1);

  const maintenanceResult2 = document.createElement("div");
  maintenanceResult2.classList.add("results");

  maintenanceResult2.innerHTML =
    "El mantenimiento con constante 2000, en cc es " +
    maintenanceVolume2.toFixed(2) +
    "cc";
  resultContainer.appendChild(maintenanceResult2);

  //creamos elementos para mostrar el resultado del mantenimiento mas medio mantenimiento
  const mplushmResult1 = document.createElement("div");
  mplushmResult1.classList.add("results");

  mplushmResult1.innerHTML =
    "El mantenimiento mas medio mantenimiento con constante 1500, en cc es " +
    maintenancePlusHalf1.toFixed(2) +
    "cc";
  resultContainer.appendChild(mplushmResult1);

  const mplushmResult2 = document.createElement("div");
  mplushmResult2.classList.add("results");

  mplushmResult2.innerHTML =
    "El mantenimiento mas medio mantenimiento con constante 2000, en cc es " +
    maintenancePlusHalf2.toFixed(2) +
    "cc";
  resultContainer.appendChild(mplushmResult2);
}

function printResultsHSM(dailyVolume, maintenanceVolume, maintenancePlusHalf) {
  const container = document.querySelector(".container");
  container.style.height = "80vh";

  const dailyVolumenContainer = document.createElement("div");
  dailyVolumenContainer.classList.add("results");

  const dailyVolumeResult = document.createElement("span");
  dailyVolumeResult.classList.add("results");

  dailyVolumenContainer.innerHTML = "El volumen diario debe ser ";
  dailyVolumeResult.innerHTML = dailyVolume + "cc";

  resultContainer.appendChild(dailyVolumenContainer);
  resultContainer.appendChild(dailyVolumeResult);

  //creamos un elemento en el dom para insertar el mantenimiento
  const maintenanceContainer = document.createElement("div");
  maintenanceContainer.classList.add("results");

  const maintenanceResult = document.createElement("span");
  maintenanceResult.classList.add("results");

  maintenanceContainer.innerHTML = "El mantenimiento debe ser ";
  maintenanceResult.innerHTML = maintenanceVolume.toFixed(2) + "cc";

  resultContainer.appendChild(maintenanceContainer);
  resultContainer.appendChild(maintenanceResult);

  //creamos un elemento en el dom para instar el m+m/2
  const maintenancePlusHalfContainer = document.createElement("div");
  maintenancePlusHalfContainer.classList.add("results");

  const maintenancePlusHalfResult = document.createElement("span");
  maintenancePlusHalfResult.classList.add("results");

  maintenancePlusHalfContainer.innerHTML = "El mantenimiento debe ser ";
  maintenancePlusHalfResult.innerHTML = maintenancePlusHalf.toFixed(2) + "cc";

  resultContainer.appendChild(maintenancePlusHalfContainer);
  resultContainer.appendChild(maintenancePlusHalfResult);
}

function hideResult() {
  let results = document.querySelectorAll(".results");
  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      results[i].remove();
    }
  }
}
