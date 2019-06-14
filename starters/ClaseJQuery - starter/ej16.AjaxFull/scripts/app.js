$(function () {
    inicializarEventos();
});

function inicializarEventos() {
    $('#btnEnviarAjax').click(enviarAjax);
    $('#btnEnviarGet').click(enviarGet);
    $('#btnEnviarGetMensajes').click(enviarGetMensajes);
    $('#btnEnviarPost').click(enviarPost);
    // $('#btnGetJSON').click(getJSON);
    $('#btnLoad').click(usarLoad);
}

function enviarAjax(e) {
    e.preventDefault();

    var legajo = $('#txtLegajo').val();
    var nombre = $('#txtNombre').val();

    var params = {
        'legajo': legajo,
        'nombre': nombre
    }

    $.ajax({
        url: 'http://localhost:3000/concatenar',
        data: params,
        //type: post, --> por default es un get, si fuera post va esto
        //dataType: 'json',
        beforeSend: function () {
            $('#info').html('<img src="./images/spin.gif" alt="preloader">');
        },
        success: function (respuesta) {
            $('#info').html(respuesta);
        },
        error: function (xhr, status) {
            alert("Error " + status + ' ' + xhr.statusText);
        },
        complete: function (xhr, status) {
            $('#info').html("");
            alert("Petición terminada");
        }
    });
}

function enviarGet(e) {
    e.preventDefault();

    var legajo = $('#txtLegajo').val();
    var nombre = $('#txtNombre').val();

    var params = {
        'legajo': legajo,
        'nombre': nombre
    }

    $.get('http://localhost:3000/concatenar', params, function (respuesta) {
        $('#info').text(respuesta);
    });
}

function enviarGetMensajes(e) {
    e.preventDefault();
    
    var legajo = $('#txtLegajo').val();
    var nombre = $('#txtNombre').val();
    
    var params = {
        'legajo': legajo,
        'nombre': nombre
    }
    
    $.get('http://localhost:3000/concatenar', params, function (respuesta) {
        alert("Correcto");
    })
    .done(function () {
        alert("Done");        
        })
        .fail(function () {
            alert("Fail");
        })
        .always(function () {
            alert("Always");
        });
}

function enviarPost(e) {
    e.preventDefault();

    var legajo = $('#txtLegajo').val();
    var nombre = $('#txtNombre').val();

    var params = {
        'legajo': legajo,
        'nombre': nombre
    }

    $.post('http://localhost:3000/loadpost', function (respuesta) {
        console.log(respuesta);
    })

    $.post('http://localhost:3000/saludo', params, function (respuesta) {
        console.log(respuesta);
    })       
}

function usarLoad(e) {
    e.preventDefault();

    $('#info').load('http://localhost:3000/loadhtml p');   
}