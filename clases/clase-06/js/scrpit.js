window.addEventListener('load', function () {
    document.getElementById('btnTabla').addEventListener('click', CargarTabla);    
})

function CargarTabla() {
    var tabla = document.createElement('table');
    tabla.setAttribute('border', '1px solid black');
    tabla.setAttribute('style', 'border-collapse: collapse');
    tabla.style.width = '700px';
    var cabecera = document.createElement('tr');
    for(var key in data[0]){
        var header = document.createElement('th');
        var texto = document.createTextNode(key);
        // header.appendChild(texto);
        header.textContent = texto;
        cabecera.appendChild(header);
    }
    tabla.appendChild(cabecera);
    for (var i in data) {
        var fila = document.createElement('tr');
        for (var j in data[i]) {
            var celda = document.createElement('td');
            celda.style.textAlign = 'center';
            var dato = document.createTextNode(data[i][j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    document.getElementById('info').appendChild(tabla);
}