var xhr;

function procesarPersonas(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            arrayPersonas = JSON.parse(xhr.responseText);
            //refrescarLista(arrayPersonas);
            console.log(arrayPersonas);
        }
    }
}

function traerPersonas() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = procesarPersonas;
    var cadena = "http://localhost:3000/traer?collection=personas";
    xhr.open('GET', cadena, true);
    xhr.send();
}