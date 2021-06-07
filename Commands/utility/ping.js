module.exports = {
    name: 'ping',
    description: 'Tells the User his ping with an embed',
    cooldown: 3,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, botVer, prefix){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Your current ping is ${timeTaken}ms`)
    }
}