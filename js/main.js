

//VARIABLES PANEL TASK
let btnAddTask = document.querySelector('#btn-add');
let texTarea = document.querySelector('#tarea');


//VARIABLES LIST TASK
let groupTask = document.querySelector('.group-task');
let task = document.querySelector('.task');

//DB
let DBLS = localStorage;
let tareas = [];


obtenerUsuario();
saludarUsuario();

function obtenerUsuario () {
    
    if (!DBLS.getItem('usuario')){
        let usuario = prompt('Hola, Ingrese su nombre para tener una mejor experiencia');
        DBLS.setItem('usuario', usuario);
    }
}

function saludarUsuario () {

    let usuario = DBLS.getItem('usuario');
    let saludo = document.createElement('H4');
    saludo.classList.add('saludo');
    saludo.innerHTML = `Hola <span>${usuario}</span> que tarea vamos a realizar hoy?`;

    document.querySelector('.panel-task').prepend(saludo);

}

texTarea.addEventListener('keypress', function(e) {
    
    if (e.charCode == 13) {
        agegarTarea();
    }
})  


if (DBLS.getItem('tareas')) {
    mostrarTareasDOM();
}



//Agregar Tarea
btnAddTask.addEventListener('click', agegarTarea);

function agegarTarea (e) {

    event.preventDefault();
    if(validarTarea()){

    let tareaOBJ = {
        tarea : texTarea.value,
        estado : '',
    }
    
    agregarTareaLS( texTarea.value );
    


    let divTarea = document.createElement('LI');
    divTarea.classList.add('task','sombra');
    let parrafoTarea = document.createElement('P');

    parrafoTarea.innerHTML = texTarea.value;
    divTarea.appendChild(parrafoTarea);
    
    
    //Creamos el contenedor de acciones
    let contenedorActions = document.createElement('DIV');
    contenedorActions.classList.add('actions');

    
    //Creamos las acciones y las agregamos las acciones
    let botonSucces = document.createElement('button');
    botonSucces.classList.add('complete');
    let botonDelete = document.createElement('button');
    botonDelete.classList.add('delete-task');
    botonSucces.innerHTML = `<span class="icon fa-regular fa-circle-check icon-success"></span>`;
    botonDelete.innerHTML = `<span class="icon fa-regular fa-trash-can icon-delete"></span>`;

    let actions = document.createElement('FORM');
    actions.classList.add('form-acctions');
    actions.setAttribute('method', '#');
    actions.setAttribute('acction', '#');
    actions.appendChild(botonSucces);
    actions.appendChild(botonDelete);
    

    //Añadimos las acciones al contenedor
    contenedorActions.appendChild(actions);

    divTarea.appendChild(contenedorActions);

    groupTask.appendChild(divTarea);
    }

    //Funcionalidades de las acciones
    //Eliminar Tarea
    let botonesDelete = document.querySelectorAll('.delete-task');
  
    botonesDelete.forEach( botonEliminar => {
        botonEliminar.addEventListener('click', eliminarTarea);
    })
    
    //Marcar Como completada
    let botonesComplete = document.querySelectorAll('.complete');

    botonesComplete.forEach( botonCompleto => {
        botonCompleto.addEventListener('click', tareaCompletada);
    })
   
    
    
}


function validarTarea () {
    let divMessage = document.querySelector('.message');
    let tarea = texTarea.value;
    
   
    if (tarea.length < 3 || tarea.length == ""){
        if(divMessage.firstElementChild) {

            parrafoError.remove();
        }
        let parrafoError = document.createElement('P');
        parrafoError.classList.add('delete', 'sombra');
        parrafoError.innerHTML = "La tarea no puede ir vacia";
        divMessage.appendChild(parrafoError);
        
        setTimeout( ( ) => {

            parrafoError.remove();
        },1500)
        
    
        
        
        return false;
        
    }else {
        
        let parrafoSucces = document.createElement('P');
        parrafoSucces.classList.add('success', 'sombra');
        parrafoSucces.innerHTML = 'Tarea Creada Exitosamente';
        divMessage.appendChild(parrafoSucces);
        
        setTimeout( ( ) => {

            parrafoSucces.remove();
        },1500)
        
        return true;
    }

}



