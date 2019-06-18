var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;

var lista;

window.onload = asignarEventos;

function asignarEventos() {

    btnAlta = document.getElementById('btnAlta');
    clasesDivFrm = document.getElementById("divFrm").classList;    
    if(!clasesDivFrm.contains("hide")){
        clasesDivFrm.add("hide");
        if(clasesDivFrm.contains("show")){
            clasesDivFrm.remove("show");
        }
    }
    btnAlta.onclick = function () {
        mostrarFormulario('alta');
    }

    //traer las personas y mostrar en la tabla
    traerPersonas();

}

function darAlta(e) {

}

function mostrarFormulario(accion) {
    if(accion == "modificar"){
        hijos = event.target.parentNode.children;
                
        fileID = tabla.children[0];
        colId = fileID.children[1];
        colId.children[0].value = hijos[0].textContent;

        primerFila = tabla.children[1];
        colNombre = primerFila.children[1];
        colNombre.children[0].value = hijos[1].textContent;

        segFila = tabla.children[2];
        colApe = segFila.children[1];
        colApe.children[0].value = hijos[2].textContent;
    
        terFila = tabla.children[3];
        colMail = terFila.children[1];
        colMail.children[0].value = hijos[3].textContent;
    
        cuarFila = tabla.children[4];
        colGender = cuarFila.children[1];
        colGender.children[0].value = hijos[4].textContent;;

        btnUpdate.style.display = "block";
        btnDelete.style.display = "block";
        btnAlta.style.display = "none";
    }else{
        btnUpdate.style.display = "none";
        btnAlta.style.display = "block";
        btnDelete.style.display = "none";
    }
    divFrm = document.getElementById("divFrm");
    if(divFrm.classList.contains("hide")){
        divFrm.classList.remove("hide")
        if(!clasesDivFrm.contains("show"))
            divFrm.classList.add("show")
    }
}

function setSpinner() {

}

function refrescarLista(arrayPersonas) {
    bodyTabla = document.getElementById("bodyTabla");    
    for(persona in arrayPersonas){
        row = document.createElement('tr');
        row.addEventListener('click',function(){
            mostrarFormulario('modificar');
        })
        bodyTabla.appendChild(row);

        for(props in arrayPersonas[persona]){
            if(arrayPersonas[persona][props]!="true" &&arrayPersonas[persona][props]!="false"){

                col = document.createElement("td");
                colText = document.createTextNode(arrayPersonas[persona][props]);
                row.appendChild(col);
                col.appendChild(colText);
            }
        }
    }
    crearForm();
}

var btnAlta, btnUpdate, btnDelete, tabla;

