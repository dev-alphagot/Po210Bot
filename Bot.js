const discord = require("discord.js");
const client = new discord.Client();
var usage = require('usage');
var usageObj = Object()
var ver = process.env.version
var userStats = new Map([["template", {"name": "goza", "gots": 1}]])
const readline = require("readline")
const dataLoader = require("./dataManager");
const moneyManager = require("./moneyManager")
const yacht = require("./yachtAPI")
const fs = require("fs")
var update

usage.lookup(process.pid, (e, d) => {
  if(!e){
    usageObj = d
  }else{
    console.log("usage-lookup/e, text -> " + e.toString())
  }
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.setPrompt("po210 Console|# ")
rl.prompt()
rl.on("line", (data) => {
  switch(data.split(" ")[0]){
    case "reload":
      process.exit(9)
      break
    case "debug":
      console.log(userStats)
      break
    default:
      console.log("Bad command or file name")
      break
  }
})

function sendEmbed(res, color = 0, title = "지정되지 않은 타이틀", desc = "지정되지 않은 주 텍스트"){
  var tmp = new discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setFooter(`Po210Bot | Version = ${ver}`)
  res.channel.send(tmp)
}

client.on("ready", () => {
  console.log("Bot is online!");
  update = JSON.parse(fs.readFileSync("updates.json"))
  ver = update.version
  console.log(moneyManager.moneyToString(2))
  console.log(moneyManager.moneyToString(2 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000))
  console.log(moneyManager.moneyToString(2 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000 * 10000))
});

client.on("message", res => {
  var msg = res.content;
  var argv = msg.split(" ");
  var argc = argv.length
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
            sendEmbed(res, 0x00FF00, "성공 - 도움말 출력/단순응답 명령어", "info = 개발자 정보 및 GitHub 리포지토리 출력\nupdates = 업데이트 내역 출력")
            break
          case "eco":
            sendEmbed(res, 0x00FF00, "성공 - 도움말 출력/가상경제 명령어", "모든 명령어는 po!eco로 시작\n* 표시 = 계좌 생성 요구\n\nmymoney * = 현재 보유한 돈 확인\ncreateacc = 계좌 생성\nyacht * = 야추 게임")
            break
          default:
            sendEmbed(res, 0xFF0000, "실패 - 도움말 출력/분류 없음", "해당 분류가 존재하지 않음.")
        }
      }else{
        sendEmbed(res, 0xFF0000, "실패 - 도움말 출력/분류를 입력하지 않음", "분류가 입력되지 않음.")
      }
      break
    case "po!eco":
      if(dataLoader.isUserExist(res.author.id.toString())) dataLoader.save(res.author.id.toString(), userStats.get(res.author.id.toString()))
      if(argv.length > 1){
        switch(argv[1]){
          case "mymoney":
            if(dataLoader.isUserExist(res.author.id.toString())){
              sendEmbed(res, 0x00FF00, "성공 - 현재 보유한 돈 출력", `현재 보유한 돈: ${moneyManager.moneyToString(userStats.get(res.author.id.toString()).gots)}`)
            }else{
              userStats.set(res.author.id.toString(), dataLoader.load(res.author.id.toString()))
              sendEmbed(res, 0xFF0000, "실패 - 현재 보유한 돈 출력", "계좌가 존재하지 않음. ```po!eco createacc```")
            }
            break
          case "createacc":
            if(!dataLoader.isUserExist(res.author.id.toString())){
              userStats.set(res.author.id.toString(), {
                "name": res.author.username,
                "gots": 10000
              })
              dataLoader.save(res.author.id.toString(), userStats.get(res.author.id.toString()))
              sendEmbed(res, 0x00FF00, "성공 - 계좌 생성", `계좌 생성 성공.`)
            }else{
              sendEmbed(res, 0xFF0000, "실패 - 계좌 생성", "계좌가 이미 존재함.")
            }
            break
          case "yacht":
            if(argc > 2){
              if(argv[2] == "host"){
                if(argc > 3){
                  return
                }else{
                  sendEmbed(res, 0xFF0000, "실패 - 야추", "점당 몇 곶인 지 입력되지 않음.")
                }
              }
            }else{
              sendEmbed(res, 0xFF0000, "실패 - 야추", "호스트 / 게스트 여부 입력되지 않음.")
            }
        }
      }else{
        sendEmbed(res, 0xFF0000, "실패 - 경제 명령어", "명령어가 지정되지 않음.")
      }
      break
    case "po!updates":
      let textgen = "명령어 추가: \n - " +
        update.new.join("\n - ") +
        "명령어 제거: \n - " +
        update.deleted.join("\n - ") + 
        "명령어 변경: \n - " +
        update.changed.join("\n - ") +
        "기타 변경사항: \n - " +
        update.etc.join("\n - ")
      let embed = new discord.RichEmbed()
        .setTitle("성공 - 업데이트 내역 확인")
        .setFooter(`Po210 Bot | Version = ${ver}`)
        .setDescription(textgen)
        .setColor(0x00FF00)
      res.channel.send(embed)
      break
  }
});

client.login(process.env.BOT_TOKEN); 
