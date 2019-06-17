//Agregar el codigo necesario para cargar un array de objetos en una tabla html(se prohibe usar innerHTML)
//Agregar evento a todos los TD. conseguir los TD con una funcion recursiva que reciba como parametros, el body del HTML, y
//la funcion que asigna el manejador(la tabla ya debera ser parte del DOM).
//Agregar algun estilo por codigo JS
//Agregar algun estilo por hoja de estilo CSS

//Agregar el codigo necesario para realizar un ABM de personas(usando AJAX)


// Una vez cargado el DOM consulto el array de personas usando AJAX, el manejador de AJAX, procesarPersona refresaca la lista
// Luego se crea el formulario con todos los elementos necesarios para ABM y se deja oculto
// Se agrega manejador de evento al boton agregar el cual pasa como parametro el string agregar
window.onload = function () {
    traerPersonas();
    document.getElementById('btnAgregar').addEventListener('click', function () {
        mostrarFormulario('agregar');
    });
}

// Array para guardar las propiedades que se van a utilizar para generar los inputs de ABM
var arrayProps = [];

// Crea la tabla dinamicamente con el arrayPersonas
function refrescarLista(arrayPersonas) {

    // Verifica cual es el elemento con mayor cantidad de propiedades
    var numProps = 0, mayor, perMasProps;
    for (i = 0; i < arrayPersonas.length; i++) {
        for (props in arrayPersonas[i]) {
            numProps++; // A cada persona se le cuenta la cantidad de props
        }
        if (i == 0) { // Si es la primera persona del array, va a ser el mayor con el que se van a comparar lo demas
            mayor = numProps;
            perMasProps = arrayPersonas[i];
        }
        // Si no es la primer persona del array, 
        //se compara sus cantidad de propiedades con el primero o el mayor hasta esta iteracion
        else {
            if (numProps > mayor) {
                mayor = numProps;
                perMasProps = arrayPersonas[i];
            }
        }
        numProps = 0; // Se resetea el contador para analizar la proxima persona
    }

    // Se apendea al div contenedor la tabla y a esta la fila cabecera. Se agrega a la tabla clase con estilo
    var div = document.getElementById('divTabla');
    var tabla = document.createElement('table');
    var rowHeader = document.createElement('tr');
    tabla.className = 'borde';
    div.appendChild(tabla);
    tabla.appendChild(rowHeader);

    // Se recorre la persona con mas propiedades para crear las columnas de la cabecera con el nombre de las keys
    // Por cada iteracion se agrega la key al array de propiedades y se apendean los elementos a la fila cabecera
    for (keys in perMasProps) {
        var col, text;
        if (keys != 'active' && keys) {
            arrayProps.push(keys);
            col = document.createElement('th');
            col.className = 'borde';
            text = document.createTextNode(keys);
            rowHeader.appendChild(col);
            col.appendChild(text);
        }
    }

    // Se recorre el array de personas
    // Por cada iteracion se crea: la fila del elemento , la columna de la prop y el nodo de texto para este,
    // se añaden los manejadores del evento click para modificar el elemento y se apendean los elementos
    for (persona in arrayPersonas) {
        var row;
        if (arrayPersonas[persona]) {
            row = document.createElement('tr');
            row.addEventListener('click', function () {
                mostrarFormulario('modificar');
            });
            tabla.appendChild(row);
            for (props in arrayPersonas[persona]) {
                if (arrayPersonas[persona][props] != "true" && arrayPersonas[persona][props] != "false") {
                    var col = document.createElement('td');
                    var content = document.createTextNode(arrayPersonas[persona][props]);
                    col.appendChild(content);
                    row.appendChild(col);
                }
            }
        }
    }
    crearFormulario();
}

var inputs = [];
var header, btnSubmit, btnUpdate, btnDelete;

