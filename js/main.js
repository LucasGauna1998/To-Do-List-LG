//VARIABLES
const formulario = document.querySelector('#formulario-tarea');
const tarea = document.querySelector('#tarea');
const fecha = document.querySelector('#fecha');
const hora = document.querySelector('#hora');
const contenedorMensajes = document.querySelector('.message');
const ulTareas = document.querySelector('#group-task');

//EVENTLISTERNERS

eventListeners();

function eventListeners(){

    formulario.addEventListener( 'submit', agregarTarea );
}



function agregarTarea( e ){
    e.preventDefault();

    const tareaObj = {
        tarea : tarea.value,
        fecha : fecha.value,
        hora : hora.value,
        estado : 'PENDIENTE'
    }

    if ( validarCampos (tareaObj) ){
        //Crea el HTML de la tarea
        console.log('hola');
        crearHTML( tareaObj );
    }
    
}

function validarCampos( tareaObj ) {

    const { tarea, fecha, hora } = tareaObj;

    if ( tarea == '' || fecha == '' || hora == '') {
        mostrarMensaje('Todos los campos son obligatorios', 'delete')

        return false;
    }else {
        mostrarMensaje('Tarea creada exitosamente!', 'success')
        
        return true;
    }
    
}


function mostrarMensaje( mensaje, clase ){
    //MOSTRAR MENSAJES SEGÚN LOS ELEMENTOS
    let divMensaje = document.createElement('div');
    divMensaje.classList.add( clase, 'message' );
    let parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    divMensaje.appendChild( parrafo );

    if ( clase == 'error' ){
        //LIMPIAR HTML PARA NO MOSTRAR MULTIPLES VECES LOS MENSAJES
        contenedorMensajes.textContent = '';
        contenedorMensajes.appendChild( divMensaje );
        setTimeout( () => {
            divMensaje.remove();
        },1500)
    }else {
        //LIMPIAR HTML PARA NO MOSTRAR MULTIPLES VECES LOS MENSAJES
        contenedorMensajes.textContent = '';
        contenedorMensajes.appendChild( divMensaje );
        setTimeout( () => {
            divMensaje.remove();
        },2000)
    }

}

function crearHTML( tareaObj ){
    console.log('hola');
    const {tarea, fecha, hora, estado } = tareaObj;
    //Formato Fecha
    let nuevaFecha = fecha.split('-');
    nuevaFecha = ` ${nuevaFecha[2]}/${nuevaFecha[1]}/${nuevaFecha[0]}`;
    

    //Contenedor Tarea
    let li = document.createElement('li');
    li.classList.add( 'task', 'sombra' );
    //Fecha Tare
    let parrafoFecha = document.createElement('p');
    parrafoFecha.classList.add('fecha');
    parrafoFecha.innerHTML = `<span class="fa-solid fa-calendar-days"></span> ${nuevaFecha}`;
    //Texto Tarea
    let parrafoTarea = document.createElement('p');
    parrafoTarea.classList.add('texto-tarea');
    parrafoTarea.textContent = tarea;
    //Hora Tarea
    let parrafoHora = document.createElement('p');
    parrafoHora.classList.add('hora');
    parrafoHora.innerHTML = `<span class="fa-solid fa-clock"></span> ${hora}`;
    //Acciones Tareas
    let divActions = document.createElement('div');
    divActions.classList.add('actions');
    //Boton Completo
    let btnCompleto = document.createElement('a');
    btnCompleto.classList.add( 'btn', 'complete', 'success' );
    btnCompleto.innerHTML = `<span class="icon fa-regular fa-circle-check"></span>`;

    //Boton Trash
    let btnTrash = document.createElement('a');
    btnTrash.classList.add( 'btn', 'delete-task', 'delete' );
    btnTrash.innerHTML = `<span class="icon fa-regular fa-trash-can"></span>`;
    //Agregamos los botones al contenedor de acciones
    divActions.appendChild(btnCompleto);
    divActions.appendChild(btnTrash);
    //Agregamos la fecha, tarea, hora, contenedor aciones al LI - task
    li.appendChild(parrafoFecha);
    li.appendChild(parrafoTarea);
    li.appendChild(parrafoHora);
    li.appendChild(divActions);
    ulTareas.appendChild(li);
}