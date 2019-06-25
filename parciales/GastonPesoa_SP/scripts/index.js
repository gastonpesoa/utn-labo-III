var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;
var btnSubmit;
var btnDelete;
var formABM;
var tableABM;

var lista = [];
var listaSinKey = [];
var listaConKey = [];
var perMasProps;
var perGlobal;

window.onload = asignarEventos;

function asignarEventos() {

    $('#btnAlta').click(function () {
        mostrarFormulario();
    });

    //traer las personas y mostrar en la tabla
    traerPersonasLocal();
    // $("#camposMostrados").html("");
    // crearCheckBoxs(lista[0]);
    $('#selectGenero').change(setAgeInfoSection);

}

function checkBoxChange(e) {

    var key = e.target.id.replace("check-", "");

    // console.log("key");
    // console.log(key);
    // var quitarProp = function (object, key) {

    //     console.log('key');
    //     console.dir(key);
    //     console.log('object');
    //     console.dir(object);
    //     // return delete object[key];
    // }


    if (this.checked) {

        var listado = JSON.parse(localStorage.getItem('listaPersonas'));
        // console.log("AGREGO KEY");
        // console.log('lista antes');
        // console.log(listaSinKey);

        // var listaConKey = listaSinKey.map(function (x, i) {
        var listaConKey = lista.map(function (x, i) {

            // console.log('key');
            // console.log(key);
            // console.log('x sin key');
            // console.log(x);
            // console.log('listado');
            // console.log(listado);
            // console.log('listado[i][key]');
            // console.log(listado[i][key]);
            x[key] = listado[i][key];
            // console.log('x[key]');
            // console.log(x[key]);
            //var listado = JSON.parse(localStorage.getItem('listaPersonas'));
            // console.log('x agregado key');
            // console.log(x);
            return x;
        })
        // console.log('lista despues');
        // console.log(listaSinKey);

        $("#bodyTabla").html("");
        $("#headTabla").html("");
        actualizarTabla(listaConKey);
        // actualizarTabla(lista);
        // console.log('checked');
        // console.dir(e.target.id);
    }
    else {

        // console.log('SACO KEY')
        // var listaAmod = lista;
        // console.log("lista a modificar");
        // console.log(listaAmod);

        var listaSinKey = lista.map(x => {
            // console.log('key');
            // console.log(key);
            // console.log('x[key]');
            // console.log(x[key]);
            delete x[key];
            // console.log('x sin key');
            // console.log(x);
            return x;
        });

        // console.log("lista modificado");
        // console.log(listaSinKey);

        $("#bodyTabla").html("");
        $("#headTabla").html("");
        actualizarTabla(listaSinKey);
        // actualizarTabla(lista);
        // crearCheckBoxs(listaSinKey[0]);
        // for (i = 0; i < lista.length; i++) {
        // console.log('key');
        // console.log(key);
        // console.log('lista[i].key');
        // console.log(lista[i][key]);
        // delete lista[i][key];
        // console.log(lista[i]);
        // }

        // console.log('listaNew');
        // console.dir(lista);
    }
}

