/* definicion de clases para el ejemplo de la agenda */

class Contacto {
    constructor(nom, ape, edad, tele){
        this.nombre = nom;
        this.apellido = ape;
        this.edad = edad;
        this.telefono = tele;
    }
    toString(){
        return this.nombre+" "+this.apellido+" ("+this.edad+")";
    }
}

class Agenda {
    constructor(){
        this.listaContactos = [];        
    }
    agregarContacto(contacto){
        this.listaContactos.push(contacto);
    }
    darContactos(){
        return this.listaContactos;
    }
    existeTelefono(tele){
        let existe = false;
        for (let i=0; i<this.listaContactos.length && !existe; i++){
            if (this.listaContactos[i].telefono == tele){
                existe = true;
            }
        }
        return existe;
    }
}