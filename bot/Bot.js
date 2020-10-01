const discord = require("discord.js");
const client = new discord.Client();
const usage = require("usage")
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
  var tmp = new discord.MessageEmbed()
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
    case "usages":
      var ram = `${(usageObj.memory / 1048576).split(".")[0]} MiB + ${((usageObj.memory - (usageObj.memory / 1048576 * 1048576)) / 1024).split(".")[0]} KiB`
      var vmm = `${(usageObj.memoryInfo.vsize / 1048576).split(".")[0]} MiB + ${((usageObj.memoryInfo.vsize - (usageObj.memoryInfo.vsize / 1048576 * 1048576)) / 1024).split(".")[0]} KiB`
      var text = `CPU 사용량: ${usageObj.cpu}\nRAM 사용량: ${ram}\n가상 메모리 사용량: ${vmm}`
      sendEmbed(res, 0x00FF00, "성공 - 사용량 출력", text)
  }
});

client.login(process.env.BOT_TOKEN);