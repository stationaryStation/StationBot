module.exports = {
  name: "roll",
  description: "Roll the dice to see your (possible) future!",
  args: true,
  usage: "<name%>",
  cooldown: 10,
  wip: true,
  execute(message, args) {
    const rollName = args[0]
    if(!rollName) {
      const result = Math.floor((Math.random() * 100) + 1);
      message.channel.send(`You rolled: ${result}`);
    } else {
      const result = Math.floor((Math.random() * 100) + 1);
      message.channel.send(`***${rollName}%***\n You rolled: ${result} `); //Sends the results
    }

  }
}
