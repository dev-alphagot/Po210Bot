const discord = require("discord.js");
const client = new discord.Client();

client.on("ready", () => {
  console.log("Bot is online!");
});

client.on("message", res => {
  var msg = res.content;
  var argv = msg.split(" ");
  switch (argv[0]) {
    case "usages":
  }
});

client.login(process.env.BOT_TOKEN);
