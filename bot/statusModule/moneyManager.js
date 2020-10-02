var prefix = {
    "default":{
        "en":"Gots",
        "ko": "곶"
    },
    "prefix":{
        "en":[
            "α",
            "β",
            "γ",
            "δ",
            "ε",
            "ζ",
            "η"
        ],
        "ko":[
            "알파",
            "베타",
            "감마",
            "델타",
            "엡실론",
            "제타",
            "에타"
        ]
    }
}

function moneyToString(raw){
    let j
    for(var i = 1; i < 8; i++){
        j = raw / Math.pow(1000, i)
        if(j < 1){
            return (j * 1000) + " " + prefix.prefix.ko[i - 1] + prefix.default.ko
        }
    }
}

module.exports = {
    moneyToString
}