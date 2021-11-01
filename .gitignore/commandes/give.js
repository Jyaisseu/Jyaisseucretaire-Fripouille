const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require("/app/modules/economie.js");

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    var mentionned = message.mentions.members.first()
    let auteur = message.guild.member(message.author)
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
                    economie.level = economie.level -1
                    economie.xp = ((economie.level +1) *10) -enplus
                    var moins = 0 -economie.xp
                }while (moins >0)
                message.client.channels.cache.get("715144143306883092").send(`${message.author} est redescendu niveau ${economie.level} en faisant un don à ${mentionned} !`)

                if(economie.level <2) {
                    const member = message.author.id
                    message.member.roles.remove("749246155053072405")
                    message.member.roles.remove("749246081942159370")
                    message.member.roles.remove("749246025197158411")
                    message.member.roles.remove("749245970088329278")
                    message.member.roles.remove("749245861560713246")
                    message.member.roles.remove("749245805281673248")
                    client.channels.cache.get("630431095065935884").send(`${message.author} a perdu tous ses grades !`)
                }else{
                    if((economie.level >= 2) && (economie.level<10) && (!auteur.roles.cache.has("749245805281673248"))) {
                            const member = message.author.id
                            message.member.roles.remove("749246155053072405")
                            message.member.roles.remove("749246081942159370")
                            message.member.roles.remove("749246025197158411")
                            message.member.roles.remove("749245970088329278")
                            message.member.roles.remove("749245861560713246")
                            message.member.roles.add('749245805281673248')
                            const débutant = message.member.guild.roles.cache.get("749245805281673248")
                            client.channels.cache.get("630431095065935884").send(`${message.author} redescend au grade ${débutant} en faisant un don à ${mentionned}.`)
                }else{
                    if((economie.level >= 10) && (economie.level < 20) && (!auteur.roles.cache.has("749245861560713246"))){
                            const member = message.author.id
                            message.member.roles.remove("749246155053072405")
                            message.member.roles.remove("749246081942159370")
                            message.member.roles.remove("749246025197158411")
                            message.member.roles.remove("749245970088329278")
                            message.member.roles.add("749245861560713246")
                            const actif = message.member.guild.roles.cache.get("749245861560713246")
                            client.channels.cache.get("630431095065935884").send(`${message.author} redescend au grade ${actif} en faisant un don à ${mentionned}.`)
                }else{
                    if((economie.level >= 20) && (economie.level < 50) && (!auteur.roles.cache.has("749245970088329278"))){
                            const member = message.author.id
                            message.member.roles.remove("749246155053072405")
                            message.member.roles.remove("749246081942159370")
                            message.member.roles.remove("749246025197158411")
                            message.member.roles.add("749245970088329278")
                            const hyperactif = message.member.guild.roles.cache.get("749245970088329278")
                            client.channels.cache.get("630431095065935884").send(`${message.author} redescend au grade ${hyperactif} en faisant un don à ${mentionned}.`)
                }else{
                    if((economie.level >= 50) && (economie.level < 80) && (!auteur.roles.cache.has("749246025197158411"))){
                            const member = message.author.id
                            message.member.roles.remove("749246155053072405")
                            message.member.roles.remove("749246081942159370")
                            message.member.roles.add("749246025197158411")
                            const hermite = message.member.guild.roles.cache.get("749246025197158411")
                            client.channels.cache.get("630431095065935884").send(`${message.author} redescend au grade ${hermite} en faisant un don à ${mentionned}.`)
                }else{
                    if((economie.level >= 80) && (economie.level < 100) && (!auteur.roles.cache.has("749246081942159370"))){
                        const member = message.author.id
                        message.member.roles.remove("749246155053072405")
                        message.member.roles.add("749246081942159370")
                        const empereur = message.member.guild.roles.cache.get("749246081942159370")
                        client.channels.cache.get("630431095065935884").send(`${message.author} redescend au grade ${empereur} en faisant un don à ${mentionned}.`)
                    }
                }}}}}
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
            message.channel.send(`Le membre ${mentionned} a bien reçu ${plus} points BG !`)
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

                if((economie.level >= 2) && (economie.level<10) && (!mentionned.roles.cache.has("749245805281673248"))) {
                    const member = mentionned
                    member.roles.add('749245805281673248')
                    const débutant = message.member.guild.roles.cache.get("749245805281673248")
                    client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${débutant} grâce à un don de ${message.author} ! Bienvenue dans la famille !`)
            }else{
                if((economie.level >= 10) && (economie.level < 20) && (!mentionned.roles.cache.has("749245861560713246"))){
                        const member = mentionned
                        member.roles.remove("749245805281673248")
                        member.roles.add("749245861560713246")
                        const actif = message.member.guild.roles.cache.get("749245861560713246")
                        client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${actif} grâce à un don de ${message.author} ! Tu es un(e) de nos membres les plus fidèles !`)
            }else{
                if((economie.level >= 20) && (economie.level < 50) && (!mentionned.roles.cache.has("749245970088329278"))){
                        const member = mentionned
                        member.roles.remove("749245861560713246")
                        member.roles.remove("749245805281673248")
                        member.roles.add("749245970088329278")
                        const hyperactif = message.member.guild.roles.cache.get("749245970088329278")
                        client.channels.cache.get("630431095065935884").send(`Félicitations à ${mentionned} pour avoir obtenu le grade ${hyperactif} grâce à un don de ${message.author} ! Il ne faudrait pas que tu oublies ta vie sociale quand même !`)
            }else{
                if((economie.level >= 50) && (economie.level < 80) && (!mentionned.roles.cache.has("749246025197158411"))){
                        const member = mentionned
                        member.roles.remove("749245970088329278")
                        member.roles.remove("749245861560713246")
                        member.roles.remove("749245805281673248")
                        member.roles.add("749246025197158411")
                        const hermite = message.member.guild.roles.cache.get("749246025197158411")
                        client.channels.cache.get("630431095065935884").send(`Mes amis, nous avons un nouveau ${hermite} grâce à un don de ${message.author}... ${mentionned} a décidé de passer sa vie sur le serveur !`)
            }else{
                if((economie.level >= 80) && (economie.level < 100) && (!mentionned.roles.cache.has("749246081942159370"))){
                        const member = mentionned
                        member.roles.remove("749246025197158411")
                        member.roles.remove("749245970088329278")
                        member.roles.remove("749245861560713246")
                        member.roles.remove("749245805281673248")
                        member.roles.add("749246081942159370")
                        const empereur = message.member.guild.roles.cache.get("749246081942159370")
                        client.channels.cache.get("630431095065935884").send(`L'heure est grave... ${mentionned} est sacré ${empereur} de ce serveur grâce à un don de ${message.author} ! Vive l'empereur !`)
            }else{
                if((economie.level >= 100) && (!mentionned.roles.cache.has("749246155053072405"))){
                    const member = mentionned
                    member.roles.remove("749246081942159370")
                    member.roles.remove("749246025197158411")
                    member.roles.remove("749245861560713246")
                    member.roles.remove("749245805281673248")
                    member.roles.remove("749245970088329278")
                    member.roles.add("749246155053072405")
                    const dieu = message.member.guild.roles.cache.get("749246155053072405")
                    client.channels.cache.get("630431095065935884").send(`Sa venue nous était annoncée... ${mentionned} s'est éveillé en temps que ${dieu} de ce serveur grâce à un don de ${message.author} ! Que gloire et fierté lui soit alloué !`)
                }
            }}}}}
            }
            economie.save()
        })
    }else{
        return message.channel.send("Vous devez préciser le nombre de points BG que vous voulez donner !");
    }
}

module.exports.help = {
    name: "give"
}
