var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;
var btnSubmit;
var btnDelete;
var formABM;
var tableABM;

var lista;
var perGlobal;

window.onload = asignarEventos;

function asignarEventos() {

    $('#btnAlta').click(function () {
        mostrarFormulario();
    });

    //traer las personas y mostrar en la tabla    
    traerPersonas();
}

function darAlta(e) {
    e.preventDefault();
    console.log(e.target);
}

function ocultarFrm(event) {
    if (event)
        event.preventDefault();
    $("#divFrm").hide();
}

var buttonpressed;

function mostrarFormulario(persona) {

    if ($("#divFrm").css("display") != "block") {

        $("#divFrm").html("");
        formABM = document.createElement('form');
        tableABM = document.createElement('table');
        btnSubmit = document.createElement('input');
        btnDelete = document.createElement('input');
        btnCancelar = document.createElement('button');
        var rowBtns = document.createElement('tr');
        $(btnCancelar).append(document.createTextNode('Cancelar'));
        $(btnCancelar).on("click", ocultarFrm);

        if (persona) {

            perGlobal = persona;
            for (props in persona) {

                if (props !== "id" && props !== "active") {

                    var row = document.createElement('tr');
                    var field = document.createElement('fieldset');
                    var colLabel = document.createElement('td');
                    var label = document.createElement('label');
                    var colInput = document.createElement('td');

                    if (props === "gender") {

                        var rdoF = document.createElement('input');
                        $(rdoF).attr({
                            type: 'radio',
                            id: 'rdoFemenino',
                            name: props
                        });
                        var labelF = document.createElement('label');
                        $(labelF).append(document.createTextNode('F')).attr("for", "rdoFemenino");

                        var rdoM = document.createElement('input');
                        $(rdoM).attr({
                            type: 'radio',
                            id: 'rdoMasculino',
                            name: props
                        });
                        var labelM = document.createElement('label');
                        $(labelM).append(document.createTextNode('M')).attr("for", "rdoMasculino");

                        persona[props] === "Female" ? $(rdoF).attr("checked", "true") : $(rdoM).attr("checked", "true");

                        $(label).append(document.createTextNode('Género: '));
                        $(colInput).append(rdoF, labelF, rdoM, labelM);
                    }
                    else {

                        var input = document.createElement('input');
                        $(input).attr({
                            id: props,
                            type: "text",
                            name: props,
                            value: persona[props],
                            required: "required"
                        })
                        $(label).append(document.createTextNode(props)).attr("for", props);
                        $(colInput).append(input);
                    }

                    $(colLabel).append(label);
                    $(field).append(colLabel, colInput);
                    $(row).append(field);
                    $(tableABM).append(row);
                }
            }

            $(btnDelete).attr({ class: 'buttonpressed', id: 'btnDelete', type: "submit", value: "Eliminar" });
            $(btnSubmit).attr({ class: 'buttonpressed', id: 'btnUpdate', type: "submit", value: "Modificar" });
            $(rowBtns).append(btnDelete);                      
        }
        else {

            $(btnSubmit).attr({ class: 'buttonpressed', id: 'btnCreate', type: "submit", value: "Dar de Alta" });
        }
        
        $(document).on('click', ".buttonpressed", function () {
            buttonpressed = $(this).attr('id');
        });

        $(rowBtns).append(btnSubmit, btnCancelar);
        $(tableABM).append(rowBtns);

        $(formABM).append(tableABM).submit(function (e) {
            e.preventDefault();
            if(buttonpressed == "btnCreate"){
                darAlta(e);
            } else {
                if(buttonpressed == "btnUpdate"){
                    modificacionPersona(e);
                }
                if(buttonpressed == "btnDelete"){
                    eliminacionPersona(perGlobal);
                } 
            }
        });

        $(formABM).append(tableABM);
        $('#divFrm').append(formABM);
        $('#divFrm').show();
    }
}

function setSpinner() {

    $('body').append('<div id="spinner"></div>');
    $('#spinner').append('<img id="spinner" src="./images/spinner.gif" alt="preloader">')
        .css({ 'text-align': 'center' });
}

function buscarMayor(lista) {

    var numProps = 0, mayor, objMasProps;
    for (i = 0; i < lista.length; i++) {
        for (props in lista[i]) {
            numProps++; // A cada persona se le cuenta la cantidad de props
        }
        if (i == 0) { // Si es la primera persona del array, va a ser el mayor con el que se van a comparar lo demas
            mayor = numProps;
            objMasProps = lista[i];
        }
        // Si no es la primer persona del array, 
        //se compara sus cantidad de propiedades con el primero o el mayor hasta esta iteracion
        else {
            if (numProps > mayor) {
                mayor = numProps;
                objMasProps = lista[i];
            }
        }
        numProps = 0; // Se resetea el contador para analizar la proxima persona
    }
    return objMasProps;
}

function actualizarTabla(lista) {

    //var mayor = buscarMayor(lista);

    // for (keys in mayor) {
    //     var col, text;
    //     if (keys != 'active' && keys) {
    //         //arrayProps.push(keys);
    //         col = document.createElement('th');
    //         col.className = 'borde';
    //         text = document.createTextNode(keys);
    //         rowHeader.appendChild(col);
    //         col.appendChild(text);
    //     }
    // }

    lista.forEach(function (persona) {

        if (persona) {

            var nuevaRow = document.createElement('tr');

            $(nuevaRow).on("click", function () {
                mostrarFormulario(persona);
            });

            for (props in persona) {

                if (persona[props] != "true" && persona[props] != "false") {

                    var col = document.createElement('td');
                    $(col).append(document.createTextNode(persona[props]));
                    $(nuevaRow).append(col);
                }
            }

            $("#bodyTabla").append(nuevaRow);
        }
    });

    // for (persona in lista) {

    //     if (lista[persona]) {

    //         var nuevaRow = document.createElement('tr');
    //         $(nuevaRow).on("click", function () {
    //             var persona = lista[persona];
    //             mostrarFormulario(persona);
    //         });
    //         for (props in lista[persona]) {

    //             if (lista[persona][props] != "true" && lista[persona][props] != "false") {

    //                 var col = document.createElement('td');
    //                 $(col).append(document.createTextNode(lista[persona][props]));
    //                 $(nuevaRow).append(col);
    //             }
    //         }
    //         $("#bodyTabla").append(nuevaRow);
    //     }
    // }
}


function altaPersona() {
    //agregar el codigo que crea conveniente

    var nuevaPersona = new Persona(nombre, apellido, email, sexo);

    //enviar la insercion al server
}


function eliminacionPersona(persona) {

    //agregar el codigo que crea conveniente
    console.dir(persona.id);    
    //var id = parseInt(document.getElementById('id').value);
    //enviar la eliminacion al server
    if(!confirm("Se eliminará a " + persona.first_name + ", " + persona.last_name + ". ¿Confirma la baja?")){
        ocultarFrm();
        return false;
    }
    eliminarPersona(persona.id);    
}

function modificacionPersona(event) {

    //agregar el codigo que crea conveniente
    event.preventDefault();
    var gender;
    if (document.getElementById('rdoMasculino').checked) {
        gender = 'Male';
    }
    else {
        gender = 'Female';
    }
    perGlobal.gender = gender;
    perGlobal.first_name = $("#first_name").val();
    perGlobal.last_name = $("#last_name").val();
    perGlobal.email = $("#email").val();

    //enviar la modificacion al server
    modificarPersona(perGlobal);
}

function Persona(nombre, apellido, email, sexo) {
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
}




