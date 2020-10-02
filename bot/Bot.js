const discord = require("discord.js");
const client = new discord.Client();
var usage = require('usage');
var usageObj = Object()
var ver = process.env.version
var userStats = new HashMap()
const dataLoader = require("./statusModule/loader")
const moneyManager = require("./wtatusModule/moneyManager")

usage.lookup(process.pid, (e, d) => {
  if(!e){
    usageObj = d
  }else{
    console.log("usage-lookup/e, text -> " + e.toString())
  }
})

function sendEmbed(res, color = 0, title = "지정되지 않은 타이틀", desc = "지정되지 않은 주 텍스트"){
  var tmp = new discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setFooter(`Po₂₁₀ Bot / Version = ${ver}`)
  res.channel.send(tmp)
}

client.on("ready", () => {
  console.log("Bot is online!");
  userStats = dataLoader.load()
  console.log("debug/userData -> \n" + userStats)
});

client.on("message", res => {
  var msg = res.content;
  var argv = msg.split(" ");
  switch (argv[0]) {
    case "po!usages":
      var ram = `${(usageObj.memory / 1048576).toString().split(".")[0]} MiB + ${((usageObj.memory - (parseInt((usageObj.memory / 1048576).toString().split(".")[0]) * 1048576)) / 1024).toString().split(".")[0]} KiB`
      var text = `CPU 사용량: ${require("os").loadavg()[0]}%\nRAM 사용량: ${ram}`
      sendEmbed(res, 0x00FF00, "성공 - 사용량 출력", text)
      break
    case "po!info":
      sendEmbed(res, 0x00FF00, "성공 - 봇 정보", `개발자: Kotlin-1.4.10#2214\n봇 리포지토리: https://github.com/shs3182ym/Po210Bot (GPLv3)`)
      break
    case "po!help":
      if(argv.length > 1){
        switch(argv[1]){
          case "debug":
            sendEmbed(res, 0x00FF00, "성공 - 도움말 출력/디버그 명령어", "usages = 시스템 자원 사용량 출력")
            break
          case "text":
            sendEmbed(res, 0x00FF00, "성공 - 도움말 출력/단순응답 명령어", "info = 개발자 정보 및 GitHub 리포지토리 출력")
            break
          case "eco":
            sendEmbed(res, 0x00FF00, "성공 - 도움말 출력/가상경제 명령어", "해당 분류에 들어가는 명령어가 존재하지 않음.")
            break
          default:
            sendEmbed(res, 0xFF0000, "실패 - 도움말 출력/분류 없음", "해당 분류가 존재하지 않음.")
        }
      }else{
        sendEmbed(res, 0xFF0000, "실패 - 도움말 출력/분류를 입력하지 않음", "분류가 입력되지 않음.")
      }
  }
});

client.login(process.env.BOT_TOKEN); 
