const discord = require("discord.js");
const client = new discord.Client();
var usage = require('usage');
var usageObj = Object()
var ver = process.env.version

usage.lookup(process.pid, (e, d) => {
  if(!e){
    usageObj = d
  }else{
    console.log("usage-lookup/e, text -> " + e.toString())
  }
})

function sendEmbed(res, color, title, desc){
  var tmp = new discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setFooter(`Po₂₁₀ Bot ${ver}`)
  res.channel.send(tmp)
}

client.on("ready", () => {
  console.log("Bot is online!");
});

client.on("message", res => {
  var msg = res.content;
  var argv = msg.split(" ");
  switch (argv[0]) {
    case "po!usages":
      var ram = `${(usageObj.memory / 1048576).toString().split(".")[0]} MiB + ${((usageObj.memory - (parseInt((usageObj.memory / 1048576).toString().split(".")[0]) * 1048576)) / 1024).toString().split(".")[0]} KiB`
      var text = `CPU 사용량: ${process.cpuUsage().user}%\nRAM 사용량: ${ram}`
      sendEmbed(res, 0x00FF00, "성공 - 사용량 출력", text)
      break
    case "po!info":
      sendEmbed(res, 0x00FF00, "성공 - 봇 정보", `개발자: Kotlin-1.4.10#2214\n봇 리포지토리: https://github.com/shs3182ym/Po210Bot (GPLv3)`)
      break
  }
});

client.login(process.env.BOT_TOKEN); 
