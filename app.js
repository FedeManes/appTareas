const { fstat } = require('fs');
const { escribirJSON, archivo } = require('./tareas');
let archivoTareas = require ('./tareas');

let accion = process.argv[2];

switch(accion) {
    case 'listar':
        console.log('Listado de tareas');
        let tareas = archivoTareas.leerJSON();

        tareas.forEach(function(tarea, index){
            console.log( (index + 1) + '. ' + tarea.titulo + ' - ' + tarea.estado);
        })

        /*tareas.forEach((tarea, index)=>{
            console.log( (index + 1) + '. ' + tarea.titulo + ' - ' + tarea.estado);
        })*/

        console.log();
        break;

    case 'crear':
        let tituloNuevo = process.argv[3];
        let tareaNueva= 
        {
            titulo: tituloNuevo,
            estado: "pendiente"
        }
        
        archivoTareas.guardarTarea(tareaNueva);
        console.log( "La tarea creada fue:");
        console.log( tareaNueva.titulo + ' -> ' + tareaNueva.estado);

        break;
            
    case 'status':
        let filtro = process.argv[3];
        let tareaFiltrada = archivoTareas.statusTarea(filtro);
        console.log( "La tarea consultada fue: "+ tareaFiltrada.titulo);
        console.log("Su estado es: " + tareaFiltrada.estado);
        break;

    case 'modificar':
        let titulo = process.argv[3];
        let estadoNuevo = process.argv[4];
        let tareaOriginal = archivoTareas.statusTarea(titulo);
        let tareasModificadas = archivoTareas.modificarEstado(titulo,estadoNuevo);
        archivoTareas.escribirJSON(tareasModificadas);
        let lista = archivoTareas.leerJSON();
        let tareaModificada = archivoTareas.statusTarea(titulo);
        console.log('La tarea: ' + tareaModificada.titulo + ' tenía el estado ' + tareaOriginal.estado + ' - ahora el nuevo estado es ' + tareaModificada.estado); 
        console.log();
        lista.forEach(function(tarea, index){
            console.log( (index + 1) + '. ' + tarea.titulo + ' - ' + tarea.estado);
        });
       
        break;

    case 'filtrar':
        let estado = process.argv[3];
        let filtrado = archivoTareas.filtrarEstado(estado);
        console.log( ' Las tareas que coincidieron con la búsqueda son; ');
        console.log();
        filtrado.forEach(function(tarea,index){
            console.log((index+1) + '. ' + tarea.titulo + ' - ' + tarea.estado);
        });

        break;

    case 'eliminar':
        let tarea = process.argv[3];
        let tareaEliminada = archivoTareas.statusTarea(tarea);
        archivoTareas.eliminarTarea(tarea);    

        console.log( ' La tarea eliminada fue: ' + tareaEliminada.titulo)
        console.log();

        break;

    case undefined:
        console.log('Tenes que pasarme una acción');
        break;

    default:
        console.log('No entiendo qué me estas pidiendo');
        console.log('Ñas acciones disponibles son: listar, crear, modificar, status, filtrar, eliminar');
        break;
}
