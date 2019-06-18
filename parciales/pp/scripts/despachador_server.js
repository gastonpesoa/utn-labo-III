var xhr;
function traerPersonas() {
  xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(){
    procesarPersona();
  })
  var cadena = 'http://localhost:3000/traer?collection=personas';
  xhr.open('GET', cadena, true);
  xhr.send();
}

function guardarPersona(persona) {
  xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(){
    procesarAlta();
  })
  var cadena = 'http://localhost:3000/agregar';
  var body = {'collection':'personas','objeto':persona}
  xhr.open('POST', cadena, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  
}

function eliminarPersona(id) {
  xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(){
    procesarPersona();
  })
  var cadena = 'http://localhost:3000/eliminar';
  var body = {'collection':'personas','id':id}
  xhr.open('POST', cadena, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
}

function modificarPersona(persona) {
  xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(){
    procesarModif();
  })
  var cadena = 'http://localhost:3000/modificar';
  var body = {'collection':'personas','objeto':persona}
  xhr.open('POST', cadena, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  
}

function procesarPersona(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      arrayPersonas = JSON.parse(xhr.responseText);
      refrescarLista(arrayPersonas["data"]);
    }
    else{
      alert("Error status: "+ xhr.status);
    }
  }else{
    console.log("ready status: "+xhr.readyState);
  }
}

function procesarAlta(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      text = JSON.parse(xhr.responseText);
      if(text["message"] == "Alta exitosa"){
        traerPersonas();
      }      
    }
    else{
      alert("Error status: "+ xhr.status);
    }
  }else{
    console.log("ready status: "+xhr.readyState);
  }
}

function procesarModif(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      text = JSON.parse(xhr.responseText);
      if(text["message"] == "Modificacion exitosa"){
        traerPersonas();
      }      
    }
    else{
      alert("Error status: "+ xhr.status);
    }
  }else{
    console.log("ready status: "+xhr.readyState);
  }
}

function procesarDelete(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      text = JSON.parse(xhr.responseText);
      if(text["message"] == "Baja exitosa"){
        traerPersonas();
      }      
    }
    else{
      alert("Error status: "+ xhr.status);
    }
  }else{
    console.log("ready status: "+xhr.readyState);
  }
}