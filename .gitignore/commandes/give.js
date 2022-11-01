const Eco = require('../modules/economie');
const grade = require('../modules/grade');
const degrade = require('../modules/degrade');
const { ModalSubmitInteraction } = require('discord.js');

module.exports.run = async (client, interaction) => {

    const mentionned = interaction.options.getUser('utilisateur');
    const auteur = interaction.member;

    if(mentionned.id === auteur.id) return interaction.reply('Vous ne pouvez pas vous donnez vous-même des points BG !');
    if(interaction.options.getInteger('quantité') > 0) {
        Eco.findOne({
            User_ID: auteur.id
        }, (err, economie) => {
            let don = interaction.options.getInteger('quantité');
            let donna = parseInt(don);
            if(donna > economie.total) {
                return interaction.reply('Vous ne possédez pas assez de points BG !');
            }else{
                economie.total -= donna;
            }if(donna > economie.xp) {
                let enplus = (donna - economie.xp);
                do {
                    economie.xp = 0;
                    economie.level -= 1;
                    economie.xp = ((economie.level + 1) * 10) - enplus;
                    var moins = 0 - economie.xp;
                }while (moins > 0);
                client.channels.cache.find(channel => channel.name === '📈levelup').send(`${auteur} est redescendu niveau ${economie.level} en faisant un don à ${mentionned} !`);

                perdant = auteur;
                degrade.run(client, interaction, economie, perdant);
            }else{
                economie.xp = economie.xp - donna;
            }economie.save();
        });

        Eco.findOne({
            User_Id: mentionned.id
        }, (err, economie) => {
            let reçu = interaction.options.getInteger('quantité');
            let plus = parseInt(reçu);
            economie.xp += plus;
            economie.total += plus;
            interaction.reply(`Le membre ${mentionned} a bien reçu ${plus} points BG !`);

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
                client.channels.cache.find(channel => channel.name === '💬général').send(`GG ${mentionned} tu viens de passer BG niveau ${economie.level} grâce à un don de ${auteur} ! Tu deviens de plus en plus BG !`);

                acquerreur = mentionned;
                grade.run(client, interaction, economie, acquerreur);
            }economie.save();
        })
    };
};

module.exports.help = {
    name: 'give'
};
