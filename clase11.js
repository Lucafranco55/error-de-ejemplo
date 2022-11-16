const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const botonIngresar = document.getElementById("ingresar");
const divInicial = document.getElementById("divIncial");
const divSaludar = document.getElementById("divSaludar");
const divInv = document.getElementById("divInv");
const divResultado = document.getElementById("divResultado");

//arreglo d riesgos
const riesgos = [
  {
    tipo: "Bajo",
    tasa: 0.5,
  },
  {
    tipo: "Medio",
    tasa: 0.8,
  },
  {
    tipo: "Alto",
    tasa: 1.5,
  },
];

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.rendimiento = Math.ceil(Math.random() * 20);
  }
}

const bancos = [];
bancos.push(new Banco("Banco Provincia"));
bancos.push(new Banco("Banco Santander Rio"));
bancos.push(new Banco("Banco Nacion"));
bancos.push(new Banco("Banco Galicia"));

botonIngresar.onclick = () => {
  if (inputNombre.value || inputApellido.value) {
    const usuario = {
      nombre: inputNombre.value,
      apellido: inputApellido.value,
    };
    //inputNombre.value = '';
    //inputApellido.value = '';
    localStorage.setItem("infoUsuario", JSON.stringify(usuario));

    //eliminando un elemnto h2 al DOM
    divInicial.remove();

    //agregando mas elemntos al DOM - inv
    const saludarTitulo = document.createElement("h2");
    saludarTitulo.innerText = `Bienvenido ${usuario.nombre} ${usuario.apellido}, estas listo para inventir?`;
    divSaludar.append(saludarTitulo);

    //agregando mas elemntos al DOM
    crearInvensionDiv();

    const botonCalcular = document.getElementById("botonCalcular");
    botonCalcular.onclick = () => {
      const montoAInvertir = document.getElementById("inputMonto").value;
      const riesgoEscogido = document.getElementById("selectRiesgo").value;
      console.log(montoAInvertir, riesgoEscogido);
      const tasaRiesgoEscogido = riesgos.find(
        (riesgo) => riesgo.tipo === riesgoEscogido
      ).tasa;
      console.log(tasaRiesgoEscogido);

      bancos.forEach((banco) => {
        const rendimientoConRiesgo = banco.rendimiento * tasaRiesgoEscogido;
        const utilidad = montoAInvertir * rendimientoConRiesgo;
        const parrafoBanco = document.createElement("p");
        parrafoBanco.innerText = `El banco ${banco.nombre} te ofrece un rendimiento anual de ${rendimientoConRiesgo}% lo que generaria unas utilidades de ${utilidad}`;
        divResultado.append(parrafoBanco);
      });
    };
  }
};

function crearInvensionDiv() {
  // crear elemento input a monto a inventir
  const inputMonto = document.createElement("input");
  inputMonto.setAttribute("type", "number");
  inputMonto.setAttribute("id", "inputMonto");
  //divInv.append(inputMonto);

  //crear elemento parrafo
  const parrafo = document.createElement("p");
  parrafo.innerText =
    "Coloca el monto a inventir y el tipo de riesgo que quieres asumir";

  // creat select con riesgos
  const select = document.createElement("select");
  select.setAttribute("id", "botonCalcular");
  riesgos.forEach((riesgo) => {
    const optionRiesgo = document.createElement("opticon");
    optionRiesgo.innerText = `${riesgo.tipo}`;
    select.append(optionRiesgo);
  });
  const botonCalcular = document.createElement("button");
  botonCalcular.setAttribute("id", "botonCalcular");
  botonCalcular.innerText = "Calcular";

  divInv.append(parrafo, inputMonto, select, botonCalcular);
}
