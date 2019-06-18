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
var perMasProps;
var perGlobal;

window.onload = asignarEventos;

function asignarEventos() {

    $('#btnAlta').click(function () {
        mostrarFormulario();
    });

    //traer las personas y mostrar en la tabla    
    traerPersonas();
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
        //tableABM = document.createElement('table');
        btnSubmit = document.createElement('input');
        btnCancelar = document.createElement('button');
        //var rowBtns = document.createElement('tr');
        $(btnCancelar).append(document.createTextNode('Cancelar'));
        $(btnCancelar).on("click", ocultarFrm).attr('class', 'btn btn-secondary');

        divSelect = document.createElement("div");
        labelSelect = document.createElement("label");
        select = document.createElement("select");
        option1 = document.createElement("option");
        option2 = document.createElement("option");
                
        perMasProps = buscarMayor(lista);

        for (props in perMasProps) {

            if (props !== "id" && props !== "active") {

                //var row = document.createElement('tr');
                var field = document.createElement('div');
                //var colLabel = document.createElement('td');
                var label = document.createElement('label');
                //var colInput = document.createElement('td');

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
                    $(divRdoF).append(rdoF,labelF).attr("class", "form-check");

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
                    $(divRdoM).append(rdoM,labelM).attr("class", "form-check");
                    
                    $(label).append(document.createTextNode('Género: '));
                    //$(colInput).append(divRdoF, divRdoM);
                    //$(field).append(colLabel, colInput);
                    $(field).append(label, divRdoF, divRdoM).attr("class","rdoButtons");
                    //$(field).attr("class", "form-check");
                }
                else {

                    if(props != "sabeNadar"){

                        var input = document.createElement('input');
                        $(input).attr({
                            id: props,
                            name: props,
                            required: "required",
                            class: "form-control"
                        });
    
                        if (props == "email") {
                            $(input).attr("type", "email");
                        } else {
                            $(input).attr("type", "text");
                        }
    
                        $(label).append(document.createTextNode(props)).attr("for", props);
                        //$(colInput).append(input);
                        //$(field).append(colLabel, colInput).attr("class", "form-group");
                        $(field).append(label, input).attr("class", "form-group x");
                    }                    
                }

                $(formABM).append(field);

                //$(colLabel).append(label);
                //$(field).append(colLabel, colInput);
                //$(row).append(field);
                //$(tableABM).append(row);
            }
        }

        $(labelSelect).append(document.createTextNode("Sabe nadar?"));
        $(option1).append(document.createTextNode("Si")).attr({value:"Si"});
        $(option2).append(document.createTextNode("No")).attr({value:"No"});
        $(select).append(option1, option2).attr({value:"Sabe nadar?", id:"sabeNadar" })
        $(divSelect).append(labelSelect, select);
        $(formABM).append(divSelect);
        
        //$(tableABM).append(rowBtns);
        //$(formABM).append(tableABM);
        //$(formABM).append(field);
        $('#divFrm').append(formABM);

        if (persona) {

            perGlobal = persona;

            for (props in persona) {

                if (props === "gender") {

                    persona[props] === "Female" ?
                        $("#rdoFemenino").attr("checked", "true") :
                        $("#rdoMasculino").attr("checked", "true");
                }
                else {

                    $("#" + props + "").attr("value", persona[props]);
                }
            }
            btnDelete = document.createElement('input');
            $(btnDelete).attr({ class: 'buttonpressed btn btn-danger', id: 'btnDelete', type: "submit", value: "Eliminar" });
            $(btnSubmit).attr({ class: 'buttonpressed btn btn-primary', id: 'btnUpdate', type: "submit", value: "Modificar" });
            //$(rowBtns).append(btnDelete);
            $(formABM).append(btnDelete);
        }
        else {

            $(btnSubmit).attr({ class: 'buttonpressed btn btn-primary', id: 'btnCreate', type: "submit", value: "Dar de Alta" });
        }

        $(document).on('click', ".buttonpressed", function () {
            buttonpressed = $(this).attr('id');
        });

        //$(formABM).append(tableABM).submit(function (e) {
        $(formABM).submit(function (e) {
            e.preventDefault();
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

        //$(rowBtns).append(btnSubmit, btnCancelar);
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

function actualizarTabla(lista) {

    var mayor = buscarMayor(lista);

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
            $("#tablaLista").attr("class", "table table-bordered");
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


function altaPersona(e) {

    //agregar el codigo que crea conveniente    
    // var formdata = $(e.target).serializeArray();
    // var data = {};
    // $(formdata).each(function (index, obj) {
    //     data[obj.name] = obj.value;
    // });

    var nuevaPersona =
    {
        "id": "",
        "first_name": $("#first_name").val(),
        "last_name": $("#last_name").val(),
        "email": $("#email").val(),
        "gender": getGender(),
        "active": "",
        "sabeNadar": $("#sabeNadar").val()
    };

    //var nuevaPersona = new Persona($("#first_name").val(), $("#last_name").val(), $("#email").val(), getGender());
    console.dir(nuevaPersona);

    //enviar la insercion al server
    guardarPersona(nuevaPersona);
}


function eliminacionPersona(persona) {

    //agregar el codigo que crea conveniente
    console.dir(persona.id);
    //var id = parseInt(document.getElementById('id').value);
    //enviar la eliminacion al server
    if (!confirm("Se eliminará a " + persona.first_name + ", " + persona.last_name + ". ¿Confirma la baja?")) {
        ocultarFrm();
        return false;
    }
    eliminarPersona(persona.id);
}

function modificacionPersona(event) {

    //agregar el codigo que crea conveniente
    event.preventDefault();
    ocultarFrm();
    perGlobal.gender = getGender();
    perGlobal.first_name = $("#first_name").val();
    perGlobal.last_name = $("#last_name").val();
    perGlobal.email = $("#email").val();
    perGlobal.sabeNadar = $("#sabeNadar").val();
    //enviar la modificacion al server
    console.dir(perGlobal);
    modificarPersona(perGlobal);
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

function Persona(nombre, apellido, email, sexo) {
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
}