function crearForm(){

    divFrm = document.getElementById("divFrm");
    divFrm.innerHTML = "";
    divFrm.style.zIndex = 1000;
    form = document.createElement("form");
    tabla = document.createElement('table');
    filaHead = document.getElementById("filaHead");
    divFrm.appendChild(form);
    form.appendChild(tabla);    
    hijos = filaHead.children;    
    for(clave in hijos){
        if(hijos[clave].textContent){                      
            fila = document.createElement("tr");
            colLabel = document.createElement("td");
            colInput = document.createElement("td");
            label = document.createElement("label");
            labelContent = document.createTextNode(hijos[clave].textContent);
            input = document.createElement("input");           
            input.required = true;
            if(labelContent == "Email"){
                input.type = "email";                
            }
            if(hijos[clave].textContent == "Id"){
                fila.style.display = "none";;
            }  
            tabla.appendChild(fila);
            fila.appendChild(colLabel);
            fila.appendChild(colInput);
            colLabel.appendChild(label);
            label.appendChild(labelContent);
            colInput.appendChild(input);
        }        
    }      

    filaBtns = document.createElement("tr");
    colBtns = document.createElement("td");

    btnDelete = document.createElement("button");
    btnDeleteContent = document.createTextNode("Borrar");
    btnDelete.style.display = "none";
    btnDelete.addEventListener("click",function(){
        event.preventDefault();    
        fileID = tabla.children[0];
        colId = fileID.children[1];
        id = colId.children[0].value;
        eliminarPersona(id);
    });

    btnAlta = document.createElement("button");
    btnAltaContent = document.createTextNode("Agregar");
    colBtns.colspan = "2";
    btnAlta.style.display = "none";
    btnAlta.addEventListener("click",function(){
        event.preventDefault();    
        primerFila = tabla.children[1];
        colNombre = primerFila.children[1];
        nombre = colNombre.children[0].value;
    
        segFila = tabla.children[2];
        colApe = segFila.children[1];
        apellido = colApe.children[0].value;
    
        terFila = tabla.children[3];
        colMail = terFila.children[1];
        mail = colMail.children[0].value;
    
        cuarFila = tabla.children[4];
        colGender = cuarFila.children[1];
        gender = colGender.children[0].value;    
        persona = new Persona(nombre, apellido, mail, gender);
        guardarPersona(persona);
    });
    btnUpdate = document.createElement("button");
    btnUpdateContent = document.createTextNode("Modificar");
    btnUpdate.style.display = "none";
    btnUpdate.addEventListener("click",function(){
        event.preventDefault();  
        fileID = tabla.children[0];
        colId = fileID.children[1];
        id = colId.children[0].value;

        primerFila = tabla.children[1];
        colNombre = primerFila.children[1];
        nombre = colNombre.children[0].value;
    
        segFila = tabla.children[2];
        colApe = segFila.children[1];
        apellido = colApe.children[0].value;
    
        terFila = tabla.children[3];
        colMail = terFila.children[1];
        mail = colMail.children[0].value;
    
        cuarFila = tabla.children[4];
        colGender = cuarFila.children[1];
        gender = colGender.children[0].value;    
        
        persona = new Persona();
        persona.id = id;
        persona.first_name = nombre;
        persona.last_name = apellido;
        persona.email = mail;
        persona.gender = gender;
        //persona = new Persona(nombre, apellido, mail, gender);        
        console.log(persona);
        modificarPersona(persona);
    });
    btnCancel = document.createElement("button");
    btnCancelContent = document.createTextNode("Cancelar");  
    btnCancel.addEventListener("click",function(){
        event.preventDefault();
        if(!document.getElementById("divFrm").classList.contains("hide")){
            document.getElementById("divFrm").classList.add("hide");
            if(document.getElementById("divFrm").classList.contains("show")){
                document.getElementById("divFrm").classList.remove("show");
            }
        }
    });
    tabla.appendChild(filaBtns);
    filaBtns.appendChild(colBtns);
    colBtns.appendChild(btnAlta);
    colBtns.appendChild(btnCancel);
    colBtns.appendChild(btnDelete);
    colBtns.appendChild(btnUpdate);
    btnCancel.appendChild(btnCancelContent);
    btnAlta.appendChild(btnAltaContent);
    btnUpdate.appendChild(btnUpdateContent);
    btnDelete.appendChild(btnDeleteContent);    
}


function altaPersona() {
    //agregar el codigo que crea conveniente

    var nuevaPersona = new Persona(nombre, apellido, email, sexo);

    //enviar la insercion al server
}


function eliminacionPersona() {
    //agregar el codigo que crea conveniente

    var id = parseInt(document.getElementById('id').value);

    //enviar la eliminacion al server


}

function modificacionPersona(persona) {
    //agregar el codigo que crea conveniente
    var gender;
    if (document.getElementById('rdoMasculino').checked) {
        gender = document.getElementById('rdoMasculino').value;
    }
    else {
        gender = document.getElementById('rdoFemenino').value;
    }
    persona.gender = gender;


    //enviar la modificacion al server


}

function Persona(nombre, apellido, email, sexo) {
    this.first_name = nombre;
    this.last_name = apellido;
    this.email = email;
    this.gender = sexo;
}




