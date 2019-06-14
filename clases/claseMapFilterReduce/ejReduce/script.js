var vec = [1, 2, 3, 4, 5];

var suma = 0;

// for(var i = 0; i < vec.length; i++){
//     suma += vec[i];
// }

// vec.forEach(function())


// console.log(suma);

// vec.reduce(function(anterior, actual, indice){
//     // console.log(anterior);
//     // console.log(actual);
//     // console.log(indice);
//     console.log(anterior + " " + actual);
// });

// vec.reduce(function(anterior, actual, indice){
//     // console.log(anterior);
//     // console.log(actual);
//     // console.log(indice);
//     console.log(anterior + " " + actual);
// }, -1);

var suma = vec.reduce(function(anterior, actual, indice){
    // console.log(anterior + " " + actual);
    return anterior +  actual;
}, 0);

var suma = vec.reduce(function(mayor, actual, indice){
    // console.log(mayor + " " + actual);
    if(mayor >  actual)
        return mayor;
    else
        return actual;
}, 0);

console.log(suma);













