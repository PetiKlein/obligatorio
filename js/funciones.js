/*
  Autores: Octavio Sosa (363131) - Alan Klein(358518)
*/

window.addEventListener("load", inicio);

let sistema = new Sistema();

function inicio() {

    document.getElementById("datos").addEventListener("click", mostrarSeccion);
    document.getElementById("estadisticas").addEventListener("click", mostrarSeccion);
    document.getElementById("btnAgregarC").addEventListener("click", agregarCarrera);
    document.getElementById("btnAgregarP").addEventListener("click", agregarPatrocinador);
    document.getElementById("btnAgregarCorr").addEventListener("click", agregarCorredor);
    document.getElementById("btnInscribir").addEventListener("click", agregarInscripcion);


    document.getElementById("sectionEstadisticas").style.display = "none";
    document.getElementById("sectionDatos").style.display = "block";
}

function mostrarSeccion(event) {

    if (event.target.id === "datos") {

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

function agregarCarrera(event) {

    event.preventDefault();

    if (document.getElementById("formCarreras").reportValidity()) {

        let nombre = document.getElementById("nomTxt").value;
        let depto = document.getElementById("selectDep").options[document.getElementById("selectDep").selectedIndex].text;

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

// Muestra los corredores y carreras en la seccion inscripciones en los select con inner.HTML

function datosInsc() {

    let selectCorr = document.getElementById("nomCorredores");
    let selectCarr = document.getElementById("nomCarreras");

    selectCorr.innerHTML = "";
    selectCarr.innerHTML = "";

    let corr = sistema.ordenarCorrXNom();
    let carr = sistema.ordenarCarrXNom();

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

function agregarPatrocinador(event) {

    event.preventDefault();

    if (document.getElementById("formPatrocinadores").reportValidity()) {

        let nombre = document.getElementById("nomPat").value;
        let rubro = document.getElementById("rubPat").options[document.getElementById("rubPat").selectedIndex].text;
        let carrerasSelect = document.getElementById("carreraSelect");

        let carreras = [];

        for (let opciones of carrerasSelect.selectedOptions) {

            carreras.push(opciones.value);

        }

        let patr = new Patrocinador(nombre, rubro, carreras);

        if (sistema.patrocinadorExiste(patr)) {

            alert("Patrocinador actualizado");

        } else {

            sistema.agregarPatrocinador(patr);
            
            alert("Patrocinador agregado exitosamente.");

        }


        document.getElementById("formPatrocinadores").reset();
        mostrarSelect();
    }

}

function agregarCorredor(event) {

    event.preventDefault();

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

function agregarInscripcion(event) {

    event.preventDefault();

    let nombreCorredor = document.getElementById("nomCorredores").value;
    let nombreCarrera = document.getElementById("nomCarreras").value;

    //  .find() busca un elemento en el array que cumpla la condicion de que sea exactamente igual la variable de arriba nombreCorredor

    let corredor = sistema.corredores.find(co => `${co.nombre} -- ${co.cedula}` === nombreCorredor);
    let carrera = sistema.carreras.find(ca => ca.nombre === nombreCarrera);


    let patrocinadores = "";

    let existe = false;

    for (let i = 0; i < sistema.patrocinadores.length; i++) {

        let p = sistema.patrocinadores[i];


        if (p.carreras.includes(nombreCarrera)) {
            patrocinadores += `${p.nombre} \n Rubro: ${p.rubro}\n \n`;
            existe = true;
        }

    }

    if (!existe) {

        patrocinadores = "No hay patrocinadores";
    }


    let fechaCarrera = new Date(carrera.fecha);
    let fechaVencimiento = new Date(corredor.fechVenc);


    if (fechaVencimiento < fechaCarrera) {

        alert(`No se puede inscribir ya que su fecha de vencimiento esta o estara vencida para la fecha `);

        return;
    }

    if (carrera.cupo <= 0) {

        alert("Ya no quedan cupos para inscribirse en la carrera.");

        return;

    }


    let insc = new Inscripcion(nombreCorredor, nombreCarrera);
    sistema.agregarInscripcion(insc);
    carrera.cupo -= 1;

    alert(`Inscripción realizada correctamente.\n\nCorredor: ${corredor.nombre}\nCedula: ${corredor.cedula}\nEdad: ${corredor.edad}\nTipo de corredor: ${corredor.tipoDepor}\nNumero de inscripcion: ${carrera.cupo + 1}  \n\nCarrera: ${carrera.nombre} \nDepartamento: ${carrera.departamento} \nFecha: ${carrera.fecha} \n\nPatrocinadores: ${patrocinadores}`);

}
