// var vec = [1, 2, 3, 4, 5];

// var dobles = [];

// for (var i = 0; i <vec.length; i++){
//     dobles.push(vec[i]*2);
// }

// vec.forEach(function(element){
//     dobles.push(element*2);
// })

// var dobles = vec.map((valor, indice, array)=>{
//     console.log(array);
// })

// var dobles = vec.map((valor) => {
//     return valor * 2;
// })

// var dobles = vec.map(valor => valor * 2);

// console.log(dobles);


// console.log(nombres);

//===========================================

// function cargarSelect(){
    
//     var select = document.getElementsByTagName('select')[0];
    
//     if(select.hasChildNodes()){
//         return;
//     }
    
//     var nombres = data.map(function(persona){
//         return persona.first_name;
//     })
    
//     nombres.forEach(function(nombre){
//         var option = document.createElement('option');
//         option.textContent = nombre;
//         select.appendChild(option);
//     })
// }

//===========================================

var x = data.map(function(p){
    return {"id":p.id,"nombre":p.first_name,"email":p.email}
})

console.log(x);