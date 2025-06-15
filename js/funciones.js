/*
  Autores: Octavio Sosa (363131) - Alan Klein(358518)
*/

window.addEventListener("load", inicio);

let sistema = new Sistema();

function inicio() {

    document.getElementById("datos").addEventListener("click", mostrar);
    document.getElementById("estadisticas").addEventListener("click", mostrar);


    document.getElementById("sectionEstadisticas").style.display = "none";
    document.getElementById("sectionDatos").style.display = "block";

    document.getElementById("btnAgregarC").addEventListener("click", agregarCarrera);
}

function mostrar(e) {

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

        }
    }

}