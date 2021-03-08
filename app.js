require('colors');
const { stringify } = require('uuid');
const { inquirerMenu, pausa, leerInput, listadoTarreasBorrar, confirmar, monstrarListadoCheckList  } = require('./helpers/inquirer');
const { saveDatabase, leerDB } = require('./helpers/savefile')
const Tareas = require('./models/tareas');



const main = async () =>{ 

    let opc = ''

    const tareas = new Tareas();

    const tareasBD = leerDB();

    if (tareasBD) {
        tareas.cargarTareasfromArray( tareasBD )
    }

    do {

        opc = await inquirerMenu();

        switch (opc) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;
        
            case '2':
                tareas.listadoCompleto()
            break

            case '3':
                tareas.listarPendientesCompletadas()
            break
            
            case '4':
                tareas.listarPendientesCompletadas( false )
            break

            case '5':
              const ids =  await monstrarListadoCheckList( tareas.ListadoArr )
            tareas.toggleCompletadas( ids )
            break
            
            case '6':
               const id =  await listadoTarreasBorrar( tareas.ListadoArr )
               if (id !== '0') {
                   const ok = await confirmar('Esta seguro?');
    
                    if (ok ) {
                        tareas.borrarTarea( id )
                        console.log('Tarrea Borrada Correctamente')
                    }
               }
            break;

            case '0':
               break
            default:
            break;
        }

        saveDatabase( tareas.ListadoArr ) ;

        await pausa();
        
    } while ( opc !== '0' );

}


main();