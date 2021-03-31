const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Eco = require('app/modules/economie.js');

module.exports.run = async (client, message) => {
    client.getUsers = async guild => {
        const data = await Eco.find({ __v: 0 });
        if (data) return data;
        else return;
    };
    const embed = new MessageEmbed()
    .setTitle("Top 5 des plus BGs du serveur")
    .setDescription("Mais en vrai vous êtes tous un peu BG ici")
    await client.getUsers(message.guild).then(p => {
        p.sort((a, b) => (a.total < b.total) ? 1 : -1).splice(0, 5).forEach(e => {
            embed.addField(e.pseudo, `BG niveau ${e.level} avec ${e.xp} points BG`);
        });
    });
    message.channel.send(embed);
}

module.exports.help = {
    name: "top5"
}