function setAgeInfoSection(e) {

    value = $('#selectGenero').val();

    var promedio;
    var listaAge = [];
    var listaGeneroTipo = [];
    var listaTipo = [];
    var promFem;

    switch (value) {
        case "Indistinto":
            var listaAge = lista.map(p => { return p.edad });
            listaGeneroTipo = lista.filter(p => { return p.gender === 'Female' });
            listaTipo = lista;

            $("#bodyTabla").html("");
            $("#headTabla").html("");
            actualizarTabla(listaTipo);

            break;

        case "Diputados":
            var listaAge = lista.filter(p => { return p.tipo === 'Diputado' }).map(p => { return p.edad });
            listaGeneroTipo = lista.filter(p => { return p.gender === 'Female' && p.tipo === 'Diputado' });    
            listaTipo = lista.filter(p => { return p.tipo === 'Diputado' });   
            
            $("#bodyTabla").html("");
            $("#headTabla").html("");
            actualizarTabla(listaTipo);

            break;

        case "Senadores":
            var listaAge = lista.filter(p => { return p.tipo === 'Senador' }).map(p => { return p.edad });
            listaGeneroTipo = lista.filter(p => { return p.gender === 'Female' && p.tipo === 'Senador' });    
            listaTipo = lista.filter(p => { return p.tipo === 'Senador' });

            $("#bodyTabla").html("");
            $("#headTabla").html("");
            actualizarTabla(listaTipo);
            
            break;
    }

    promFem = (listaGeneroTipo.length / listaTipo.length)*100; 
    
    promedio = listaAge.reduce((previous, current) => {
        return previous + current;
    }) / listaAge.length;

    $('#inputPromedioEdad').val(promedio);
    $('#inputMasViejo').val(promFem);
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
        btnSubmit = document.createElement('input');
        btnCancelar = document.createElement('button');
        $(btnCancelar).append(document.createTextNode('Cancelar'));
        $(btnCancelar).on("click", ocultarFrm).attr('class', 'btn btn-secondary');
        perMasProps = buscarMayor(lista);

        for (props in perMasProps) {

            if (props !== "id" && props !== "active") {
                var field = document.createElement('div');
                var label = document.createElement('label');

                if (props === "gender") {
                    var divRdoF = document.createElement('div');
                    var rdoF = document.createElement('input');
                    $(rdoF).attr({
                        type: 'radio',
                        id: 'rdoFemenino',
                        name: props,
                        required: "required",
                        value: "Female",
                        class: "form-check-input"
                    });
                    var labelF = document.createElement('label');
                    $(labelF).append(document.createTextNode('F')).attr({ class: "form-check-label", for: "rdoFemenino" });
                    $(divRdoF).append(rdoF, labelF).attr("class", "form-check");

                    var divRdoM = document.createElement('div');
                    var rdoM = document.createElement('input');
                    $(rdoM).attr({
                        type: 'radio',
                        id: 'rdoMasculino',
                        name: props,
                        value: "Male",
                        class: "form-check-input"
                    });
                    var labelM = document.createElement('label');
                    $(labelM).append(document.createTextNode('M')).attr({ class: "form-check-label", for: "rdoMasculino" });
                    $(divRdoM).append(rdoM, labelM).attr("class", "form-check");

                    $(label).append(document.createTextNode('Género: '));
                    $(field).append(label, divRdoF, divRdoM).attr("class", "rdoButtons");
                }
                else {
                    if (props === "tipo") {
                        var divRdoF = document.createElement('div');
                        var rdoF = document.createElement('input');
                        $(rdoF).attr({
                            type: 'radio',
                            id: 'rdoDiputado',
                            name: props,
                            required: "required",
                            value: "diputado",
                            class: "form-check-input"
                        });
                        var labelF = document.createElement('label');
                        $(labelF).append(document.createTextNode('Diputado')).attr({ class: "form-check-label", for: "rdoDiputado" });
                        $(divRdoF).append(rdoF, labelF).attr("class", "form-check");

                        var divRdoM = document.createElement('div');
                        var rdoM = document.createElement('input');
                        $(rdoM).attr({
                            type: 'radio',
                            id: 'rdoSenador',
                            name: props,
                            value: "Senador",
                            class: "form-check-input"
                        });
                        var labelM = document.createElement('label');
                        $(labelM).append(document.createTextNode('Senador')).attr({ class: "form-check-label", for: "rdoSenador" });
                        $(divRdoM).append(rdoM, labelM).attr("class", "form-check");

                        $(label).append(document.createTextNode('Tipo: '));
                        $(field).append(label, divRdoF, divRdoM).attr("class", "rdoButtons");
                    }
                    else{

                        var input = document.createElement('input');
                        $(input).attr({
                            id: props,
                            name: props,
                            required: "required",
                            class: "form-control"
                        });
    
                        if (props == "email")
                            $(input).attr("type", "email");
                        else {
                            if (props == "edad")
                                $(input).attr({ type: "number", min: 0, max: 100 });
                            else
                                $(input).attr("type", "text");
                        }
    
                        $(label).append(document.createTextNode(props)).attr("for", props);
                        $(field).append(label, input).attr("class", "form-group x");
                    }
                }

                $(formABM).append(field);
            }
        }
        $('#divFrm').append(formABM);

        if (persona) {

            console.log('persona a modif');
            console.log(persona);
            perGlobal = persona;

            for (props in persona) {
                if (props === "gender") {
                    persona[props] === "Female" ?
                        $("#rdoFemenino").attr("checked", "true") :
                        $("#rdoMasculino").attr("checked", "true");
                }
                if (props === "tipo") {
                    persona[props] === "Diputado" ?
                        $("#rdoDiputado").attr("checked", "true") :
                        $("#rdoSenador").attr("checked", "true");
                }
                else {
                    
                    elem = $("#" + props + "");
                    
                    $("#" + props + "").attr("value", persona[props]);
                }
            }
            btnDelete = document.createElement('input');
            $(btnDelete).attr({ class: 'buttonpressed btn btn-danger', id: 'btnDelete', type: "submit", value: "Eliminar" });
            $(btnSubmit).attr({ class: 'buttonpressed btn btn-primary', id: 'btnUpdate', type: "submit", value: "Modificar" });
            $(formABM).append(btnDelete);
        }
        else {
            $(btnSubmit).attr({ class: 'buttonpressed btn btn-primary', id: 'btnCreate', type: "submit", value: "Dar de Alta" });
        }

        $(document).on('click', ".buttonpressed", function () {
            buttonpressed = $(this).attr('id');
        });
        $(formABM).submit(function (e) {
            e.preventDefault();

            ocultarFrm();
            $("#headTabla").html("");
            $("#bodyTabla").html("");
            $("#camposMostrados").html("");

            if (buttonpressed == "btnCreate") {

                altaPersona(e);
            }
            else {

                if (buttonpressed == "btnUpdate") {

                    modificacionPersona(e);
                }
                if (buttonpressed == "btnDelete") {

                    eliminacionPersona(perGlobal);
                }
            }
        });
        $(formABM).append(btnSubmit, btnCancelar);
        $('#divFrm').show();
    }
}

