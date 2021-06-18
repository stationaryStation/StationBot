module.exports = {
  name: "roll",
  description: "Roll the dice to see your (possible) future!",
  args: true,
  usage: "<name%>",
  cooldown: 10,
  wip: true,
  execute(message, args) {
    const name = args[0]
    function roll(rollName) {
      const result = Math.random() * 100 + 1;
      return result; //Send the result
    }
    if(!name) {
      roll();
      message.channel.send(`You rolled: ${result}`);
    } else {
      roll(name); //Rolls the dice
      message.channel.send(`***${rollName}%***\n You rolled: ${result} `); //Sends the results
    }

  }
}
