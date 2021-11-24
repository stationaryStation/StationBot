module.exports = {
  name: 'issue',
  description: 'Sends a link to the StationBot v2 Issue page',
  cooldown: 5,
  args: false,
  wip: false,
  execute (message) {
    message.channel.send('Report a bug or issue here: https://github.com/stationaryStation/stationBot/issues')
  }
}
