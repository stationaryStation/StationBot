module.exports = {
    name: 'kick',
    description: 'Kicks the mentioned user',
    args: true,
    usage: '<user>',
    cooldown: 10,
    wip: false,
    execute(message) {
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
}