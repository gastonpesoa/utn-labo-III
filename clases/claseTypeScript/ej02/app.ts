// let x = "Hola Mundo";
// x = 23;
// console.log(x);

// let y:number = "Juan";

// let y:number = 23;

// let x:number;

// let suma = x + y;

// console.log(x);

//===================================================================

// let nombre1: string = "Juan";
// let nombre2: string = "Jose";
// let nombre3: string = "Julio";

// console.log(nombre1 + ", " + nombre2 + ", " + nombre3);
// console.log(`${nombre1}, ${nombre2}, ${nombre3}`);


//===================================================================

// let vec2 = [1, 2, 3, 4, "sdfi"];

// let vec: number[] = [1, 2, 3, 4, "sdfi"];
// vec.push("oiajds");

// let vec3: number[] = [1, 2, 3, 4];

// vec3[0].

// var tupla:[number, number, string] = [1, 1, 2]; // ==> concepto de tupla 



//===================================================================


// enum Talle{
//     xs,
//     s,
//     m,
//     l,
//     xl
// }

// console.log(Talle.xl);
//===================================================================

// function f1(a: number, b: number): number {
//     return a + b;
// }

// let suma: number = f1(3, 7);

// let x: (a: number, b: number) => number;

// x = f1;
//===================================================================


// let Persona: {
//     edad: number,
//     nombre: string,
//     apellido: string,
//     sabe: boolean,
//     getNombre: () => string
// } = {
//     nombre: "Juan",
//     apellido: "Perez",
//     edad: 12,
//     sabe: false,
//     getNombre: function (): string {
//         return this.nombre;
//     }
// };

// type Persona = {
//     edad: number,
//     nombre: string,
//     apellido: string,
//     sabe: boolean,
//     getNombre: () => string
// };

// let p1:Persona = {
//     nombre: "Juan",
//     apellido: "Perez",
//     edad: 12,
//     sabe: false,
//     getNombre: function (): string {
//         return this.nombre;
//     }
// };
//===================================================================

// class Persona {
//     private _nombre: string;
//     private _apellido: string;
//     private _edad: number;

//     constructor(nombre: string, apellido: string, edad: number) {
//         this._nombre = nombre;
//         this._apellido = apellido;
//         this._edad = edad;
//     }

//     public set Nombre(v: string) {
//         this._nombre = v;
//     }

//     public get Nombre(): string {
//         return this._nombre;
//     }

//     public set Apellido(v: string) {
//         this._apellido = v;
//     }

//     public get Apellido(): string {
//         return this._apellido;
//     }

//     public set Edad(v: number) {
//         this._edad = v;
//     }

//     public get Edad(): number {
//         return this._edad;
//     }

//     protected presentarse() {
//         console.log(`Hola soy ${this.Nombre} ${this.Apellido}`);
//     }
// }

// class Empleado extends Persona {

//     public sueldo:number;

//     constructor(nombre: string, apellido: string, edad: number, sueldo:number) {
//         super(nombre, apellido, edad);
//         this.sueldo = sueldo;
//     }

//     public presentarse(){
//         super.presentarse();
//     }
// }

// let p1 = new Persona("juan", "perez", 23);
// // p1.presentarse();

// let emp1 = new Empleado("Jose", "Luis", 54, 134234.34);
// emp1.presentarse();

// abstract class ...


//===================================================================

// {
//     protected presentarse() {
//         console.log(`Hola soy ${this.Nombre} ${this.Apellido}`);
//     }

//     ARMAR ESTO
//     public toJson():string{
//         return {"nombre": ${this.nombre}, ...}
//     }

//     console.log(emp1.toJson());
// }


//===================================================================

let auto1 = new Clases.Auto("Ford", 4);

console.log(auto1.marca);

