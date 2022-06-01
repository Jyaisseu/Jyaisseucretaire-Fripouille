const Eco = require('../modules/economie');
const degrade = require('../modules/degrade');

module.exports.run = async (Client, interaction) => {
    let mentionned = interaction.options.getUser('utilisateur');
    if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande.");
    if(mentionned.id === interaction.member.id) return interaction.reply('Désolé, vous ne pouvez pas vous enlever à vous-même des points BG !');
    if(interaction.options.getInteger('quantité') > 0) {
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            let difference = interaction.options.getInteger('quantité');
            let perte = parseInt(difference);
            if(perte > economie.total) return interaction.reply("l'utilisateur ne possède pas la quantité de points BG que vous souhaitez retirer !");
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
                degrade.run(Client, interaction, economie, perdant);
            }else{
                economie.xp = (economie.xp - perte);
            };
            interaction.reply(`Le membre ${mentionned} a bien eu une perte de ${perte} points BG !`);
            economie.save();
        });
    }else{
        return interaction.reply('Vous devez préciser la quantité de points BG qui sera retiré !');
    };
};

module.exports.help = {
    name: 'remove'
};