function eliminarTarea (event) {

    event.preventDefault();
    let botonTrash = event.target.parentElement;
    
    if (botonTrash.classList == 'delete-task'){
        let tareaParrafo = botonTrash.parentElement.parentElement;
        tareaParrafo = tareaParrafo.previousSibling.textContent;
        let tarea = botonTrash.parentElement.parentElement.parentElement;
        eliminarTareaLS(tareaParrafo);
        tarea.remove();
        
    }else{
        let tarea = botonTrash.parentElement.parentElement;
        tarea.remove();
    }

}

function tareaCompletada(event) {
    event.preventDefault();
    let estado;
    let botonComplete = event.target.parentElement;

    if (botonComplete.classList == 'complete'){

        let tarea = botonComplete.parentElement.parentElement.parentElement;
        tarea.classList.add('success');
        botonComplete.remove();
        
        
    }else if(botonComplete.classList == 'icon') {
        let contenedorBoton = botonComplete.parentElement.parentElement;
        let tarea = contenedorBoton.parentElement.parentElement;
        tarea.classList.add('success'); 
    }else{
        let tarea = botonComplete.parentElement.parentElement;
        tarea.classList.add('success');
    }

    return estado = "COMPLETO";
   
}

function agregarTareaLS ( textoTarea ) {
    
    
    

    if ( !DBLS.getItem('tareas') ) {
        
        DBLS.setItem( 'tareas', JSON.stringify( [textoTarea] ) );
        
    }else {        
        tareas.push( textoTarea );
        let tareasDB = JSON.parse( DBLS.getItem('tareas') );

        tareas.forEach( tarea => {

            tareasDB.push( tarea );
        })
        
        DBLS.setItem('tareas' , JSON.stringify( tareasDB ) );
        tareas = [];
        

        return JSON.parse( DBLS.getItem('tareas') );        
    }
 
}

function mostrarTareasDOM ( tareas ) {
    
    tareas = JSON.parse( DBLS.getItem('tareas') );

    tareas.forEach( tarea => {
    
    let divTarea = document.createElement('LI');
    divTarea.classList.add('task','sombra');
    let parrafoTarea = document.createElement('P');

    parrafoTarea.innerHTML = tarea;
    divTarea.appendChild(parrafoTarea);
    
    
    //Creamos el contenedor de acciones
    let contenedorActions = document.createElement('DIV');
    contenedorActions.classList.add('actions');

    
    //Creamos las acciones y las agregamos las acciones
    let botonSucces = document.createElement('button');
    botonSucces.classList.add('complete');
    let botonDelete = document.createElement('button');
    botonDelete.classList.add('delete-task');
    botonSucces.innerHTML = `<span class="icon fa-regular fa-circle-check icon-success"></span>`;
    botonDelete.innerHTML = `<span class="icon fa-regular fa-trash-can icon-delete"></span>`;

    let actions = document.createElement('FORM');
    actions.classList.add('form-acctions');
    actions.setAttribute('method', '#');
    actions.setAttribute('acction', '#');
    actions.appendChild(botonSucces);
    actions.appendChild(botonDelete);
    

    //Añadimos las acciones al contenedor
    contenedorActions.appendChild(actions);

    divTarea.appendChild(contenedorActions);

    groupTask.appendChild(divTarea);
     //Funcionalidades de las acciones
    //Eliminar Tarea
    let botonesDelete = document.querySelectorAll('.delete-task');
  
    botonesDelete.forEach( botonEliminar => {
        botonEliminar.addEventListener('click', eliminarTarea);
    })
    
    //Marcar Como completada
    let botonesComplete = document.querySelectorAll('.complete');

    botonesComplete.forEach( botonCompleto => {
        botonCompleto.addEventListener('click', tareaCompletada);
    })
    })
    
}


function eliminarTareaLS ( tarea ) {
    let tareasDB = JSON.parse( DBLS.getItem('tareas') );

    let tareasNuevas = tareasDB.filter( tareaDB => tareaDB !== tarea );

    DBLS.setItem('tareas', JSON.stringify( tareasNuevas) );

}



