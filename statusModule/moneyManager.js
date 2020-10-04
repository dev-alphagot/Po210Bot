var prefix = {
    default: "곶",
    prefix: ["", "만", "억", "조", "경", "해", "자", "정", "재", "극"]
};
  
function moneyToString(raw) {
  if (raw > 9999) {
    let j;
    for (var i = 1; i < 10; i++) {
      j = raw / Math.pow(10000, i);
      if (j < 1) {
        return (
          Math.floor(j * 10000) +
          prefix.prefix[i - 1] +
          " " +
          moneyToString(raw - Math.floor(j * Math.pow(10000, i)))
        );
      }
    }
  } else {
    return raw + " " + "곶";
  }
}

function stringToMoney(str){
  return parseInt(str.replace("곶", "").replace([경극만억자재정조해], "").replace(/ /g, ""))
}
  
module.exports = {
  moneyToString,
  stringToMoney
};
  