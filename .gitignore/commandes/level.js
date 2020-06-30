const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Jyaisseu:er4007rp4011@jyaisseuctetaire-fripouille-zlrys.mongodb.net/Jyaisseucrétaire-Jojo-Fripouille?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true })
const Eco = require("Jyaisseucretaire-Fripouille/.gitignore/modules/economie.js");

module.exports.run = async (client, message) => {
    Eco.findOne({}, (err, economie) => {
        var main_level = economie.level    
        message.channel.send(`Tu es actuellement BG niveau ${main_level} avec en supplément ${economie.xp} points BG, donc il te manque ${main_level * 10 -economie.xp} points pour passer au niveau suivant.`)
    })
}

module.exports.help = {
    name: "level"
}
