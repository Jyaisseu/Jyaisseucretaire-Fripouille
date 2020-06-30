const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require("../app/modules/economie");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const config = require ("../app/config.json");

var prefix = "!";

fs.readdir("../app/commandes", (err, files, lengthno) => {
    if(err) console.log(err);
    console.log(`${files.length} commandes`);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commandes non trouvées.");
        return;
    }

    jsfile.forEach((f, i,) => {
        let props = require(`../app/commandes/${f}`);
        client.commands.set(props.help.name, props);
    })
})
mongoose.connect("mongodb+srv://Jyaisseu:er4007rp4011@jyaisseuctetaire-fripouille-zlrys.mongodb.net/Jyaisseucrétaire-Jojo-Fripouille?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true })

client.login(config.token)

client.on("message", async message =>{

    client.emit("checkMessage", message);

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let Args = messageArray.slice(1);
    var args = message.content.substring(prefix.length).split(" ");
    
    let commandeFile = client.commands.get(cmd.slice(prefix.length));
    if(commandeFile) commandeFile.run(client, message, Args, args)    
})

client.on("guildMemberAdd", user =>{
    const channel = user.guild.channels.get("630431095065935884")
    channel.send("Bienvenue <@!" + user.id + "> sur le meilleur serveur francophone que la Terre ait connu!")
});

client.on("guildMemberRemove", user =>{
    const channel = user.guild.channels.get("630431095065935884")
    channel.send("Sniff... " + user.user.username + " a quitté le serveur! On était si bien pourtant!")
});

client.on("message", message =>{
Eco.findOne({
    User_ID: message.author.id
}, (err, economie) => {
    if(err) console.log(err)
    if(!message.guild) return
    if(!economie){
        var compte = new Eco({
            User_ID: message.author.id,
            pseudo: message.author.username,
            xp: 0,
            level: 1
        })
        compte.save()
    }else{
        economie.xp = economie.xp +1
        var main_level = economie.level
        var next_level = economie.level * 10
        if(next_level <= economie.xp){
            economie.level = main_level +1
            economie.xp = 0             
            
            client.channels.get("630431095065935884").send(`GG ${message.author} tu viens de passer niveau ${main_level +1} ! Tu deviens de plus en plus BG !`);
            };
        economie.save()        
    }
})
});
