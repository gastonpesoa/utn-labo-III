var xhr;

// traer:
// HTTP:GET
// URL:http://localhost:3000/traer
// PARAMS: collection=personas
// RTA: ARRAY DE PERSONAS
function traerPersonas() {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        procesarPersonas();
    });
    var cadena = "http://localhost:3000/traer?collection=personas";
    xhr.open('GET', cadena, true);
    xhr.send();
}

// agregar:
// HTTP:POST
// URL:http://localhost:3000/agregar
// PARAMS: {collection: 'personas',objeto:<persona>}
// REQUEST HEADER: xhr.setRequestHeader('Content-Type', 'application/json');
// RTA:{message: "Alta exitosa"}
function agregarPersona(persona) {
    console.log(persona);
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        procesarPersonas();
    });
    var cadena = "http://localhost:3000/agregar";
    var body = { "collection": "personas", "objeto": persona };
    xhr.open('POST', cadena, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

// modificar:
// HTTP:POST
// URL:http://localhost:3000/modificar
// PARAMS: {collection: 'personas',objeto:<persona>}
// REQUEST HEADER: xhr.setRequestHeader('Content-Type', 'application/json');
// RTA:"Modificacion exitosa"
function modificarPersona(persona) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        procesarPersonas();
    });
    var cadena = 'http://localhost:3000/modificar';
    var body = { "collection": "personas", "objeto": persona };
    xhr.open('POST', cadena, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

// eliminar:
// HTTP:POST
// URL:http://localhost:3000/eliminar
// PARAMS: {'collection':'personas','id' : <id>}
// REQUEST HEADER: xhr.setRequestHeader('Content-Type', 'application/json');
// RTA:{"message":"Baja exitosa"}
function eliminarPersona(id) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        procesarPersonas();
    });
    var cadena = 'http://localhost:3000/eliminar';
    var body = { "collection": "personas", "id": id };
    xhr.open('POST', cadena, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}
