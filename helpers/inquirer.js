const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?'.red,
        choices: [
            {
                value:'1',
                name:'1. Crear Lista'.green
            },
            {
                value:'2',
                name:'2. Listar Tarea'.green
            },
            {
                value:'3',
                name:'3. Listar tarea completadas'.green
            },
            {
                value:'4',
                name:'4. Listar tareas pendientes'.green
            },
            {
                value:'5',
                name:'5. Completar Tareas'.green
            },
            {
                value:'6',
                name:'6. Borrar Tareas'.green
            },
            {
                value:'0',
                name:'0. Salir'.green
            }
        ]
    }
]

const enter = [{
    
    type:'input',
    name:'Enter',
    message:`\nPresione ${'ENTER'.green} para continuar : `

}]


const inquirerMenu = async() => {
    
    console.log('======================'.red)
    console.log('Seleccionar una Opcion')
    console.log('======================\n'.red)
    
    const { opcion } = await inquirer.prompt( preguntas )
    
    return opcion    
    
}

const pausa = async() => {
 
    console.log('\n')
    await inquirer.prompt( enter )
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'Desc',
            message,
            validate( value ){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { Desc } = await inquirer.prompt( question )
    return Desc;

}

const listadoTarreasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = i + 1

        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`
        }
    } )

    choices.unshift({
        value: '0',
        name: '0 para Cancelar'
    })

    const preguntas2 = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }       
    ]

    const { id } = await inquirer.prompt( preguntas2 )

    return id
}

const confirmar = async ( message ) =>{

    const question = [
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

const monstrarListadoCheckList = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = i + 1

        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`,
            checked: ( tarea.compleadoEn ) ? true : false
        }
    } )

    const preguntas = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }       
    ]

    const { ids } = await inquirer.prompt( preguntas )

    return ids
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTarreasBorrar,
    confirmar,
    monstrarListadoCheckList
}