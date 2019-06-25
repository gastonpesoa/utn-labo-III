/// <reference path="./humano.ts" />
var Clases;
(function (Clases) {
    var Humano = /** @class */ (function () {
        function Humano(nombre, apellido, genero, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.genero = genero;
            this.edad = edad;
        }
        return Humano;
    }());
    Clases.Humano = Humano;
})(Clases || (Clases = {}));
