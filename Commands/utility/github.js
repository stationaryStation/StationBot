module.exports = {
  name: 'repos',
  description: 'Sends the github repo link to the channel',
  args: false,
  cooldown: 5,
  wip: false,
  execute (message) {
    message.channel.send('Current Stable repo: https://github.com/stationaryStation/stationBot/\nCurrent Unstable Repo: https://gitlab.com/stationarystation/stationbot')
  }
}
