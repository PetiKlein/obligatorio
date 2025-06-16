window.addEventListener("load", inicio);

let agenda = new Agenda();

function inicio(){
    document.getElementById("botonAgregar").addEventListener("click", nuevoContacto);
}

function nuevoContacto(){
    if (document.getElementById("formContactos").reportValidity()){
        let nombre = document.getElementById("idNombre").value;
        let apellido = document.getElementById("idApellido").value;
        let edad = parseInt(document.getElementById("idEdad").value);
        let telefono = document.getElementById("idTelefono").value;
        if (telefono.length>0 && agenda.existeTelefono(telefono)){
            alert("El tlefono ya existe");
        }
        else {
            let con = new Contacto(nombre, apellido, edad, telefono);
            agenda.agregarContacto(con);
            document.getElementById("formContactos").reset();
            cargarLista();
        }
    }
}

function cargarLista(){
    let lista = document.getElementById("idLista");
    lista.innerHTML = "";
    let datos = agenda.darContactos();
    for (let i=0; i<datos.length; i++){
        let nodo = document.createElement("li");
        nodo.innerHTML = datos[i];
        lista.appendChild(nodo);
    }
}
