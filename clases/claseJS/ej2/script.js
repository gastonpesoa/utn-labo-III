// document.getElementById('p1').onclick = function(){
//     this.innerHTML = "saarrasr";
// };

//otro forma
// document.getElementById('p1').addEventListener('click',function(){
//     this.innerHTML = "sasasas";
// });

// document.getElementById('p1').addEventListener('click',function(){
//     this.style.color = "blue";
// });
//otra forma
window.addEventListener('load', inicializarEventos);

function inicializarEventos(){
    miParrafo = document.getElementById('p1');
    miParrafo.addEventListener('click', function(){
        this.innerHTML = "Hola";
    });
}
