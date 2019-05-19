
function procesarPersonas() {
    var spinner = document.getElementById('spinner');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log('XHR status == 200: ' + xhr.status + " - readystate 4: " + xhr.readyState);
            if (spinner.style.display == 'block' || spinner.style.display != 'none') {
                spinner.setAttribute('style','display:none;');                
            }
            arrayPersonas = JSON.parse(xhr.responseText);
            console.log(arrayPersonas);
            refrescarLista(arrayPersonas);
        }
        else {
            // setTimeout(function(){console.log('Error status: ' + xhr.status + " -  4: " + xhr.readyState)},3000); 
            alert('Error status: ' + xhr.status + " -  4: " + xhr.readyState)
        }
    }
    else {
        console.log('XHR status: ' + xhr.status + " - readystate != 4: " + xhr.readyState);
        if (spinner.style.display == 'none' || spinner.style.display == '') {
            spinner.setAttribute('style','display:block;');
        }
    }
}

function procesarPostRta() {
    var spinner = document.getElementById('spinner');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log('XHR status == 200: ' + xhr.status + " - readystate 4: " + xhr.readyState);
            if (spinner.style.display == 'block' || spinner.style.display != 'none') {
                spinner.setAttribute('style','display:none;');                
            }
            response = JSON.parse(xhr.responseText);
            console.log(response);
            traerPersonas();
        }
        else {
            // setTimeout(function(){console.log('Error status: ' + xhr.status + " -  4: " + xhr.readyState)},3000); 
            alert('Error status: ' + xhr.status + " -  4: " + xhr.readyState)
        }
    }
    else {
        console.log('XHR status: ' + xhr.status + " - readystate != 4: " + xhr.readyState);
        if (spinner.style.display == 'none' || spinner.style.display == '') {
            spinner.setAttribute('style','display:block;');
        }
    }
}