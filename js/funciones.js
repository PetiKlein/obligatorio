/*
  Autores: Octavio Sosa (363131) - Alan Klein(358518)
*/

window.addEventListener("load", inicio);

let sistema = new Sistema();

function inicio() {

    document.getElementById("datos").addEventListener("click", mostrarSeccion);
    document.getElementById("estadisticas").addEventListener("click", mostrarSeccion);


    document.getElementById("sectionEstadisticas").style.display = "none";
    document.getElementById("sectionDatos").style.display = "block";

    document.getElementById("btnAgregarC").addEventListener("click", agregarCarrera);
    document.getElementById("btnAgregarP").addEventListener("click", agregarPatrocinador);
    document.getElementById("btnAgregarCorr").addEventListener("click", agregarCorredor);
    document.getElementById("btnInscribir").addEventListener("click", agregarInscripcion);

}

function mostrarSeccion(e) {

    if (e.target.id === "datos") {

        document.getElementById("sectionEstadisticas").style.display = "none";
        document.getElementById("sectionDatos").style.display = "block";

        document.getElementById("estadisticas").classList.remove("botonSeleccionado");
        document.getElementById("estadisticas").classList.add("ver");


        document.getElementById("datos").classList.remove("ver");
        document.getElementById("datos").classList.add("botonSeleccionado");

    } else {

        document.getElementById("sectionDatos").style.display = "none";
        document.getElementById("sectionEstadisticas").style.display = "block";

        document.getElementById("datos").classList.remove("botonSeleccionado");
        document.getElementById("datos").classList.add("ver");


        document.getElementById("estadisticas").classList.remove("ver");
        document.getElementById("estadisticas").classList.add("botonSeleccionado");

    }

}

function agregarCarrera() {

    if (document.getElementById("formCarreras").reportValidity()) {

        let nombre = document.getElementById("nomTxt").value;
        let depto = document.getElementById("selectDep").value;
        let fecha = document.getElementById("FechaCarr").value;
        let cupo = parseInt(document.getElementById("CupoCarr").value);

        if (sistema.carreraExiste(nombre)) {
            alert("Esta carrera ya existe, pongale otro nombre");
        }
        else {
            let carr = new Carrera(nombre, depto, fecha, cupo);
            sistema.agregarCarrera(carr);
            document.getElementById("formCarreras").reset();

            mostrarSelect();
            datosInsc();
        }
    }

}

function mostrarSelect() {

    let select = document.getElementById("carreraSelect");
    select.innerHTML = "";
    let carr = sistema.mostrarCarreras();

    for (let i = 0; i < carr.length; i++) {
        let nodo = document.createElement("option");
        nodo.innerHTML = carr[i].nombre;
        select.appendChild(nodo);
    }
}

function datosInsc() {

    let selectCorr = document.getElementById("nomCorredores");
    let selectCarr = document.getElementById("nomCarreras");

    selectCorr.innerHTML = "";
    selectCarr.innerHTML = "";

    let corr = sistema.mostrarCorredores();
    let carr = sistema.mostrarCarreras();

    corr.sort((a, b) => a.nombre.localeCompare(b.nombre));
    carr.sort((a, b) => a.nombre.localeCompare(b.nombre));


    for (let i = 0; i < corr.length; i++) {
        let nodo = document.createElement("option");
        nodo.innerHTML = corr[i].nombre + " -- " + corr[i].cedula;
        selectCorr.appendChild(nodo);

    }

    for (let x = 0; x < carr.length; x++) {
        let nodo = document.createElement("option");
        nodo.innerHTML = carr[x].nombre;
        selectCarr.appendChild(nodo);
    }

}

function agregarPatrocinador() {

    if (document.getElementById("formPatrocinadores").reportValidity()) {

        let nombre = document.getElementById("nomPat").value;
        let rubro = document.getElementById("rubPat").value;

        let patr = new Patrocinador(nombre, rubro);

        if (sistema.patrocinadorExiste(patr)) {

            alert("Patrocinador actualizado");

        } else {

            sistema.agregarPatrocinador(patr);

        }


        document.getElementById("formPatrocinadores").reset();
        mostrarSelect();
    }

}

function agregarCorredor() {

    if (document.getElementById("formCorredores").reportValidity()) {

        let nombre = document.getElementById("compNom").value;
        let edad = document.getElementById("compEdad").value;
        let ci = document.getElementById("compCed").value;
        let fechaVenc = document.getElementById("fechaVenComp").value;

        let tipoSeleccionado = document.querySelector('input[name="radioDeportista"]:checked');
        let tipoDepor = tipoSeleccionado ? tipoSeleccionado.value : "Comun";

        let corr = new Corredor(nombre, edad, ci, fechaVenc, tipoDepor);


        if (sistema.cedulaCorredorExiste(corr)) {

            alert("La cedula de este corredor ya registrada, ingrese otra.");

        } else {

            sistema.agregarCorredor(corr);
            datosInsc();

        }


        document.getElementById("formCorredores").reset();

    }

}

function agregarInscripcion() {

    let corredor = document.getElementById("nomCorredores").value;
    let carrera = document.getElementById("nomCarreras").value;


    let insc = new Inscripcion(corredor, carrera);
    sistema.agregarInscripcion(insc);



}