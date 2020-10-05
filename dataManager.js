const fs = require("fs")

function load(id){
    return JSON.parse(fs.readFileSync(`./userDatas/${id}.json`))
}

function isUserExist(id){
    return fs.existsSync(`./userDatas/${id}.json`)
}

function save(id, data){
    console.log(data)
    fs.writeFileSync(`./userDatas/${id}.json`, JSON.stringify(data))
}

module.exports = {
    load,
    save,
    isUserExist
}