function crearFormulario() {

    var divFrm = document.getElementById('divFrm');
    var form = document.createElement('form');
    var table = document.createElement('table');
    var headerRow = document.createElement('tr');
    header = document.createElement('th');
    table.className = 'borde';
    header.setAttribute('colspan', '2');
    divFrm.appendChild(form);
    form.appendChild(table);
    table.appendChild(headerRow);
    headerRow.appendChild(header);

    for (props in arrayProps) {
        var row = document.createElement('tr');
        var colLabel = document.createElement('td');
        var colProp = document.createElement('td');
        var label = document.createElement('label');
        var labelContent = document.createTextNode(arrayProps[props]);
        var input = document.createElement('input');
        //input.required = true;
        label.appendChild(labelContent);
        colLabel.appendChild(label);
        colProp.appendChild(input);
        row.appendChild(colLabel);
        row.appendChild(colProp);
        table.appendChild(row);
    }
    inputs = document.getElementsByTagName('input');

    var rowbtns = document.createElement('tr');
    var colBtns = document.createElement('td');
    btnSubmit = document.createElement('button');
    btnUpdate = document.createElement('button');
    btnDelete = document.createElement('button');
    var btnCancel = document.createElement('button');
    contentBtnSubmit = document.createTextNode('Agregar');
    contentBtnUpdate = document.createTextNode('Modificar');
    contentBtnDelete = document.createTextNode('Borrar');
    contentBtnCancel = document.createTextNode('Cancelar');
    colBtns.setAttribute('colspan', '2');
    btnSubmit.setAttribute('style', 'display:none;');
    btnUpdate.setAttribute('style', 'display:none;');
    btnDelete.setAttribute('style', 'display:none;');
    btnSubmit.addEventListener('click', function () {
        event.preventDefault();
        persona = new Persona(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        agregarPersona(persona);
    })
    btnUpdate.addEventListener('click', function () {
        event.preventDefault();
        persona = new Persona(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        console.log(persona);
        modificarPersona(persona);
    })
    btnDelete.addEventListener('click', function () {
        event.preventDefault();
        if(confirm('¿Confirma la baja de la persona?'))
            eliminarPersona(inputs[0].value);
        console.log(inputs[0].value);
    })
    btnCancel.addEventListener('click', function () {
        event.preventDefault();
        if (divFrm.classList.contains('show')) {
            divFrm.classList.remove('show');
            if (!divFrm.classList.contains('hide'))
                divFrm.classList.add('hide');
        }
    })
    table.appendChild(rowbtns);
    rowbtns.appendChild(colBtns);
    colBtns.appendChild(btnSubmit);
    colBtns.appendChild(btnUpdate);
    colBtns.appendChild(btnDelete);
    colBtns.appendChild(btnCancel);
    btnSubmit.appendChild(contentBtnSubmit);
    btnUpdate.appendChild(contentBtnUpdate);
    btnDelete.appendChild(contentBtnDelete);
    btnCancel.appendChild(contentBtnCancel);
}

var headerContentAlta = document.createTextNode('Alta de persona');
var headerContentModif = document.createTextNode('Modificar persona');

function mostrarFormulario(accion) {

    if (accion == 'agregar') {
        if (header.hasChildNodes())
            header.removeChild(header.firstChild);
        header.appendChild(headerContentAlta);
        btnSubmit.setAttribute('style', 'display:inline;')
        btnUpdate.setAttribute('style', 'display:none;')
        btnDelete.setAttribute('style', 'display:none;')
    }
    else {
        var atributos = event.target.parentNode.children;
        for (i = 0; i < atributos.length; i++) {
            console.log(atributos[i].textContent);
            inputs[i].setAttribute('value', atributos[i].textContent);
        }
        if (header.hasChildNodes()) 
            header.removeChild(header.firstChild);
        header.appendChild(headerContentModif);
        btnSubmit.setAttribute('style', 'display:none;')
        btnUpdate.setAttribute('style', 'display:inline;')
        btnDelete.setAttribute('style', 'display:inline;')
    }

    if (!divFrm.classList.contains('show')) {
        divFrm.classList.add('show');
        if (divFrm.classList.contains('hide'))
            divFrm.classList.remove('hide');
    }
}

function Persona(id, first, last, email, gender) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.email = email;
    this.gender = gender;
    this.active = "true";
}