function setSpinner() {

    if (!$('#spinner').length) {

        $('body').append('<div id="spinner"></div>');
        $('#spinner').append('<img id="spinner" src="./images/spinner.gif" alt="preloader">')
            .css({ 'text-align': 'center', 'display': 'block' });
    }
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

function crearCheckBoxs(persona) {

    for (prop in persona) {

        if (prop !== 'active') {

            var divCheck = document.createElement('div');
            var chekBox = document.createElement('input');
            $(chekBox).attr({
                type: 'checkbox',
                id: 'check-' + prop,
                name: prop,
                checked: "checked",
                value: prop,
                class: "form-check-input"
            }).on("change", checkBoxChange);
            var label = document.createElement('label');
            $(label).append(document.createTextNode(prop)).attr({ class: "form-check-label", for: 'check-' + prop });
            $(divCheck).append(chekBox, label).attr("class", "form-check form-check-inline");
            $('#camposMostrados').append(divCheck);
        }
    };
}

function actualizarTabla(lista) {

    // console.log('lista a actualizar');
    // console.log(lista);

    var mayor = buscarMayor(lista);

    for (keys in mayor) {
        var col, text;
        if (keys != 'active' && keys) {
            //arrayProps.push(keys);
            col = document.createElement('th');
            // col.className = 'borde';
            text = document.createTextNode(keys);
            $('#headTabla').append(col);
            $(col).append(text);
        }
    }

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
            $("#tablaLista").attr("class", "table table-bordered");
        }
    });
}


function altaPersona() {

    var nuevaPersona =
    {
        "id": "",
        "first_name": $("#first_name").val(),
        "last_name": $("#last_name").val(),
        "email": $("#email").val(),
        "gender": getGender(),
        "edad": parseInt($("#edad").val()),
        "active": "true",
        "tipo":  getTipo()
    };

    //enviar la insercion al server
    //guardarPersona(nuevaPersona);

    //enviar la insercion al localStorage
    guardarPersonaLocal(nuevaPersona)
}


function eliminacionPersona(persona) {

    //agregar el codigo que crea conveniente
    //enviar la eliminacion al server
    if (!confirm("Se eliminará a " + persona.first_name + ", " + persona.last_name + ". ¿Confirma la baja?")) {

        ocultarFrm();
        return false;
    }

    //eliminarPersona(persona.id);

    //eliminar del localStorage
    eliminarPersonaLocal(persona.id);
}

function modificacionPersona(event) {

    //agregar el codigo que crea conveniente
    event.preventDefault();
    perGlobal.gender = getGender();
    perGlobal.first_name = $("#first_name").val();
    perGlobal.last_name = $("#last_name").val();
    perGlobal.email = $("#email").val();
    perGlobal.edad = parseInt($("#edad").val());
    perGlobal.tipo = getTipo();

    //enviar la modificacion al server
    //modificarPersona(perGlobal);

    //enviar la modificacion al localStorage
    modificarPersonaLocal(perGlobal);
}

function getGender() {

    var gender;
    if (document.getElementById('rdoMasculino').checked) {
        gender = 'Male';
    }
    else {
        gender = 'Female';
    }
    return gender;
}
function getTipo() {

    var tipo;
    if (document.getElementById('rdoDiputado').checked) {
        tipo = 'Diputado';
    }
    else {
        tipo = 'Senador';
    }
    return tipo;
}

function Persona(nombre, apellido, email, sexo) {
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
}






