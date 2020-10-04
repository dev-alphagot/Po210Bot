const fs = require("fs")

function load(){
    let result = new Map()
    fs.readdirSync("./userDatas/").forEach((name) => {
        fs.readFile(name, 'utf8', (e, data) => {
            if(!e){
                result.set(name.split(".")[0], JSON.parse(data))
            }
        })
    })
    return result
}

function isUserExist(id){
    return fs.existsSync(`./userDatas/${id}.json`)
}

function save(id, data){
    fs.writeFileSync(`./userDatas/${id}.json`, JSON.stringify(data))
}

module.exports = {
    load,
    save,
    isUserExist
}