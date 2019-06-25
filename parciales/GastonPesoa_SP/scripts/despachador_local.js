
function refrescarLista(personas) {

    lista = personas;
    actualizarTabla(lista);
    crearCheckBoxs(lista[0]);
    setAgeInfoSection();
    $('#spinner').remove();
}

function traerPersonasLocal() {

    setSpinner();
    lista = JSON.parse(localStorage.getItem('listaPersonas'));
    if (lista == null) {

        localStorage.setItem('listaPersonas', JSON.stringify(people.filter(p => {
            return p.active == 'true';
        })));
        lista = JSON.parse(localStorage.getItem('listaPersonas'));
    }
    refrescarLista(lista);
}

function guardarPersonaLocal(persona) {

    var listado = JSON.parse(localStorage.getItem('listaPersonas'));
    persona.id = getId(listado);
    listado.push(persona);
    localStorage.setItem('listaPersonas', JSON.stringify(listado));
    refrescarLista(listado);
}

function eliminarPersonaLocal(id) {

    var listado = JSON.parse(localStorage.getItem('listaPersonas'));
    indice = getIndex(listado, id);
    listado.splice(indice, 1);
    localStorage.setItem('listaPersonas', JSON.stringify(listado));
    refrescarLista(listado);
}

function modificarPersonaLocal(persona) {

    var listaPersonas = JSON.parse(localStorage.getItem('listaPersonas'));
    indice = getIndex(listaPersonas, persona.id);
    listaPersonas[indice].first_name = persona.first_name;
    listaPersonas[indice].last_name = persona.last_name;
    listaPersonas[indice].gender = persona.gender;
    listaPersonas[indice].email = persona.email;
    listaPersonas[indice].edad = persona.edad;
    listaPersonas[indice].tipo = persona.tipo;
    localStorage.setItem('listaPersonas', JSON.stringify(listaPersonas));
    refrescarLista(listaPersonas);
}

function getIndex(listaPersonas, id) {

    var indice = -1;
    for (i = 0; i < listaPersonas.length; i++) {
        if (listaPersonas[i].id == id)
            indice = i;
    }
    return indice;
}

function getId(listado)
{
    idMayor = listado.reduce(function(mayor, actual){
        if(mayor.id >  actual.id)
            return mayor;
        else
            return actual;
    }, 0);
    return idMayor.id + 1;
}