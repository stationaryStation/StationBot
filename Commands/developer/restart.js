module.exports = {
    name: 'restart',
    args: false,
    description: 'Restarts the bot. Developer only',
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        if (message.author.id === '567014451337887744') {
            message.channel.send('Goodbye...').then(sentMessage => {
                sentMessage.react(':white_check_mark:')
                // eslint-disable-next-line no-undef
                process.exit();
            });
        } else {
            message.reply("HEY! You can't just shutdown myself! You need the author's permission!");
        }
    }
}