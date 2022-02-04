module.exports = {
  name: 'inspire',
  args: false,
  description: 'Inspires you with a quote.',
  cooldown: 10,
  wip: false,
  execute(message) {
    function GetQuote() {
      return (
        fetch('https://zenquotes.io/api/random')
          // Get A quote from zenquotes.io and send data to a json file.
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return data[0].q + ' -' + data[0].a;
          })
      );
    }
    GetQuote().then((quote) => message.channel.send(quote));
  },
};
