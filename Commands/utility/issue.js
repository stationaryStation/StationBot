module.exports = {
    name: 'issue',
    description: 'Sends a link to the StationBot Issue page',
    execute(message, args){
        message.channel.send('https://github.com/stationaryStation/stationBot/issues');
        message.channel.send('Post your issues here. Also, here you can look at the code');
    }
}