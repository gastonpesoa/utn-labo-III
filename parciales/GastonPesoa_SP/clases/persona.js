/// <reference path="./humano.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Clases;
(function (Clases) {
    var Persona = /** @class */ (function (_super) {
        __extends(Persona, _super);
        function Persona(nombre, apellido, genero, edad, email) {
            var _this = _super.call(this, nombre, apellido, genero, edad) || this;
            _this.email = email;
            return _this;
        }
        return Persona;
    }(Clases.Humano));
    Clases.Persona = Persona;
})(Clases || (Clases = {}));
