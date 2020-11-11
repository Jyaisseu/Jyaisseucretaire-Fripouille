const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if(message.channel.type === "dm") return;
    message.delete()
    if(message.author.bot) return;
    var mentionned = message.mentions.users.first()
    if(!message.guild.member(message.author).permissions.has("KICK_MEMBERS")) return message.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande.")
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous n'avez pas mentionné d'utilisateur !");
    }else{
        const args = message.content.split(' ').slice(1)
        if(args[0] === "<@!" + mentionned.id + ">" || args[0] === "<@" + mentionned.id + ">"){
            if(args.slice(1).length != 0) {
                message.channel.send(`${mentionned.tag} a bien été averti.`)
                mentionned.send(`Attention, vous venez d'être averti dans le serveur de Jojo la Fripouille par ${message.author.username}.\nRaison: ${args.slice(1).join(' ')}`)
            }else{
                return message.reply("Erreur dans la syntaxe de cette commande.")
            }
        }else{
            return message.reply("Erreur dans la syntaxe de cette commande.")
        }
    }
}
module.exports.help = {
    name: "warn"
}
