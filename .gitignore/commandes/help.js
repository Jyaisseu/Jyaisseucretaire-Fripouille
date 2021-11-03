const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const embed = new MessageEmbed()
    .setTitle("Liste des commandes du bot Jyaisseucrétaire")
    .setDescription("Pour connaître dans les moindres détails votre bot préféré !")
    .addField("!coucou", "Pour que le bot puisse te rappeler qu'il sera toujours là pour toi !")
    .addField("!level", "Affiche ton niveau de BG actuel, ainsi que ton nombre de points BG et ce qu'il te manque pour passer au niveau supérieur.")
    .addField("!top5", "Affiche les 5 membres les plus BG du serveur.")
    .addField("!give [mentionner la personne] [nombre de point BG]", "Permet de donner une partie de ses points BG à une autre personne du serveur.")
    .addField("!play [URL YouTube]", "Joue une musique dans le salon vocal où tu te trouves.")
    .addField("!stop", "Déconnecte le bot du salon vocal où tu te trouves.")
    .addField("!help", "Affiche la liste des commandes disponibles")
    message.channel.send({ embeds: [embed] });
}

module.exports.help = {
    name: "help"
}
