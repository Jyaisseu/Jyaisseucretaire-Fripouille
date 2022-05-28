const Discord = require('discord.js');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS, 
        Discord.Intents.FLAGS.GUILD_MEMBERS, 
        Discord.Intents.FLAGS.GUILD_VOICE_STATES, 
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
Client.commands = new Discord.Collection();
const fs = require('fs');
const mongoose = require('mongoose');
const Eco = require('./modules/economie');
const grade = require('./modules/grade');

Client.on('ready', () => {
    console.log('Le bot est prêt !');
});

fs.readdir('./commandes', (err, files) => {
    if(err) console.log(err);
    console.log(`${files.length} commandes`);
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if(jsfile.length <= 0){
        console.log('Aucune commandes trouvées.');
        return;
    };

    jsfile.forEach((f, ) => {
        let props = require(`./commandes/${f}`);
        Client.commands.set(props.help.name, props);
    });
});

mongoose.connect(process.ENV.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log('La base de données est connectée.'));

Client.on('messageCreate', async message => {
    Client.emit('checkMessage', message);

    let prefix = '!';
    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(' ');
        let cmd = messageArray[0];
        let Args = messageArray.slice(1);
        let args = message.content.substring(prefix.length).split(' ');

        let commandeFile = Client.commands.get(cmd.slice(prefix.length));
        if(commandeFile) commandeFile.run(Client, message, Args, prefix, args);
    };
});

Client.login('process.ENV.TOKEN');

Client.on('guildMemberAdd', member => {
    console.log('Un membre est arrivé.');
    Client.channels.cache.find(channel => channel.name === '💬général').send(`Bienvenue ${member} sur le meilleur serveur que la Terre ait connu !`);
});

Client.on('guildMemberRemove', member => {
    console.log('Un membre a quitté le serveur.');
    Client.channels.cache.find(channel => channel.name === '💬général').send(`Sniff... ${member.user.username} a quitté le serveur ! On était si bien pourtant !`)
});

Client.on('messageCreate', message => {
    Eco.findOne({
        User_ID: message.author.id
    }, (err, economie) => {
        if(err) console.log(err);
        if(!message.guild) return;
        if(message.content.startsWith('!give')) return;
        if(!economie){
            let compte = new Eco({
                User_ID: message.author.id,
                pseudo: message.author.username,
                xp: 0,
                level: 1,
                total: 0
            });
            compte.save();

        }else{
            let min = 1;
            let max = 4;
            let bg = (Math.floor(Math.random() * (max - min)) + min);
            economie.xp += bg;
            economie.total += bg;

            if(!message.author.username === economie.pseudo){
                economie.pseudo = message.author.username;
            };

            let main_level = economie.level;
            let next_level = (economie.level + 1) * 10;

            if(next_level <= economie.xp){
                let reste = economie.xp - next_level;
                economie.level = main_level + 1;
                economie.xp = reste

                Client.channels.cache.find(channel => channel.name === '📈levelup').send(`GG ${message.author} tu viens de passer niveau ${main_level + 1} ! Tu deviens de plus en plus BG !`);

                acquerreur = message.member;
                grade.run(Client, message, economie, acquerreur);
            };
            economie.save();
        };
    });
});
