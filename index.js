const Discord = require('discord.js');
// Required variables
const config = require('./config.json');
const client = new Discord.Client();
const prefix = config.prefix
// When the bot is ready, the presence is set to the help command.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.\n Ver: ${config.botVer}\n Prefix: ${prefix}`);
  console.log('Bot ready for operation.');
  if (config.stable == true){
    client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
        type: 'LISTENING'
     });
  } else if (config.stable == false) {
    client.user.setActivity(`${prefix}help for command list. | Using Unstable Branch`, {
        type: 'LISTENING'
     });
  }else if (config.branchNext == true){
    client.user.setActivity(`${prefix}help for command list. | Using Next Branch`, {
        type: 'LISTENING'
     });
  } else {
      // This is just in case of the bot breaking.
      console.error("An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues");
  }
  
});
// When a message is sended in a guild(Server), it will be logged on the console/output
client.on('message', message => {
  console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);
});
client.on("message", function (message) {
    if (message.author.bot) return;
    // if there isn't an author, return
    if (!message.content.startsWith(prefix)) return; 
    // if no prefix was on the message, return

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    // lists bot info
    if (command === "botinfo") {
        // Create a Embed message with bot information
        const botInfoEmbed = new Discord.MessageEmbed()
	.setColor('#FF0057')
	.setTitle(`StationBot ${config.botVer}`)
	.setURL('https://github.com/stationaryStation/stationBot')
	.setAuthor('stationaryStation', 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png', 'https://github.com/stationaryStation')
	.setDescription(`StationBot by stationaryStation\nA bot for moderation made with the powerful discord.js engine.`)
	.setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png')
        // Then send the embed to the user's channel
        message.channel.send(botInfoEmbed)
    }
    // Lists server info
    if (command === "serverinfo") {
        const serverInfoEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Server Information`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20SeverInfo.png`)
        message.channel.send(serverInfoEmbed)
    }
    // test if the bot works
    if (command === "test") {
        const TestEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Test Embed`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Testing Embeds and messages`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Test.png`)
    message.channel.send(TestEmbed)
    }
    // Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        const PingEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Pong!`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Your current ping is: ${timeTaken}`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Ping.png`)
        message.channel.send(PingEmbed);
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
                message.reply("That user isn't in this server!");
            }
        } else {
            message.reply("You didn't mention the user to kick!")
        }
    }
    // ban command
    if (command === "ban") {
        const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban('Someone was banned using st!ban').then(() => {
                        message.reply(`Successfully ban ${user.tag} `)
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

    // Help Command
    if (command === "help") {
        const cmd = message.content.replace(`${prefix}help`,'').split(' ').pop().trim();
        if (cmd === "kick" ) {
            message.channel.send(`${prefix}kick <username>\nUsage: Kicks the user that you mentioned. `);
        } else if (cmd ==="ping" ) {
            message.channel.send(`${prefix}ping\nUsage: The bot replies to you with your current ping.`);
        } else if (cmd === "shutdown") {
            message.channel.send(`${prefix}shutdown\nUsage: Shutdowns the bot.\n Requirements: Be the dev`);
        } else if (cmd === "restart") {
            message.channel.send(`${prefix}restart\nUsage: Restarts the bot`);
        } else if (cmd === "help") {
            message.channel.send(`${prefix}help <command>\nUsage: Lists all current commands`);
        } else if (cmd === "ban") {
            message.channel.send(`${prefix}ban <UserID/User>\nUsage: Bans the user mentioned permanently\nRequirements: Be an admin`);
        } else if (cmd === "pootisfy" && config.stable == false) {
            message.channel.send(`${prefix}pootisfy\n Usage: Changes your nickname to pootis\nRequirements: You need to not have the manage nicknames permission and the change nickname permission`);
        } else if (cmd === "changeusernick") {
            message.channel.send(`${prefix}changeusernick <user> <nick>\nUsage: Changes the nickname of the user mentioned to whatever you like`);
        } else if (cmd === "changenick") {
            message.channel.send(`${prefix}changenick <nick>\nUsage: Changes your nickname to whatever you like\nRequirements: You need to not have nor the manage nicknames permission and the change nickname permission `);
        } else if (cmd === "boop"){
            message.channel.send(`${prefix}boop <user>\n Usage: Boops the mentioned user`);
        } else if (cmd === "devmedia") {
            message.channel.send(`${prefix}devmedia\nUsage: Lists stationaryStation's social media`);
        } else if (cmd === "" && config.stable == false) {
            // if no command was imputed, list all stable and unstable commands
            message.channel.send(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\npootisfy\nban\nhelp\nrestart\nshutdown\nping\nkick`);
        } else if (cmd === "" && config.stable == true) {
            // if no command was imputed, List all stable commands
            message.channel.send(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\nban\nhelp\nrestart\nshutdown\nping\nkick`);
        } else if (cmd === "math") {
            message.channel.send(`${prefix}math\nInfo: Calculate simple operations\nUsage: \`\`\`${prefix}math <op> <num1> <num2>\`\`\`\nArguments:\n Op: add, sub, div, multi, pow, root\n Num1: Insert a number\n Num2: Insert A number `)
        }
       
    }
    // Shutdown command, Dev only
    if (command === "shutdown") {
        if (message.author.id === config.devID) {
            message.channel.send('Goodbye...').then(sentMessage => {
                sentMessage.react(':white_check_mark:')
                // eslint-disable-next-line no-undef
                process.exit();
            });
        } else {
            message.reply("HEY! You can't just shutdown myself! You need the author's permission!");
        }

    }
    // Restart command, unstable mode only
    if (command === "restart" && config.stable == false) {
        // eslint-disable-next-line no-undef
        process.exit();
    }
    // Nickname changer command, User mention.
    if (command === "changeusernick") {
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        memberToEdit.setNickname(newNickname);''

    }
    // Change your own nickname.
    if (command === "changenick") {
        const newNick = message.content.replace(`${prefix}changenick`, '').split(' ').pop().trim();
        message.member.setNickname(newNick);
    }
    // Lists Developer commands
    if (command === "devcommands") {
        message.channel.send(`Current Dev Commands:\n shutdown: Shutdowns the bot. If node.js mode is enabled, the bot will shutdown.\n st!restart: Restarts the bot, if you are the owner.\n st!checkmode: Lists the `);
    }
    // Lists The original developer's social media
    if (command === "devmedia") {
        message.channel.send(`Dev's twitter:\n https://twitter.com/dumplingfurry/\n Dev's StackOverflow:\n https://stackoverflow.com/users/15887961/stationarystation?tab=profile\n Dev's Github: https://github.com/stationaryStation `);
    }
    // Pootisfy Command
    if (command === "pootisfy") {
      const nick = 'pootis' // add nick as pootis
      message.member.setNickname(nick); // change the message author's nick to pootis
    }
    // Reset Nickname command, unstable mode only
    if (command === "resetnick"&& config.stable == false) { // Check if stable mode is false then run
        const nick = message.author.tag();
        message.member.setNickname(nick);
        
    }
    // Pings a selected user.
    if (command === "boop") {
        const userToPing = message.mentions.members.first()
        if (userToPing){
            const BoopSuccessful = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle(`Boop!`)
            .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
            .setDescription(`${userToPing}, you Have been booped! ;p`)
            .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png`)
            message.channel.send(BoopSuccessful)
        } else {
            const BoopFailed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`>:(`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Please mention a user to ping/boop.`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png`)
    message.channel.send(BoopFailed)
        }
    }
    // Issue command, unstable mode only
    if (command === "issue"&& config.stable == false) { // check if stable mode is false then run
        message.channel.send('https://github.com/stationaryStation/stationBot/issues');
        message.channel.send('Post your issues here. Also, here you can look at the code :depressed:');
    }
    // sends the github repo to your current channel
    if (command === "github") {
        message.channel.send('https://github.com/stationaryStation/stationBot/');
    }
    // Checks the current mode the bot is running.
    if (command === "checkmode") {
        if (config.stable == true) { // if unstable mode is true then say on the channel that unstable mode is on
            message.channel.send("Running on stable mode.");
        } else if (config.stable == false){ // if stable mode is true then say on the channel that stable mode is on
            message.channel.send("Running on unstable mode.");
        } else {
            message.channel.send("An unexpected error has occurred. Please report it with st!issue");
        }
    }
    // Math command
    if (command === 'math'){
        // Add variables for operations
        let op = args[0]
        let num1 = args[1]
        let num2 = args[2]

        // Make integer variables
        let parseNum1 = parseInt(num1)
        let parseNum2 = parseInt(num2)
        // Add answer variable
        let ans
        
        // If there is no operation, send the available operations and cancel request
        if (!op) {
            message.channel.send(`You need to specify the operation and the operands.\nAvailable Operations:\n sum\n res\n div\n multi\n pow\n root`);
        } else {
            if (op === "add"){
                if(!args[1] || !args[2]) {
                    // Send that you didn't specify num1 and num2
                    message.channel.send("You need to specify the operands.");
                } else {
                    // Send the answer after parsing num1 and num2
                    ans = parseNum1 + parseNum2
                    const SumAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Plus.png`)
                    message.channel.send(SumAnswer)
                }

            } else if(op === "sub"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else{
                    const SubAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Minus.png`)
                    ans = parseNum1 - parseNum2
                    message.channel.send(SubAnswer)
                }

            } else if(op === "multi"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    const MultiAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Multi.png`)
                    ans = parseNum1 * parseNum2
                    message.channel.send(MultiAnswer)
                }

            } else if(op === "div"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    const DivAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Div.png`)
                    ans = parseNum1 / parseNum2
                    message.channel.send(DivAnswer)
                }

            }else if(op === "mod"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = parseNum1 % parseNum2
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }else if(op === "pow"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = Math.pow(parseNum1, parseNum2);
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }else if(op === "root"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                }else {
                    ans = Math.pow(parseNum1, 1/parseNum2);
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }
        }

    }
    if (command === "changelog") {
        const Changelog = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`StationBot Changelog`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Ver ${config.botVer}:\nAdded Embeds in some commands\nAdded st!changelog\nAdded EmbedIcons designed by stationaryStation`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png`)
                    message.channel.send(Changelog)
    }
    

}); 
// After that, login to the bot account.
client.login(config.BOT_TOKEN);

// Change bot's avatar and Username from config.json WIP
// client.user.setAvatar('https://raw.githubusercontent.com/stationaryStation/StationBot/master/ProfilePictures/V2%20(Account).png');
// client.user.setUsername(config.botUsername)