module.exports = {
    name: 'github',
    description: 'Sends the github repo link to the channel',
    args: false,
    execute(message) {
        message.channel.send('https://github.com/stationaryStation/stationBot/');
    }
}