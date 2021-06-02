module.exports = {
    name: 'inspire',
    args: false,
    description: 'Inspires you with a quote.',
    // eslint-disable-next-line no-unused-vars
    execute(message, args, botVer, prefix){
        function GetQuote() {
            return fetch("https://zenquotes.io/api/random")
            // Get A quote from zenquotes.io and send data to a json file.
            .then(res => {
              return res.json()
              })
            .then(data => {
              return data[0]["q"] + " -" + data[0]["a"]
            })
        }
        GetQuote().then(quote => message.channel.send(quote))
    }
}