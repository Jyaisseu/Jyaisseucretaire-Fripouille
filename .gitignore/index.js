const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require("../modules/economie.js");
const client = new Discord.Client();
var prefix = "!";

mongoose.connect("mongodb+srv://Jyaisseu:er4007rp4011@jyaisseucretaire-jojo-fripouille-zlrys.mongodb.net/Jyaisseucrétaire-Jojo-Fripouille?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("MongoDB connecté"))

client.login("Njk3MzgzOTUxODU3MzUyNzE1.XrEK3A.QUZvWDkm42ow1FpO_lhA5_NfGMw")

client.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "coucou")
        message.channel.send("Et bah coucou à toi aussi, " + message.author.username + " !") 
});

client.on("guildMemberAdd", user =>{
    const channel = user.guild.channels.cache.get("630431095065935884")
    channel.send("Bienvenue <@!" + user.id + "> sur le meilleur serveur francophone que la Terre ait connu!")
});

client.on("guildMemberRemove", user =>{
    const channel = user.guild.channels.cache.get("630431095065935884")
    channel.send("Sniff... <@!" + user.id + "> a quitté le serveur! On était si bien pourtant!")
});

client.on("message", message =>{
Eco.findOne({
    User_ID: message.author.id
}, (err, economie) => {
    if(err) console.log(err)
    if(!economie){
        var compte = new Eco({
            User_ID: message.author.id,
            pseudo: message.author.username,
            xp: 10,
            level: 1
        })
        compte.save()
    }else{
        economie.xp = economie.xp +1
        var main_level = economie.level
        var next_level = economie.level * 20
        if(next_level <= economie.xp){
            economie.level = main_level +1
            message.channel.send(`GG ${message.author} tu viens de passer niveau ${main_level +1} ! Tu deviens de plus en plus BG !`)
        }
        economie.save()
    }
})
})
