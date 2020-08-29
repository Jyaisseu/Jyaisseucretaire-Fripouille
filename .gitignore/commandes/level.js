const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require('/app/modules/economie.js');

module.exports.run = async (client, message) => {
    Eco.findOne({
    User_ID: message.author.id}, (err, economie) => {
        var main_level = economie.level    
        message.channel.send(`Tu es actuellement BG niveau ${main_level} avec en supplément ${economie.xp +1} points BG, donc il te manque ${(main_level +1) * 10 -economie.xp -1} points pour passer au niveau suivant.`)
    })
}

module.exports.help = {
    name: "level"
}
