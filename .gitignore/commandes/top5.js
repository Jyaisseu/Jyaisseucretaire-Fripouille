const {
    MessageEmbed
} = require('discord.js');
const Eco = require('../modules/economie');

module.exports.run = async (Client, message) => {
    Client.getUsers = async guild => {
        const data = await Eco.find({
            __v: 0
        });
        if (data) return data;
        else return;
    };
    const topembed = new MessageEmbed()
    .setTitle('Top 5 des plus gros BG du serveur')
    .setDescription('Mais en vrai vous êtes tous un peu BG ici')
    await Client.getUsers(message.guild).then(p => {
        p.sort((a, b) => (a.total < b.total) ? 1: -1).splice(0, 5).forEach(e => {
            topembed.addField(e.pseudo, `BG niveau ${e.level} avec ${e.xp} points BG`);
        });
    });
    message.channel.send({
        embeds: [topembed]
    });
};

module.exports.help = {
    name: 'top5'
};
