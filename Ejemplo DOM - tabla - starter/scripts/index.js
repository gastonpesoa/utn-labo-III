var div;

window.addEventListener('load', function () {
    div = document.getElementById('myDiv');
    CreateTableFromObjectsArray(data, div);
});

var table, headerRow;

function CreateTableFromObjectsArray(arrayJson, div) {
    table = document.createElement('table');
    headerRow = document.createElement('tr');
    div.appendChild(table);
    table.appendChild(headerRow);
    CreateTableHeader(arrayJson[0], headerRow);
    CreateTableContent(arrayJson, table);
    OnClickRowHandler(table);
}

var headerCol, text, headers = [];

function CreateTableHeader(object, row) {
    for (keys in object) {
        headerCol = document.createElement('th');
        text = document.createTextNode(keys);
        headers.push(text);
        headerCol.appendChild(text);
        row.appendChild(headerCol);
    }
}

var row, cell, content;

function CreateTableContent(array, table) {
    for (i = 0; i < array.length; i++) {
        row = document.createElement('tr');
        table.appendChild(row);
        for (keys in array[i]) {
            cell = document.createElement('td');
            content = document.createTextNode(array[i][keys]);
            cell.appendChild(content);
            row.appendChild(cell);
        }
    }
}

var hijos;

function OnClickRowHandler(table) {
    hijos = table.children;
    for (i = 1; i < hijos.length; i++) {
        hijos[i].addEventListener('click', ShowModalEditForm);
    }
}

var modal, modalContent, span;

function ShowModalEditForm(event) {
    modal = document.getElementById('myModal');
    modalContent = document.getElementsByClassName('modal-body')[0];
    span = document.getElementsByClassName("close")[0];
    CreateModalEditForm(event, modalContent);
    modal.style.display = "block";
    span.onclick = function () {
        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }
        modal.style.display = "none";
    }
}

var row, rowCells, parrafo, input, content, label, texto, submitBtn;

function CreateModalEditForm(event, modalContent) {
    row = event.target.parentNode;
    rowCells = row.children;
    for (i = 1; i < rowCells.length; i++) {
        parrafo = document.createElement('p');
        modalContent.appendChild(parrafo);
        label = document.createElement('label');
        texto = document.createTextNode(headers[i].textContent);
        label.appendChild(texto);
        parrafo.appendChild(label);
        input = document.createElement('input');
        content = rowCells[i].textContent;
        if (typeof content == 'string') {
            input.setAttribute('type', 'text');
        }
        if (typeof content == 'number') {
            input.setAttribute('type', 'number');
        }
        input.setAttribute('placeholder', content);
        parrafo.appendChild(input);
    }
    parrafo = document.createElement('p');
    submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Grabar');    
    submitBtn.addEventListener('click', Guardar)
    parrafo.appendChild(submitBtn);    
    modalContent.appendChild(parrafo);
}

function CreateModalContent(modal, btn, span) {
    btn.onclick = function () {

    }

    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }
}