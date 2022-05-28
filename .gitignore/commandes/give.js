const Eco = require('../modules/economie');
const grade = require('../modules/grade');
const degrade = require('../modules/degrade');

module.exports.run = async (Client, message, args) => {
    if(message.author.bot) return;

    let mentionned = message.mentions.members.first();
    let auteur = message.author;

    if(message.mentions.users.size === 0) return message.channel.send("Vous n'avez pas mentionné d'utilisateur !");
    if(mentionned.id === message.author.id) return message.channel.send('Vous ne pouvez pas vous donnez vous-même des points BG !');
    if(args.slice(1) > 0) {
        Eco.findOne({
            User_ID: message.author.id
        }, (err, economie) => {
            let don = args.slice(1);
            let donna = parseInt(don);
            if(donna > economie.total) {
                return message.channel.send('Vous ne possédez pas assez de points BG !');
            }else{
                economie.total -= donna;
            }if(donna > economie.xp) {
                let enplus = (donna - economie.xp);
                do {
                    economie.xp = 0;
                    economie.level -= 1;
                    economie.xp = ((economie.level + 1) * 10) - enplus;
                    let moins = 0 - economie.xp;
                }while (moins > 0);
                Client.channel.cache.find(channel => channel.name === '📈levelup').send(`${message.author} est redescendu niveau ${economie.level} en faisant un don à ${mentionned} !`);

                perdant = auteur;
                degrade.run(Client, message, economie, perant);
            }else{
                economie.xp = economie.xp - donna;
            }economie.save();
        });

        Eco.findOne({
            User_Id: mentionned.id
        }, (err, economie) => {
            let reçu = args.slice(1);
            let plus = parseInt(reçu);
            economie.xp += plus;
            economie.total += plus;
            message.channel.send(`Le membre ${mentionned} a bien reçu ${plus} points BG !`);

            let main_level = economie.level;
            let next_level = (main_level + 1) * 10;
            if(next_level <= economie.xp) {
                do {
                    let main_level = economie.level;
                    let next_level = (main_level + 1) * 10;
                    let reste = economie.xp - next_level;
                    economie.level = main_level + 1;
                    economie.xp = 0 + reste;
                }while (next_level <= economie.xp);
                Client.channels.cache.find(channel => channel.name === '💬général').send(`GG ${mentionned} tu viens de passer BG niveau ${economie.level} grâce à un don de ${message.author} ! Tu deviens de plus en plus BG !`);

                acquerreur = mentionned;
                grade.run(Client, message, economie, acquerreur);
            }economie.save();
        })
    }else{
        return message.channel.send('Vous devez préciser la quantité de points BG que le membre va ontenir !');
    };
};

module.exports.help = {
    name: 'give'
};
