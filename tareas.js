const fs = require ('fs');

let archivoTareas = {
    
    archivo: 'tareas.json',
    
    leerJSON: function() {
        return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
    },

    escribirJSON: function(tareas){
        fs.writeFileSync(this.archivo,JSON.stringify(tareas,null," "));
    },

    guardarTarea: function (tarea){
        let tareas = this.leerJSON();
        tareas.push(tarea);
        this.escribirJSON(tareas);
    },

    statusTarea: function (titulo){
        let tareas = this.leerJSON();
        let filtro = tareas.filter(function(tarea){
            if (tarea.titulo == titulo){
                return tarea;
            }
            //return tareas.titulo == titulo? true : false;  
        })
        let tareaFiltrada = filtro[0];
        return tareaFiltrada;
    },

    modificarEstado: function(titulo,estado){
        let tareas = this.leerJSON();
        let modificar = tareas.map(function(tarea){
            if(tarea.titulo == titulo){
                tarea.estado = estado;
                return tarea;
            }else{
                return tarea;
            };
        })
        
        return modificar;
    },
    
    filtrarEstado: function (estadoDeseado) {
        let tareas = this.leerJSON();
        let filtrado = tareas.filter( function(tarea){
            return (tarea.estado==estadoDeseado);
        })
        return filtrado;
    },

    eliminarTarea: function (titulo) {
        let tareas = this.leerJSON();
        let tareasRestantes = tareas.filter(function (tarea){
          // return tarea.titulo==titulo? false : true
          if(tarea.titulo!=titulo){
                return tarea;
          }
        })
        //tareas.slice(tareas.indexOf(tareaEliminada));   
        this.escribirJSON(tareasRestantes);
        tareasRestantes.forEach(function(tarea,index){
            console.log( (index+1) + '. ' + tarea.titulo + ' - ' + tarea.estado);
        })         
    } 

}

module.exports = archivoTareas;