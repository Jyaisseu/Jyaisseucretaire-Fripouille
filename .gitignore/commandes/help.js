const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (Client, message) => {
    const helpembed = new MessageEmbed()
    .setTitle('Liste des commandes du bot Jyaisseucrétaire')
    .setDescription('Pour connaître dans les moindres détails votre bot préféré !')
    .addField('!coucou', "Pour que le bot puisse te rappeler qu'il sera toujours là pour toi !")
    .addField('!level', "Affiche ton niveau de BG actuel, ainsi que ton nombre de points BG qu'il te manque pour passer au niveau supérieur.")
    .addField('!top5', 'Affiche les 5 membres les plus Bg du serveur.')
    .addField('!give [mentionner la personne] [nombre de points BG]', 'Permet de donner une partie de ses points BG à une autre personne.')
    .addField('!play [URL YouTube]', 'Joue une musique dans le salon vocal où tu te trouves.')
    .addField('!stop', 'Déconnecte le bot du salon vocal où tu te trouvs.')
    .addField('!help', 'Affiche la liste des commandes disponibles.')
    message.channel.send({
        embeds: [helpembed]
    });
};

module.exports.help = {
    name: 'help'
};
