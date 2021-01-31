const Discord = require("discord.js")
const mongoose = require("mongoose")
const client = new Discord.Client();
const Eco = require('/app/modules/economie.js)

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    var mentionned = message.mentions.users.first()
    if(!message.guild.member(message.author).permissions.has("ADMINISTRATOR")) return message.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande.")
    if(message.mentions.users.size === 0) return message.channel.send("Vous n'avez pas mentionné d'utilisateur !")
    if(mentionned.id === message.author.id) return message.channel.send("Désolé, vous ne pouvez pas vous donnez à vous-même des points BG!")
    if(args.slice(1) >0) {
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            var difference = args.slice(1)
            var main_level = economie.level
            var perte = parseInt(difference)
            if(perte > main_level *10 +economie.level) return message.channel.send("L'utilisateur ne possède pas la quantité de points BG que vous voulez enlever !")
            if(perte > economie.xp){
                var surplus = (perte - economie.xp)
                do {
                    economie.xp = 0
                    economie.level = economie.level -1
                    economie.xp = ((economie.level +1) * 10) -surplus
                    var négatif = 0 -economie.xp
                }while (négatif >0)
                message.client.channels.cache.get("715144143306883092").send(`${mentionned} est redescendu niveau ${economie.level} !`)
            }else{
                economie.xp = (economie.xp - perte)
            }
            message.channel.send(`Le membre ${mentionned} a bien eu une perte de ${perte} points BG !`)
            economie.save()})
    }else{
        return message.channel.send("Vous devez précisé la quantité de points BG qui sera retiré !");
    }
}

module.exports.help = {
    name: "remove"
}
