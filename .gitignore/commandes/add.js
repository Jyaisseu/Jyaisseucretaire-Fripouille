const Eco = require('../modules/economie');
const grade = require('../modules/grade');

module.exports.run = async (Client, message, args) => {
    if(message.author.bot) return;
    
    let mentionned = message.mentions.members.first();
    
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande .");
    
    if(message.mentions.users.size === 0) return message.channel.send("Vous n'avez pas mentionné d'utilisateur !");
    
    if(mentionned.id === message.author.id) return message.channel.send('Désolé, vous ne pouvez pas vous donner à vous-même des points BG.');
    
    if (args.slice(1) > 0) {
        Eco.findOne( {
            User_ID: mentionned.id
        }, (err, economie) => {
            let somme = args.slice(1);
            let ajout = parseInt(somme);
            economie.xp += ajout;
            economie.total += ajout;
            message.channel.send(`Le membre ${mentionned} a bien reçu ${ajout} points BG !`);
            let main_level = economie.level;
            let next_level = (main_level + 1) * 10;
            
            if(next_level <= economie.xp) {
                
                do {
                    let main_level = economie.level;
                    let next_level = (main_level + 1) * 10;
                    let reste = economie.xp - next_level;
                    economie.level += 1;
                    economie.xp = 0 = reste;
                } while(next_level <= economie.xp);
                
                Client.channels.cache.find(channel => channel.name === '📈levelup').send(`GG ${mentionned} tu viens de passer niveau ${main_level} ! Tu deviens de plus en plus BG !`);
                acquerreur = mentionned;
                grade.run(Client, message, economie, acquerreur);
            } economie.save();
        });
    }
    
    else {
        return message.channel.send('Vous devez préciser la quantité de points BG que le membre va obtenir !');
    };
};

module.exports.help = {
    name: 'add'
};
