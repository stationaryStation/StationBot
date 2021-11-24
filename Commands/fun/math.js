const Discord = require('discord.js')
module.exports = {
  name: 'math',
  args: true,
  usage: '<operation> <num1> <num2>',
  cooldown: 5,
  wip: false,
  // eslint-disable-next-line no-unused-vars
  execute (message, args, botVer) {
    // Add variables for operations
    const op = args[0]
    const num1 = args[1]
    const num2 = args[2]

    // Make integer variables
    const parseNum1 = parseInt(num1)
    const parseNum2 = parseInt(num2)
    // Add answer variable
    let ans

    // If there is no operation, send the available operations and cancel request
    if (!op) {
      message.channel.send('You need to specify the operation and the operands.\nAvailable Operations:\n sum\n res\n div\n multi\n pow\n root')
    } else {
      if (op === 'add') {
        if (!args[1] || !args[2]) {
          // Send that you didn't specify num1 and num2
          message.channel.send('You need to specify the operands.')
        } else {
          // Send the answer after parsing num1 and num2
          ans = parseNum1 + parseNum2
          const SumAnswer = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle('Math')
            .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
            .setDescription(`Your Answer is: ${ans}`)
            .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Plus.png')
          message.channel.send(SumAnswer)
        }
      } else if (op === 'sub') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = parseNum1 - parseNum2
          const SubAnswer = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle('Math')
            .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
            .setDescription(`Your Answer is: ${ans}`)
            .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Minus.png')
          message.channel.send(SubAnswer)
        }
      } else if (op === 'multi') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = parseNum1 * parseNum2
          const MultiAnswer = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle('Math')
            .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
            .setDescription(`Your Answer is: ${ans}`)
            .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Multi.png')
          message.channel.send(MultiAnswer)
        }
      } else if (op === 'div') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = parseNum1 / parseNum2
          const DivAnswer = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle('Math')
            .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
            .setDescription(`Your Answer is: ${ans}`)
            .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Div.png')
          message.channel.send(DivAnswer)
        }
      } else if (op === 'mod') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = parseNum1 % parseNum2
          message.channel.send(`Your answer is: ${ans}`)
        }
      } else if (op === 'pow') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = Math.pow(parseNum1, parseNum2)
          message.channel.send(`Your answer is: ${ans}`)
        }
      } else if (op === 'root') {
        if (!args[1] || !args[2]) {
          message.channel.send('You need to specify the operands.')
        } else {
          ans = Math.pow(parseNum1, 1 / parseNum2)
          message.channel.send(`Your answer is: ${ans}`)
        }
      }
    }
  }
}
