const Discord = require("discord.js")
const mongoose = require("mongoose")
const Eco = require('/app/modules/economie.js')

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    var mentionned = message.mentions.members.first()
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
            if(perte > economie.total) return message.channel.send("L'utilisateur ne possède pas la quantité de points BG que vous voulez enlever !")
            if(perte > economie.xp){
                var surplus = (perte - economie.xp)
                do {
                    economie.xp = 0
                    economie.level = economie.level -1
                    economie.xp = ((economie.level +1) * 10) -surplus
                    var négatif = 0 -economie.xp
                }while (négatif >0)
                message.client.channels.cache.get("715144143306883092").send(`${mentionned} est redescendu niveau ${economie.level} !`)

                if(economie.level <2) {
                    const member = mentionned
                    member.roles.remove("749246155053072405")
                    member.roles.remove("749246081942159370")
                    member.roles.remove("749246025197158411")
                    member.roles.remove("749245970088329278")
                    member.roles.remove("749245861560713246")
                    member.roles.remove("749245805281673248")
                    client.channels.cache.get("630431095065935884").send(`${mentionned} a perdu tous ses grades !`)
                }else{
                    if((economie.level >= 2) && (economie.level<10) && (!mentionned.roles.cache.has("749245805281673248"))) {
                            const member = mentionned
                            member.roles.remove("749246155053072405")
                            member.roles.remove("749246081942159370")
                            member.roles.remove("749246025197158411")
                            member.roles.remove("749245970088329278")
                            member.roles.remove("749245861560713246")
                            member.roles.add('749245805281673248')
                            const débutant = message.member.guild.roles.cache.get("749245805281673248")
                            client.channels.cache.get("630431095065935884").send(`${mentionned} redescend au grade ${débutant}.`)
                }else{
                    if((economie.level >= 10) && (economie.level < 20) && (!mentionned.roles.cache.has("749245861560713246"))){
                            const member = mentionned
                            member.roles.remove("749246155053072405")
                            member.roles.remove("749246081942159370")
                            member.roles.remove("749246025197158411")
                            member.roles.remove("749245970088329278")
                            member.roles.add("749245861560713246")
                            const actif = message.member.guild.roles.cache.get("749245861560713246")
                            client.channels.cache.get("630431095065935884").send(`${mentionned} redescend au grade ${actif}.`)
                }else{
                    if((economie.level >= 20) && (economie.level < 50) && (!mentionned.roles.cache.has("749245970088329278"))){
                            const member = mentionned
                            member.roles.remove("749246155053072405")
                            member.roles.remove("749246081942159370")
                            member.roles.remove("749246025197158411")
                            member.roles.add("749245970088329278")
                            const hyperactif = message.member.guild.roles.cache.get("749245970088329278")
                            client.channels.cache.get("630431095065935884").send(`${mentionned} redescend au grade ${hyperactif}.`)
                }else{
                    if((economie.level >= 50) && (economie.level < 80) && (!mentionned.roles.cache.has("749246025197158411"))){
                            const member = mentionned
                            member.roles.remove("749246155053072405")
                            member.roles.remove("749246081942159370")
                            member.roles.add("749246025197158411")
                            const hermite = message.member.guild.roles.cache.get("749246025197158411")
                            client.channels.cache.get("630431095065935884").send(`${mentionned} redescend au grade ${hermite}.`)
                }else{
                    if((economie.level >= 80) && (economie.level < 100) && (!mentionned.roles.cache.has("749246081942159370"))){
                        const member = mentionned
                        member.roles.remove("749246155053072405")
                        member.roles.add("749246081942159370")
                        const empereur = message.member.guild.roles.cache.get("749246081942159370")
                        client.channels.cache.get("630431095065935884").send(`${mentionned} redescend au grade ${empereur}.`)
                    }
                }}}}}
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
