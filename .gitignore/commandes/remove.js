const Eco = require('../modules/economie');
const degrade = require('../modules/degrade');

module.exports.run = async (Client, message, args) => {
    if(message.author.bot) return;
    let mentionned = message.mentions.members.first();
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande.");
    if(message.mentions.users.size === 0) return message.reply("Vous n'avez pas mentionné d'utilisateur !");
    if(mentionned.id === message.author.id) return message.reply('Désolé, vous ne pouvez pas vous enlever à vous-même des points BG !');
    if(args.slice(1) > 0) {
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            let difference = args.slice(1);
            let perte = parseInt(difference);
            if(perte > economie.total) return message.reply("l'utilisateur ne possède pas la quantité de points BG que vous souhaitez retirer !");
            if(perte > economie.xp) {
                let surplus = perte - economie.xp;
                do {
                    economie.xp = 0;
                    economie.level -= 1;
                    economie.xp = ((economie.level + 1) * 10) - surplus;
                    var negatif = 0 - economie.xp;
                }while (negatif > 0);
                
                Client.channels.cache.find(channel => channel.name === '📈levelup').send(`${mentionned} est redescendu niveau ${economie.level} !`);
                perdant = mentionned;
                console.log('allo ?');
                degrade.run(Client, message, economie, perdant);
            }else{
                economie.xp = (economie.xp - perte);
            };
            message.reply(`Le membre ${mentionned} a bien eu une perte de ${perte} points BG !`);
            economie.save();
        });
    }else{
        return message.reply('Vous devez préciser la quantité de points BG qui sera retiré !');
    };
};

module.exports.help = {
    name: 'remove'
};
