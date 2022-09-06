const {promises:fs} = require('fs')

class Container {
    static newId = 0;
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(obj) {
        let objs = await this.getAll();
        if(objs.length == 0) {
            Container.newId = 1;
        }else{
            Container.newId++;
        }
        obj = {id:Date.now(),...obj}

        let data = [...objs,obj]
        try {
            await fs.writeFile(this.ruta,JSON.stringify(data,null,2))
        } catch (error) {
            throw new Error(`Error al guardar ${error}`)
        }
    }

    async getById(id) {
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id == id)
        if(obj.length == 0){
            return `No se puede obtener con id: ${id}`
        }
        return obj
    }

    async getAll() {
        try {
            const obj = await fs.readFile(this.ruta)
            return JSON.parse(obj)
        } catch (error) {
            return []
        }
    }

    async modify(obj) {
        let objs = await this.getAll();
        let index = objs.findIndex(o => o.id == obj.id);
        objs[index]=obj;
        try {
            await fs.writeFile(this.ruta,JSON.stringify(objs,null,2))
        } catch (error) {
            `No se puede modificar los datos`
        }
    }

    async deleteById(id) {
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id != id)
        try {
            await fs.writeFile(this.ruta,JSON.stringify(obj,null,2))
        } catch (error) {
            return `No se puede borrar el ID`
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta,JSON.stringify([],null,2))
        } catch (error) {
            return `No se pueden borrar`
        }
    }
}

let persona = new Container('./personas.json')

persona.modify({
    "id": 1659532182989,
    "name": "Tomás",
    "lastName": "Panadeiro"
})
.then(data=>console.log(data))
.catch((err=>console.log(err)))