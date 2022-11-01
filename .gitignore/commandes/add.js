const Eco = require('../modules/economie');
const grade = require('../modules/grade');

module.exports.run = async (client, interaction) => {

    let mentionned = interaction.options.getUser('utilisateur');
    if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("Désolé, vous n'avez pas la permission d'exécuter cette commande");
    if(mentionned.id === interaction.member.id) return interaction.reply('Désolé, vous ne pouvez pas vous donner vous-mêmes des ponts BG !');
    if(interaction.options.getInteger('quantité') > 0) {
        Eco.findOne({
            User_ID: mentionned.id
        }, (err, economie) => {
            let somme = interaction.options.getInteger('quantité');
            let ajout = parseInt(somme);
            economie.xp += ajout;
            economie.total += ajout;
            interaction.reply(`Le membre ${mentionned} a bien reçu ${ajout} points BG !`);
            let main_level = economie.level;
            let next_level = (main_level + 1) * 10;
            if(next_level <= economie.xp) {
                do {
                    let main_level = economie.level;
                    let next_level = (main_level + 1) * 10;
                    let reste = economie.xp - next_level;
                    economie.level += 1;
                    economie.xp = 0 + reste;
                } while (next_level <= economie.xp);

                client.channels.cache.find(channel => channel.name === '📈levelup').send(`GG ${mentionned} tu viens de passer niveau ${main_level + 1} ! Tu deviens de plus en plus BG !`);

                acquerreur = mentionned
                grade.run(client, interaction, economie, acquerreur);
            }economie.save();
        });
    }else{
        return interaction.reply('Vous devez préciser la quantité de points BG que le membre va obtenir !');
    };
};

module.exports.help = {
    name: 'add'
};
