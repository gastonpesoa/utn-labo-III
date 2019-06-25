namespace Clases {
    export class Humano {
        protected nombre: string;
        protected apellido: string;
        protected genero: string;
        protected edad: number;

        constructor(nombre: string, apellido: string, genero: string, edad: number) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.genero = genero;
            this.edad = edad;
        }
    }
}