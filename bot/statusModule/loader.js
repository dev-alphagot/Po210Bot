const fs = require("fs")

function load(){
    let result = new Map()
    fs.readdir("./userDatas/").forEach((name) => {
        fs.readFile(name, 'utf8', (e, data) => {
            if(!e){
                result.set(JSON.parse(data))
            }
        })
    })
    return result
}

module.exports = {
    load
}