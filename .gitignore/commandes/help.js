const Discord = require("discord.js");

module.exports.run = async (client, message) => {
    message.channel.send("Voici la liste des commandes du bot:\n!coucou : pour que le bot puisse te rappeler qu'il sera toujours là pour toi!\n!level : affiche ton niveau de BG actuel, ainsi que ton nombre de point BG et ce qu'il te manque pour passer niveau supérieur.\n!play [URL Youtube] : Joue une musique de Youtube dans le salon vocal où tu te trouve.\n!stop : Déconnecte le bot du salon vocal où tu te trouve.\n!top5: Affiche les 5 membres les plus BG du serveur.\n!help : Affiche la liste des commands disponibles.")
}
module.exports.help = {
    name: "help"
}
