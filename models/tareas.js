const Tarea = require("./tarea");
require('colors')


class Tareas {

    _listado = {

    };

    get ListadoArr() {
    
        const listado = [];

        Object.keys(this._listado).forEach( element => {
            const tarea = this._listado[element]
            listado.push( tarea );
        } )

        
        return listado

    }

    constructor () {
        this._listado = {};
    }

    borrarTarea( id='' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }


    cargarTareasfromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        });


    }

    crearTarea( desc = '' ){

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea

    }

    listadoCompleto(){
        
    
        this.ListadoArr.forEach( (tarea, index) => {
            const idx = `${index + 1}`.green
            const { desc, compleadoEn } = tarea
            const estado = ( compleadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red

            console.log(`${idx} ${ desc } :: ${ estado } `)
        } )

        
    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.compleadoEn ) {
                tarea.compleadoEn = new Date().toISOString();
            }

        });

        this.ListadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ) {
                 this._listado[tarea.id].compleadoEn = null
                
            }

        });

    }

    listarPendientesCompletadas( completadas = true ){
        //True, solo listar completadas, false solo listar pendientes
        let contador = 0
        this.ListadoArr.forEach(  tarea  => {
            

            const { desc, compleadoEn } = tarea
            const estado = ( compleadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red           
            
            if ( completadas ) {
     
                if ( compleadoEn != null ) {
                    contador += 1
                    console.log(`${contador} ${ desc } :: Completado en: ${ compleadoEn } `)
                }
            } else if ( completadas === false ) {
                if ( compleadoEn == null ) {
                    contador += 1
                    console.log(`${contador} ${ desc } :: ${ estado } `)
                }
            }

        } )
        
      
    }

}


module.exports = Tareas