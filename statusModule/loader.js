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

module.exports = {
    load
}