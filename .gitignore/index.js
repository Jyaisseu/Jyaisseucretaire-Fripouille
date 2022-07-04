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
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
Client.commands = new Discord.Collection();
const fs = require('fs');
const mongoose = require('mongoose');
const Eco = require('./modules/economie');
const grade = require('./modules/grade');

Client.on('ready', () => {
    Client.application.commands.create(add);
    Client.application.commands.create(coucou);
    Client.application.commands.create(give);
    Client.application.commands.create(level);
    Client.application.commands.create(play);
    Client.application.commands.create(remove);
    Client.application.commands.create(stop);
    Client.application.commands.create(top5);

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

mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log('La base de données est connectée.'));

Client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()){

        let messageArray = interaction.commandName;
        let args = interaction.options;
        let commandeFile = Client.commands.get(messageArray);
        if(commandeFile) commandeFile.run(Client, interaction);
    };
});

Client.login(process.env.TOKEN);

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
                economie.xp = reste;

                Client.channels.cache.find(channel => channel.name === '📈levelup').send(`GG ${message.author} tu viens de passer niveau ${main_level + 1} ! Tu deviens de plus en plus BG !`);

                acquerreur = message.member;
                grade.run(Client, message, economie, acquerreur);
            };
            economie.save();
        };
    });
});

let liste_vocal = [];
Client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    let rejoint = newMember.member.user;
    if(oldUserChannel === null && newUserChannel !== undefined) {
        date = Date.now();
        let membre = {
            pseudo: rejoint.username,
            arrive: date
        };
        liste_vocal.push(membre);
    }else if (newUserChannel === null) {
        for (var i in liste_vocal) {
            if (Object.values(liste_vocal[i])[0] === rejoint.username) {
                var sortant = liste_vocal[i];
            };
        };
        let date = Date.now();
        let temps = parseInt((date - Object.values(sortant)[1])/60000);
        delete liste_vocal[i];
        Eco.findOne({
            User_ID: rejoint.id
        }, (err, economie) => {
            if(err) console.log(err);
            if(!economie) {
                let compte = new Eco({
                    User_ID: rejoint.id,
                    pseudo: rejoint.username,
                    xp: 0,
                    level: 1,
                    total: 0
                });
                compte.save();
            }else{
                let bg = (Math.floor(Math.random() * (temps)) + temps);
                economie.xp += bg;
                economie.total += bg;
                if(!rejoint.username === economie.pseudo) {
                    economie.pseudo = rejoint.username;
                };

                let main_level = economie.level;
                let next_level = (economie.level + 1) * 10;
                rejoint.send(`Vous avez passé ${temps} minutes en vocal, vous avez gagné ${bg} points BG.`);
                if(next_level <= economie.xp) {
                    let reste = economie.xp - next_level;
                    economie.level = main_level + 1;
                    economie.xp = reste;
                    Client.channels.cache.find(channel => channel.name === '📈levelup').send(`GG ${message.author} tu viens de passer niveau ${main_level + 1} ! Tu deviens de plus en plus BG !`);
                    acquerreur = newMember.member;
                    grade.run(Client, Discord.Message, economie, acquerreur);
                };
                economie.save();
            };
        });
    };
});

const add = new SlashCommandBuilder()
    .setName('add')
    .setDescription("[ADMIN ONLY] Permet d'ajouter des points BG à une personne du serveur.")
    .addUserOption(option => option
        .setName('utilisateur')
        .setDescription('Utilisateur à mentionner')
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName('quantité')
        .setDescription('Nombre de points à ajouter')
        .setRequired(true)
    );

const coucou = new SlashCommandBuilder()
    .setName('coucou')
    .setDescription("Pour que le bot puisse te rappeler qu'il sera toujours là pour toi !")

const give = new SlashCommandBuilder()
    .setName('give')
    .setDescription('Permet de donner une partie de ses points BG à une autre personne.')
    .addUserOption(option => option
        .setName('utilisateur')
        .setDescription('Utilisateur à mentionner')
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName('quantité')
        .setDescription('Nombre de points à donner')
        .setRequired(true)
    );

const level = new SlashCommandBuilder()
    .setName('level')
    .setDescription('Affiche ton niveau de BG actuel.');

const remove = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('[ADMIN ONLY] Permet de retirer des points BG à un membre du serveur.')
    .addUserOption(option => option
        .setName('utilisateur')
        .setDescription('Utilisateur à mentionner')
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName('quantité')
        .setDescription('Nombre de pooints à retirer')
        .setRequired(true)
    );

const stop = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Permet de stopper la musique.');

const top5 = new SlashCommandBuilder()
    .setName('top5')
    .setDescription('Affiche le top 5 des personnes les plus BG de ce serveur');

const play = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Permet de jouer une musique dans le salon où tu te trouves')
    .addStringOption(option => option
        .setName('lien')
        .setDescription('lien pour jouer la musique')
        .setRequired(true)
    );
