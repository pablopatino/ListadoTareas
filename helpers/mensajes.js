require('colors')
const inquier = require('inquirer')

const monstrarMenu = () => {

    return new Promise( (resolve => {

        console.clear();

        console.log('======================'.red)
        console.log('Seleccionar una Opcion')
        console.log('======================\n'.red)
    
    
        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar una tarea`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Borrar Tareas`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('\nSeleccione una opcion: ', ( opt ) => {
            readline.close();
            resolve( opt )
        });

    }) )

}

const pause = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar : `, ( opt ) => {
            readline.close();
            resolve()
        });
    } )
  
}

module.exports = {
    monstrarMenu,
    pause
}


