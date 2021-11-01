const Discord = require("discord.js")
const mongoose = require("mongoose")
const Eco = require('/app/modules/economie.js')

module.exports.run = async (client, message, args) => {

    if(message.author.bot) return;
    var mentionned = message.mentions.members.first()
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
            economie.total = economie.total + ajout   
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

            if((economie.level >= 2) && (economie.level<10) && (!mentionned.roles.cache.has("749245805281673248"))) {
                const member = mentionned
                member.roles.add('749245805281673248')
                const débutant = message.member.guild.roles.cache.get("749245805281673248")
                client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${débutant} ! Bienvenue dans la famille !`)
        }else{
            if((economie.level >= 10) && (economie.level < 20) && (!mentionned.roles.cache.has("749245861560713246"))){
                    const member = mentionned
                    member.roles.remove("749245805281673248")
                    member.roles.add("749245861560713246")
                    const actif = message.member.guild.roles.cache.get("749245861560713246")
                    client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${actif} ! Tu es un(e) de nos membres les plus fidèles !`)
        }else{
            if((economie.level >= 20) && (economie.level < 50) && (!mentionned.roles.cache.has("749245970088329278"))){
                    const member = mentionned
                    member.roles.remove("749245861560713246")
                    member.roles.remove("749245805281673248")
                    member.roles.add("749245970088329278")
                    const hyperactif = message.member.guild.roles.cache.get("749245970088329278")
                    client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${hyperactif} ! Il ne faudrait pas que tu oublies ta vie sociale quand même !`)
        }else{
            if((economie.level >= 50) && (economie.level < 80) && (!mentionned.roles.cache.has("749246025197158411"))){
                    const member = mentionned
                    member.roles.remove("749245970088329278")
                    member.roles.remove("749245861560713246")
                    member.roles.remove("749245805281673248")
                    member.roles.add("749246025197158411")
                    const hermite = message.member.guild.roles.cache.get("749246025197158411")
                    client.channels.cache.get("630431095065935884").send(`Mes amis, nous avons un nouveau ${hermite}... ${mentionned} a décidé de passer sa vie sur le serveur !`)
        }else{
            if((economie.level >= 80) && (economie.level < 100) && (!mentionned.roles.cache.has("749246081942159370"))){
                    const member = mentionned
                    member.roles.remove("749246025197158411")
                    member.roles.remove("749245970088329278")
                    member.roles.remove("749245861560713246")
                    member.roles.remove("749245805281673248")
                    member.roles.add("749246081942159370")
                    const empereur = message.member.guild.roles.cache.get("749246081942159370")
                    client.channels.cache.get("630431095065935884").send(`L'heure est grave... ${mentionned} est sacré ${empereur} de ce serveur ! Vive l'empereur !`)
        }else{
            if((economie.level >= 100) && (!mentionned.roles.cache.has("749246155053072405"))){
                const member = mentionned
                member.roles.remove("749246081942159370")
                member.roles.rmeove("749246025197158411")
                member.roles.remove("749245861560713246")
                member.roles.remove("749245805281673248")
                member.roles.remove("749245970088329278")
                member.roles.add("749246155053072405")
                const dieu = message.member.guild.roles.cache.get("749246155053072405")
                client.channels.cache.get("630431095065935884").send(`Sa venue nous était annoncée... ${mentionned} s'est éveillé en temps que ${dieu} de ce serveur ! Que gloire et fierté lui soit alloué !`)
            }
        }}}}}
        }
        economie.save()})
    }else{
        return message.channel.send("Vous devez préciser la quantité de points BG que le membre va obtenir !");
    }
}

module.exports.help = {
    name: "add"
}
