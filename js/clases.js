/*
  Autores: Octavio Sosa (363131) - Alan Klein(358518)
*/


class Carrera {

    constructor(nom, depto, fecha, cupo) {
        this.nombre = nom;
        this.departamento = depto;
        this.fecha = fecha;
        this.cupo = cupo;
    }
    toString() {
        return this.nombre + " " + this.departamento + " (" + this.fecha + ")" + this.cupo + "";
    }
}

class Corredor {

}

class Inscripcion {

}

class Patrocinador {

    
}

class Sistema {
    constructor(){
        this.carreras = [];
        this.corredores = [];
        this.inscripciones = [];
        this.patrocinadores = []; 
    }
        agregarCarrera(carrera){
        this.carreras.push(carrera);
    }

     carreraExiste(carr){
        let existe = false;
        for (let i=0; i<this.carreras.length && !existe; i++){
            if (this.carreras[i].nombre == carr){
                existe = true;
            }
        }
        return existe;
    }
}
