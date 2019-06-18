var xhr;
var server = 'http://localhost:3000';

function traerPersonas() {

  // xhr = new XMLHttpRequest();
  // xhr.addEventListener('readystatechange',function(){
  //   procesarPersona();
  // })
  // var cadena = 'http://localhost:3000/traer?collection=personas';
  // xhr.open('GET', cadena, true);
  // xhr.send();

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

  // xhr = new XMLHttpRequest();
  // xhr.addEventListener('readystatechange',function(){
  //   procesarAlta();
  // })
  // var cadena = 'http://localhost:3000/agregar';
  // var body = {'collection':'personas','objeto':persona}
  // xhr.open('POST', cadena, true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify(body));

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

  // xhr = new XMLHttpRequest();
  // xhr.addEventListener('readystatechange',function(){
  //   procesarPersona();
  // })
  // var cadena = 'http://localhost:3000/eliminar';
  // var body = {'collection':'personas','id':id}
  // xhr.open('POST', cadena, true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify(body));

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

  xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(){
    procesarPersona();
  })
  var cadena = 'http://localhost:3000/modificar';
  var body = {'collection':'personas','objeto':persona}
  xhr.open('POST', cadena, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));

  // var params = {
  //   'collection': 'personas',
  //   'objeto': persona
  // }

  // $.ajax({

  //   url: server + '/modificar',
  //   type: 'post',
  //   data: JSON.stringify(params),
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   dataType: 'json',
  //   beforeSend: function () {
  //     ocultarFrm();
  //   },
  //   success: function (data) {
  //     console.log(data['message']);
  //     traerPersonas();
  //   },
  //   error: function (xhr) {
  //     console.log("Error " + xhr.status + ' ' + xhr.statusText);
  //   }
  // });
}

function procesarPersona(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      traerPersonas();
    }
    else{
      console.log("Error status: "+ xhr.status);
    }
  }else{
    console.log("ready status: "+xhr.readyState);
  }
}
