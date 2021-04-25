const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = new Discord.Client();
const Eco = require("C:/Users/JOCELYN/Documents/Discord/Jyaisseucrétaire/jojo_la_fripouille/modules/economie");

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    var mentionned = message.mentions.users.first()
    if(message.mentions.users.size === 0) return message.channel.send("Vous n'avez pas mentionné d'utilisateur !");
    if(mentionned.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous donner vous-même des points BG !");
    if(args.slice(1) >0) {
        Eco.findOne({
            User_ID: message.author.id
        }, (err, economie) => {
            var don = args.slice(1)
            var donna = parseInt(don)
            var main_level = economie.level
            if(donna > economie.total) {
                return message.channel.send("Vous ne possédez pas assez de points BG !");
            }else{
                economie.total = economie.total - donna
            }
            if(donna > economie.xp) {
                var enplus = (donna - economie.xp)
                do{
                    economie.xp = 0
                    economie.level = economie.level +1
                    economie.xp = ((economie.level +1) *10) -enplus
                    var moins = 0 -economie.xp
                }while (moins >0)
                message.client.channels.get("715144143306883092").send(`${message.author} est redescendu niveau ${economie.level} en faisant un don à ${mentionned} !`)
            }else{
                economie.xp = economie.xp - donna
            }
            economie.save()
        })
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            var reçu = args.slice(1);
            var plus = parseInt(reçu)
            economie.xp = economie.xp +plus
            economie.total = economie.total +plus
            message.channel.send(`Le membre ${mentionned} a bien reçu ${plus} points BG!`)
            var main_level = economie.level
            var next_level = (economie.level +1) *10
            if(next_level <= economie.xp) {
                do{
                    var main_level = economie.level
                    var next_level = (economie.level +1) *10
                    var reste = economie.xp -next_level
                    economie.level = main_level +1
                    economie.xp = 0 +reste
                }while (next_level <= economie.xp)
                message.client.channels.cache.get("715144143306883092").send(`GG ${mentionned} tu viens de passer BG niveau ${economie.level} grâce à un don de ${message.author} !`)
            }
            economie.save()
        })
    }else{
        return message.channel.send("Vous devez précisé le nombre de points BG que vous voulez donner !");
    }
}

module.exports.help = {
    name: "give"
}