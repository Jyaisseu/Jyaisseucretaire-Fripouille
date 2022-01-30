const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require("/app/modules/economie");
const fs = require("fs");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Discord.Collection();

fs.readdir("./commandes", (err, files, lengthno) => {
    if(err) console.log(err);
    console.log(`${files.length} commandes`);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commandes non trouvées.");
        return;
    }

    jsfile.forEach((f, i,) => {
        let props = require(`./commandes/${f}`);
        client.commands.set(props.help.name, props);
    })
})
mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true })

client.login(process.env.TOKEN)

client.on("message", async message =>{

    client.emit("checkMessage", message);

    let prefix = "!";
    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let Args = messageArray.slice(1);
        var args = message.content.substring(prefix.length).split(" ");
    
        let commandeFile = client.commands.get(cmd.slice(prefix.length));
        if(commandeFile) commandeFile.run(client, message, Args, prefix, args)    
    }
})

client.on("guildMemberAdd", user =>{
    user.roles.add("768798110863982612")
});

client.on("message", message =>{
    if(!message.channel === "772107875090038784") return message.delete()
    if(message.content === "Lu et approuvé") {
        message.delete()
        const member = message.author.id
        message.member.roles.remove("768798110863982612")
        client.channels.cache.get("630431095065935884").send(`Bienvenue ${message.author} sur le meilleur serveur francophone que la Terre ait connu !`)
    }
});

client.on("guildMemberRemove", user =>{
    const channel = user.guild.channels.cache.get("630431095065935884")
    channel.send(`Sniff... ${user.user.username} a quitté le serveur ! On était si bien pourtant !`)
});

client.on("message", message =>{
Eco.findOne({
    User_ID: message.author.id
}, (err, economie) => {
    if(err) console.log(err)
    if(!message.guild) return
    if(message.content.startsWith("!give")) return
    if(!economie){
        var compte = new Eco({
            User_ID: message.author.id,
            pseudo: message.author.username,
            xp: 0,
            level: 1,
            total: 0
        })
        compte.save()
    }else{
        var min = 1
        var max = 4
        var bg = (Math.floor(Math.random() * (max - min)) +min)
        economie.xp = economie.xp + bg
        economie.total = economie.total +bg
        if(message.author.username === economie.pseudo) {
        }else{economie.pseudo = message.author.username}
        var main_level = economie.level
        var next_level = (economie.level +1) * 10
        if(next_level <= economie.xp){
            var reste = economie.xp - next_level
            economie.level = main_level +1
            economie.xp = reste            
            
            client.channels.cache.get("715144143306883092").send(`GG ${message.author} tu viens de passer niveau ${main_level +1} ! Tu deviens de plus en plus BG !`);

            if(economie.level === 2){
                const member = message.author.id
                message.member.roles.add('749245805281673248')
                const débutant = message.member.guild.roles.cache.get("749245805281673248")
                client.channels.cache.get("630431095065935884").send(`Félicitations à ${message.author} pour avoir obtenu le grade ${débutant} ! Bienvenue dans la famille !`)
            }else{
            if(economie.level === 10){
                const member = message.author.id
                message.member.roles.remove("749245805281673248")
                message.member.roles.add("749245861560713246")
                const actif = message.member.guild.roles.cache.get("749245861560713246")
                client.channels.cache.get("630431095065935884").send(`Félicitations à ${message.author} pour avoir obtenu le grade ${actif} ! Tu es un(e) de nos membres les plus fidèles !`)
            }else{
            if(economie.level === 20){
                const member = message.author.id
                message.member.roles.remove("749245861560713246")
                message.member.roles.add("749245970088329278")
                const hyperactif = message.member.guild.roles.cache.get("749245970088329278")
                client.channels.cache.get("630431095065935884").send(`Félicitations à ${message.author} pour avoir obtenu le grade ${hyperactif} ! Il ne faudrait pas que tu oublies ta vie sociale quand même !`)
            }else{
            if(economie.level === 50){
                const member = message.author.id
                message.member.roles.remove("749245970088329278")
                message.member.roles.add("749246025197158411")
                const hermite = message.member.guild.roles.cache.get("749246025197158411")
                client.channels.cache.get("630431095065935884").send(`Mes amis, nous avons un nouveau ${hermite}... ${message.author} a décidé de passer sa vie sur le serveur !`)
            }else{
            if(economie.level === 80){
                const member = message.author.id
                message.member.roles.remove("749246025197158411")
                message.member.roles.add("749246081942159370")
                const empereur = message.member.guild.roles.cache.get("749246081942159370")
                client.channels.cache.get("630431095065935884").send(`L'heure est grave... ${message.author} est sacré empereur de ce serveur ! Vive l'empereur !`)
            }else{
                if(economie.level === 100){
                    const member = message.author.id
                    message.member.roles.remove("749246081942159370")
                    message.member.roles.add("749246155053072405")
                    const dieu = message.member.guild.roles.cache.get("749246155053072405")
                    client.channels.cache.get("630431095065935884").send(`Sa venue nous était annoncée... ${message.author} s'est éveillé en temps que ${dieu} de ce serveur ! Que gloire et fierté lui soit alloué !`)
                }
            }}}}}        
        };
        economie.save()        
    }
})
});
