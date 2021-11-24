module.exports = {
  name: 'devmedia',
  args: false,
  description: 'Lists StationaryStation\'s Developer media ',
  cooldown: 5,
  wip: false,
  // eslint-disable-next-line no-unused-vars
  execute (message, args) {
    message.channel.send('Dev\'s twitter:\n https://twitter.com/dumplingfurry/\n Dev\'s StackOverflow:\n https://stackoverflow.com/users/15887961/stationarystation?tab=profile\n Dev\'s Github: https://github.com/stationaryStation\n StationaryStation\'s Gitlab: https://gitlab.com/stationarystation')
	    console.log(`${message.user.tag} has invoked devmedia.js`)
  }
}
