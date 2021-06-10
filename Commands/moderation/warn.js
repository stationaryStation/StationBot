const Discord = require('discord.js')
module.exports ={
    name: 'warn',
    description: 'Warns the mentioned user',
    args: true,
    usage: '<user> <reason>',
    cooldown: 10,
    wip: false,
    execute(message, prefix) {
        const user = message.mentions.users.first()
        const warnReason = message.content.replace(`${prefix}warn`, '').split(' ').pop().trim();
        const UserID = user.id
        if (!user){
            message.reply('You need to mention an user!')
            return;
        } else if (!warnReason) {
            message.reply('No reason for warning someone? Realy?')
            return;
        } else {
            const warnEmbed = new Discord.MessageEmbed()
            .setDescription('The user has been warned')
            .setColor('#FF0057');
            message.channel.send(warnEmbed)
            message.client.users.fetch(UserID).then((user) => {
               user.send(`You have been warned in ${message.guild} due the following reason:\n\`\`\`${warnReason}\`\`\` `)
        });
    }
        
        
    }
}