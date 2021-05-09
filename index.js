const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "stu!";
client.on('ready', () => {
    console.log('Bot ready for operation. stationBot ver 1.0.1 (Unstable Github branch)')
    client.user.setActivity('stu!help for command list. | Using unstable branch.', {type: 'LISTENING'});
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
                    message.reply(`Successfully kicked ${user.tag} `);
                }).catch(err => {
                    message.reply(`Failed to kick ${user.tag}. Do i got the necessary permissions?`);
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }
    if (command === "ban") {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.ban('Someone was banned using st!ban').then(() => {
                    message.reply(`Successfully ban ${user.tag} `);
                }).catch(err => {
                    message.reply(`Failed to ban ${user.tag}. Do i got the necessary permissions?`);
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
    if (command === "help") {
        message.reply(`Current Commands:\n st!kick(username) | This command kicks the selected user.\n st!serverinfo | This command list the current user count of a server and the server name.\n st!ping | Pings the bot and tells your current ping.\n st!test | Sends Hello World! to the chat.\n st!ban(username) | Bans the username.`);
    }
    // if (command === "restart") {
    //     if (message.author.id === '567014451337887744') {
    //         message.channel.send('Restarting!').then(sentMessage => {
    //             sentMessage.react(':white_check_mark:')
    //             process.exit();
    //         });
    //     } else {
    //         message.reply("HEY! You can't just shutdown myself! You need the author's permission!");
    //     }
        
    // }
    if (command === "forcerestart") {
        process.exit();
    }
    if (command === "about") {
      message.reply(`stationBot 1.0.1u Unstable Branch\n Dependencies: node.js, discord.js v12\n Ping: ${timeTaken}ms `);
    }
    
});

client.login(config.BOT_TOKEN)
