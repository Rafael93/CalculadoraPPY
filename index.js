const weightInput = document.getElementById("weight-input");
const calculate = document.getElementById("calculate-button");
const container = document.getElementById("calculator");

//El algoritmo debe funcionar de tal manera que al darle click
//en el boton de calcular los resultados son mostrardos en la pantalla
//El disparador se ejecutara a hacer click y llama a las funciones
//que calculan la HB segun el peso del paciente
calculate.addEventListener("click", function (event) {
  event.preventDefault(); //se previene el comportamiento default de bootstrap
  const weight = weightInput.value;
  let dailyVolume = 0;
  //condicion que comprueba el peso del paciente
  if (weight > 30) {
    dailyVolume = bodySurfaceMethod(weight);
    maintenanceVolume1 = maintenance(dailyVolume[0]);
    maintenanceVolume2 = maintenance(dailyVolume[1]);
    maintenancePlusHalf1 = mPlusHalfm(maintenanceVolume1);
    maintenancePlusHalf2 = mPlusHalfm(maintenanceVolume2);

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
      " cc";

    container.appendChild(dailyVolumenResult1);

    dailyVolumenResult2.innerHTML =
      "El volumen diario con constante 2000 debe ser " +
      dailyVolume[1].toFixed(2) +
      " cc";

    container.appendChild(dailyVolumenResult2);

    //creamos elementos para mostrar el mantenimiento
    const maintenanceResult1 = document.createElement("div");
    maintenanceResult1.classList.add("results");

    maintenanceResult1.innerHTML =
      "El mantenimiento con constante 1500, en cc es " +
      maintenanceVolume1.toFixed(2) +
      " cc";
    container.appendChild(maintenanceResult1);

    const maintenanceResult2 = document.createElement("div");
    maintenanceResult2.classList.add("results");

    maintenanceResult2.innerHTML =
      "El mantenimiento con constante 2000, en cc es " +
      maintenanceVolume2.toFixed(2) +
      " cc";
    container.appendChild(maintenanceResult2);

    //creamos elementos para mostrar el resultado del mantenimiento mas medio mantenimiento
    const mplushmResult1 = document.createElement("div");
    mplushmResult1.classList.add("results");

    mplushmResult1.innerHTML =
      "El mantenimiento mas medio mantenimiento con constante 1500, en cc es " +
      maintenancePlusHalf1.toFixed(2) +
      " cc";
    container.appendChild(mplushmResult1);

    const mplushmResult2 = document.createElement("div");
    mplushmResult2.classList.add("results");

    mplushmResult2.innerHTML =
      "El mantenimiento mas medio mantenimiento con constante 2000, en cc es " +
      maintenancePlusHalf2.toFixed(2) +
      " cc";
    container.appendChild(mplushmResult2);
  } else if (weight > 0 && weight <= 30) {
    dailyVolume = hollidaySegarMethod(weight);
    maintenanceVolume = maintenance(dailyVolume);
    maintenancePlusHalf = mPlusHalfm(maintenanceVolume);

    //creamos un elemento en el dom para insertar el volumen diario
    const result = document.createElement("div");
    result.classList.add("results");
    result.innerHTML = "El volumen diario debe ser " + dailyVolume + " cc";
    container.appendChild(result);

    //creamos un elemento en el dom para insertar el mantenimiento
    const maintenanceResult = document.createElement("div");
    maintenanceResult.classList.add("results");
    maintenanceResult.innerHTML =
      "El mantenimiento debe ser " + maintenanceVolume.toFixed(2) + " cc";
    container.appendChild(maintenanceResult);

    //creamos un elemento en el dom para instar el m+m/2
    const maintenancePlusHalfResult = document.createElement("div");
    maintenancePlusHalfResult.classList.add("results");
    maintenancePlusHalfResult.innerHTML =
      "El mantenimiento debe ser " + maintenancePlusHalf + " cc";
    container.appendChild(maintenancePlusHalfResult);
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
    console.log(cantCC.firstKg);
    let tenKg = multiple * cantCC.firstKg;
    let twentyKg = multiple * cantCC.secondKg;
    dosis > 1;
    volumen = tenKg + twentyKg;
    dosis > 1
      ? (volumen = volumen + (dosis % 1) * multiple * cantCC.lastKg)
      : null;
  }

  /*
	if (weight > 20) {
    dosis = 10 * 100;
    dosis = dosis + 10 * 50;
    weight -= 20;
    dosis = dosis + weight * 20;
    return dosis;
  } else if (weight > 10) {
    dosis = 10 * 100;
    weight -= 10;
    dosis = dosis + weight * 50;
    return dosis;
  } else {
    dosis = weight * 100;
    return dosis;
  }
	*/
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
