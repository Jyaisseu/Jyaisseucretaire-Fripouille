const Discord = require("discord.js")
const mongoose = require("mongoose")
const client = new Discord.Client();
const Eco = require('/app/modules/economie.js')

module.exports.run = async (bot, message, args) => {

    if(message.author.bot) return;
    var mentionned = message.mentions.users.first()
    if(!message.guild.member(message.author).permissions.has("ADMINISTRATOR")) return message.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande.")
    if(message.mentions.users.size === 0) return message.channel.send("Vous n'avez pas mentionné d'utilisateur !")
    if(mentionned.id === message.author.id) return message.channel.send("Désolé, vous ne pouvez pas vous donner vous-même des points BG!")
    if(args.slice(1) >0) {
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            var somme = args.slice(1)
            var ajout = parseInt(somme)
            economie.xp = economie.xp + ajout
            economie.total = economie.total +ajout
            message.channel.send(`Le membre ${mentionned} a bien reçu ${ajout} points BG !`)
            var main_level = economie.level
            var next_level = (economie.level +1) * 10                                      
            if(next_level <= economie.xp){
                do {
                    var main_level = economie.level
                    var next_level = (economie.level +1) * 10
                    var reste = economie.xp - next_level  
                    economie.level = economie.level +1                       
                    economie.xp = 0 + reste
                } while (next_level <= economie.xp)
                
            message.client.channels.cache.get("715144143306883092").send(`GG ${mentionned} tu viens de passer niveau ${economie.level} ! Tu deviens de plus en plus BG !`)
        }
        economie.save()})
        
    }else{
        return message.channel.send("Vous devez préciser la quantité de points BG que le membre va obtenir !");
    }
}

module.exports.help = {
    name: "add"
}
