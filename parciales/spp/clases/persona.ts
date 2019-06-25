/// <reference path="./humano.ts" />

namespace Clases {
    export class Persona extends Humano {
        private email: string;
        get Email(): string{
            return this.email;
        }
        set Email(newEmail: string) {
            this.email = newEmail;
        }
        constructor(nombre: string, apellido: string, genero: string, edad: number, email: string) {
            super(nombre, apellido, genero, edad);
            this.email = email;
        }
    }
}