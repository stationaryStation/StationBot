const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "st!";
client.on('ready', () => {
    console.log('Bot ready for operation.')
});

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "serverinfo") {
        message.channel.send(`Server name: ${message.guild.name}\n Total Members: ${message.guild.memberCount}`)
    }
    if (command === "test") {
        message.reply('Hello World!');
    }
    // Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    // Kick Command
    if (command === "kick") {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick('Someone was kicked using st!kick').then(() => {
                    message.reply(`Successfully kicked ${user.tag} `)
                }).catch(err => {
                    message.reply(`Failed to kick ${user.tag}. Do i got the necessary permissions?`);
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!")
        }
    }
});

client.login(config.BOT_TOKEN)