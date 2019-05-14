// function Saludar(){
//     //document.write("Hola");
//     console.log("UUUEEEE");
//     //document.getElementById("p1").innerHTML = "Parrafo agregado desde script";
// }

document.getElementById("p1").innerHTML = "Parrafo agregado desde script";
document.getElementById("myId").innerHTML = "<h2>H2 agregado desde script</h2>";

var u = true;
console.log(typeof u);

var v = null;
console.log(typeof v);

var w;
console.log(typeof w);

var x = 20;
console.log(typeof x);

var y = "20";
console.log(typeof y);

var z = [20, 21, 22];
console.log(typeof z);

var r = function diganAlgo(){
    return "Dame helado!";
}


var s = function (a){
    return a + " Toma helado!";
}

function quilombo(a, b, c){
    //console.log(arguments.length);
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
    console.log("termine");
    // if(a && b){
    //     return a + b;
    // }
    if(!c){
        c = 0;
    }
    return a + b + c;
}

function calcular(a,b,c){
    return c(a,b);//el 3er param va a ser una funcion
}
console.log(calcular(2,3,function(a,b){
    return a*b;
}));
//console.log(diganAlgo());

console.log(r);
console.log(r());
console.log(s());
console.log(s("Julio"));
quilombo(2,3,4);
quilombo(2,3,4,345,454);

//objetos JS

var objetoBasico = {};
var objetoX = { nombre: "Juan", apellido: "Perre", edad: 23};

console.log(objetoX.nombre);
console.log(objetoX["nombre"]);
var prop = "apellido";
console.log(objetoX[prop]);
objetoX.nombre = "Ana";
console.log(objetoX["nombre"]);

function persona(nombre, apellido, edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
}
var per1 = new persona("pepe","popo",54);
var per2 = new persona("alguien","forro",32);
console.log(per1);

for(prop in per1){
    console.log(per1[prop]);
}

//per1.nacionalidad = "argentina";

//agrega propiedades a la clase
persona.prototype.nacionalidad = "Argentino";

for(prop in per1){
    console.log(per1[prop]);
}


