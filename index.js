const weightInput = document.getElementById("weight-input");
const calculate = document.getElementById("calculate-button");
const container = document.querySelector(".container");
const resultContainer = document.getElementById("resultContainer");
const calculator = document.getElementById("calculator");
const content = document.querySelector(".content");

//El algoritmo debe funcionar de tal manera que al darle click
//en el boton de calcular los resultados son mostrardos en la pantalla
//El disparador se ejecutara a hacer click y llama a las funciones
//que calculan la HB segun el peso del paciente

calculate.addEventListener("click", function calcular(event) {
  event.preventDefault(); //se previene el comportamiento default
  controlButtonCalculate();
  calculate.innerHTML = "Registrar";
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
    calculate.innerHTML = "Calcular";
  }
});

//funcion que toma el peso y asumimos que puede llegar solo hasta 30
//por eso empezamos por el peso mas alto posible y reduciendo de a 10
//el valor del peso del paciente y luego cargando las dosis necesarias
// segun el peso sustraido en la variable hasta que el peso en la funcion llegue a 0
function hollidaySegarMethod(weight) {
  //variable que contiene las dosis por cada 10kg
  const cantCC = {
    firstKg: "100",
    secondKg: "50",
    lastKg: "20",
  };
  const multiple = 10; //la variable multiple es 10 por que cada 10 kg hay variacion en la cantidad de la dosis a ser suministrada
  const dosis = weight / multiple; //Al dividir el peso por 10 podemos saber cuantas decenas hay en la edad ingresada
  let volumen = 0; //es el resultado final en cc
  //Segun el resultado de la division empezamos a realizar los calculos
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
  container.classList.add("showResult");
  content.classList.add("showResult");

  //creamos dos elementos en el dom para insertar el volumen diario
  const dailyVolumeContainer1 = document.createElement("div");
  const dailyVolumenResult1 = document.createElement("div");

  const dailyVolumeContainer2 = document.createElement("div");
  const dailyVolumenResult2 = document.createElement("div");

  //Agregando esta clase al div vamos a poder formatear su estilo
  dailyVolumeContainer1.classList.add("results");
  dailyVolumenResult1.classList.add("results-Number");

  dailyVolumeContainer2.classList.add("results");
  dailyVolumenResult2.classList.add("results-Number");

  //insertar el texto en el html
  dailyVolumeContainer1.innerHTML =
    "El volumen diario con constante 1500 debe ser";
  dailyVolumenResult1.innerHTML = dailyVolume[0].toFixed(2) + "cc";

  resultContainer.appendChild(dailyVolumeContainer1);
  resultContainer.appendChild(dailyVolumenResult1);

  dailyVolumeContainer2.innerHTML =
    "El volumen diario con constante 2000 debe ser ";
  dailyVolumenResult2.innerHTML = dailyVolume[1].toFixed(2) + "cc";

  resultContainer.appendChild(dailyVolumeContainer2);
  resultContainer.appendChild(dailyVolumenResult2);
}

//Imprime los resultados a obtenidos a traves del metodo H-S
function printResultsHSM(dailyVolume, maintenanceVolume, maintenancePlusHalf) {
  container.classList.add("showResult");
  content.classList.add("showResult");

  const dailyVolumenContainer = document.createElement("div");
  dailyVolumenContainer.classList.add("results");

  const dailyVolumeResult = document.createElement("div");
  dailyVolumeResult.classList.add("results-Number");

  dailyVolumenContainer.innerHTML = "El volumen diario debe ser ";
  dailyVolumeResult.innerHTML = dailyVolume + "cc";

  resultContainer.appendChild(dailyVolumenContainer);
  resultContainer.appendChild(dailyVolumeResult);

  //creamos un elemento en el dom para insertar el mantenimiento
  const maintenanceContainer = document.createElement("div");
  maintenanceContainer.classList.add("results");

  const maintenanceResult = document.createElement("div");
  maintenanceResult.classList.add("results-Number");

  maintenanceContainer.innerHTML = "El mantenimiento debe ser ";
  maintenanceResult.innerHTML = maintenanceVolume.toFixed(2) + "cc";

  resultContainer.appendChild(maintenanceContainer);
  resultContainer.appendChild(maintenanceResult);

  //creamos un elemento en el dom para instar el m+m/2
  const maintenancePlusHalfContainer = document.createElement("div");
  maintenancePlusHalfContainer.classList.add("results");

  const maintenancePlusHalfResult = document.createElement("div");
  maintenancePlusHalfResult.classList.add("results-Number");

  maintenancePlusHalfContainer.innerHTML = "El mantenimiento debe ser ";
  maintenancePlusHalfResult.innerHTML = maintenancePlusHalf.toFixed(2) + "cc";

  resultContainer.appendChild(maintenancePlusHalfContainer);
  resultContainer.appendChild(maintenancePlusHalfResult);
}

//funcion que se utiliza para borrar los resultados de pantalla cada vez que se vuelva a apretar el boton Calcular
function hideResult() {
  let results = document.querySelectorAll(".results");
  let resultsNumber = document.querySelectorAll(".results-Number");
  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      results[i].remove();
      resultsNumber[i].remove();
    }
  }
}

//funcion que crea un boton para volver a desplegar la seccion de la informacion
function createInfoButton() {
  if (!document.querySelector(".info-button")) {
    const informationButton = document.createElement("button");
    informationButton.innerHTML = "^";
    informationButton.classList.add("info-button");
    //containerResult.appendChild(informationButton);
    informationButton.addEventListener("click", () => {
      if (informationButton.innerHTML === "^") {
        informationButton.classList.add("active");
        containerResult.style.display = "flex";
        informationButton.innerHTML = "v";
      } else {
        informationButton.classList.add("active");
        containerResult.style.display = "block";
        informationButton.innerHTML = "^";
      }
    });
  }
}

function controlButtonCalculate() {
  weightInput.addEventListener("input", () => {
    calculate.innerHTML = "Calcular";
  });
  if (calculate.innerHTML === "Registrar") {
    window.location.href = "formPage.html";
  }
}
