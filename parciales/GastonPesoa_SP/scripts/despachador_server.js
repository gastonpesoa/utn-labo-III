var xhr;
var server = 'http://localhost:3000';

function traerPersonas() {

  var params = {
    'collection': 'personas'
  }

  $.ajax({

    url: server + '/traer',
    data: params,
    dataType: "json",
    beforeSend: function () {
      $("#bodyTabla").html("");
      setSpinner();
    },
    success: function (response) {
      console.log(response['message']);
      lista = response['data'];
      actualizarTabla(lista);
    },
    error: function (xhr) {
      alert("Error " + xhr.status + ' ' + xhr.statusText);
    },
    complete: function () {
      $('#spinner').remove();
    }
  });
}

function guardarPersona(persona) {

  var params = {
    'collection': 'personas',
    'objeto': persona
  }

  $.ajax({

    url: server + '/agregar',
    type: 'post',
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    },
    dataType: 'json',
    beforeSend: function () {
      ocultarFrm();
      $("#bodyTabla").html("");
      setSpinner();
    },
    success: function (data) {
      console.log(data['message']);
      traerPersonas();
    },
    error: function (xhr) {
      console.log("Error " + xhr.status + ' ' + xhr.statusText);
    },
  });
}

function eliminarPersona(id) {

  var params = {
    'collection': 'personas',
    'id': id
  }

  $.ajax({

    url: server + '/eliminar',
    type: 'post',
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    },
    dataType: 'json',
    beforeSend: function () {
      ocultarFrm();
    },
    success: function (data) {
      console.log(data['message']);
      traerPersonas();
    },
    error: function (xhr) {
      console.log("Error " + xhr.status + ' ' + xhr.statusText);
    }
  });
}

function modificarPersona(persona) {

  var params = {
    'collection': 'personas',
    'objeto': persona
  }

  $.ajax({

    url: server + '/modificar',
    type: 'post',
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    },
    dataType: 'json',
    beforeSend: function () {
      ocultarFrm();
    },
    success: function (data) {
      console.log(data['message']);
      traerPersonas();
    },
    error: function (xhr) {
      console.log("Error " + xhr.status + ' ' + xhr.statusText);
    }
  });
}
