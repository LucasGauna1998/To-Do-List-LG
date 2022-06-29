//VARIABLES TAREAS
const formulario = document.querySelector('#formulario-tarea');
const tarea = document.querySelector('#tarea');
const fecha = document.querySelector('#fecha');
const hora = document.querySelector('#hora');
const contenedorMensajes = document.querySelector('.message');
const ulTareas = document.querySelector('#group-task');

//VARIABLES FECHA
const ObjFecha = new Date();
const diasSemanas = [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ];
const meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sepmtiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
const numeroDia = ObjFecha.getDate();
const dia = diasSemanas[ObjFecha.getDay()];
const mes = meses[ ObjFecha.getMonth() ];
const year = ObjFecha.getFullYear();
const fechaActualHhtml = `${dia} ${numeroDia} de ${mes} de ${year}`; 
const contenedorFecha = document.querySelector( '#fecha-actual' );
contenedorFecha.textContent = fechaActualHhtml;

//VARIABLES HORA ACTUAL
let horaHTML = document.querySelector('#hora-actual');
let minutoHTML = document.querySelector('#minuto-actual');
let segundoHTML = document.querySelector('#segundo-actual');
let listaTareas = [];
const DBL = localStorage;
 
mostrarTareasDOM();
//EVENTLISTERNERS

eventListeners();
//FUNCIONES
function eventListeners(){

    formulario.addEventListener( 'submit', agregarTarea );
    ulTareas.addEventListener( 'click', accion );
    
    
}

function horaActual (){

    const fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    
    horaHTML.textContent = String( hora ).padStart( 2, "0" );
    minutoHTML.textContent =String( minutos ).padStart( 2, "0" );
    segundoHTML.textContent = String( segundos ).padStart( 2, "0" );

    
    setTimeout( horaActual , 1000);
}   

horaActual();

function agregarTarea( e ){
    e.preventDefault();

    let tareaObj = {
        tarea : tarea.value,
        fecha : fecha.value,
        hora : hora.value,
        estado : 'PENDIENTE'
    }

    if ( validarCampos (tareaObj) ){
        //Crea el HTML de la tarea
        crearHTML( tareaObj );
        agregarTareaDB( tareaObj );
        
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
    const {tarea, fecha, hora, estado } = tareaObj
    //Formato Fecha
    let nuevaFecha = fecha.split('-');
    nuevaFecha = ` ${nuevaFecha[2]}/${nuevaFecha[1]}/${nuevaFecha[0]}`;
    

    //Contenedor Tarea
    let li = document.createElement('li');
    li.classList.add( 'task', 'sombra' );
    if (tareaObj.estado == 'COMPLETO'){
        li.classList.add('success');
    }
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
    if ( tareaObj.estado == 'PENDIENTE' ) {
        //Boton Completo
        let btnCompleto = document.createElement('a');
        btnCompleto.classList.add( 'btn', 'complete', 'success' );
        btnCompleto.innerHTML = `<span class="icon fa-regular fa-circle-check"></span>`;
        divActions.appendChild(btnCompleto);
    }
    
    //Boton Trash
    let btnTrash = document.createElement('a');
    btnTrash.classList.add( 'btn', 'delete-task', 'delete' );
    btnTrash.innerHTML = `<span class="icon fa-regular fa-trash-can"></span>`;
    //Agregamos los botones al contenedor de acciones
    
    divActions.appendChild(btnTrash);
    //Agregamos la fecha, tarea, hora, contenedor aciones al LI - task
    li.appendChild(parrafoFecha);
    li.appendChild(parrafoTarea);
    li.appendChild(parrafoHora);
    li.appendChild(divActions);
    ulTareas.appendChild(li);
    
}


function agregarTareaDB ( tareaObj ) {
    listaTareas.push(tareaObj);
    if ( !DBL.getItem( 'tareas' ) ){
        DBL.setItem( 'tareas' , JSON.stringify( listaTareas ) );
        
    }else {
        let listaDB = JSON.parse(DBL.getItem('tareas'));

        listaTareas.forEach( tarea => {
            listaDB.push( tarea );
        });
        
        DBL.setItem('tareas', JSON.stringify( listaDB ));
        listaTareas = [];
    }
}

function mostrarTareasDOM( ) {
    if (DBL.getItem('tareas')) {
        let tareasDB = JSON.parse( DBL.getItem('tareas') );
        tareasDB.forEach( tareaOBJ => {
            crearHTML(tareaOBJ);
        }) 
    }
}

function accion ( e ) {
    e.preventDefault();
    if ( e.target.classList.contains('complete') ) {
        let tarea = e.target.parentElement.parentElement;
        e.target.remove();
        tarea.classList.add('success');
        let tareaCompletada = {
            tarea : tarea.querySelector('p.texto-tarea').textContent,
            hora : tarea.querySelector('p.hora').textContent,
            fecha : tarea.querySelector('p.fecha').textContent
        }

        tareaCompleta(tareaCompletada);

    }

    if ( e.target.classList.contains('delete-task')) {
        let tarea = e.target.parentElement.parentElement;
        let tareaEliminar = {
            tarea : tarea.querySelector('p.texto-tarea').textContent,
            hora : tarea.querySelector('p.hora').textContent,
            fecha : tarea.querySelector('p.fecha').textContent
        }
        eliminarTarea( tareaEliminar );
        tarea.remove();
        
    }
}


function tareaCompleta( tareaObj ) {
    let tareasDB = JSON.parse( DBL.getItem('tareas'));
    let nuevasTareas = tareasDB.map( tareaDB => {
        
        if ( tareaDB.tarea == tareaObj.tarea ) {
            console.log(tareaObj)
            console.log(tareaDB)
            console.log('Si se parecen');
            tareaDB.estado = 'COMPLETO';
            console.log(tareaDB);
            return tareaDB;
        }else {
            return tareaDB;
        }
    })
    console.log( nuevasTareas );
    DBL.setItem('tareas', JSON.stringify( nuevasTareas ) );
    listaTareas = [];
}


function eliminarTarea( tareaObj ) {
    let tareasDB = JSON.parse( DBL.getItem('tareas'));
    let nuevasTareas = tareasDB.filter( tareaDB => tareaDB.tarea != tareaObj.tarea && tareaDB.horaa != tareaObj.hora )

    DBL.setItem('tareas', JSON.stringify(nuevasTareas) );
    listaTareas = [];
}