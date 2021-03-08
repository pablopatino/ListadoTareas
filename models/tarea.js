const { v4: uidv4 } = require('uuid')

class Tarea {

    id =  '';
    desc = '';
    compleadoEn = null

    constructor(desc){

        this.id = uidv4();
        this.desc = desc;
        this.compleadoEn = null;

    }

}

module.exports = Tarea