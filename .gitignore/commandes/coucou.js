const Discord = require("discord.js");

module.exports.run = async (client, message) => {
    message.channel.send("Et bah coucou à toi aussi, " + message.author.username + " !")
}
module.exports.help = {
    name: "coucou"
}